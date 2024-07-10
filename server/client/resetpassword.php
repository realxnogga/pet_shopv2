
<?php

require_once "../connection/connection.php";

require "../../vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'sendEmail':

            $data = json_decode($_POST['credential'], true);
            $email = $data['email'];
            $emailapppassword = $data['emailapppassword'];

            $sql = "select*from client where clientemail = '$email'";
            $result = $conn->query($sql);

            if ($result->num_rows <= 0) {
                echo json_encode(false); // if email doesnt exist
            } else {
               $token = bin2hex(random_bytes(10));

                $sql = "UPDATE client SET clienttoken = '$token' WHERE clientemail = '$email'";
                $conn->query($sql);

               // Send reset email
                $mail = new PHPMailer(true);
              //  uomw evvl gpxj szxx sa main account
              //  mpsm bquu hwjw qxch
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = $email;
                    $mail->Password = $emailapppassword;
                    $mail->SMTPSecure = 'tls';
                    $mail->Port = 587;

                    $mail->setFrom($email, 'Customer');
                    $mail->addAddress($email);

                    $mail->isHTML(true);
                    $mail->Subject = 'Password Reset Request';
                    $mail->Body = 'Here is your token : ' . $token .'';

                    $mail->send();
                    echo json_encode(true);

            }
    }
}



?>