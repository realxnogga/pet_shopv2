
<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertAdminLoginData':
            $data = json_decode($_POST['credential'], true);
            $username = $data['username'];
            $password = $data['password'];

            $sql = "select*from admin where username = '$username' and password = '$password'";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;
        }
}


?>