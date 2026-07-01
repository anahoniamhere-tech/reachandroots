<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$name = $data['name'] ?? '';
$role = $data['role'] ?? []; // It's an array now
$roleString = is_array($role) ? implode(", ", $role) : $role;

if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit;
}

$to = $email;
$subject = "Welcome to the Roots & Reach Community!";

$message = "
<html>
<head>
  <title>Welcome to the Roots & Reach Community</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fcfbf9; border-radius: 8px;'>
    <div style='text-align: center; margin-bottom: 20px;'>
      <img src='https://rootsandreach.org/Yellow_Header_logo.png' alt='Roots & Reach' style='height: 60px;' />
    </div>
    
    <h2 style='color: #E25E4B;'>Dear $name,</h2>
    <p>Welcome to <strong>Roots & Reach</strong>! We are absolutely thrilled to have you join our creative community in Tripoli.</p>
    
    <p>You are now officially part of our network as a <strong>$roleString</strong>. As a community member, you will be the first to know about our upcoming events, creator gatherings, workshops, and exclusive opportunities.</p>
    
    <p>In the meantime, make sure to follow us on Instagram <a href='https://instagram.com/rootsndreach' style='color: #172F41; font-weight: bold;'>@rootsndreach</a> so you don't miss any of the stories we're building together.</p>
    
    <p style='color: #666; font-size: 14px; margin-top: 40px;'>
    Warm regards,<br>
    <strong>The Roots & Reach Team</strong>
    </p>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Roots & Reach <contact@rootsandreach.org>' . "\r\n";
$headers .= 'Reply-To: contact@rootsandreach.org' . "\r\n";
$headers .= 'Bcc: contact@rootsandreach.org' . "\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Welcome email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send welcome email"]);
}
?>
