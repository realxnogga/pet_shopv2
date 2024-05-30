

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
        case 'putProduct':

            $data = json_decode($_POST['productDataTemp'], true);
            $productname = $data['productname'];
            $productsize = $data['productsize'];
            $productstock = $data['productstock'];
            $productprice = $data['productprice'];
            $productcategory = $data['productcategory'];


            $file = $_FILES['productImage'];
            $productImageName = $file['name'];
            $uniqueProductImageName =  $productImageName . "_" . $timestamp = date("YmdHis");
            $productImageTMP = $file['tmp_name'];
            $productImageDestination = '../../public/asset/admin/productimage/' . $uniqueProductImageName;

            move_uploaded_file($productImageTMP, $productImageDestination);

            $sql = "INSERT INTO adminproduct (productname, productsize, productstock, productprice, productcategory, productimage) VALUES ('$productname', '$productsize', '$productstock', '$productprice', '$productcategory', '$uniqueProductImageName')";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

        case 'getProduct':

            $sql = "select*from adminproduct";
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