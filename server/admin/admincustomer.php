


<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'getAllCustomer':

            $sql = "select*from client";
            $result = $conn->query($sql);
            
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);

            $conn->close();
            break;

            case 'deleteCustomer':

                $data = json_decode($_POST['credential'], true);
           
                $clientID = $data['clientID'];
                $clientprofile = $data['clientprofile'];

                $sql = "delete from client where clientID = '$clientID'";
                $conn->query($sql);
    
                if ($conn->affected_rows > 0) {
                    
                    $userProfilePath = "../../public/asset/client/clientprofile/" . $clientprofile;
                    if (file_exists($userProfilePath)) {
                        unlink($userProfilePath);
                    }
                    echo json_encode(true);
                } else {
                    echo json_encode(false);
                }
    
                $conn->close();
                break;
        }
}


?>