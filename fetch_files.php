<?php
header('Content-Type: application/octet-stream');

$directory = "notes"; // Root directory
$files = scanDirectory($directory);
$encryptedData = encryptData(json_encode($files));

echo $encryptedData;

function scanDirectory($dir) {
    $result = [];
    foreach (scandir($dir) as $file) {
        if ($file === "." || $file === "..") continue;
        $fullPath = "$dir/$file";

        if (is_dir($fullPath)) {
            $result[] = [
                "type" => "folder",
                "name" => $file,
                "path" => $fullPath,
                "files" => scanDirectory($fullPath)
            ];
        } else {
            $result[] = [
                "type" => "file",
                "name" => $file,
                "path" => $fullPath
            ];
        }
    }
    return $result;
}

function encryptData($data) {
    $key = "fetch_files.php"; // Encryption key (must match JS)
    $output = "";
    for ($i = 0; $i < strlen($data); $i++) {
        $output .= chr(ord($data[$i]) ^ ord($key[$i % strlen($key)]));
    }
    return base64_encode($output); // Only encode in Base64 once
}
?>
