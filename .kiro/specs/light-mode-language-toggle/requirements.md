# Requirements Document

## Introduction

Dua fitur baru akan ditambahkan ke portfolio website Hafiizh Maulana (`index.html`) yang dibangun dengan pure HTML, CSS, dan JavaScript vanilla:

1. **Light Mode / Dark Mode Toggle** — tombol di navbar untuk beralih antara dark mode (default) dan light mode, dengan preferensi yang disimpan di localStorage.
2. **Language Toggle (Indonesia / English)** — tombol di navbar untuk beralih antara Bahasa Indonesia (default) dan English, dengan semua teks konten halaman yang ikut berganti, serta preferensi yang disimpan di localStorage.

Kedua fitur berjalan sepenuhnya di sisi klien tanpa library eksternal, memanfaatkan CSS custom properties yang sudah ada untuk theming, dan harus menjaga aksesibilitas yang sudah diterapkan pada navbar.

## Glossary

- **Theme_Toggle**: Tombol interaktif di navbar yang mengontrol pergantian antara dark mode dan light mode.
- **Language_Toggle**: Tombol interaktif di navbar yang mengontrol pergantian antara Bahasa Indonesia dan English.
- **Theme_Manager**: Modul JavaScript yang mengelola status tema, penerapan ke DOM, dan persistensi localStorage.
- **Language_Manager**: Modul JavaScript yang mengelola status bahasa, penggantian teks di DOM, dan persistensi localStorage.
- **Dark_Mode**: Tema default saat ini menggunakan CSS custom properties dengan latar belakang gelap (`--clr-bg: #0B0F19`).
- **Light_Mode**: Tema alternatif dengan latar belakang terang, mengganti nilai CSS custom properties pada elemen `:root`.
- **Locale_ID**: Bahasa Indonesia, bahasa default halaman.
- **Locale_EN**: English, bahasa alternatif.
- **data-i18n**: Atribut HTML yang ditambahkan ke elemen teks untuk mengidentifikasi kunci terjemahan.
- **Translation_Map**: Objek JavaScript yang memetakan kunci `data-i18n` ke string teks dalam Bahasa Indonesia dan English.
- **localStorage**: Web Storage API browser untuk menyimpan preferensi pengguna secara persisten.

---

## Requirements

### Requirement 1: Theme Toggle — Tampilan Tombol di Navbar

**User Story:** Sebagai pengunjung website, saya ingin melihat tombol toggle tema di navbar, sehingga saya bisa mengetahui dan mengakses fitur pergantian tema dengan mudah.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL ditampilkan di navbar di antara link navigasi dan tombol CTA "Hubungi Saya", baik di desktop maupun di versi mobile.
2. WHEN Dark_Mode aktif, THE Theme_Toggle SHALL menampilkan ikon matahari (`fa-sun`) sebagai indikasi bahwa klik akan beralih ke Light_Mode.
3. WHEN Light_Mode aktif, THE Theme_Toggle SHALL menampilkan ikon bulan (`fa-moon`) sebagai indikasi bahwa klik akan beralih ke Dark_Mode.
4. THE Theme_Toggle SHALL memiliki atribut `aria-label` yang deskriptif dan diperbarui sesuai dengan tema aktif saat ini untuk mendukung aksesibilitas screen reader.
5. THE Theme_Toggle SHALL memiliki atribut `aria-pressed` yang diperbarui ke nilai `"true"` saat Light_Mode aktif dan `"false"` saat Dark_Mode aktif.

---

### Requirement 2: Theme Toggle — Fungsionalitas Pergantian Tema

**User Story:** Sebagai pengunjung website, saya ingin bisa mengklik tombol toggle untuk mengganti antara dark mode dan light mode, sehingga saya bisa membaca konten dengan kenyamanan visual sesuai preferensi saya.

#### Acceptance Criteria

