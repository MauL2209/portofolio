# Design Document — Light Mode & Language Toggle

## Overview

Dua fitur baru ditambahkan ke portfolio `mauLportofolio.dev 2.0` yang dibangun dengan pure HTML/CSS/JS vanilla tanpa library eksternal:

1. **Theme Toggle** — beralih antara Dark Mode (default) dan Light Mode menggunakan CSS custom properties override pada selector `html.light-mode`, disimpan di localStorage.
2. **Language Toggle** — beralih antara Bahasa Indonesia (default) dan English menggunakan Translation Map berbasis atribut `data-i18n`, disimpan di localStorage.

Kedua fitur diimplementasikan dalam file JavaScript terpisah (`js/theme.js` dan `js/i18n.js`), tidak bergantung satu sama lain, dan terintegrasi ke navbar yang sudah ada melalui `.navbar__actions`.

---

## Architecture

```
index.html
 ├── css/style.css          ← tambah section html.light-mode override
 ├── js/main.js             ← tidak diubah
 ├── js/theme.js            ← NEW: Theme_Manager
 ├── js/i18n.js             ← NEW: Language_Manager + Translation_Map
 └── js/contact.js          ← minor update: konsumsi locale dari Language_Manager
```

Urutan inisialisasi:
1. `theme.js` dijalankan pertama — menerapkan tema dari localStorage sebelum render penuh untuk mencegah FOUC (Flash of Unstyled Content).
2. `i18n.js` dijalankan setelah DOM ready (`DOMContentLoaded`) — menerapkan locale dan mengganti teks.
3. `contact.js` dijalankan terakhir — mengambil fungsi locale dari `window.i18n` yang sudah diekspos oleh `i18n.js`.

---

## Components and Interfaces

### Theme_Toggle (HTML Element)

Tombol di dalam `.navbar__actions`:

```html
<button
  id="themeToggle"
  class="theme-toggle"
  aria-label="Aktifkan Light Mode"
  aria-pressed="false"
  title="Toggle tema"
>
  <i class="fa-solid fa-sun" aria-hidden="true"></i>
</button>
```

| State | Ikon | `aria-label` | `aria-pressed` |
|---|---|---|---|
| Dark Mode aktif | `fa-sun` | `"Aktifkan Light Mode"` | `"false"` |
| Light Mode aktif | `fa-moon` | `"Aktifkan Dark Mode"` | `"true"` |

### Language_Toggle (HTML Element)

```html
<button
  id="langToggle"
  class="lang-toggle"
  aria-label="Switch to English"
  lang="en"
>
  EN
</button>
```

| State | Label Teks | `aria-label` | `lang` |
|---|---|---|---|
| Locale ID aktif | `EN` | `"Switch to English"` | `en` |
| Locale EN aktif | `ID` | `"Ganti ke Bahasa Indonesia"` | `id` |

### Theme_Manager (js/theme.js)

```
Public interface:
  window.themeManager = {
    getTheme()           → "light" | "dark"
    setTheme(value)      → void  (applies + persists)
    toggle()             → void
  }
```

### Language_Manager (js/i18n.js)

```
Public interface:
  window.i18n = {
    getLocale()          → "id" | "en"
    setLocale(value)     → void  (applies + persists)
    toggle()             → void
    t(key)               → string  (translate key → current locale)
  }
```

---

## Data Models

### localStorage Keys

| Key | Nilai | Default |
|---|---|---|
| `maul_theme` | `"light"` \| `"dark"` | `"dark"` |
| `maul_lang` | `"id"` \| `"en"` | `"id"` |

### Translation_Map Structure

