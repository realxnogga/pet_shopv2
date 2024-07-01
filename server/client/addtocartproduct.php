



<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertAddToCartProductData':

            $data = json_decode($_POST['addToCartDataTemp'], true);

            $productID = $data['productID'];
            $clientID = $data['clientID'];
            $clientusername = $data['clientusername'];
            $productname = $data['productname'];
            $productsize = $data['productsize'];
            $productstock = $data['productstock'];
            $productprice = $data['productprice'];
            $productdescription = $data['productdescription'];
            $productcategory = $data['productcategory'];
            $productimage = $data['productimage'];

            $sql = "INSERT INTO addtocartproduct (addtocartproductID, clientID, clientusername, addtocartproductname, addtocartproductsize, addtocartproductstock, addtocartproductprice, addtocartproductdescription, addtocartproductcategory, addtocartproductimage) VALUES ('$productID', '$clientID', '$clientusername', '$productname', '$productsize', '$productstock', '$productprice', '$productdescription', '$productcategory', '$productimage')";

            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

        case 'getAddToCartProductData':

            $clientusername = json_decode($_POST['clientusername'], true);

            $sql = "select*from addtocartproduct where clientusername = '$clientusername'";
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