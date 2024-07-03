




<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'putLoginData':

            $data = json_decode($_POST['credential'], true);

            $userloginusername = $data['userloginusername'];
            $userloginpassword = $data['userloginpassword'];

            $sql = "select*from client where clientusername = '$userloginusername' and clientpassword = '$userloginpassword'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

        case 'getLoginData':

            $data = json_decode($_POST['credential'], true);
            
            $userloginusername = $data['userloginusername'];
            $userloginpassword = $data['userloginpassword'];

            $sql = "select*from client where clientusername = '$userloginusername' and clientpassword = '$userloginpassword'";

            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        
            $conn->close();
            break;
    }
}


?>