
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
            $emailAppPassword = $data['emailAppPassword'];

            $result = $conn->query("select*from client where clientemail = '$email'");

            if ($result->num_rows <= 0) {
                echo json_encode(['bool' => false, 'message' => 'Email does not exist']);
            } else {
                //  gfnt icqt tepu aiyg sa main account
                //  mpsm bquu hwjw qxch

                try {
                    $token = bin2hex(random_bytes(5));

                    $mail = new PHPMailer(true);
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = $email;
                    $mail->Password = $emailAppPassword;
                    $mail->SMTPSecure = 'tls';
                    $mail->Port = 587;

                    $mail->setFrom($email, 'Customer');
                    $mail->addAddress($email);

                    $mail->isHTML(true);
                    $mail->Subject = 'Password Reset Request';
                    $mail->Body = 'Here is your token : ' . $token . '';

                    if ($mail->send()) {
                        $conn->query("UPDATE client SET clienttoken = '$token' WHERE clientemail = '$email'");
                        echo json_encode(['bool' => true, 'message' => 'Email sent successfully']);
                    }
                } catch (Exception $e) {
                    echo json_encode(['bool' => false, 'message' => 'Failed to send to email']);
                }
            }
            break;

        case 'changePassword':

            $data = json_decode($_POST['credential'], true);

            $email = $data['email'];
            $token = $data['token'];
            $password = $data['password'];

            $sql = "select*from client where clientemail = '$email'";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();

            if ($row['clienttoken'] === $token) {
                $conn->query("UPDATE `client` SET `clientpassword` = '$password' WHERE `clientemail` = '$email'");
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;
    }
}


?>