```js
const TRANSLATIONS = {
  id: {
    // Navbar
    'nav.tentang': 'Tentang',
    'nav.keahlian': 'Keahlian',
    'nav.project': 'Project',
    'nav.riwayat': 'Riwayat',
    'nav.kontak': 'Kontak',
    'nav.cta': 'Hubungi Saya',

    // Hero
    'hero.badge': 'RPL Student & Junior Web Developer',
    'hero.title.line1': 'Hi, saya',
    'hero.title.name': 'Hafiizh Maulana',
    'hero.desc': 'Saya adalah siswa Rekayasa Perangkat Lunak yang tertarik pada Web Development dan Software Development. Saya senang membangun website yang modern, fungsional, dan mudah digunakan.',
    'hero.btn.project': 'Lihat Project',
    'hero.btn.contact': 'Hubungi Saya',
    'hero.stat.projects.label': 'Projects',
    'hero.stat.stack.label': 'Tech Stack',
    'hero.stat.years.label': 'Tahun Belajar',
    'hero.photo.badge': 'RPL Student & Junior Web Developer',

    // Skills
    'skills.eyebrow': 'My Arsenal',
    'skills.title': 'Tech Stack & Skills',
    'skills.desc': 'Teknologi dan tools yang saya gunakan untuk membangun aplikasi web.',
    'skills.level.backend': 'Backend',
    'skills.level.framework': 'Framework',
    'skills.level.database': 'Database',
    'skills.level.markup': 'Markup',
    'skills.level.styling': 'Styling',
    'skills.level.frontend': 'Frontend',

    // Projects
    'projects.eyebrow': 'Portfolio',
    'projects.title': 'Project Saya',
    'projects.desc': 'Beberapa project yang telah saya kerjakan dalam bidang pengembangan website dan sistem informasi.',
    'projects.p1.title': 'Website Kantin Melati Area',
    'projects.p1.desc': 'Website kantin sekolah SMKN 20 Jakarta yang memiliki 8 stand dari berbagai jurusan. Memungkinkan siswa melihat menu makanan & minuman serta melakukan pemesanan/pre-order (PO).',
    'projects.p2.title': 'Galeri Sekolah',
    'projects.p2.desc': 'Website galeri sekolah yang menampilkan informasi dan data diri siswa dari 8 jurusan berbeda, dengan minimal 10 data diri siswa sebagai data awal.',
    'projects.p3.title': 'Majelis Sayur',
    'projects.p3.desc': 'Website sebagai wadah berkumpulnya para petani dari berbagai wilayah di Jagakarsa untuk berbagi informasi, menjalin komunikasi, dan memperluas hubungan antarpetani.',
    'projects.p4.title': 'LinguaNova',
    'projects.p4.desc': 'Website pembelajaran bahasa asing: Inggris, Jepang, Korea, Mandarin/China, dan Spanyol. Membantu pengguna mempelajari lima bahasa secara interaktif.',
    'projects.notice': 'Link GitHub akan diperbarui setelah project dipublikasikan ke repositori masing-masing.',

    // Education
    'edu.eyebrow': 'Education',
    'edu.title': 'Riwayat Pendidikan',
    'edu.desc': 'Perjalanan pendidikan saya dalam mempelajari teknologi dan pengembangan perangkat lunak.',
    'edu.sdn.period': '2015 — 2021',
    'edu.sdn.name': 'SDN Cipete Selatan 03 Pagi',
    'edu.sdn.level': 'Sekolah Dasar',
    'edu.sdn.detail': 'Menempuh pendidikan dasar di SDN Cipete Selatan 03 Pagi, membangun dasar-dasar akademik dan karakter sejak dini.',
    'edu.sdn.badge': 'Lulus',
    'edu.sdn.maps': 'Lihat Lokasi',
    'edu.smp.period': '2021 — 2024',
    'edu.smp.name': 'SMP YAPENKA',
    'edu.smp.level': 'Sekolah Menengah Pertama',
    'edu.smp.detail': 'Menempuh pendidikan dasar menengah di SMP YAPENKA, membangun fondasi akademik sebelum melanjutkan ke jenjang SMK dengan jurusan berbasis teknologi.',
    'edu.smp.badge': 'Lulus',
    'edu.smp.maps': 'Lihat Lokasi',
    'edu.smk.period': '2024 — Sekarang',
    'edu.smk.name': 'SMK Negeri 20 Jakarta',
    'edu.smk.level': 'Rekayasa Perangkat Lunak (RPL)',
    'edu.smk.detail': 'Menempuh pendidikan di jurusan Rekayasa Perangkat Lunak, mempelajari pengembangan web, pemrograman, basis data, dan software engineering secara intensif.',
    'edu.smk.badge': 'Sedang Berlangsung',
    'edu.smk.maps': 'Lihat Lokasi',

    // Contact
    'contact.eyebrow': 'Get In Touch',
    'contact.title': 'Hubungi Saya',
    'contact.desc': 'Jangan ragu untuk menghubungi saya. Saya terbuka untuk diskusi project, kolaborasi, maupun pertanyaan seputar pengembangan web.',
    'contact.form.name.label': 'Nama Lengkap',
    'contact.form.name.placeholder': 'Masukkan nama lengkap Anda',
    'contact.form.msg.label': 'Pesan',
    'contact.form.msg.placeholder': 'Tulis pesan Anda di sini...',
    'contact.form.submit': 'Kirim Pesan',
    'contact.inbox.title': 'Pesan Masuk',
    'contact.form.validate.name.empty': 'Nama Lengkap tidak boleh kosong.',
    'contact.form.validate.msg.empty': 'Pesan tidak boleh kosong.',
    'contact.form.validate.msg.short': 'Pesan minimal 5 karakter.',
    'contact.form.validate.general': 'Mohon periksa kembali isian formulir Anda.',
    'contact.form.success': 'Pesan berhasil dikirim! Terima kasih, {name}.',
    'contact.form.counter': '{n} karakter',
    'contact.form.counter.min': '{n} karakter (min. {min})',
    'contact.toast.deleted': 'Pesan berhasil dihapus.',
    'contact.toast.sent': 'Pesan berhasil dikirim!',

    // Footer
    'footer.tagline': 'Hafiizh Maulana',
    'footer.subtitle': 'RPL Student & Junior Web Developer',
    'footer.nav.title': 'Navigasi',
    'footer.social.title': 'Social Media',
    'footer.built': 'Designed & Built by',
  },

  en: {
    // Navbar
    'nav.tentang': 'About',
    'nav.keahlian': 'Skills',
    'nav.project': 'Projects',
    'nav.riwayat': 'Education',
    'nav.kontak': 'Contact',
    'nav.cta': 'Contact Me',

    // Hero
    'hero.badge': 'RPL Student & Junior Web Developer',
    'hero.title.line1': 'Hi, I\'m',
    'hero.title.name': 'Hafiizh Maulana',
    'hero.desc': 'I\'m a Software Engineering student passionate about Web Development and Software Development. I enjoy building modern, functional, and user-friendly websites.',
    'hero.btn.project': 'View Projects',
    'hero.btn.contact': 'Contact Me',
    'hero.stat.projects.label': 'Projects',
    'hero.stat.stack.label': 'Tech Stack',
    'hero.stat.years.label': 'Years Learning',
    'hero.photo.badge': 'RPL Student & Junior Web Developer',

    // Skills
    'skills.eyebrow': 'My Arsenal',
    'skills.title': 'Tech Stack & Skills',
    'skills.desc': 'Technologies and tools I use to build web applications.',
    'skills.level.backend': 'Backend',
    'skills.level.framework': 'Framework',
    'skills.level.database': 'Database',
    'skills.level.markup': 'Markup',
    'skills.level.styling': 'Styling',
    'skills.level.frontend': 'Frontend',

    // Projects
    'projects.eyebrow': 'Portfolio',
    'projects.title': 'My Projects',
    'projects.desc': 'Some projects I have worked on in web development and information systems.',
    'projects.p1.title': 'Kantin Melati Area Website',
    'projects.p1.desc': 'School canteen website for SMKN 20 Jakarta featuring 8 stands from various departments. Allows students to view food & drink menus and place pre-orders (PO).',
    'projects.p2.title': 'School Gallery',
    'projects.p2.desc': 'A school gallery website displaying student profiles from 8 different departments, with at least 10 student records as initial data.',
    'projects.p3.title': 'Majelis Sayur',
    'projects.p3.desc': 'A platform for farmers from various areas in Jagakarsa to share information, communicate, and expand their network.',
    'projects.p4.title': 'LinguaNova',
    'projects.p4.desc': 'A foreign language learning website for English, Japanese, Korean, Mandarin/Chinese, and Spanish. Helps users learn five languages interactively.',
    'projects.notice': 'GitHub links will be updated after each project is published to its repository.',

    // Education
    'edu.eyebrow': 'Education',
    'edu.title': 'Education History',
    'edu.desc': 'My educational journey in learning technology and software development.',
    'edu.sdn.period': '2015 — 2021',
    'edu.sdn.name': 'SDN Cipete Selatan 03 Pagi',
    'edu.sdn.level': 'Elementary School',
    'edu.sdn.detail': 'Completed elementary education at SDN Cipete Selatan 03 Pagi, building academic foundations and character from an early age.',
    'edu.sdn.badge': 'Graduated',
    'edu.sdn.maps': 'View Location',
    'edu.smp.period': '2021 — 2024',
    'edu.smp.name': 'SMP YAPENKA',
    'edu.smp.level': 'Junior High School',
    'edu.smp.detail': 'Completed junior high education at SMP YAPENKA, building academic foundations before continuing to vocational school with a technology-based major.',
    'edu.smp.badge': 'Graduated',
    'edu.smp.maps': 'View Location',
    'edu.smk.period': '2024 — Present',
    'edu.smk.name': 'SMK Negeri 20 Jakarta',
    'edu.smk.level': 'Software Engineering (RPL)',
    'edu.smk.detail': 'Studying at the Software Engineering department, learning web development, programming, databases, and software engineering intensively.',
    'edu.smk.badge': 'In Progress',
    'edu.smk.maps': 'View Location',

    // Contact
    'contact.eyebrow': 'Get In Touch',
    'contact.title': 'Contact Me',
    'contact.desc': 'Feel free to reach out. I am open to project discussions, collaborations, and questions about web development.',
    'contact.form.name.label': 'Full Name',
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.msg.label': 'Message',
    'contact.form.msg.placeholder': 'Write your message here...',
    'contact.form.submit': 'Send Message',
    'contact.inbox.title': 'Inbox',
    'contact.form.validate.name.empty': 'Full Name is required.',
    'contact.form.validate.msg.empty': 'Message is required.',
    'contact.form.validate.msg.short': 'Message must be at least 5 characters.',
    'contact.form.validate.general': 'Please review your form entries.',
    'contact.form.success': 'Message sent successfully! Thank you, {name}.',
    'contact.form.counter': '{n} characters',
    'contact.form.counter.min': '{n} characters (min. {min})',
    'contact.toast.deleted': 'Message deleted successfully.',
    'contact.toast.sent': 'Message sent successfully!',

    // Footer
    'footer.tagline': 'Hafiizh Maulana',
    'footer.subtitle': 'RPL Student & Junior Web Developer',
    'footer.nav.title': 'Navigation',
    'footer.social.title': 'Social Media',
    'footer.built': 'Designed & Built by',
  },
};
```

