<?php
// Database connection
$servername = "---------";
$username = "----------";  // Replace with your database username
$password = "------------";  // Replace with your database password
$dbname = "------------";             // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get today's date
$today = date("Y-m-d");

// Check if the `last_date` and `hits_today` entries exist
$sql = "SELECT * FROM info WHERE `key` IN ('last_date', 'hits_today')";
$result = $conn->query($sql);

$lastDate = null;
$hitsToday = 0;

while ($row = $result->fetch_assoc()) {
    if ($row['key'] == 'last_date') {
        $lastDate = $row['value'];
    }
    if ($row['key'] == 'hits_today') {
        $hitsToday = (int)$row['value'];
    }
}

// If no entry for 'hits_today', insert it
if ($hitsToday === -1) {
    $insertHitsSql = "INSERT INTO info (`key`, `value`) VALUES ('hits_today', '0')";
    $conn->query($insertHitsSql);
}

// If the date doesn't match today, reset the hit count
if ($lastDate != $today) {
    // Reset the hits to 0
    $resetHitsSql = "UPDATE info SET `value` = '0' WHERE `key` = 'hits_today'";
    $conn->query($resetHitsSql);

    // Update the last date entry to today
    $updateDateSql = "UPDATE info SET `value` = '$today' WHERE `key` = 'last_date'";
    $conn->query($updateDateSql);
} else {
    // Increment today's hit count
    $incrementHitsSql = "UPDATE info SET `value` = `value` + 1 WHERE `key` = 'hits_today'";
    $conn->query($incrementHitsSql);
}

// Get the updated hit count
$hitSql = "SELECT `value` FROM info WHERE `key` = 'hits_today'";
$hitResult = $conn->query($hitSql);

$hitCount = 0;
if ($hitResult->num_rows > 0) {
    // Fetch current hits
    $hitRow = $hitResult->fetch_assoc();
    $hitCount = (int)$hitRow['value'];
}

// Close the connection
$conn->close();

// Return the hit count as JSON
echo json_encode(['hits_today' => $hitCount]);
?>