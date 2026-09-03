# EventPass - เว็บไซต์ระบบจองวันกิจกรรมและงานอีเวนต์ออนไลน์

โปรเจกต์ระบบจองวันกิจกรรม สัมมนา และงานอีเวนต์ (Lab 11 Web Application Development)
รองรับทั้งการใช้งานทั่วไปบนเบราว์เซอร์, การเชื่อมต่อฐานข้อมูล **Supabase (PostgreSQL)** และการ Deploy ผ่าน **Vercel**

---

## 🌟 คุณสมบัติเด่นของระบบ
- **Event Catalog & Capacity Tracker**: ดูรายการกิจกรรม พร้อมแถบแสดงโควตาที่นั่งคงเหลือแบบเรียลไทม์
- **Interactive Calendar**: ปฏิทินรายเดือน แสดงกิจกรรมและรอบเวลา
- **Booking Flow**: เลือกรอบเวลา, ระบุจำนวนที่นั่ง (1-5 ที่นั่ง), บันทึกข้อมูลและป้องกัน Overbooking
- **E-Ticket & QR Code**: ออกตั๋วอิเล็กทรอนิกส์พร้อมรหัสการจองและ QR Code สแกนเข้างาน
- **Search Booking (Ticket Lookup)**: ค้นหาบัตรตั๋วย้อนหลังด้วยรหัสการจองหรืออีเมล
- **Organizer / Admin Desk**:
  - ล็อกอินด้วยรหัสผ่านผู้ดูแลระบบ (รหัสผ่านเริ่มต้น: `admin123`)
  - ตารางรายชื่อผู้จอง พร้อมปุ่มเช็กชื่อเข้างาน (Check-in)
  - สร้างกิจกรรมใหม่และกำหนดรอบเวลา
  - ส่งออกรายชื่อผู้เข้าร่วมเป็นไฟล์ CSV

---

## 🚀 วิธีการเปิดใช้งานบนเครื่อง (Local)
1. ดับเบิลคลิกเปิดไฟล์ `index.html` หรือ `lap11.html` บนเบราว์เซอร์ (Chrome, Edge)
2. หรือรันผ่าน XAMPP: นำโฟลเดอร์นี้วางใน `c:/xampp/htdocs/` แล้วเปิด `http://localhost/TanakriT7/index.html`

---

## ☁️ การเชื่อมต่อกับฐานข้อมูล Supabase
1. นำคำสั่งจากไฟล์ `supabase_schema.sql` ไปรันใน **SQL Editor** บนแดชบอร์ด Supabase
2. นำค่า **Project URL** และ **Anon Public Key** จาก *Project Settings -> API* ไปใส่ในไฟล์ `supabase-config.js`
3. ระบบจะซิงก์ข้อมูลกิจกรรมและการจองกับคลาวด์ Supabase โดยอัตโนมัติ

---

## 🌐 การ Deploy ขึ้น Vercel
1. Push โค้ดขึ้น GitHub Repository
2. เข้าสู่เว็บไซต์ [Vercel](https://vercel.com) แล้วล็อกอินด้วย GitHub
3. กด **Add New...** -> **Project** -> เลือก Repository นี้ แล้วกด **Deploy**