### data-i18n Attribute Convention

Setiap elemen teks yang perlu diterjemahkan mendapat atribut `data-i18n="<key>"`. Atribut `data-i18n-aria="<key>"` digunakan untuk elemen yang terjemahannya diterapkan ke `aria-label`. Atribut `data-i18n-placeholder="<key>"` digunakan untuk `placeholder` input/textarea.

```html
<!-- textContent -->
<h2 class="section-title" data-i18n="edu.title">Riwayat Pendidikan</h2>

<!-- placeholder -->
<input data-i18n-placeholder="contact.form.name.placeholder" placeholder="Masukkan nama lengkap Anda" />

<!-- aria-label (via data-i18n-aria) -->
<a href="..." data-i18n-aria="edu.sdn.maps.aria" aria-label="Lihat lokasi SDN di Google Maps">
```

---

## Detailed Component Design

### js/theme.js — Theme_Manager

```js
(function () {
  'use strict';

  const STORAGE_KEY = 'maul_theme';
  const DEFAULT     = 'dark';

  /* 1. Read from storage */
  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT; }
    catch (_) { return DEFAULT; }
  }

  /* 2. Apply to DOM (called at init AND on toggle) */
  function applyTheme(theme) {
    const html   = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    if (theme === 'light') {
      html.classList.add('light-mode');
    } else {
      html.classList.remove('light-mode');
    }

    if (!toggle) return;

    const icon = toggle.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fa-solid fa-moon';
      toggle.setAttribute('aria-label', 'Aktifkan Dark Mode');
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      icon.className = 'fa-solid fa-sun';
      toggle.setAttribute('aria-label', 'Aktifkan Light Mode');
      toggle.setAttribute('aria-pressed', 'false');
    }
  }

  /* 3. Persist */
  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); }
    catch (_) { /* storage tidak tersedia */ }
  }

  /* 4. Public API */
  let _current = getSaved();

  // Apply immediately (before DOMContentLoaded) to prevent FOUC
  applyTheme(_current);

  window.themeManager = {
    getTheme() { return _current; },
    setTheme(value) {
      _current = value;
      applyTheme(_current);
      saveTheme(_current);
    },
    toggle() {
      this.setTheme(_current === 'light' ? 'dark' : 'light');
    },
  };

  /* 5. Wire up button after DOM ready */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(_current); // re-apply now that toggle button exists

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        window.themeManager.toggle();
      });
    }
  });
})();
```

