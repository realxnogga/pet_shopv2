




<?php

require_once "../connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertRatingData':    

            $data = json_decode($_POST['credential'], true);
    
            $ratingproductID = $data['ratingproductID'];
            $productname = $data['productname'];
            $productsize = $data['productsize'];
            $commenter = $data['commenter'];
            $star = $data['star'];     
            $comment = $data['comment'];

            $sql = "INSERT INTO rating (ratingproductID, productname, productsize, commenter, star, comment ) VALUES ('$ratingproductID', '$productname', '$productsize', '$commenter', '$star', '$comment')";

            $conn->query($sql);
         
            if ($conn->affected_rows > 0) {
                echo json_encode(true); 
            }
            else {
                echo json_encode(false);
            }
    
            $conn->close();
            break;

            case 'getAllRatingData':

                $sql = "select*from rating";
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