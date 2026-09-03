<?php
/**
 * Database Connection using PDO
 * Compatible with XAMPP MySQL Default Settings
 */

$db_host = '127.0.0.1';
$db_name = 'event_booking_db';
$db_user = 'root';
$db_pass = ''; // Default XAMPP password is empty

try {
    $pdo = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    // If running in client-side mode or database not yet imported
    // Return graceful notice
}
