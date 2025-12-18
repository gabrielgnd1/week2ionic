<?php

require("koneksi.php");

extract($_POST);

// Assuming you have username or user_id and lat, lon parameters
// Insert or update user's location in the database
$stmt = $conn->prepare(
  "INSERT INTO locations (username, latitude, longitude, updated_at) 
   VALUES (?, ?, ?, NOW()) 
   ON DUPLICATE KEY UPDATE 
   latitude=VALUES(latitude), longitude=VALUES(longitude), updated_at=NOW()");

$stmt->bind_param("sdd", $username, $latitude, $longitude);

if ($stmt->execute()) {
  $arr = ["result" => "success", "message" => "Location updated"];
} else {
  $arr = ["result" => "error", "message" => "Failed to update location"];
}

echo json_encode($arr);
$stmt->close();
$conn->close();

?>
