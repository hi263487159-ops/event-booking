/**
 * EventPass - Event & Activity Booking System
 * Main JavaScript Controller with Supabase & LocalStorage Support
 */

// Initial Seed Data for Events
const DEFAULT_EVENTS = [
  {
    id: 1,
    title: "AI & Modern Tech Summit 2026",
    category: "เทคโนโลยี",
    description: "งานสัมมนาเจาะลึกปัญญาประดิษฐ์และเทคโนโลยีแห่งอนาคต พบกับวิทยากรระดับแนวหน้าจากองค์กรชั้นนำ",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-15",
    location: "True Digital Park, Grand Hall ชั้น 3 กรุงเทพฯ",
    price: "ฟรีไม่มีค่าใช้จ่าย",
    slots: [
      { id: 101, time: "09:00 - 12:00 น. (รอบเช้า)", capacity: 60, booked: 42 },
      { id: 102, time: "13:30 - 16:30 น. (รอบบ่าย)", capacity: 60, booked: 58 }
    ]
  },
  {
    id: 2,
    title: "Hands-on UI/UX & Design Systems Workshop",
    category: "เวิร์กช็อป",
    description: "เวิร์กช็อปเชิงปฏิบัติการสร้าง Design System ตั้งแต่ศูนย์จนถึงระดับโปรดักชัน พร้อมทดลองใช้งานกับทีมจริง",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-22",
    location: "TCDC Charoenkrung (ศูนย์สร้างสรรค์งานออกแบบ)",
    price: "ฟรีไม่มีค่าใช้จ่าย",
    slots: [
      { id: 201, time: "10:00 - 16:00 น. (เต็มวัน)", capacity: 30, booked: 28 }
    ]
  },
  {
    id: 3,
    title: "Indie Music Under The Stars Concert",
    category: "คอนเสิร์ต",
    description: "เทศกาลดนตรีอะคูสติกยามเย็นกลางสวนสวย ฟังเพลงสบายๆ จากศิลปินอินดี้ชื่อดังในบรรยากาศสุดชิล",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-28",
    location: "สวนป่าเบญจกิติ ลานกิจกรรมกลางแจ้ง",
    price: "ฟรีไม่มีค่าใช้จ่าย",
    slots: [
      { id: 301, time: "17:30 - 21:30 น.", capacity: 150, booked: 95 }
    ]
  },
  {
    id: 4,
    title: "StartUp Pitching & Investor Networking Night",
    category: "ธุรกิจ",
    description: "เวทีนำเสนอผลงานของสตาร์ทอัพดาวรุ่ง พร้อมเปิดโอกาสเชื่อมโยงเครือข่ายและพบปะนักลงทุน Angel Investors",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    date: "2026-10-05",
    location: "Gaysorn Urban Resort, ชั้น 19 กรุงเทพฯ",
    price: "ฟรีไม่มีค่าใช้จ่าย",
    slots: [
      { id: 401, time: "18:00 - 21:00 น.", capacity: 45, booked: 45 }
    ]
  },
  {
    id: 5,
    title: "Street & Cinematic Photography Masterclass",
    category: "ศิลปะ",
    description: "เรียนรู้เทคนิคการถ่ายภาพสตรีท การจัดองค์ประกอบ และการควบคุมแสง พร้อมลงพื้นที่ถ่ายจริงย่านเมืองเก่า",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80",
    date: "2026-10-12",
    location: "หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร (BACC)",
    price: "ฟรีไม่มีค่าใช้จ่าย",
    slots: [
      { id: 501, time: "09:30 - 15:30 น.", capacity: 25, booked: 14 }
    ]
  }
];

// Initial Seed Data for Bookings
const DEFAULT_BOOKINGS = [
  {
    id: 1,
    bookingCode: "EVT-2609-1001",
    eventId: 1,
    eventTitle: "AI & Modern Tech Summit 2026",
    slotTime: "09:00 - 12:00 น. (รอบเช้า)",
    eventDate: "2026-09-15",
    guestName: "สมชาย ใจดี",
    guestEmail: "somchai@example.com",
    guestPhone: "081-234-5678",
    seats: 2,
    status: "confirmed",
    checkedIn: false,
    bookedAt: "2026-09-01 10:30"
  },
  {
    id: 2,
    bookingCode: "EVT-2609-1002",
    eventId: 3,
    eventTitle: "Indie Music Under The Stars Concert",
    slotTime: "17:30 - 21:30 น.",
    eventDate: "2026-09-28",
    guestName: "กานดา สดใส",
    guestEmail: "kanda@example.com",
    guestPhone: "089-876-5432",
    seats: 1,
    status: "confirmed",
    checkedIn: true,
    checkedInAt: "2026-09-02 14:15",
    bookedAt: "2026-09-02 11:20"
  }
];

