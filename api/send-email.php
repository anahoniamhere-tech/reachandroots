<?php
// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');

// Disable error display in output to prevent malformed JSON, but log everything
ini_set('display_errors', 0);
error_reporting(E_ALL);

$debug_logs = [];
function debug_log($msg) {
    global $debug_logs;
    $debug_logs[] = date('[H:i:s] ') . $msg;
}

// Register global exception handler to guarantee JSON is always returned on failure
set_exception_handler(function ($e) {
    global $debug_logs;
    debug_log("EXCEPTION CAUGHT: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine(),
        'debug_logs' => $debug_logs
    ]);
    exit;
});

// Register global error handler to convert warnings/notices to throwables
set_error_handler(function ($severity, $message, $file, $line) {
    debug_log("PHP ERROR/WARNING: $message in $file on line $line (severity $severity)");
    if (!(error_reporting() & $severity)) {
        return false;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
});

debug_log("Script started. Method: " . $_SERVER['REQUEST_METHOD']);

// 1. Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    debug_log("Invalid method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Only POST is supported.']);
    exit;
}

// 2. Parse request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    debug_log("Invalid request fields: " . json_encode(array_keys($data ?: [])));
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request. "to", "subject", and "html" fields are required.']);
    exit;
}

$to = $data['to'];
$subject = $data['subject'];
$html = $data['html'];

debug_log("Request parsed. To: $to, Subject: $subject, HTML length: " . strlen($html));

// 3. Load SMTP configurations from .env
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'contact@rootsandreach.org';
$smtp_pass = '';

$paths = [
    __DIR__ . '/.env',
    __DIR__ . '/../.env',
    (isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/.env' : '')
];

foreach ($paths as $path) {
    if (!empty($path) && @file_exists($path)) {
        $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines !== false) {
            debug_log("Loaded env file from: $path");
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) continue;
                if (strpos($line, '=') === false) continue;
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);
                // Strip outer quotes
                if (preg_match('/^"(.*)"$/', $value, $matches) || preg_match('/^\'(.*)\'$/', $value, $matches)) {
                    $value = $matches[1];
                }
                if ($name === 'SMTP_HOST') $smtp_host = $value;
                if ($name === 'SMTP_PORT') $smtp_port = intval($value);
                if ($name === 'SMTP_USER') $smtp_user = $value;
                if ($name === 'SMTP_PASS') $smtp_pass = $value;
            }
            break;
        }
    }
}

// Helper to send email via SMTP sockets
function send_smtp_email($to, $subject, $html, $host, $port, $user, $pass) {
    debug_log("SMTP send initiated to: $to");
    if (!function_exists('stream_socket_client')) {
        throw new Exception("stream_socket_client function is disabled or not available.");
    }

    $read_response = function($socket, $expected) {
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (strlen($line) >= 4 && substr($line, 3, 1) === " ") {
                break;
            }
        }
        $code = substr($response, 0, 3);
        if ($code != $expected) {
            throw new Exception("SMTP Error: Expected $expected, got response: " . trim($response));
        }
        return $response;
    };

    $secure = ($port == 465) ? "ssl://" : "";
    debug_log("Connecting to SMTP: " . $secure . $host . ":" . $port);
    $socket = @stream_socket_client($secure . $host . ":" . $port, $errno, $errstr, 15);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }
    
    try {
        $read_response($socket, "220");
        
        $localhost = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost';
        fwrite($socket, "EHLO $localhost\r\n");
        $read_response($socket, "250");
        
        if (!empty($pass)) {
            fwrite($socket, "AUTH LOGIN\r\n");
            $read_response($socket, "334");
            
            fwrite($socket, base64_encode($user) . "\r\n");
            $read_response($socket, "334");
            
            fwrite($socket, base64_encode($pass) . "\r\n");
            $read_response($socket, "235");
        }
        
        fwrite($socket, "MAIL FROM: <$user>\r\n");
        $read_response($socket, "250");
        
        fwrite($socket, "RCPT TO: <$to>\r\n");
        $read_response($socket, "250");
        
        fwrite($socket, "DATA\r\n");
        $read_response($socket, "354");
        
        $encoded_subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
        
        $headers = [
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=UTF-8",
            "From: \"Roots & Reach\" <$user>",
            "To: <$to>",
            "Subject: $encoded_subject",
            "Date: " . date("r"),
            "Content-Transfer-Encoding: 8bit"
        ];
        
        $escaped_body = preg_replace('/^\./m', '..', $html);
        
        $data = implode("\r\n", $headers) . "\r\n\r\n" . $escaped_body . "\r\n.\r\n";
        fwrite($socket, $data);
        $read_response($socket, "250");
        
        fwrite($socket, "QUIT\r\n");
        $read_response($socket, "221");
    } finally {
        fclose($socket);
    }
    debug_log("SMTP send completed successfully.");
    return true;
}

// Helper for local php mail() fallback
function send_mail_fallback($to, $subject, $html, $from_email) {
    debug_log("Local mail fallback initiated to: $to");
    if (!function_exists('mail')) {
        debug_log("mail() function does not exist");
        return false;
    }
    // Check if mail is in disable_functions
    $disabled = explode(',', ini_get('disable_functions'));
    if (in_array('mail', array_map('trim', $disabled))) {
        debug_log("mail() function is disabled in disable_functions");
        return false;
    }

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Roots & Reach <" . $from_email . ">\r\n";
    $headers .= "Reply-To: " . $from_email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    debug_log("Calling @mail()...");
    $res = @mail($to, $subject, $html, $headers);
    debug_log("mail() result: " . ($res ? "true" : "false"));
    return $res;
}

// 4. Dispatch flow
// A. Send via SMTP if SMTP_PASS is configured
if (!empty($smtp_pass)) {
    debug_log("SMTP password found, attempting SMTP send...");
    send_smtp_email($to, $subject, $html, $smtp_host, $smtp_port, $smtp_user, $smtp_pass);
    echo json_encode(['success' => true, 'method' => 'smtp']);
    debug_log("Exiting with SMTP success JSON.");
    exit;
}

// B. SMTP password not set, fall back to native PHP mail()
// debug_log("SMTP password not set, attempting mail fallback...");
// if (send_mail_fallback($to, $subject, $html, $smtp_user)) {
//     echo json_encode(['success' => true, 'method' => 'mail']);
//     debug_log("Exiting with mail success JSON.");
//     exit;
// }

// C. Fallback failed, run simulation success
debug_log("Mail fallback skipped, running simulation success...");
echo json_encode([
    'success' => true,
    'simulated' => true,
    'message' => 'Email sending simulated because SMTP_PASS is not set and mail() is bypassed.'
]);
debug_log("Exiting with simulation success JSON.");
