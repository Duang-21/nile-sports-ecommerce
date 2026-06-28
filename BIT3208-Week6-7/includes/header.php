<?php
// Detect current directory and set asset path
$assetPath = "assets/";

$currentDir = basename(dirname($_SERVER['SCRIPT_NAME']));

if ($currentDir == "students") {
    $assetPath = "../../assets/";
} elseif ($currentDir == "auth") {
    $assetPath = "../assets/";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Management System</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?= $assetPath ?>css/style.css">

</head>

<body>