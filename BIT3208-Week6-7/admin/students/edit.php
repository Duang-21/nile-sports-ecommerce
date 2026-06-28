<?php
include '../../config/database.php';

if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit();
}

$id = $_GET['id'];

$result = mysqli_query($conn, "SELECT * FROM students WHERE id=$id");

if (mysqli_num_rows($result) == 0) {
    die("Student not found.");
}

$student = mysqli_fetch_assoc($result);

$message = "";

if (isset($_POST['update'])) {

    $fullname = trim($_POST['fullname']);
    $email    = trim($_POST['email']);
    $course   = trim($_POST['course']);
    $phone    = trim($_POST['phone']);
    $gender   = $_POST['gender'];

    $stmt = $conn->prepare("UPDATE students
                            SET fullname=?, email=?, course=?, phone=?, gender=?
                            WHERE id=?");

    $stmt->bind_param(
        "sssssi",
        $fullname,
        $email,
        $course,
        $phone,
        $gender,
        $id
    );

    if ($stmt->execute()) {

        header("Location: index.php");
        exit();

    } else {

        $message = "<div class='alert alert-danger'>Update failed.</div>";

    }

}
?>

<?php include '../../includes/header.php'; ?>
<?php include '../../includes/navbar.php'; ?>

<div class="container mt-5">

<div class="card shadow">

<div class="card-header bg-warning">

<h3>Edit Student</h3>

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
value="<?= htmlspecialchars($student['fullname']); ?>"
required>

</div>

<div class="mb-3">

<label>Email</label>

<input
type="email"
name="email"
class="form-control"
value="<?= htmlspecialchars($student['email']); ?>"
required>

</div>

<div class="mb-3">

<label>Course</label>

<input
type="text"
name="course"
class="form-control"
value="<?= htmlspecialchars($student['course']); ?>"
required>

</div>

<div class="mb-3">

<label>Phone</label>

<input
type="text"
name="phone"
class="form-control"
value="<?= htmlspecialchars($student['phone']); ?>">

</div>

<div class="mb-3">

<label>Gender</label>

<select name="gender" class="form-select">

<option value="Male"
<?= $student['gender']=="Male"?"selected":"" ?>>
Male
</option>

<option value="Female"
<?= $student['gender']=="Female"?"selected":"" ?>>
Female
</option>

<option value="Other"
<?= $student['gender']=="Other"?"selected":"" ?>>
Other
</option>

</select>

</div>

<button
type="submit"
name="update"
class="btn btn-warning">

Update Student

</button>

<a href="index.php"
class="btn btn-secondary">

Cancel

</a>

</form>

</div>

</div>

</div>

<?php include '../../includes/footer.php'; ?>