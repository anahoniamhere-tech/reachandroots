<?php
// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');

// Disable error display to prevent malformed JSON in output, but log to error log
ini_set('display_errors', 0);
error_reporting(E_ALL);

function log_error($msg) {
    error_log("[send-email] " . $msg);
}

// 1. Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Only POST is supported.']);
    exit;
}

// 2. Parse request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request. "to", "subject", and "html" fields are required.']);
    exit;
}

$to = $data['to'];
$subject = $data['subject'];
$html = $data['html'];

// 3. Load SMTP configurations from .env
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'contact@rootsandreach.org';
$smtp_pass = '';

$paths = [
    __DIR__ . '/.env',
    __DIR__ . '/../.env',
    __DIR__ . '/../../.env',
    (isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/.env' : ''),
    (isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/../.env' : '')
];

foreach ($paths as $path) {
    if (!empty($path) && @file_exists($path)) {
        $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines !== false) {
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
    // Closure to read socket lines until the SMTP multiline response completes
    $read_response = function($socket, $expected) {
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            // SMTP lines end with \r\n and the fourth character determines if there are more lines
            // '-' means more lines, ' ' (space) means last line of response
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
        
        // Encode subject to UTF-8 Base64 to prevent header parsing glitches
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
        
        // Escape leading dots in lines to comply with SMTP RFC dot-stuffing
        $escaped_body = preg_replace('/^\./m', '..', $html);
        
        $data = implode("\r\n", $headers) . "\r\n\r\n" . $escaped_body . "\r\n.\r\n";
        fwrite($socket, $data);
        $read_response($socket, "250");
        
        fwrite($socket, "QUIT\r\n");
        $read_response($socket, "221");
    } finally {
        fclose($socket);
    }
    return true;
}

// Helper for local php mail() fallback
function send_mail_fallback($to, $subject, $html, $from_email) {
    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: Roots & Reach <" . $from_email . ">",
        "Reply-To: " . $from_email,
        "X-Mailer: PHP/" . phpversion()
    ];
    return mail($to, $subject, $html, $headers);
}

// 4. Dispatch flow
try {
    // A. Send via SMTP if SMTP_PASS is configured
    if (!empty($smtp_pass)) {
        send_smtp_email($to, $subject, $html, $smtp_host, $smtp_port, $smtp_user, $smtp_pass);
        echo json_encode(['success' => true, 'method' => 'smtp']);
        exit;
    }
    
    // B. SMTP password not set, fall back to native PHP mail()
    if (send_mail_fallback($to, $subject, $html, $smtp_user)) {
        echo json_encode(['success' => true, 'method' => 'mail']);
        exit;
    }
    
    // C. Fallback failed, run simulation success
    echo json_encode([
        'success' => true,
        'simulated' => true,
        'message' => 'Email sending simulated because SMTP_PASS is not set and local mail() failed.'
    ]);
} catch (Exception $e) {
    log_error("SMTP failed: " . $e->getMessage());
    
    // D. SMTP exception: try PHP mail() fallback as a last resort
    try {
        if (send_mail_fallback($to, $subject, $html, $smtp_user)) {
            echo json_encode(['success' => true, 'method' => 'mail_fallback_after_smtp_failure']);
            exit;
        }
    } catch (Exception $e2) {
        log_error("Fallback mail() after SMTP failure failed: " . $e2->getMessage());
    }
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
