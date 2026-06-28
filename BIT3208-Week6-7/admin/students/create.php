<?php
include '../../config/database.php';

$message = "";

if (isset($_POST['save'])) {

    $fullname = trim($_POST['fullname']);
    $email    = trim($_POST['email']);
    $course   = trim($_POST['course']);
    $phone    = trim($_POST['phone']);
    $gender   = $_POST['gender'];

    if (empty($fullname) || empty($email) || empty($course)) {

        $message = "<div class='alert alert-danger'>
                        Please fill in all required fields.
                    </div>";

    } else {

        $stmt = $conn->prepare("INSERT INTO students(fullname,email,course,phone,gender)
                                VALUES(?,?,?,?,?)");

        $stmt->bind_param(
            "sssss",
            $fullname,
            $email,
            $course,
            $phone,
            $gender
        );

        if ($stmt->execute()) {

            $message = "<div class='alert alert-success'>
                            Student added successfully!
                        </div>";

        } else {

            $message = "<div class='alert alert-danger'>
                            ".$stmt->error."
                        </div>";

        }

        $stmt->close();
    }
}
?>

<?php include '../../includes/header.php'; ?>
<?php include '../../includes/navbar.php'; ?>

<div class="container mt-5">

    <div class="card shadow">

        <div class="card-header bg-primary text-white">
            <h3>Add Student</h3>
        </div>

        <div class="card-body">

            <?= $message; ?>

            <form method="POST">

                <div class="mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        class="form-control"
                        required>
                </div>

                <div class="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        required>
                </div>

                <div class="mb-3">
                    <label>Course</label>
                    <input
                        type="text"
                        name="course"
                        class="form-control"
                        required>
                </div>

                <div class="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        class="form-control">
                </div>

                <div class="mb-3">
                    <label>Gender</label>

                    <select
                        name="gender"
                        class="form-select">

                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                    </select>

                </div>

                <button
                    type="submit"
                    name="save"
                    class="btn btn-primary">

                    Save Student

                </button>

                <a
                    href="index.php"
                    class="btn btn-success">

                    View Students

                </a>

            </form>

        </div>

    </div>

</div>

<?php include '../../includes/footer.php'; ?>