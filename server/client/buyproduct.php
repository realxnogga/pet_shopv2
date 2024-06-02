

<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "petshop";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertBuyProductData':
        
            $data = json_decode($_POST['buyDataTemp'], true);

            $clientID = $data['clientID'];
            $clientusername = $data['clientusername'];
            $productname = $data['productname'];
            $productsize = $data['productsize'];
            $productquantity = $data['productquantity'];
            $producttotalprice = $data['producttotalprice'];

            $sql = "INSERT INTO buyproduct (clientID, clientusername, productname, productsize, productquantity, producttotalprice) VALUES ('$clientID', '$clientusername', '$productname', '$productsize', '$productquantity', '$producttotalprice')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

        case 'getBuyProductData':

            $clientusername = json_decode($_POST['clientusername'], true);

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

                    $buyproductID = json_decode(file_get_contents("php://input"), true);
        
                    $sql = "UPDATE `buyproduct` SET `orderstatus` = 'recieve' WHERE `buyproductID` = '$buyproductID'";
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