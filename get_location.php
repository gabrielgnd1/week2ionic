<?php

require("koneksi.php");

extract($_GET);

// Get friend's location by username
$stmt = $conn->prepare("SELECT username, latitude, longitude, updated_at FROM locations WHERE username = ?");
$stmt->bind_param("s", $friend_username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $arr = [
    "result" => "success",
    "username" => $row['username'],
    "x" => $row['longitude'],
    "y" => $row['latitude'],
    "updated_at" => $row['updated_at']
  ];
} else {
  $arr = ["result" => "error", "message" => "User location not found"];
}

echo json_encode($arr);
$stmt->close();
$conn->close();

?>
