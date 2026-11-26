(function () {
    const DB_KEY = "rentgo_local_db_v4";
    const SESSION_KEY = "rentgo_local_session_v4";
    const RESET_EMAIL_KEY = "rentgo_reset_email_v4";

    const ADMIN_CREDENTIALS = {
        id: "ADMIN-001",
        email: "admin@rentgo.com",
        password: "Admin123!",
        full_name: "RentGo Administrator",
        phone: "03-8899 2026",
        role: "admin"
    };

    function isoDate(offset = 0) {
        const d = new Date();
        d.setHours(12, 0, 0, 0);
        d.setDate(d.getDate() + offset);
        return d.toISOString().slice(0, 10);
    }

    function isoDateTime(offset = 0, hour = 10) {
        const d = new Date();
        d.setHours(hour, 0, 0, 0);
        d.setDate(d.getDate() + offset);
        return d.toISOString();
    }

    function seedDB() {
        const users = [
            { id: "USR-1001", full_name: "Aina Rahman", phone: "012-3456789", email: "customer@rentgo.com", password: "Customer123", role: "customer", created_at: isoDateTime(-120) },
            { id: "USR-1002", full_name: "Hakim Zainal", phone: "013-7721190", email: "hakim@rentgo.test", password: "Customer123", role: "customer", created_at: isoDateTime(-90) },
            { id: "USR-1003", full_name: "Sofia Imani", phone: "011-2233445", email: "sofia@rentgo.test", password: "Customer123", role: "customer", created_at: isoDateTime(-75) },
            { id: "USR-1004", full_name: "Daniel Lee", phone: "016-5544332", email: "daniel@rentgo.test", password: "Customer123", role: "customer", created_at: isoDateTime(-60) },
            { id: "USR-1005", full_name: "Farah Nabilah", phone: "019-3322114", email: "farah@rentgo.test", password: "Customer123", role: "customer", created_at: isoDateTime(-45) },
            { id: "USR-1006", full_name: "Amirul Haziq", phone: "017-8844112", email: "amirul@rentgo.test", password: "Customer123", role: "customer", created_at: isoDateTime(-30) }
        ];

        const cars = [
            { id: 1, brand: "Perodua", model: "Myvi 1.5 AV", plate_number: "VFA 2314", year: 2023, category: "Hatchback", transmission: "Automatic", seats: 5, color: "Granite Grey", price_per_day: 130, status: "available", image_url: "myvi_adv.jpg", notes: "Compact, easy to drive and suitable for city trips.", created_at: isoDateTime(-160) },
            { id: 2, brand: "Honda", model: "City 1.5 V", plate_number: "VHD 9082", year: 2022, category: "Sedan", transmission: "Automatic", seats: 5, color: "Platinum White Pearl", price_per_day: 180, status: "available", image_url: "city_v.webp", notes: "Comfortable sedan with a spacious boot for daily or interstate travel.", created_at: isoDateTime(-150) },
            { id: 3, brand: "Toyota", model: "Vios 1.5 G", plate_number: "VTX 5521", year: 2024, category: "Sedan", transmission: "Automatic", seats: 5, color: "Metal Stream", price_per_day: 200, status: "available", image_url: "vios.webp", notes: "Refined, efficient and comfortable for business or family trips.", created_at: isoDateTime(-140) },
            { id: 4, brand: "BMW", model: "530i M Sport", plate_number: "VKM 5301", year: 2023, category: "Premium", transmission: "Automatic", seats: 5, color: "Black Sapphire", price_per_day: 450, status: "rented", image_url: "bmw_g30.avif", notes: "Premium executive sedan for special occasions and business travel.", created_at: isoDateTime(-130) },
            { id: 5, brand: "Perodua", model: "Bezza 1.3 AV", plate_number: "VBC 1142", year: 2024, category: "Sedan", transmission: "Automatic", seats: 5, color: "Ocean Blue", price_per_day: 110, status: "reserved", image_url: "myvi_adv.jpg", notes: "Fuel-efficient sedan for practical daily rental.", created_at: isoDateTime(-120) },
            { id: 6, brand: "Toyota", model: "Veloz 1.5", plate_number: "VLV 7788", year: 2023, category: "MPV", transmission: "Automatic", seats: 7, color: "Silver Metallic", price_per_day: 250, status: "maintenance", image_url: "vios.webp", notes: "Seven-seater MPV suitable for family and group travel.", created_at: isoDateTime(-110) },
            { id: 7, brand: "Perodua", model: "Alza 1.5 AV", plate_number: "VLA 8821", year: 2024, category: "MPV", transmission: "Automatic", seats: 7, color: "Elegant Black", price_per_day: 220, status: "available", image_url: "myvi_adv.jpg", notes: "Spacious seven-seater for family travel.", created_at: isoDateTime(-100) },
            { id: 8, brand: "Perodua", model: "Ativa 1.0 AV", plate_number: "VAT 3012", year: 2023, category: "SUV", transmission: "Automatic", seats: 5, color: "Pearl Diamond White", price_per_day: 170, status: "available", image_url: "myvi_adv.jpg", notes: "Compact SUV with good visibility and easy handling.", created_at: isoDateTime(-90) },
            { id: 9, brand: "Proton", model: "X50 Premium", plate_number: "VXP 5100", year: 2024, category: "SUV", transmission: "Automatic", seats: 5, color: "Jet Grey", price_per_day: 230, status: "reserved", image_url: "city_v.jpg", notes: "Turbocharged compact SUV with premium cabin features.", created_at: isoDateTime(-80) },
            { id: 10, brand: "Honda", model: "HR-V 1.5 V", plate_number: "VHR 5228", year: 2023, category: "SUV", transmission: "Automatic", seats: 5, color: "Meteoroid Grey", price_per_day: 280, status: "available", image_url: "city_v.webp", notes: "Comfortable crossover for city and highway driving.", created_at: isoDateTime(-70) },
            { id: 11, brand: "Toyota", model: "Corolla Cross 1.8 V", plate_number: "VCC 1880", year: 2024, category: "SUV", transmission: "Automatic", seats: 5, color: "Celestite Grey", price_per_day: 300, status: "inactive", image_url: "vios.webp", notes: "Temporarily unavailable for internal inspection.", created_at: isoDateTime(-60) },
            { id: 12, brand: "Perodua", model: "Axia 1.0 AV", plate_number: "VAX 1018", year: 2024, category: "Hatchback", transmission: "Automatic", seats: 5, color: "Coral Blue", price_per_day: 95, status: "available", image_url: "myvi_adv.jpg", notes: "Budget-friendly compact car for short trips.", created_at: isoDateTime(-50) }
        ];

        const customers = [
            { id: 1, user_id: "USR-1001", full_name: "Aina Rahman", email: "customer@rentgo.com", phone: "012-3456789", identity_number: "990101-10-1234", driving_license_number: "D12345678", address: "Shah Alam, Selangor", status: "active", notes: "Demo customer account", created_at: isoDateTime(-120) },
            { id: 2, user_id: "USR-1002", full_name: "Hakim Zainal", email: "hakim@rentgo.test", phone: "013-7721190", identity_number: "980404-06-4401", driving_license_number: "D90774421", address: "Kuala Lumpur", status: "active", notes: "Frequent weekend renter", created_at: isoDateTime(-90) },
            { id: 3, user_id: "USR-1003", full_name: "Sofia Imani", email: "sofia@rentgo.test", phone: "011-2233445", identity_number: "000707-14-2210", driving_license_number: "D55100912", address: "Putrajaya", status: "active", notes: "Prefers sedan vehicles", created_at: isoDateTime(-75) },
            { id: 4, user_id: "USR-1004", full_name: "Daniel Lee", email: "daniel@rentgo.test", phone: "016-5544332", identity_number: "970212-10-4488", driving_license_number: "D66120498", address: "Petaling Jaya, Selangor", status: "active", notes: "Corporate renter", created_at: isoDateTime(-60) },
            { id: 5, user_id: "USR-1005", full_name: "Farah Nabilah", email: "farah@rentgo.test", phone: "019-3322114", identity_number: "010318-08-6022", driving_license_number: "D88411203", address: "Seremban, Negeri Sembilan", status: "active", notes: "Family travel customer", created_at: isoDateTime(-45) },
            { id: 6, user_id: "USR-1006", full_name: "Amirul Haziq", email: "amirul@rentgo.test", phone: "017-8844112", identity_number: "991109-06-7781", driving_license_number: "D77320184", address: "Cyberjaya, Selangor", status: "active", notes: "New customer", created_at: isoDateTime(-30) }
        ];

        const bookings = [
            { id: 1, booking_code: "RG-1001", customer_id: 1, car_id: 4, pickup_date: isoDate(-2), return_date: isoDate(2), total_days: 4, price_per_day: 450, total_amount: 1800, booking_status: "active", payment_status: "partial", pickup_location: "RentGo Main Branch", pickup_time: "10:00", notes: "", created_at: isoDateTime(-4) },
            { id: 2, booking_code: "RG-1002", customer_id: 2, car_id: 5, pickup_date: isoDate(3), return_date: isoDate(6), total_days: 3, price_per_day: 110, total_amount: 330, booking_status: "confirmed", payment_status: "unpaid", pickup_location: "RentGo Main Branch", pickup_time: "09:00", notes: "", created_at: isoDateTime(-1) },
            { id: 3, booking_code: "RG-1003", customer_id: 1, car_id: 1, pickup_date: isoDate(-35), return_date: isoDate(-32), total_days: 3, price_per_day: 130, total_amount: 390, booking_status: "completed", payment_status: "paid", pickup_location: "RentGo Main Branch", pickup_time: "11:00", notes: "", created_at: isoDateTime(-38) },
            { id: 4, booking_code: "RG-1004", customer_id: 2, car_id: 2, pickup_date: isoDate(-18), return_date: isoDate(-16), total_days: 2, price_per_day: 180, total_amount: 360, booking_status: "cancelled", payment_status: "unpaid", pickup_location: "RentGo Main Branch", pickup_time: "14:00", notes: "Cancelled by customer", created_at: isoDateTime(-20) },
            { id: 5, booking_code: "RG-1005", customer_id: 3, car_id: 9, pickup_date: isoDate(4), return_date: isoDate(8), total_days: 4, price_per_day: 230, total_amount: 920, booking_status: "confirmed", payment_status: "partial", pickup_location: "RentGo Main Branch", pickup_time: "08:30", notes: "Child seat requested", created_at: isoDateTime(-2) },
            { id: 6, booking_code: "RG-1006", customer_id: 4, car_id: 3, pickup_date: isoDate(-10), return_date: isoDate(-7), total_days: 3, price_per_day: 200, total_amount: 600, booking_status: "completed", payment_status: "paid", pickup_location: "RentGo Main Branch", pickup_time: "09:30", notes: "", created_at: isoDateTime(-12) },
            { id: 7, booking_code: "RG-1007", customer_id: 5, car_id: 7, pickup_date: isoDate(9), return_date: isoDate(13), total_days: 4, price_per_day: 220, total_amount: 880, booking_status: "pending", payment_status: "unpaid", pickup_location: "RentGo Main Branch", pickup_time: "10:30", notes: "Family trip", created_at: isoDateTime(-1) },
            { id: 8, booking_code: "RG-1008", customer_id: 6, car_id: 8, pickup_date: isoDate(-22), return_date: isoDate(-20), total_days: 2, price_per_day: 170, total_amount: 340, booking_status: "completed", payment_status: "paid", pickup_location: "RentGo Main Branch", pickup_time: "13:00", notes: "", created_at: isoDateTime(-24) },
            { id: 9, booking_code: "RG-1009", customer_id: 3, car_id: 10, pickup_date: isoDate(-55), return_date: isoDate(-51), total_days: 4, price_per_day: 280, total_amount: 1120, booking_status: "completed", payment_status: "paid", pickup_location: "RentGo Main Branch", pickup_time: "10:00", notes: "", created_at: isoDateTime(-57) },
            { id: 10, booking_code: "RG-1010", customer_id: 4, car_id: 12, pickup_date: isoDate(1), return_date: isoDate(2), total_days: 1, price_per_day: 95, total_amount: 95, booking_status: "pending", payment_status: "unpaid", pickup_location: "RentGo Main Branch", pickup_time: "15:00", notes: "One-day rental", created_at: isoDateTime(0) }
        ];

        const payments = [
            { id: 1, booking_id: 1, amount: 900, payment_method: "Online Banking", payment_status: "paid", payment_date: isoDateTime(-2, 9), reference_number: "FPX10001", notes: "Deposit payment" },
            { id: 2, booking_id: 3, amount: 390, payment_method: "Credit Card", payment_status: "paid", payment_date: isoDateTime(-35, 12), reference_number: "CC10003", notes: "Full payment" },
            { id: 3, booking_id: 5, amount: 300, payment_method: "Online Banking", payment_status: "paid", payment_date: isoDateTime(-1, 15), reference_number: "FPX10005", notes: "Booking deposit" },
            { id: 4, booking_id: 6, amount: 600, payment_method: "Credit Card", payment_status: "paid", payment_date: isoDateTime(-10, 10), reference_number: "CC10006", notes: "Full payment" },
            { id: 5, booking_id: 8, amount: 340, payment_method: "Cash", payment_status: "paid", payment_date: isoDateTime(-22, 16), reference_number: "CASH10008", notes: "Paid at counter" },
            { id: 6, booking_id: 9, amount: 1120, payment_method: "Online Banking", payment_status: "paid", payment_date: isoDateTime(-55, 11), reference_number: "FPX10009", notes: "Full payment" }
        ];

        const maintenance_records = [
            { id: 1, car_id: 6, maintenance_type: "Routine Service", description: "Engine oil, filter and general inspection.", maintenance_date: isoDate(-1), cost: 380, status: "in_progress", created_at: isoDateTime(-2) },
            { id: 2, car_id: 2, maintenance_type: "Tyre Service", description: "Tyre rotation and balancing.", maintenance_date: isoDate(-25), cost: 120, status: "completed", created_at: isoDateTime(-26) },
            { id: 3, car_id: 10, maintenance_type: "Oil Change", description: "Engine oil and filter replacement.", maintenance_date: isoDate(-42), cost: 260, status: "completed", created_at: isoDateTime(-43) },
            { id: 4, car_id: 11, maintenance_type: "Inspection", description: "Internal inspection before returning vehicle to service.", maintenance_date: isoDate(2), cost: 0, status: "scheduled", created_at: isoDateTime(-1) },
            { id: 5, car_id: 4, maintenance_type: "Brake Service", description: "Brake pad inspection completed before current rental.", maintenance_date: isoDate(-15), cost: 640, status: "completed", created_at: isoDateTime(-16) }
        ];

        return {
            version: 4,
            admin: { ...ADMIN_CREDENTIALS },
            users,
            cars,
            customers,
            bookings,
            payments,
            maintenance_records
        };
    }

    function ensureDB() {
        if (!localStorage.getItem(DB_KEY)) {
            localStorage.setItem(DB_KEY, JSON.stringify(seedDB()));
        }
    }

    function getDB() {
        ensureDB();
        try {
            const db = JSON.parse(localStorage.getItem(DB_KEY));
            if (!db || db.version !== 4) {
                const fresh = seedDB();
                localStorage.setItem(DB_KEY, JSON.stringify(fresh));
                return fresh;
            }
            return db;
        } catch {
            const fresh = seedDB();
            localStorage.setItem(DB_KEY, JSON.stringify(fresh));
            return fresh;
        }
    }

    function saveDB(db) {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return db;
    }

    function resetDemoData() {
        const fresh = seedDB();
        localStorage.setItem(DB_KEY, JSON.stringify(fresh));
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(RESET_EMAIL_KEY);
        return fresh;
    }

    function nextId(items = []) {
        return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    }

    function nextBookingCode(db = getDB()) {
        const max = db.bookings.reduce((m, b) => {
            const n = Number(String(b.booking_code || "").replace(/\D/g, "")) || 1000;
            return Math.max(m, n);
        }, 1000);
        return `RG-${max + 1}`;
    }

    function getSession() {
        try {
            return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
        } catch {
            return null;
        }
    }

    function setSession(session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem("rentgo_return_to");
    }

    function loginUser(email, password) {
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const enteredPassword = String(password || "");

        if (normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase() && enteredPassword === ADMIN_CREDENTIALS.password) {
            const session = {
                id: ADMIN_CREDENTIALS.id,
                email: ADMIN_CREDENTIALS.email,
                full_name: ADMIN_CREDENTIALS.full_name,
                phone: ADMIN_CREDENTIALS.phone,
                role: "admin"
            };
            setSession(session);
            return { ok: true, user: session };
        }

        const db = getDB();
        const user = db.users.find(u => String(u.email || "").trim().toLowerCase() === normalizedEmail && String(u.password || "") === enteredPassword);
        if (!user) return { ok: false, error: "Invalid email or password." };

        const session = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone || "",
            role: "customer"
        };
        setSession(session);
        return { ok: true, user: session };
    }

    function registerCustomer({ full_name, phone, email, password }) {
        const db = getDB();
        const normalizedEmail = String(email || "").trim().toLowerCase();

        if (!full_name || !phone || !normalizedEmail || !password) {
            return { ok: false, error: "Please complete all required fields." };
        }
        if (normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase() || db.users.some(u => String(u.email).toLowerCase() === normalizedEmail)) {
            return { ok: false, error: "An account with this email already exists." };
        }

        const user = {
            id: `USR-${Date.now()}`,
            full_name,
            phone,
            email: normalizedEmail,
            password,
            role: "customer",
            created_at: new Date().toISOString()
        };
        db.users.push(user);

        const customer = {
            id: nextId(db.customers),
            user_id: user.id,
            full_name,
            email: normalizedEmail,
            phone,
            identity_number: "",
            driving_license_number: "",
            address: "",
            status: "active",
            notes: "Registered through RentGo website",
            created_at: new Date().toISOString()
        };
        db.customers.push(customer);
        saveDB(db);

        const session = { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone, role: "customer" };
        setSession(session);
        return { ok: true, user: session, customer };
    }

    function updatePassword(email, newPassword) {
        const db = getDB();
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const user = db.users.find(u => String(u.email).toLowerCase() === normalizedEmail);
        if (!user) return { ok: false, error: "Customer account not found." };
        user.password = newPassword;
        saveDB(db);
        return { ok: true };
    }

    function setResetEmail(email) { localStorage.setItem(RESET_EMAIL_KEY, String(email || "").trim().toLowerCase()); }
    function getResetEmail() { return localStorage.getItem(RESET_EMAIL_KEY) || ""; }
    function clearResetEmail() { localStorage.removeItem(RESET_EMAIL_KEY); }

    function getCurrentCustomer(db = getDB()) {
        const session = getSession();
        if (!session || session.role !== "customer") return null;
        return db.customers.find(c => c.user_id === session.id) || db.customers.find(c => String(c.email).toLowerCase() === String(session.email).toLowerCase()) || null;
    }

    function resolveCarImage(car, prefix = "../images/") {
        const src = car?.image_url || "";
        if (!src) return "";
        if (/^(https?:|data:|blob:|\/)/i.test(src)) return src;
        return `${prefix}${src}`;
    }

    function formatMoney(value) {
        return new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" }).format(Number(value) || 0);
    }

    function formatDate(date) {
        if (!date) return "-";
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
    }

    function formatDateTime(value) {
        if (!value) return "-";
        return new Date(value).toLocaleString("en-MY", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }

    ensureDB();

    window.RentGoStore = {
        ADMIN_CREDENTIALS,
        ensureDB,
        getDB,
        saveDB,
        resetDemoData,
        nextId,
        nextBookingCode,
        getSession,
        setSession,
        logout,
        loginUser,
        registerCustomer,
        updatePassword,
        setResetEmail,
        getResetEmail,
        clearResetEmail,
        getCurrentCustomer,
        resolveCarImage,
        formatMoney,
        formatDate,
        formatDateTime
    };
})();