**Catatan FOUC Prevention:** `applyTheme(_current)` dipanggil dua kali — pertama saat script dimuat (sebelum DOM ready) untuk segera menambahkan `html.light-mode` class agar CSS override langsung aktif, lalu sekali lagi saat DOMContentLoaded untuk memperbarui tombol toggle yang sudah ada di DOM.

### js/i18n.js — Language_Manager

```js
(function () {
  'use strict';

  const STORAGE_KEY = 'maul_lang';
  const DEFAULT     = 'id';

  // Translation_Map (objek penuh seperti di Data Models di atas)
  const TRANSLATIONS = { id: { /* ... */ }, en: { /* ... */ } };

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT; }
    catch (_) { return DEFAULT; }
  }

  function applyLocale(locale) {
    const html = document.documentElement;
    html.setAttribute('lang', locale);

    // 1. Ganti textContent semua elemen data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = TRANSLATIONS[locale]?.[key];
      if (val !== undefined) el.textContent = val;
    });

    // 2. Ganti placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = TRANSLATIONS[locale]?.[key];
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    // 3. Ganti aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = TRANSLATIONS[locale]?.[key];
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    // 4. Perbarui tombol toggle itu sendiri
    const btn = document.getElementById('langToggle');
    if (btn) {
      if (locale === 'id') {
        btn.textContent = 'EN';
        btn.setAttribute('lang', 'en');
        btn.setAttribute('aria-label', 'Switch to English');
      } else {
        btn.textContent = 'ID';
        btn.setAttribute('lang', 'id');
        btn.setAttribute('aria-label', 'Ganti ke Bahasa Indonesia');
      }
    }

    // 5. Notify contact.js jika sudah diinisialisasi
    if (typeof window.contactLocaleUpdate === 'function') {
      window.contactLocaleUpdate(locale);
    }
  }

  function saveLocale(locale) {
    try { localStorage.setItem(STORAGE_KEY, locale); }
    catch (_) { /* storage tidak tersedia */ }
  }

  let _current = getSaved();

  window.i18n = {
    getLocale() { return _current; },
    setLocale(value) {
      _current = value;
      applyLocale(_current);
      saveLocale(_current);
    },
    toggle() {
      this.setLocale(_current === 'id' ? 'en' : 'id');
    },
    t(key) {
      return TRANSLATIONS[_current]?.[key] ?? key;
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyLocale(_current);

    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        window.i18n.toggle();
      });
    }
  });
})();
```

