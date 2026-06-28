<?php
include 'auth.php';
include '../config/database.php';

// Count total students
$totalStudents = mysqli_num_rows(
    mysqli_query($conn, "SELECT * FROM students")
);

// Count total users
$totalUsers = mysqli_num_rows(
    mysqli_query($conn, "SELECT * FROM users")
);
?>

<?php include '../includes/header.php'; ?>
<?php include '../includes/navbar.php'; ?>

<div class="container mt-5">

    <div class="row">

        <div class="col-md-12">

            <div class="card shadow">

                <div class="card-header bg-success text-white">

                    <h2>Dashboard</h2>

                </div>

                <div class="card-body">

                    <h3>
                        Welcome,
                        <?= htmlspecialchars($_SESSION['fullname']); ?>
                    </h3>

                    <hr>

                    <p>
                        <strong>Email:</strong>
                        <?= htmlspecialchars($_SESSION['email']); ?>
                    </p>

                    <p>
                        <strong>Role:</strong>
                        <?= htmlspecialchars($_SESSION['role']); ?>
                    </p>

                </div>

            </div>

        </div>

    </div>

    <br>

    <div class="row">

        <div class="col-md-6">

            <div class="card bg-primary text-white shadow">

                <div class="card-body text-center">

                    <h5>Total Students</h5>

                    <h1><?= $totalStudents; ?></h1>

                </div>

            </div>

        </div>

        <div class="col-md-6">

            <div class="card bg-success text-white shadow">

                <div class="card-body text-center">

                    <h5>Total Registered Users</h5>

                    <h1><?= $totalUsers; ?></h1>

                </div>

            </div>

        </div>

    </div>

    <br>

    <div class="card shadow">

        <div class="card-header">

            <h4>Quick Actions</h4>

        </div>

        <div class="card-body">

            <a href="../admin/students/create.php"
               class="btn btn-primary">

                Add Student

            </a>

            <a href="../admin/students/index.php"
               class="btn btn-success">

                Manage Students

            </a>

            <a href="../register.php"
               class="btn btn-warning">

                Register User

            </a>

            <a href="../logout.php"
               class="btn btn-danger">

                Logout

            </a>

        </div>

    </div>

</div>

<?php include '../includes/footer.php'; ?>