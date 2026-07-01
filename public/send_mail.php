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
$tierName = $data['tierName'] ?? '';
$price = $data['price'] ?? 0;

if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit;
}

$to = $email;
$subject = "Roots & Reach - Journey Submission Confirmation";

$whatsappNumber = "96181408171"; // Lebanon format
$whatsappLink = "https://wa.me/" . $whatsappNumber . "?text=" . urlencode("Hello, here is my Whish receipt for $name ($tierName)");

$message = "
<html>
<head>
  <title>Roots & Reach Confirmation</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fcfbf9; border-radius: 8px;'>
    <h2 style='color: #E25E4B;'>Thank you, $name!</h2>
    <p>We have successfully received your registration request for Dr. Yazeed's Journey.</p>
    
    <div style='background-color: white; padding: 15px; border-radius: 6px; margin: 20px 0;'>
      <p style='margin: 5px 0;'><strong>Package:</strong> $tierName</p>
      <p style='margin: 5px 0;'><strong>Total Price:</strong> $$price</p>
    </div>
    
    <p>To finalize your registration, please send us your <strong>Whish Money receipt</strong> via WhatsApp.</p>
    
    <p style='margin: 30px 0; text-align: center;'>
      <a href='$whatsappLink' style='background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;'>
        Send Receipt via WhatsApp
      </a>
    </p>
    
    <p style='color: #666; font-size: 14px;'>We look forward to seeing you!<br>
    The Roots & Reach Team</p>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Roots & Reach <contact@rootsandreach.org>' . "\r\n";
$headers .= 'Reply-To: contact@rootsandreach.org' . "\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
}
?>
