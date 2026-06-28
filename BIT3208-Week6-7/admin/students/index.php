<?php
include '../../config/database.php';
include '../../includes/header.php';
include '../../includes/navbar.php';

// Search functionality
if (isset($_GET['search']) && !empty(trim($_GET['search']))) {

    $search = "%" . trim($_GET['search']) . "%";

    $stmt = $conn->prepare("
        SELECT * FROM students
        WHERE fullname LIKE ?
        OR email LIKE ?
        OR course LIKE ?
        ORDER BY id DESC
    ");

    $stmt->bind_param("sss", $search, $search, $search);
    $stmt->execute();

    $result = $stmt->get_result();

} else {

    $result = mysqli_query($conn, "SELECT * FROM students ORDER BY id DESC");

}
?>

<div class="container mt-5">

    <div class="card shadow">

        <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">

            <h3>Student Management</h3>

            <a href="create.php" class="btn btn-light">
                + Add Student
            </a>

        </div>

        <div class="card-body">

            <!-- Search Form -->
            <form method="GET" class="mb-4">

                <div class="input-group">

                    <input
                        type="text"
                        name="search"
                        class="form-control"
                        placeholder="Search by Name, Email or Course"
                        value="<?= isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">

                    <button
                        class="btn btn-primary"
                        type="submit">

                        Search

                    </button>

                    <a
                        href="index.php"
                        class="btn btn-secondary">

                        Reset

                    </a>

                </div>

            </form>

            <table class="table table-bordered table-hover table-striped">

                <thead class="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Date Added</th>
                        <th width="250">Actions</th>

                    </tr>

                </thead>

                <tbody>

                <?php if(mysqli_num_rows($result) > 0): ?>

                    <?php while($row = mysqli_fetch_assoc($result)): ?>

                    <tr>

                        <td><?= $row['id']; ?></td>

                        <td><?= htmlspecialchars($row['fullname']); ?></td>

                        <td><?= htmlspecialchars($row['email']); ?></td>

                        <td><?= htmlspecialchars($row['course']); ?></td>

                        <td><?= htmlspecialchars($row['phone']); ?></td>

                        <td><?= htmlspecialchars($row['gender']); ?></td>

                        <td><?= $row['created_at']; ?></td>

                        <td>

                            <a
                                href="view.php?id=<?= $row['id']; ?>"
                                class="btn btn-info btn-sm">

                                View

                            </a>

                            <a
                                href="edit.php?id=<?= $row['id']; ?>"
                                class="btn btn-warning btn-sm">

                                Edit

                            </a>

                            <a
                                href="delete.php?id=<?= $row['id']; ?>"
                                class="btn btn-danger btn-sm"
                                onclick="return confirm('Are you sure you want to delete this student?');">

                                Delete

                            </a>

                        </td>

                    </tr>

                    <?php endwhile; ?>

                <?php else: ?>

                    <tr>

                        <td colspan="8" class="text-center">

                            No students found.

                        </td>

                    </tr>

                <?php endif; ?>

                </tbody>

            </table>

        </div>

    </div>

</div>

<?php include '../../includes/footer.php'; ?>