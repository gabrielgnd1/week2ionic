<?php

// Get username and password from POST request
$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

// Simple user database (in real app, use actual database)
$users = [
    ['username' => 'admin', 'password' => 'admin123', 'fullname' => 'Admin User'],
    ['username' => 'user1', 'password' => 'pass123', 'fullname' => 'John Doe'],
    ['username' => 'user2', 'password' => 'password', 'fullname' => 'Jane Smith'],
];

// Check if username and password match
$found = false;
$fullname = '';

foreach ($users as $user) {
    if ($user['username'] === $username && $user['password'] === $password) {
        $found = true;
        $fullname = $user['fullname'];
        break;
    }
}

// Return response
if ($found) {
    $arr = ["result" => "success", "fullname" => $fullname];
} else {
    $arr = ["result" => "failed", "message" => "Invalid username or password"];
}

header('Content-Type: application/json');
echo json_encode($arr);

?>
