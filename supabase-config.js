/**
 * Supabase Configuration for EventPass
 * 
 * วิธีการนำค่ามาใส่:
 * 1. ไปที่แดชบอร์ด Supabase (https://supabase.com/dashboard)
 * 2. เลือกโปรเจกต์ของคุณ -> ไปที่รูปฟันเฟืองด้านซ้ายล่าง (Project Settings)
 * 3. คลิกเมนู 'API'
 * 4. คัดลอกค่า Project URL มาใส่ที่ SUPABASE_URL
 * 5. คัดลอกค่า 'anon' public key มาใส่ที่ SUPABASE_ANON_KEY
 */

const SUPABASE_CONFIG = {
  // ใส่ Project URL ของคุณที่นี่ (ตัวอย่าง: https://abcdefghijklm.supabase.co)
  url: "",
  
  // ใส่ anon public key ของคุณที่นี่ (ตัวอย่าง: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
  anonKey: ""
};

// Initialize Supabase Client if credentials are provided
let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log("✅ Supabase Connected Successfully!");
  } catch (err) {
    console.warn("⚠️ Supabase initialization failed, falling back to local mode:", err);
  }
} else {
  console.log("ℹ️ Running in Local Mode (กรุณากรอก Supabase URL & Anon Key เพื่อเชื่อมต่อฐานข้อมูลคลาวด์)");
}