### contact.js — Integrasi Locale

`contact.js` mengekspos fungsi `window.contactLocaleUpdate` agar `i18n.js` bisa memperbarui teks hardcoded (pesan validasi, notice, tombol loading):

```js
// Di dalam contact.js, tambahkan:
window.contactLocaleUpdate = function (locale) {
  // Perbarui label field
  fields.fullName.label = window.i18n.t('contact.form.validate.name.label') || (locale === 'en' ? 'Full Name' : 'Nama Lengkap');
  fields.message.label  = window.i18n.t('contact.form.validate.msg.label')  || (locale === 'en' ? 'Message' : 'Pesan');

  // Perbarui teks tombol submit jika tidak sedang loading
  if (submitBtn && !submitBtn.disabled) {
    const icon = submitBtn.querySelector('i');
    submitBtn.textContent = '';
    if (icon) submitBtn.appendChild(icon);
    submitBtn.appendChild(
      document.createTextNode(' ' + window.i18n.t('contact.form.submit'))
    );
  }

  // Re-render message count
  renderMessages();
};
```

### CSS — html.light-mode Override

Ditambahkan di bagian akhir `css/style.css` sebagai section baru. Semua nilai menggunakan selector `html.light-mode :root`-equivalent lewat `html.light-mode` langsung:

```css
/* ------------------------------------------------------------------
   XX. Light Mode — CSS Custom Properties Override
------------------------------------------------------------------ */
html.light-mode {
  --clr-bg:            #f8fafc;
  --clr-bg-secondary:  #f1f5f9;
  --clr-surface:       #ffffff;
  --clr-surface-2:     #f8fafc;
  --clr-border:        #e2e8f0;
  --clr-border-light:  #cbd5e1;

  /* Cyan tetap pakai warna yang sama tapi glow diatur ulang */
  --clr-cyan:          #0891b2;   /* sedikit lebih gelap agar kontras di bg putih */
  --clr-cyan-light:    #06b6d4;
  --clr-cyan-dim:      rgba(8, 145, 178, 0.1);
  --clr-cyan-glow:     rgba(8, 145, 178, 0.2);

  --clr-text:          #0f172a;
  --clr-text-muted:    #334155;
  --clr-text-dim:      #64748b;

  --clr-white:         #0f172a;   /* elemen yang pakai --clr-white akan jadi gelap */
  --clr-error:         #dc2626;
  --clr-success:       #16a34a;

  --shadow-card:       0 4px 32px rgba(0,0,0,0.08);
  --shadow-cyan:       0 0 32px rgba(8, 145, 178, 0.12);
}

/* Transisi smooth saat tema berganti */
html.light-mode body,
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Navbar di light mode — border tetap terlihat */
html.light-mode .navbar {
  background: rgba(248, 250, 252, 0.85);
}
html.light-mode .navbar.scrolled {
  background: rgba(248, 250, 252, 0.97);
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
}

/* Photo frame border juga menyesuaikan */
html.light-mode .photo-frame__border {
  box-shadow: inset 0 0 24px var(--clr-cyan-dim), var(--shadow-cyan);
}

/* Mobile nav */
html.light-mode .mobile-nav {
  background: var(--clr-surface);
  border-left-color: var(--clr-border);
}

/* Scrollbar */
html.light-mode ::-webkit-scrollbar-track { background: var(--clr-bg); }
html.light-mode ::-webkit-scrollbar-thumb { background: var(--clr-border-light); }
```

**Strategi Override:** Karena semua komponen sudah menggunakan CSS custom properties (`var(--clr-bg)`, `var(--clr-surface)`, dll.), mengganti nilai token di `html.light-mode` sudah cukup untuk mengubah seluruh halaman tanpa menulis ulang rule individual. Hanya beberapa komponen yang butuh override spesifik (navbar background dengan `rgba` custom, scrollbar).

---

## Navbar Integration

### Posisi Tombol di `.navbar__actions`

Urutan elemen di dalam `.navbar__actions`:
1. `#themeToggle` (Theme_Toggle)
2. `#langToggle` (Language_Toggle)
3. `.btn--primary` "Hubungi Saya" (CTA yang sudah ada)

```html
<div class="navbar__actions">
  <!-- 1. Theme Toggle -->
  <button
    class="theme-toggle"
    id="themeToggle"
    aria-label="Aktifkan Light Mode"
    aria-pressed="false"
    title="Toggle tema"
  >
    <i class="fa-solid fa-sun" aria-hidden="true"></i>
  </button>

  <!-- 2. Language Toggle -->
  <button
    class="lang-toggle"
    id="langToggle"
    aria-label="Switch to English"
    lang="en"
  >
    EN
  </button>

  <!-- 3. CTA yang sudah ada -->
  <a href="#kontak" class="btn btn--primary btn--sm">Hubungi Saya</a>

  <!-- 4. Hamburger (tidak berubah) -->
  <button class="hamburger" id="hamburger" ...>...</button>
</div>
```