1. WHEN Theme_Toggle diklik, THE Theme_Manager SHALL mengganti tema aktif dari Dark_Mode ke Light_Mode atau sebaliknya.
2. WHEN Light_Mode diaktifkan, THE Theme_Manager SHALL menambahkan class `light-mode` pada elemen `<html>` dan menghapus class `dark-mode` jika ada.
3. WHEN Dark_Mode diaktifkan, THE Theme_Manager SHALL menghapus class `light-mode` dari elemen `<html>`.
4. THE Light_Mode SHALL mendefinisikan ulang CSS custom properties di selector `html.light-mode` untuk memberikan warna latar belakang terang, teks gelap, dan kontras yang memadai pada semua komponen (navbar, kartu, form, timeline, footer).
5. WHEN tema diganti, THE Theme_Manager SHALL memperbarui ikon dan `aria-label` pada Theme_Toggle secara sinkron tanpa perlu memuat ulang halaman.
6. WHEN tema diganti, THE Theme_Manager SHALL menerapkan transisi CSS `transition: background-color 0.3s ease, color 0.3s ease` pada `body` agar pergantian terasa halus.

---

### Requirement 3: Theme Toggle — Persistensi Preferensi Tema

**User Story:** Sebagai pengunjung website, saya ingin preferensi tema saya tersimpan, sehingga saya tidak perlu mengatur ulang tema setiap kali membuka halaman.

#### Acceptance Criteria

1. WHEN tema diganti, THE Theme_Manager SHALL menyimpan nilai tema aktif (`"light"` atau `"dark"`) ke localStorage dengan kunci `"maul_theme"`.
2. WHEN halaman dimuat, THE Theme_Manager SHALL membaca nilai dari localStorage kunci `"maul_theme"` dan menerapkan tema yang tersimpan sebelum halaman dirender untuk mencegah flash of unstyled content (FOUC).
3. IF nilai `"maul_theme"` tidak ditemukan di localStorage, THEN THE Theme_Manager SHALL menerapkan Dark_Mode sebagai tema default.
4. IF browser tidak mendukung localStorage, THEN THE Theme_Manager SHALL menerapkan Dark_Mode sebagai fallback dan melanjutkan operasi normal tanpa melempar error.

---

### Requirement 4: Language Toggle — Tampilan Tombol di Navbar

**User Story:** Sebagai pengunjung website, saya ingin melihat tombol toggle bahasa di navbar, sehingga saya bisa mengetahui dan mengakses fitur pergantian bahasa dengan mudah.

#### Acceptance Criteria

1. THE Language_Toggle SHALL ditampilkan di navbar berdampingan dengan Theme_Toggle, di antara link navigasi dan tombol CTA.
2. WHEN Locale_ID aktif, THE Language_Toggle SHALL menampilkan label teks `"EN"` untuk mengindikasikan bahwa klik akan beralih ke English.
3. WHEN Locale_EN aktif, THE Language_Toggle SHALL menampilkan label teks `"ID"` untuk mengindikasikan bahwa klik akan beralih ke Bahasa Indonesia.
4. THE Language_Toggle SHALL memiliki atribut `aria-label` yang deskriptif (`"Switch to English"` atau `"Ganti ke Bahasa Indonesia"`) sesuai bahasa aktif saat ini.
5. THE Language_Toggle SHALL memiliki atribut `lang` yang diperbarui sesuai dengan locale target (bukan locale aktif) agar screen reader melafalkan label dengan benar.

---

### Requirement 5: Language Toggle — Fungsionalitas Pergantian Bahasa

**User Story:** Sebagai pengunjung website, saya ingin semua teks konten di halaman berganti bahasa saat saya mengklik tombol toggle, sehingga saya bisa membaca informasi dalam bahasa yang saya pilih.

#### Acceptance Criteria

1. WHEN Language_Toggle diklik, THE Language_Manager SHALL mengganti locale aktif dari Locale_ID ke Locale_EN atau sebaliknya.
2. WHEN locale diganti, THE Language_Manager SHALL memperbarui atribut `lang` pada elemen `<html>` ke nilai `"id"` atau `"en"` sesuai locale aktif.
3. WHEN locale diganti, THE Language_Manager SHALL mencari semua elemen yang memiliki atribut `data-i18n` di dalam DOM dan mengganti `textContent` atau `placeholder`-nya dengan string dari Translation_Map sesuai locale aktif.
4. THE Translation_Map SHALL menyediakan terjemahan untuk semua teks konten yang terlihat oleh pengguna di section berikut: hero (badge, judul, deskripsi, tombol, label statistik), keahlian (eyebrow, judul, deskripsi, level setiap skill), project (eyebrow, judul, deskripsi section, judul dan deskripsi setiap project, notice), riwayat pendidikan (eyebrow, judul, deskripsi section, periode, nama jenjang, detail, badge status, label maps link), kontak (eyebrow, judul, deskripsi section, label form, placeholder, teks tombol, judul message board), dan footer (tagline, subtitle, judul navigasi, label social).
5. WHEN locale diganti, THE Language_Manager SHALL memperbarui teks statis di dalam atribut `aria-label` pada elemen yang mengandung `data-i18n-aria` agar aksesibilitas screen reader tetap terjaga.
6. WHEN locale diganti, THE Language_Manager SHALL memperbarui teks yang sudah ada di dalam `contact.js` yang menggunakan teks hardcoded seperti pesan validasi dan notifikasi form dengan memanggil fungsi update locale yang diekspor oleh Language_Manager.

