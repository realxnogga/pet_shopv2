

<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertBuyProductData':
        
            $data = json_decode($_POST['credential'], true);
            $productID = $data['productID'];
            $clientID = $data['clientID'];
            $clientusername = $data['clientusername'];
            $productname = $data['productname'];
            $productsize = $data['productsize'];
            $productquantity = $data['productquantity'];
            $producttotalprice = $data['producttotalprice'];
            $clientaddress = $data['clientaddress'];
            $paymentMode = $data['paymentMode'];
            

            $sql = "INSERT INTO buyproduct (buyproductID, clientID, clientusername, productname, productsize, productquantity, producttotalprice, clientaddress, paymentmethod) VALUES ('$productID', '$clientID', '$clientusername', '$productname', '$productsize', '$productquantity', '$producttotalprice', '$clientaddress', '$paymentMode')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

        case 'getBuyProductData':

            $clientusername = json_decode(file_get_contents("php://input"), true);

            $sql = "select*from buyproduct where clientusername = '$clientusername'";

            $result = $conn->query($sql);

            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        
            $conn->close();
            break;   

            case 'getAllBuyProductData':

                $sql = "select*from buyproduct";
                $result = $conn->query($sql);
    
                $data = [];
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            
                $conn->close();
                break;

                case 'updateBuyDataStatus':

                    $buyproductprimarykey = json_decode(file_get_contents("php://input"), true);
        
                    $sql = "UPDATE `buyproduct` SET `orderstatus` = 'recieve' WHERE `buyproductprimarykey` = '$buyproductprimarykey'";
                    $conn->query($sql);

                    if ($conn->affected_rows > 0) {
                        echo json_encode(true);
                    } else {
                        echo json_encode(false);
                    }
        
                    $conn->close();
                    break;
    }
}


?>