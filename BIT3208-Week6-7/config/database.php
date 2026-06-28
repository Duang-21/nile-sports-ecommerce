<?php

// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "studentdb";

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}
?>