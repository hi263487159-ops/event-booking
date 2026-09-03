-- ==========================================================
-- EventPass Database Schema
-- Database Name: event_booking_db
-- Compatible with MySQL / MariaDB (phpMyAdmin in XAMPP)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `event_booking_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `event_booking_db`;

-- 1. ตารางผู้ใช้งาน / ผู้ดูแลระบบ (Users & Admins)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'organizer', 'attendee') DEFAULT 'attendee',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- บัญชี Admin เริ่มต้น (รหัสผ่าน: admin123)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Admin Organizer', 'admin@eventpass.local', '$2y$10$w0jZlY2i79Q5M2Pq7yO3s.B37Gg5qUe8kU6qQ9Vl.J6VpZ4T3x9ea', 'admin')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 2. ตารางกิจกรรม / อีเวนต์ (Events)
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NULL,
  `event_date` DATE NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `price` VARCHAR(100) DEFAULT 'ฟรีไม่มีค่าใช้จ่าย',
  `status` ENUM('published', 'draft', 'closed') DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ข้อมูลกิจกรรมตัวอย่าง
INSERT INTO `events` (`id`, `title`, `category`, `description`, `image_url`, `event_date`, `location`, `price`) VALUES
(1, 'AI & Modern Tech Summit 2026', 'เทคโนโลยี', 'งานสัมมนาเจาะลึกปัญญาประดิษฐ์และเทคโนโลยีแห่งอนาคต พบกับวิทยากรระดับแนวหน้าจากองค์กรชั้นนำ', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', '2026-09-15', 'True Digital Park, Grand Hall ชั้น 3 กรุงเทพฯ', 'ฟรีไม่มีค่าใช้จ่าย'),
(2, 'Hands-on UI/UX & Design Systems Workshop', 'เวิร์กช็อป', 'เวิร์กช็อปเชิงปฏิบัติการสร้าง Design System ตั้งแต่ศูนย์จนถึงระดับโปรดักชัน พร้อมทดลองใช้งานกับทีมจริง', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', '2026-09-22', 'TCDC Charoenkrung (ศูนย์สร้างสรรค์งานออกแบบ)', 'ฟรีไม่มีค่าใช้จ่าย'),
(3, 'Indie Music Under The Stars Concert', 'คอนเสิร์ต', 'เทศกาลดนตรีอะคูสติกยามเย็นกลางสวนสวย ฟังเพลงสบายๆ จากศิลปินอินดี้ชื่อดังในบรรยากาศสุดชิล', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', '2026-09-28', 'สวนป่าเบญจกิติ ลานกิจกรรมกลางแจ้ง', 'ฟรีไม่มีค่าใช้จ่าย')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 3. ตารางรอบเวลาและโควตาที่นั่ง (Event Slots)
CREATE TABLE IF NOT EXISTS `event_slots` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_id` INT NOT NULL,
  `time_slot` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL DEFAULT 50,
  `booked` INT NOT NULL DEFAULT 0,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `event_slots` (`id`, `event_id`, `time_slot`, `capacity`, `booked`) VALUES
(1, 1, '09:00 - 12:00 น. (รอบเช้า)', 60, 42),
(2, 1, '13:30 - 16:30 น. (รอบบ่าย)', 60, 58),
(3, 2, '10:00 - 16:00 น. (เต็มวัน)', 30, 28),
(4, 3, '17:30 - 21:30 น.', 150, 95)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 4. ตารางบันทึกการจอง (Bookings)
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_code` VARCHAR(50) NOT NULL UNIQUE,
  `event_id` INT NOT NULL,
  `slot_id` INT NOT NULL,
  `guest_name` VARCHAR(150) NOT NULL,
  `guest_email` VARCHAR(150) NOT NULL,
  `guest_phone` VARCHAR(50) NOT NULL,
  `seats` INT NOT NULL DEFAULT 1,
  `checked_in` TINYINT(1) NOT NULL DEFAULT 0,
  `checked_in_at` DATETIME NULL,
  `booked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`slot_id`) REFERENCES `event_slots`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `bookings` (`id`, `booking_code`, `event_id`, `slot_id`, `guest_name`, `guest_email`, `guest_phone`, `seats`, `checked_in`) VALUES
(1, 'EVT-2609-1001', 1, 1, 'สมชาย ใจดี', 'somchai@example.com', '081-234-5678', 2, 0),
(2, 'EVT-2609-1002', 3, 4, 'กานดา สดใส', 'kanda@example.com', '089-876-5432', 1, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;
