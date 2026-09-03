/**
 * Supabase Configuration for EventPass
 */

const SUPABASE_CONFIG = {
  url: "https://ajfizmqkzompbjorbehg.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZml6bXFrem9tcGJqb3JiZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzMTk5OTMsImV4cCI6MjEwMzg5NTk5M30.u4ibmOruq3g7wJgbm_tHecaV9pWb0O2dMzYPw-Do-C0"
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