// App State Management
class EventApp {
  constructor() {
    this.events = this.loadData("ep_events", DEFAULT_EVENTS);
    this.bookings = this.loadData("ep_bookings", DEFAULT_BOOKINGS);
    this.currentFilterCategory = "ทั้งหมด";
    this.currentSearchTerm = "";
    this.currentSortDate = "all";
    this.currentViewMode = "grid"; // 'grid' or 'calendar'
    this.currentCalDate = new Date(2026, 8, 1); // Sept 2026
    this.isAdmin = false;
    this.selectedEventForBooking = null;
    this.selectedSlotId = null;

    this.init();
  }

  loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveData(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  async init() {
    this.bindEvents();
    this.renderStats();
    this.renderEvents();
    this.renderCalendar();

    // Check if connected to Supabase and load live data
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      await this.syncFromSupabase();
    }
  }

  async syncFromSupabase() {
    try {
      // 1. Fetch Events
      const { data: eventsData, error: evError } = await supabaseClient
        .from('events')
        .select('*, event_slots(*)');

      if (!evError && eventsData && eventsData.length > 0) {
        this.events = eventsData.map(e => ({
          id: e.id,
          title: e.title,
          category: e.category,
          description: e.description,
          image: e.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
          date: e.event_date,
          location: e.location,
          price: e.price,
          slots: (e.event_slots || []).map(s => ({
            id: s.id,
            time: s.time_slot,
            capacity: s.capacity,
            booked: s.booked
          }))
        }));
      }

      // 2. Fetch Bookings
      const { data: bookingsData, error: bkError } = await supabaseClient
        .from('bookings')
        .select('*')
        .order('booked_at', { ascending: false });

      if (!bkError && bookingsData) {
        this.bookings = bookingsData.map(b => ({
          id: b.id,
          bookingCode: b.booking_code,
          eventId: b.event_id,
          slotId: b.slot_id,
          guestName: b.guest_name,
          guestEmail: b.guest_email,
          guestPhone: b.guest_phone,
          seats: b.seats,
          status: "confirmed",
          checkedIn: b.checked_in,
          checkedInAt: b.checked_in_at ? new Date(b.checked_in_at).toLocaleTimeString("th-TH") : null,
          bookedAt: b.booked_at ? new Date(b.booked_at).toLocaleString("th-TH") : "",
          eventTitle: this.events.find(e => e.id === b.event_id)?.title || "กิจกรรม",
          slotTime: "รอบเวลา",
          eventDate: this.events.find(e => e.id === b.event_id)?.date || ""
        }));
      }

      this.renderStats();
      this.renderEvents();
      if (this.currentViewMode === "calendar") this.renderCalendar();
      if (this.isAdmin) this.renderAdminDashboard();
      this.showToast("☁️ เชื่อมต่อและดึงข้อมูลจาก Supabase สำเร็จ", "info");
    } catch (err) {
      console.warn("Could not sync from Supabase:", err);
    }
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.currentSearchTerm = e.target.value.toLowerCase().trim();
        this.renderEvents();
      });
    }

    // Category pills
    document.querySelectorAll(".cat-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentFilterCategory = pill.getAttribute("data-cat");
        this.renderEvents();
      });
    });

    // Date select filter
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
      dateFilter.addEventListener("change", (e) => {
        this.currentSortDate = e.target.value;
        this.renderEvents();
      });
    }

    // View toggles (Grid vs Calendar)
    const btnGridView = document.getElementById("btnGridView");
    const btnCalendarView = document.getElementById("btnCalendarView");
    if (btnGridView && btnCalendarView) {
      btnGridView.addEventListener("click", () => this.switchView("grid"));
      btnCalendarView.addEventListener("click", () => this.switchView("calendar"));
    }

    // Calendar navigation
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    if (prevMonthBtn && nextMonthBtn) {
      prevMonthBtn.addEventListener("click", () => {
        this.currentCalDate.setMonth(this.currentCalDate.getMonth() - 1);
        this.renderCalendar();
      });
      nextMonthBtn.addEventListener("click", () => {
        this.currentCalDate.setMonth(this.currentCalDate.getMonth() + 1);
        this.renderCalendar();
      });
    }

    // Admin toggle button
    const adminToggleBtn = document.getElementById("adminToggleBtn");
    if (adminToggleBtn) {
      adminToggleBtn.addEventListener("click", () => this.handleAdminToggle());
    }

    // My Booking lookup modal button
    const myBookingsBtn = document.getElementById("myBookingsBtn");
    if (myBookingsBtn) {
      myBookingsBtn.addEventListener("click", () => this.openLookupModal());
    }

    // Close modals when clicking backdrop or close buttons
    document.querySelectorAll(".close-btn, .modal-overlay").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target === el) {
          this.closeAllModals();
        }
      });
    });

    // Booking form submit
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => this.handleBookingSubmit(e));
    }

    // Lookup form submit
    const lookupForm = document.getElementById("lookupForm");
    if (lookupForm) {
      lookupForm.addEventListener("submit", (e) => this.handleLookupSubmit(e));
    }

    // Add Event Form (Admin)
    const addEventForm = document.getElementById("addEventForm");
    if (addEventForm) {
      addEventForm.addEventListener("submit", (e) => this.handleCreateEvent(e));
    }
  }

  renderStats() {
    const totalEventsEl = document.getElementById("statTotalEvents");
    const totalBookedEl = document.getElementById("statTotalBooked");
    const totalSeatsEl = document.getElementById("statTotalSeats");

    let totalCapacity = 0;
    let totalBooked = 0;

    this.events.forEach((ev) => {
      (ev.slots || []).forEach((s) => {
        totalCapacity += s.capacity || 0;
        totalBooked += s.booked || 0;
      });
    });

    if (totalEventsEl) totalEventsEl.textContent = this.events.length;
    if (totalBookedEl) totalBookedEl.textContent = this.bookings.length;
    if (totalSeatsEl) totalSeatsEl.textContent = `${totalBooked} / ${totalCapacity}`;
  }

  renderEvents() {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    const filtered = this.events.filter((ev) => {
      const matchCat =
        this.currentFilterCategory === "ทั้งหมด" || ev.category === this.currentFilterCategory;
      const matchSearch =
        ev.title.toLowerCase().includes(this.currentSearchTerm) ||
        ev.location.toLowerCase().includes(this.currentSearchTerm) ||
        ev.description.toLowerCase().includes(this.currentSearchTerm);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
          <i class="fa-regular fa-calendar-xmark" style="font-size: 3rem; margin-bottom: 12px; color: var(--text-subtle);"></i>
          <p style="font-size: 1.1rem; font-weight: 600;">ไม่พบกิจกรรมที่ตรงกับเงื่อนไขการค้นหา</p>
          <p style="font-size: 0.9rem;">ลองเปลี่ยนคำค้นหาหรือตัวกรองหมวดหมู่อีกครั้ง</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((ev) => {
        const slots = ev.slots || [];
        const totalCapacity = slots.reduce((sum, s) => sum + (s.capacity || 0), 0);
        const totalBooked = slots.reduce((sum, s) => sum + (s.booked || 0), 0);
        const remaining = totalCapacity - totalBooked;
        const percentage = totalCapacity > 0 ? Math.min(100, Math.round((totalBooked / totalCapacity) * 100)) : 0;

        let statusBadge = `<span class="event-status-badge status-open"><i class="fa-solid fa-circle-check"></i> เปิดรับจอง</span>`;
        let barClass = "bar-safe";
        let isFull = remaining <= 0;

        if (isFull) {
          statusBadge = `<span class="event-status-badge status-full"><i class="fa-solid fa-ban"></i> ที่นั่งเต็มแล้ว</span>`;
          barClass = "bar-danger";
        } else if (remaining <= 10) {
          statusBadge = `<span class="event-status-badge status-limited"><i class="fa-solid fa-fire"></i> ใกล้เต็ม (${remaining} ที่นั่ง)</span>`;
          barClass = "bar-warning";
        }

        const dateFormatted = this.formatThaiDate(ev.date);

        return `
        <article class="event-card">
          <div class="event-image-container">
            <img src="${ev.image}" alt="${ev.title}" class="event-image" loading="lazy" />
            <span class="event-category-badge">${ev.category}</span>
            ${statusBadge}
          </div>
          <div class="event-content">
            <div class="event-date-chip">
              <i class="fa-regular fa-calendar"></i>
              <span>${dateFormatted}</span>
            </div>
            <h3 class="event-title">${ev.title}</h3>
            <p class="event-desc">${ev.description}</p>
            
            <div class="event-meta">
              <div class="meta-row">
                <i class="fa-solid fa-location-dot"></i>
                <span>${ev.location}</span>
              </div>
              <div class="meta-row">
                <i class="fa-solid fa-clock"></i>
                <span>มี ${slots.length} รอบเวลาให้เลือก</span>
              </div>
            </div>

            <div class="capacity-container">
              <div class="capacity-header">
                <span style="color: var(--text-muted)">จำนวนที่นั่งจองแล้ว</span>
                <span style="font-weight: 600; color: ${isFull ? 'var(--danger)' : 'var(--text-main)'}">
                  ${totalBooked} / ${totalCapacity} (${percentage}%)
                </span>
              </div>
              <div class="capacity-progress">
                <div class="capacity-bar ${barClass}" style="width: ${percentage}%"></div>
              </div>
            </div>

            <div class="event-actions">
              <button class="btn btn-outline" onclick="window.app.openEventDetailModal(${ev.id})">
                <i class="fa-solid fa-circle-info"></i> รายละเอียด
              </button>
              <button class="btn btn-primary ${isFull ? 'btn-disabled' : ''}" 
                ${isFull ? 'disabled' : ''} 
                onclick="window.app.openBookingModal(${ev.id})">
                <i class="fa-solid fa-ticket"></i> ${isFull ? 'ที่นั่งเต็ม' : 'จองที่นั่ง'}
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  renderCalendar() {
    const calGrid = document.getElementById("calendarGrid");
    const calTitle = document.getElementById("calMonthYear");
    if (!calGrid || !calTitle) return;

    const year = this.currentCalDate.getFullYear();
    const month = this.currentCalDate.getMonth();

    const monthNamesThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    calTitle.textContent = `${monthNamesThai[month]} ${year + 543}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayDate = new Date(year, month + 1, 0).getDate();

    let html = "";
    const dayLabels = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    dayLabels.forEach((d) => {
      html += `<div class="cal-day-name">${d}</div>`;
    });

    // Empty cells for previous month
    for (let i = 0; i < firstDayIndex; i++) {
      html += `<div class="cal-day-cell" style="opacity: 0.2"></div>`;
    }

    const todayStr = new Date().toISOString().slice(0, 10);

    for (let day = 1; day <= lastDayDate; day++) {
      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateKey = `${year}-${monthStr}-${dayStr}`;

      const isToday = dateKey === todayStr;
      const dayEvents = this.events.filter((e) => e.date === dateKey);

      let eventsHtml = dayEvents
        .map(
          (e) => `
          <div class="cal-event-pill" title="${e.title}" onclick="window.app.openEventDetailModal(${e.id})">
            • ${e.title}
          </div>
        `
        )
        .join("");

      html += `
        <div class="cal-day-cell ${isToday ? 'today' : ''}">
          <span class="cal-day-num">${day}</span>
          ${eventsHtml}
        </div>
      `;
    }

    calGrid.innerHTML = html;
  }

  switchView(mode) {
    this.currentViewMode = mode;
    const gridEl = document.getElementById("eventsGridContainer");
    const calEl = document.getElementById("calendarViewContainer");
    const btnGrid = document.getElementById("btnGridView");
    const btnCal = document.getElementById("btnCalendarView");

    if (mode === "grid") {
      gridEl.style.display = "block";
      calEl.style.display = "none";
      btnGrid.classList.add("active");
      btnCal.classList.remove("active");
    } else {
      gridEl.style.display = "none";
      calEl.style.display = "block";
      btnGrid.classList.remove("active");
      btnCal.classList.add("active");
      this.renderCalendar();
    }
  }

  openEventDetailModal(eventId) {
    const ev = this.events.find((e) => e.id === eventId);
    if (!ev) return;

    const modalBody = document.getElementById("eventDetailBody");
    const modalTitle = document.getElementById("eventDetailTitle");
    modalTitle.textContent = ev.title;

    const slots = ev.slots || [];
    const totalCapacity = slots.reduce((sum, s) => sum + (s.capacity || 0), 0);
    const totalBooked = slots.reduce((sum, s) => sum + (s.booked || 0), 0);
    const remaining = totalCapacity - totalBooked;

    let slotsHtml = slots
      .map((slot) => {
        const slotRemaining = slot.capacity - slot.booked;
        const isSlotFull = slotRemaining <= 0;
        return `
        <div style="background: var(--bg-main); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600; font-size: 0.95rem;">${slot.time}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">ความจุ ${slot.capacity} ที่นั่ง</div>
          </div>
          <span style="font-size: 0.85rem; font-weight: 600; color: ${isSlotFull ? 'var(--danger)' : 'var(--success)'}">
            ${isSlotFull ? 'เต็มแล้ว' : `ว่าง ${slotRemaining} ที่`}
          </span>
        </div>
      `;
      })
      .join("");

    modalBody.innerHTML = `
      <img src="${ev.image}" alt="${ev.title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 18px;" />
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <span class="event-category-badge" style="position: static;">${ev.category}</span>
        <span style="padding: 5px 12px; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.2); color: #a5b4fc; font-size: 0.8rem;">
          <i class="fa-regular fa-calendar"></i> ${this.formatThaiDate(ev.date)}
        </span>
      </div>
      <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 18px;">${ev.description}</p>
      
      <div style="margin-bottom: 18px; padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); font-size: 0.9rem;">
        <div style="margin-bottom: 6px;"><strong style="color: var(--secondary);"><i class="fa-solid fa-location-dot"></i> สถานที่:</strong> ${ev.location}</div>
        <div><strong style="color: var(--accent);"><i class="fa-solid fa-tag"></i> อัตราค่าบริการ:</strong> ${ev.price}</div>
      </div>

      <h4 style="font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-clock"></i> รอบเวลาและที่นั่งคงเหลือ:</h4>
      ${slotsHtml}

      <div style="margin-top: 24px; text-align: right;">
        <button class="btn btn-primary" ${remaining <= 0 ? 'disabled' : ''} onclick="window.app.openBookingModal(${ev.id})">
          <i class="fa-solid fa-ticket"></i> ${remaining <= 0 ? 'ที่นั่งเต็มแล้ว' : 'ไปที่หน้าจองที่นั่ง'}
        </button>
      </div>
    `;

    this.openModal("eventDetailModal");
  }

  openBookingModal(eventId) {
    this.closeAllModals();
    const ev = this.events.find((e) => e.id === eventId);
    if (!ev) return;

    this.selectedEventForBooking = ev;
    this.selectedSlotId = null;

    document.getElementById("bookingEventTitle").textContent = ev.title;
    document.getElementById("bookingEventDate").textContent = this.formatThaiDate(ev.date);

    const slotsContainer = document.getElementById("bookingSlotsList");
    slotsContainer.innerHTML = (ev.slots || [])
      .map((s) => {
        const remaining = s.capacity - s.booked;
        const isFull = remaining <= 0;
        return `
        <div class="slot-card ${isFull ? 'full' : ''}" data-slot-id="${s.id}" onclick="window.app.selectSlot(${s.id})">
          <div class="slot-time">
            <i class="fa-regular fa-clock" style="color: var(--secondary); margin-right: 6px;"></i>
            ${s.time}
          </div>
          <div class="slot-spots" style="color: ${isFull ? 'var(--danger)' : 'var(--success)'}">
            ${isFull ? 'ที่นั่งเต็ม' : `ว่าง ${remaining} ที่นั่ง`}
          </div>
        </div>
      `;
      })
      .join("");

    // Reset Form fields
    document.getElementById("bookingForm").reset();
    this.openModal("bookingModal");
  }

  selectSlot(slotId) {
    const ev = this.selectedEventForBooking;
    const slot = (ev.slots || []).find((s) => s.id === slotId);
    if (!slot || slot.capacity - slot.booked <= 0) return;

    this.selectedSlotId = slotId;
    document.querySelectorAll(".slot-card").forEach((card) => {
      card.classList.remove("selected");
      if (parseInt(card.getAttribute("data-slot-id")) === slotId) {
        card.classList.add("selected");
      }
    });
  }

  async handleBookingSubmit(e) {
    e.preventDefault();

    if (!this.selectedSlotId) {
      this.showToast("กรุณาเลือกรอบเวลาที่ต้องการจองก่อนดำเนินการ", "error");
      return;
    }

    const ev = this.selectedEventForBooking;
    const slot = (ev.slots || []).find((s) => s.id === this.selectedSlotId);
    const seatsRequested = parseInt(document.getElementById("bookSeats").value) || 1;

    const remaining = slot.capacity - slot.booked;
    if (seatsRequested > remaining) {
      this.showToast(`ขออภัย รอบเวลานี้เหลือเพียง ${remaining} ที่นั่ง ไม่เพียงพอกับจำนวนที่ระบุ`, "error");
      return;
    }

    const guestName = document.getElementById("bookName").value.trim();
    const guestEmail = document.getElementById("bookEmail").value.trim();
    const guestPhone = document.getElementById("bookPhone").value.trim();

    // Generate unique code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `EVT-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}-${randomSuffix}`;

    const newBooking = {
      id: Date.now(),
      bookingCode: bookingCode,
      eventId: ev.id,
      eventTitle: ev.title,
      slotId: slot.id,
      slotTime: slot.time,
      eventDate: ev.date,
      location: ev.location,
      guestName: guestName,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
      seats: seatsRequested,
      status: "confirmed",
      checkedIn: false,
      bookedAt: new Date().toLocaleString("th-TH")
    };

    // Update in local state
    slot.booked += seatsRequested;
    this.bookings.unshift(newBooking);
    this.saveData("ep_events", this.events);
    this.saveData("ep_bookings", this.bookings);

    // If Supabase is connected, write to Supabase
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        await supabaseClient.from('bookings').insert({
          booking_code: bookingCode,
          event_id: ev.id,
          slot_id: slot.id,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          seats: seatsRequested,
          checked_in: false
        });

        await supabaseClient
          .from('event_slots')
          .update({ booked: slot.booked })
          .eq('id', slot.id);
      } catch (err) {
        console.warn("Supabase insert error:", err);
      }
    }

    // Update views
    this.renderStats();
    this.renderEvents();
    if (this.currentViewMode === "calendar") this.renderCalendar();

    this.closeAllModals();
    this.showToast("🎉 จองที่นั่งสำเร็จแล้ว! บัตรเข้าร่วมงานของคุณพร้อมแล้ว", "success");
    this.showTicketModal(newBooking);
  }

  showTicketModal(booking) {
    const modal = document.getElementById("ticketModal");
    const container = document.getElementById("ticketDetailsContainer");

    const qrData = encodeURIComponent(`EVENTPASS|${booking.bookingCode}|${booking.guestName}|${booking.eventTitle}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

    container.innerHTML = `
      <div class="ticket-wrapper" id="printableTicket">
        <div class="ticket-header">
          <div class="ticket-brand">
            <i class="fa-solid fa-ticket"></i> EVENTPASS E-TICKET
          </div>
          <div class="ticket-code">${booking.bookingCode}</div>
        </div>
        <div class="ticket-content">
          <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #fff;">${booking.eventTitle}</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px; font-size: 0.9rem;">
            <div>
              <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">ชื่อผู้จอง</span>
              <strong style="color: #fff;">${booking.guestName}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">จำนวนที่นั่ง</span>
              <strong style="color: var(--secondary);">${booking.seats} ที่นั่ง</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">วันที่จัดกิจกรรม</span>
              <strong style="color: #fff;">${this.formatThaiDate(booking.eventDate)}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">รอบเวลา</span>
              <strong style="color: #fff;">${booking.slotTime}</strong>
            </div>
          </div>

          <div style="margin-top: 14px; font-size: 0.85rem; color: var(--text-muted);">
            <i class="fa-solid fa-location-dot" style="color: var(--secondary);"></i> ${booking.location || 'ดูตามรายละเอียดกิจกรรม'}
          </div>

          <div class="ticket-perforated"></div>

          <div class="ticket-qr-section">
            <div class="qr-code-box">
              <img src="${qrUrl}" alt="QR Code Ticket" style="width: 100%; height: 100%;" />
            </div>
            <div class="qr-hint">สแกนรหัสนี้ที่โต๊ะลงทะเบียนหน้างานเพื่อเช็กอิน</div>
            <div style="font-family: monospace; font-size: 0.85rem; color: #64748b; margin-top: 4px;">Ref: ${booking.bookingCode}</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button class="btn btn-outline" style="flex: 1;" onclick="window.print()">
          <i class="fa-solid fa-print"></i> พิมพ์ / บันทึก PDF
        </button>
        <button class="btn btn-primary" style="flex: 1;" onclick="window.app.closeAllModals()">
          <i class="fa-solid fa-check"></i> ตกลง
        </button>
      </div>
    `;

    this.openModal("ticketModal");
  }

  openLookupModal() {
    document.getElementById("lookupForm").reset();
    document.getElementById("lookupResult").innerHTML = "";
    this.openModal("lookupModal");
  }

  handleLookupSubmit(e) {
    e.preventDefault();
    const query = document.getElementById("lookupQuery").value.trim().toLowerCase();
    const resultBox = document.getElementById("lookupResult");

    const found = this.bookings.filter(
      (b) =>
        (b.bookingCode && b.bookingCode.toLowerCase() === query) ||
        (b.guestEmail && b.guestEmail.toLowerCase() === query) ||
        (b.guestPhone && b.guestPhone.includes(query))
    );

    if (found.length === 0) {
      resultBox.innerHTML = `
        <div style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #fca5a5; font-size: 0.9rem; text-align: center;">
          <i class="fa-solid fa-circle-exclamation"></i> ไม่พบข้อมูลการจองตามรหัสหรืออีเมลที่ระบุ
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <div style="margin-top: 14px; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">
        พบประวัติการจองทั้งหมด ${found.length} รายการ:
      </div>
      ${found
        .map(
          (b) => `
        <div style="background: var(--bg-main); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; color: #fff;">${b.eventTitle}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">รหัส: <span style="color: #38bdf8; font-family: monospace;">${b.bookingCode}</span> | ${b.seats} ที่นั่ง</div>
            <div style="font-size: 0.8rem; color: var(--text-subtle);">${b.eventDate} (${b.slotTime})</div>
          </div>
          <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="window.app.showTicketModal(${JSON.stringify(b).replace(/"/g, '&quot;')})">
            <i class="fa-solid fa-qrcode"></i> ดูบัตร
          </button>
        </div>
      `
        )
        .join("")}
    `;
  }

  handleAdminToggle() {
    if (this.isAdmin) {
      this.isAdmin = false;
      document.getElementById("adminViewSection").style.display = "none";
      document.getElementById("adminToggleBtn").innerHTML = `<i class="fa-solid fa-shield-halved"></i> ผู้จัดงาน / Admin`;
      this.showToast("ออกจากระบบผู้ดูแลแล้ว", "info");
      return;
    }

    const password = prompt("กรุณาระบุรหัสผ่านสำหรับผู้จัดงาน (รหัสผ่านเริ่มต้น: admin123):");
    if (password === "admin123") {
      this.isAdmin = true;
      document.getElementById("adminViewSection").style.display = "block";
      document.getElementById("adminToggleBtn").innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> ออกจาก Admin`;
      this.renderAdminDashboard();
      this.showToast("เข้าสู่โหมดผู้ดูแลระบบสำเร็จ!", "success");
      document.getElementById("adminViewSection").scrollIntoView({ behavior: "smooth" });
    } else if (password !== null) {
      this.showToast("รหัสผ่านไม่ถูกต้อง", "error");
    }
  }

  renderAdminDashboard() {
    const tableBody = document.getElementById("adminAttendeesTableBody");
    if (!tableBody) return;

    if (this.bookings.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">ยังไม่มีข้อมูลการจองในระบบ</td></tr>`;
      return;
    }

    tableBody.innerHTML = this.bookings
      .map(
        (b) => `
      <tr>
        <td><span style="font-family: monospace; font-weight: 600; color: #38bdf8;">${b.bookingCode}</span></td>
        <td>
          <div style="font-weight: 600;">${b.guestName}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${b.guestPhone} | ${b.guestEmail}</div>
        </td>
        <td>
          <div style="font-weight: 500;">${b.eventTitle}</div>
          <div style="font-size: 0.78rem; color: var(--text-subtle);">${b.eventDate} (${b.slotTime})</div>
        </td>
        <td style="text-align: center;">${b.seats}</td>
        <td>
          ${
            b.checkedIn
              ? `<span class="badge-tag badge-success"><i class="fa-solid fa-check"></i> เช็กอินแล้ว (${b.checkedInAt || 'วันนี้'})</span>`
              : `<span class="badge-tag badge-pending"><i class="fa-solid fa-hourglass-half"></i> รอเข้างาน</span>`
          }
        </td>
        <td>
          ${
            b.checkedIn
              ? `<button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.app.toggleCheckIn('${b.bookingCode}', false)">ยกเลิกเช็กอิน</button>`
              : `<button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.app.toggleCheckIn('${b.bookingCode}', true)"><i class="fa-solid fa-user-check"></i> เช็กอิน</button>`
          }
        </td>
      </tr>
    `
      )
      .join("");
  }

  async toggleCheckIn(bookingCode, isCheckingIn) {
    const b = this.bookings.find((item) => item.bookingCode === bookingCode);
    if (!b) return;

    b.checkedIn = isCheckingIn;
    b.checkedInAt = isCheckingIn ? new Date().toLocaleTimeString("th-TH") : null;
    this.saveData("ep_bookings", this.bookings);

    // If Supabase is connected
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        await supabaseClient
          .from('bookings')
          .update({
            checked_in: isCheckingIn,
            checked_in_at: isCheckingIn ? new Date().toISOString() : null
          })
          .eq('booking_code', bookingCode);
      } catch (err) {
        console.warn("Supabase checkin error:", err);
      }
    }

    this.renderAdminDashboard();
    this.showToast(isCheckingIn ? `เช็กอินให้ ${b.guestName} สำเร็จ!` : `ยกเลิกการเช็กอินแล้ว`, "success");
  }

  openAddEventModal() {
    document.getElementById("addEventForm").reset();
    this.openModal("addEventModal");
  }

  async handleCreateEvent(e) {
    e.preventDefault();
    const title = document.getElementById("newEventTitle").value.trim();
    const category = document.getElementById("newEventCategory").value;
    const date = document.getElementById("newEventDate").value;
    const location = document.getElementById("newEventLocation").value.trim();
    const capacity = parseInt(document.getElementById("newEventCapacity").value) || 50;
    const timeSlot = document.getElementById("newEventTimeSlot").value.trim() || "09:00 - 16:30 น.";
    const desc = document.getElementById("newEventDesc").value.trim();

    const newEv = {
      id: Date.now(),
      title: title,
      category: category,
      description: desc,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      date: date,
      location: location,
      price: "ฟรีไม่มีค่าใช้จ่าย",
      slots: [
        { id: Date.now() + 1, time: timeSlot, capacity: capacity, booked: 0 }
      ]
    };

    this.events.unshift(newEv);
    this.saveData("ep_events", this.events);

    // If Supabase connected
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { data: insertedEvent } = await supabaseClient
          .from('events')
          .insert({
            title: title,
            category: category,
            description: desc,
            image_url: newEv.image,
            event_date: date,
            location: location,
            price: "ฟรีไม่มีค่าใช้จ่าย"
          })
          .select()
          .single();

        if (insertedEvent) {
          await supabaseClient.from('event_slots').insert({
            event_id: insertedEvent.id,
            time_slot: timeSlot,
            capacity: capacity,
            booked: 0
          });
        }
      } catch (err) {
        console.warn("Supabase add event error:", err);
      }
    }

    this.renderStats();
    this.renderEvents();
    if (this.currentViewMode === "calendar") this.renderCalendar();

    this.closeAllModals();
    this.showToast("🎉 เพิ่มกิจกรรมใหม่ลงในระบบเรียบร้อยแล้ว!", "success");
  }

  exportToCSV() {
    if (this.bookings.length === 0) {
      this.showToast("ไม่มีข้อมูลสำหรับส่งออก", "error");
      return;
    }

    let csvContent = "\uFEFFรหัสการจอง,ชื่อผู้เข้าร่วม,อีเมล,เบอร์โทร,ชื่องาน,รอบเวลา,จำนวนที่นั่ง,สถานะเช็กอิน,เวลาที่จอง\n";
    this.bookings.forEach((b) => {
      csvContent += `"${b.bookingCode}","${b.guestName}","${b.guestEmail}","${b.guestPhone}","${b.eventTitle}","${b.slotTime}","${b.seats}","${b.checkedIn ? 'เช็กอินแล้ว' : 'รอเข้างาน'}","${b.bookedAt}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event_attendees_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("ส่งออกไฟล์ CSV เรียบร้อยแล้ว", "success");
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("active"));
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "fa-circle-info";
    if (type === "success") icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-exclamation";

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  formatThaiDate(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;

    const year = parseInt(parts[0]) + 543;
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const months = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    return `${day} ${months[month]} ${year}`;
  }
}

// Initialize Application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new EventApp();
});