### CSS Tombol Toggle

```css
/* Theme Toggle button */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--clr-surface);
  border: 1.5px solid var(--clr-border);
  color: var(--clr-text-muted);
  font-size: 1rem;
  transition: color var(--dur-fast), border-color var(--dur-fast),
              background var(--dur-fast), transform var(--dur-fast);
  flex-shrink: 0;
}
.theme-toggle:hover {
  color: var(--clr-cyan);
  border-color: var(--clr-cyan);
  background: var(--clr-cyan-dim);
  transform: translateY(-1px);
}

/* Language Toggle button */
.lang-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  background: var(--clr-surface);
  border: 1.5px solid var(--clr-border);
  color: var(--clr-text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  transition: color var(--dur-fast), border-color var(--dur-fast),
              background var(--dur-fast), transform var(--dur-fast);
  flex-shrink: 0;
}
.lang-toggle:hover {
  color: var(--clr-cyan);
  border-color: var(--clr-cyan);
  background: var(--clr-cyan-dim);
  transform: translateY(-1px);
}

/* Mobile: tombol CTA disembunyikan tapi toggle tetap tampil */
@media (max-width: 768px) {
  .navbar__actions .btn--primary { display: none; }
  /* theme-toggle dan lang-toggle tetap display: flex — tidak di-hide */
}
```

### Script Loading Order di index.html

```html
<!-- sebelum </body> -->
<script src="js/main.js"></script>
<script src="js/theme.js"></script>
<script src="js/i18n.js"></script>
<script src="js/contact.js"></script>
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Toggle adalah involusi (double-toggle kembali ke state awal)

*For any* initial theme state ("light" atau "dark"), memanggil `themeManager.toggle()` dua kali SHALL menghasilkan `themeManager.getTheme()` yang sama dengan nilai awal.

**Validates: Requirements 2.1**

### Property 2: Theme state konsisten antara DOM, localStorage, dan API

*For any* nilai tema yang di-set via `themeManager.setTheme(value)`, nilai yang dikembalikan oleh `themeManager.getTheme()`, nilai yang tersimpan di localStorage (`maul_theme`), dan keberadaan class `light-mode` pada `<html>` SHALL semuanya konsisten satu sama lain.

**Validates: Requirements 2.2, 2.3, 3.1**

### Property 3: Theme init round-trip dari localStorage

*For any* nilai tema yang valid ("light" atau "dark") yang tersimpan di localStorage key `maul_lang`, reinisialisasi Theme_Manager SHALL menerapkan tema yang tersimpan tersebut (class `html.light-mode` ada ↔ nilai adalah "light").

**Validates: Requirements 3.2**

### Property 4: Language Toggle adalah involusi (double-toggle kembali ke locale awal)

*For any* initial locale state ("id" atau "en"), memanggil `i18n.toggle()` dua kali SHALL menghasilkan `i18n.getLocale()` yang sama dengan nilai awal.

**Validates: Requirements 5.1**

### Property 5: applyLocale mengganti SEMUA elemen data-i18n

*For any* elemen di DOM yang memiliki atribut `data-i18n` dengan key yang ada di Translation_Map, setelah memanggil `applyLocale(locale)`, `textContent` elemen tersebut SHALL sama dengan `TRANSLATIONS[locale][key]`.

**Validates: Requirements 5.3**

### Property 6: Translation_Map mencakup semua key yang ada di DOM

*For any* key yang ditemukan dalam atribut `data-i18n` di DOM, key tersebut SHALL memiliki entri yang terdefinisi (bukan `undefined`) di dalam `TRANSLATIONS["id"]` dan `TRANSLATIONS["en"]`.

**Validates: Requirements 5.4**

### Property 7: Locale state konsisten antara DOM, localStorage, dan API

*For any* nilai locale yang di-set via `i18n.setLocale(value)`, nilai yang dikembalikan oleh `i18n.getLocale()`, nilai yang tersimpan di localStorage (`maul_lang`), dan nilai atribut `lang` pada elemen `<html>` SHALL semuanya konsisten satu sama lain.

**Validates: Requirements 5.2, 6.1**

### Property 8: Language init round-trip dari localStorage

*For any* nilai locale yang valid ("id" atau "en") yang tersimpan di localStorage key `maul_lang`, reinisialisasi Language_Manager SHALL menerapkan locale yang tersimpan tersebut (html[lang] === nilai locale tersebut).

**Validates: Requirements 6.2**

---

## Error Handling

| Skenario | Penanganan |
|---|---|
| `localStorage` tidak tersedia (Safari private mode, storage penuh) | `getSaved()` di kedua manager pakai `try/catch` dan return default value. `saveTheme()` / `saveLocale()` juga pakai `try/catch` dan silent fail. |
| `themeToggle` atau `langToggle` tidak ditemukan di DOM | Guard `if (!toggle) return` / `if (!btn) return` sebelum setiap DOM manipulation. |
| `data-i18n` key tidak ada di Translation_Map | Guard `if (val !== undefined)` — teks lama tidak diganti, bukan error. |
| `contact.js` dimuat sebelum `i18n.js` | Urutan script dijamin di HTML. `window.contactLocaleUpdate` dicek dengan `typeof` sebelum dipanggil. |
| `applyTheme()` dipanggil sebelum DOM ready | Hanya manipulasi `document.documentElement` (tersedia sejak parse dimulai). Manipulasi `#themeToggle` di-guard oleh `DOMContentLoaded`. |

