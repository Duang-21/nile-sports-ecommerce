<?php
include 'includes/header.php';
include 'includes/navbar.php';
?>

<div class="container mt-5">

<div class="row">

<div class="col-md-12">

<div class="p-5 bg-primary text-white rounded shadow">

<h1>Student Management System</h1>

<p>

Advanced Web Design & Development

BIT3208

</p>

<a href="login.php" class="btn btn-light">

Login

</a>

<a href="register.php" class="btn btn-warning">

Register

</a>

</div>

</div>

</div>

<br>

<div class="row">

<div class="col-md-4">

<div class="card shadow">

<div class="card-body text-center">

<h3>Students</h3>

<p>Manage student information.</p>

<a href="admin/students/index.php"
class="btn btn-primary">

Open

</a>

</div>

</div>

</div>

<div class="col-md-4">

<div class="card shadow">

<div class="card-body text-center">

<h3>Users</h3>

<p>User registration and login.</p>

<a href="register.php"
class="btn btn-success">

Register

</a>

</div>

</div>

</div>

<div class="col-md-4">

<div class="card shadow">

<div class="card-body text-center">

<h3>Dashboard</h3>

<p>Secure authenticated area.</p>

<a href="auth/dashboard.php"
class="btn btn-dark">

Dashboard

</a>

</div>

</div>

</div>

</div>

</div>

<?php include 'includes/footer.php'; ?>