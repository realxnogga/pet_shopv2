

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
        case 'adminAuth':
            $data = json_decode($_POST['adminCredentialTemp'], true);
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