---

### Requirement 6: Language Toggle — Persistensi Preferensi Bahasa

**User Story:** Sebagai pengunjung website, saya ingin preferensi bahasa saya tersimpan, sehingga saya tidak perlu mengatur ulang bahasa setiap kali membuka halaman.

#### Acceptance Criteria

1. WHEN locale diganti, THE Language_Manager SHALL menyimpan nilai locale aktif (`"id"` atau `"en"`) ke localStorage dengan kunci `"maul_lang"`.
2. WHEN halaman dimuat, THE Language_Manager SHALL membaca nilai dari localStorage kunci `"maul_lang"` dan menerapkan locale yang tersimpan setelah DOM selesai dimuat.
3. IF nilai `"maul_lang"` tidak ditemukan di localStorage, THEN THE Language_Manager SHALL menerapkan Locale_ID sebagai bahasa default.
4. IF browser tidak mendukung localStorage, THEN THE Language_Manager SHALL menerapkan Locale_ID sebagai fallback dan melanjutkan operasi normal tanpa melempar error.

---

### Requirement 7: Integrasi Navbar — Penempatan Tombol

**User Story:** Sebagai pengunjung website, saya ingin kedua tombol toggle tersedia dan terlihat dengan baik di semua ukuran layar, sehingga saya dapat menggunakannya dari perangkat apapun.

#### Acceptance Criteria

1. THE Theme_Toggle dan Language_Toggle SHALL ditempatkan di dalam elemen `.navbar__actions` di navbar, sebelum tombol CTA "Hubungi Saya".
2. WHEN lebar viewport kurang dari atau sama dengan 768px, THE Theme_Toggle dan Language_Toggle SHALL tetap terlihat di navbar (tidak disembunyikan seperti tombol CTA "Hubungi Saya" di mobile breakpoint).
3. THE Theme_Toggle dan Language_Toggle SHALL memiliki ukuran area sentuh minimal 44×44 piksel sesuai panduan aksesibilitas WCAG 2.1.
4. WHEN Light_Mode aktif, THE Theme_Toggle dan Language_Toggle SHALL menyesuaikan warna ikon dan border-nya menggunakan CSS custom properties yang sudah didefinisikan ulang oleh Light_Mode.
5. THE navbar__actions SHALL menampilkan tombol-tombol dalam urutan: Theme_Toggle, Language_Toggle, lalu tombol CTA "Hubungi Saya".

---

### Requirement 8: Implementasi Teknis — Struktur File

**User Story:** Sebagai developer yang akan melakukan maintenance, saya ingin fitur tema dan bahasa diimplementasikan dalam file JavaScript yang terpisah dan terorganisir, sehingga kode mudah dipahami dan dimodifikasi.

#### Acceptance Criteria

1. THE Theme_Manager SHALL diimplementasikan dalam file `js/theme.js` yang berdiri sendiri.
2. THE Language_Manager SHALL diimplementasikan dalam file `js/i18n.js` yang berdiri sendiri beserta Translation_Map lengkapnya.
3. THE `index.html` SHALL memuat `js/theme.js` sebelum tag penutup `</body>`, setelah `js/main.js` dan sebelum `js/contact.js`.
4. THE `index.html` SHALL memuat `js/i18n.js` sebelum tag penutup `</body>`, setelah `js/theme.js` dan sebelum `js/contact.js`.
5. THE Light_Mode styles SHALL didefinisikan di dalam file `css/style.css` yang sudah ada, menggunakan selector `html.light-mode` untuk mengganti nilai CSS custom properties, bukan dengan membuat file CSS baru.