---

## Testing Strategy

Karena fitur ini melibatkan pure functions (toggle logic, Translation_Map lookup, localStorage round-trip), **property-based testing menggunakan fast-check (JavaScript)** sangat tepat digunakan.

### Unit Tests (Example-Based)

Fokus pada kasus konkret dan edge cases:

- Theme_Toggle: ikon yang benar di tiap state
- Language_Toggle: label teks yang benar di tiap state
- Default fallback: tema dan locale default ketika localStorage kosong
- localStorage unavailable: tidak throw error
- `contact.js` integration: `contactLocaleUpdate` dipanggil saat locale berubah

### Property Tests (fast-check)

Menggunakan [fast-check](https://fast-check.io/) minimal 100 iterasi per property. Setiap test dianotasi dengan tag berikut:

```
// Feature: light-mode-language-toggle, Property N: <property_text>
```

**Property 1 — Theme involusi:**
```js
// Feature: light-mode-language-toggle, Property 1: Theme toggle adalah involusi
fc.assert(fc.property(
  fc.constantFrom('light', 'dark'),
  (initialTheme) => {
    themeManager.setTheme(initialTheme);
    themeManager.toggle();
    themeManager.toggle();
    return themeManager.getTheme() === initialTheme;
  }
));
```

**Property 2 — Theme state konsistensi:**
```js
// Feature: light-mode-language-toggle, Property 2: Theme state konsisten
fc.assert(fc.property(
  fc.constantFrom('light', 'dark'),
  (theme) => {
    themeManager.setTheme(theme);
    const hasClass = document.documentElement.classList.contains('light-mode');
    const stored   = localStorage.getItem('maul_theme');
    const api      = themeManager.getTheme();
    return api === theme
      && stored === theme
      && (theme === 'light') === hasClass;
  }
));
```

**Property 5 — applyLocale mengganti semua data-i18n:**
```js
// Feature: light-mode-language-toggle, Property 5: applyLocale mengganti SEMUA elemen data-i18n
fc.assert(fc.property(
  fc.constantFrom('id', 'en'),
  (locale) => {
    i18n.setLocale(locale);
    const elements = document.querySelectorAll('[data-i18n]');
    return Array.from(elements).every(el => {
      const key = el.getAttribute('data-i18n');
      const expected = TRANSLATIONS[locale][key];
      return expected === undefined || el.textContent === expected;
    });
  }
));
```

**Property 6 — Translation_Map completeness:**
```js
// Feature: light-mode-language-toggle, Property 6: Translation_Map mencakup semua key DOM
fc.assert(fc.property(
  fc.constantFrom('id', 'en'),
  (locale) => {
    const keys = Array.from(document.querySelectorAll('[data-i18n]'))
      .map(el => el.getAttribute('data-i18n'));
    return keys.every(key => TRANSLATIONS[locale][key] !== undefined);
  }
));
```
