<?php
include '../../config/database.php';

if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit();
}

$id = $_GET['id'];

$stmt = $conn->prepare("SELECT * FROM students WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    die("Student not found.");
}

$student = $result->fetch_assoc();

include '../../includes/header.php';
include '../../includes/navbar.php';
?>

<div class="container mt-5">

<div class="card shadow">

<div class="card-header bg-info text-white">

<h3>Student Details</h3>

</div>

<div class="card-body">

<table class="table table-bordered">

<tr>
<th width="30%">Full Name</th>
<td><?= htmlspecialchars($student['fullname']); ?></td>
</tr>

<tr>
<th>Email</th>
<td><?= htmlspecialchars($student['email']); ?></td>
</tr>

<tr>
<th>Course</th>
<td><?= htmlspecialchars($student['course']); ?></td>
</tr>

<tr>
<th>Phone</th>
<td><?= htmlspecialchars($student['phone']); ?></td>
</tr>

<tr>
<th>Gender</th>
<td><?= htmlspecialchars($student['gender']); ?></td>
</tr>

<tr>
<th>Date Registered</th>
<td><?= $student['created_at']; ?></td>
</tr>

</table>

<a href="index.php" class="btn btn-secondary">
Back to Student List
</a>

</div>

</div>

</div>

<?php include '../../includes/footer.php'; ?>