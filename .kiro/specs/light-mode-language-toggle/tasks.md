# Implementation Plan: Light Mode & Language Toggle

## Overview

Implementasi dua fitur interaktif pada portfolio `mauLportofolio.dev 2.0` menggunakan pure HTML/CSS/JavaScript vanilla:

1. **Theme Toggle** — beralih antara Dark Mode (default) dan Light Mode via CSS custom properties override, disimpan di localStorage.
2. **Language Toggle** — beralih antara Bahasa Indonesia (default) dan English via Translation_Map dan atribut `data-i18n`, disimpan di localStorage.

Implementasi dilakukan secara berurutan: HTML structure → CSS styles → JavaScript logic → integrasi dan wiring.

---

## Tasks

- [ ] 1. Tambahkan tombol Theme Toggle dan Language Toggle ke HTML (navbar + mobile nav)
  - Buka `portfolio/index.html`
  - Di dalam `.navbar__actions`, sisipkan dua `<button>` **sebelum** tombol CTA `<a href="#kontak" class="btn btn--primary btn--sm">`:
    - `#themeToggle` dengan `aria-label="Aktifkan Light Mode"`, `aria-pressed="false"`, dan ikon `fa-solid fa-sun`
    - `#langToggle` dengan `aria-label="Switch to English"`, `lang="en"`, dan teks `EN`
  - Urutan akhir di `.navbar__actions`: `#themeToggle` → `#langToggle` → `.btn--primary` → `.hamburger`
  - Referensi HTML dari design.md section "Navbar Integration"
  - _Requirements: 1.1, 4.1, 7.1, 7.5, 8.3, 8.4_

- [ ] 2. Tambahkan atribut `data-i18n` ke semua elemen teks di index.html
  - Buka `portfolio/index.html`
  - Tambahkan `data-i18n="<key>"` ke setiap elemen teks yang tercakup di Translation_Map
  - Daftar lengkap key dan elemen target ada di design.md section "Data Models → Translation_Map Structure"
  - Gunakan `data-i18n-placeholder="<key>"` untuk atribut `placeholder` pada `<input>` dan `<textarea>`
  - Gunakan `data-i18n-aria="<key>"` untuk elemen yang terjemahannya diterapkan ke `aria-label`
  - Cakupan wajib: Navbar links, Hero (badge, title line 1, desc, buttons, stat labels, photo badge), Skills (eyebrow, title, desc, semua skill level), Projects (eyebrow, title, desc, judul & desc setiap project, notice), Education (eyebrow, title, desc, semua data tiap sekolah: period, name, level, detail, badge, maps link), Contact (eyebrow, title, desc, form labels, placeholders, submit button, inbox title), Footer (nav title, social title, tagline, subtitle, built text)
  - _Requirements: 5.3, 5.4_

- [ ] 3. Tambahkan CSS Light Mode override dan style tombol toggle ke style.css
  - Buka `portfolio/css/style.css`
  - Append **Section 26: Theme & Language Toggle Buttons** di akhir file:
    - `.theme-toggle` — `width: 44px`, `height: 44px`, `border-radius: var(--radius-sm)`, `background: var(--clr-surface)`, `border: 1.5px solid var(--clr-border)`, hover state dengan `color: var(--clr-cyan)` dan `border-color: var(--clr-cyan)`
    - `.lang-toggle` — dimensi sama dengan theme-toggle, `font-size: 0.75rem`, `font-weight: 700`, `font-family: var(--font-mono)`, hover state identik
    - Media query `@media (max-width: 768px)`: pastikan `.theme-toggle` dan `.lang-toggle` tetap `display: flex` (tidak di-hide bersama `.btn--primary`)
  - Append **Section 27: Light Mode Override** di akhir file:
    - `html.light-mode { ... }` — override semua CSS custom properties: `--clr-bg: #f8fafc`, `--clr-bg-secondary: #f1f5f9`, `--clr-surface: #ffffff`, `--clr-surface-2: #f8fafc`, `--clr-border: #e2e8f0`, `--clr-border-light: #cbd5e1`, `--clr-cyan: #0891b2`, `--clr-cyan-light: #06b6d4`, `--clr-cyan-dim: rgba(8,145,178,0.1)`, `--clr-cyan-glow: rgba(8,145,178,0.2)`, `--clr-text: #0f172a`, `--clr-text-muted: #334155`, `--clr-text-dim: #64748b`, `--clr-white: #0f172a`, `--clr-error: #dc2626`, `--clr-success: #16a34a`, `--shadow-card`, `--shadow-cyan`
    - Transisi smooth: `html.light-mode body, body { transition: background-color 0.3s ease, color 0.3s ease; }`
    - Override spesifik untuk `.navbar`, `.navbar.scrolled`, `.photo-frame__border`, `.mobile-nav`, dan scrollbar `webkit` agar konsisten di light mode
    - Lihat design.md section "CSS — html.light-mode Override" untuk nilai lengkap
  - _Requirements: 2.4, 2.6, 7.4_

- [ ] 4. Buat js/theme.js (Theme_Manager)
  - Buat file baru `portfolio/js/theme.js`
  - Implementasikan IIFE dengan `'use strict'`
  - `STORAGE_KEY = 'maul_theme'`, `DEFAULT = 'dark'`
  - Fungsi `getSaved()` — baca localStorage dengan try/catch, fallback ke `DEFAULT`
  - Fungsi `applyTheme(theme)` — manipulasi `document.documentElement.classList` (add/remove `'light-mode'`), lalu update ikon, `aria-label`, dan `aria-pressed` pada `#themeToggle` (dengan guard `if (!toggle) return`)
  - Fungsi `saveTheme(theme)` — tulis ke localStorage dengan try/catch (silent fail)
  - **PENTING — FOUC prevention**: panggil `applyTheme(_current)` sekali di luar DOMContentLoaded agar class `light-mode` diterapkan ke `<html>` sebelum browser merender body
  - `window.themeManager` — ekspos `getTheme()`, `setTheme(value)`, `toggle()`
  - Di dalam `DOMContentLoaded`: panggil `applyTheme(_current)` lagi (untuk update tombol yang sudah ada di DOM) dan pasang event listener `click` pada `#themeToggle`
  - Lihat design.md section "js/theme.js — Theme_Manager" untuk pseudocode lengkap
  - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1, 3.2, 3.3, 3.4_

  - [ ]* 4.1 Tulis property test untuk Theme_Manager (Property 1 & 2)
    - **Property 1: Theme toggle adalah involusi**
    - **Validates: Requirements 2.1**
    - **Property 2: Theme state konsisten antara DOM, localStorage, dan API**
    - **Validates: Requirements 2.2, 2.3, 3.1**
    - Gunakan fast-check: `fc.assert(fc.property(fc.constantFrom('light','dark'), ...))`
    - Tag: `// Feature: light-mode-language-toggle, Property 1: Theme toggle adalah involusi`

  - [ ]* 4.2 Tulis unit test untuk Theme_Manager
    - Test: ikon `fa-sun` tampil di dark mode, `fa-moon` tampil di light mode
    - Test: `aria-pressed="true"` saat light mode, `"false"` saat dark mode
    - Test: default fallback ke `'dark'` ketika localStorage kosong
    - Test: tidak throw error ketika localStorage tidak tersedia
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 3.3, 3.4_

- [ ] 5. Buat js/i18n.js (Language_Manager + Translation_Map lengkap)
  - Buat file baru `portfolio/js/i18n.js`
  - Implementasikan IIFE dengan `'use strict'`
  - `STORAGE_KEY = 'maul_lang'`, `DEFAULT = 'id'`
  - Definisikan `const TRANSLATIONS = { id: { ... }, en: { ... } }` — gunakan Translation_Map **lengkap** dari design.md section "Data Models → Translation_Map Structure" (semua key: nav, hero, skills, projects, edu, contact, footer)
  - Fungsi `getSaved()` — baca localStorage dengan try/catch, fallback ke `DEFAULT`
  - Fungsi `applyLocale(locale)`:
    1. Set `document.documentElement.setAttribute('lang', locale)`
    2. Loop `[data-i18n]` → ganti `textContent` jika key ada di map
    3. Loop `[data-i18n-placeholder]` → ganti `setAttribute('placeholder', val)`
    4. Loop `[data-i18n-aria]` → ganti `setAttribute('aria-label', val)`
    5. Update `#langToggle` text, `lang` attr, dan `aria-label` sesuai locale aktif
    6. Panggil `window.contactLocaleUpdate(locale)` jika fungsinya sudah ada (guard dengan `typeof`)
  - Fungsi `saveLocale(locale)` — tulis ke localStorage dengan try/catch (silent fail)
  - `window.i18n` — ekspos `getLocale()`, `setLocale(value)`, `toggle()`, `t(key)`
  - Di dalam `DOMContentLoaded`: panggil `applyLocale(_current)` dan pasang event listener `click` pada `#langToggle`
  - Lihat design.md section "js/i18n.js — Language_Manager" untuk pseudocode lengkap
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4_

  - [ ]* 5.1 Tulis property test untuk Language_Manager (Property 4, 5, 6, 7)
    - **Property 4: Language toggle adalah involusi**
    - **Validates: Requirements 5.1**
    - **Property 5: applyLocale mengganti SEMUA elemen data-i18n**
    - **Validates: Requirements 5.3**
    - **Property 6: Translation_Map mencakup semua key yang ada di DOM**
    - **Validates: Requirements 5.4**
    - **Property 7: Locale state konsisten antara DOM, localStorage, dan API**
    - **Validates: Requirements 5.2, 6.1**
    - Tag contoh: `// Feature: light-mode-language-toggle, Property 4: Language toggle adalah involusi`

  - [ ]* 5.2 Tulis unit test untuk Language_Manager
    - Test: tombol `#langToggle` menampilkan `'EN'` saat locale ID aktif, `'ID'` saat locale EN aktif
    - Test: `aria-label` tombol berganti sesuai locale target
    - Test: `html[lang]` diperbarui setelah `setLocale()`
    - Test: default fallback ke `'id'` ketika localStorage kosong
    - Test: tidak throw error ketika localStorage tidak tersedia
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 6.3, 6.4_

- [ ] 6. Update contact.js untuk integrasi locale
  - Buka `portfolio/js/contact.js`
  - **Update `renderMessages()`** — ganti teks hardcoded `'pesan'` pada `messageCount` untuk menggunakan `window.i18n?.t(...)` jika tersedia:
    ```js
    const label = typeof window.i18n !== 'undefined'
      ? (n === 1
          ? window.i18n.t('contact.inbox.count.single') || 'pesan'
          : window.i18n.t('contact.inbox.count.plural') || 'pesan')
      : 'pesan';
    messageCount.textContent = n === 0 ? '0 ' + label : n + ' ' + label;
    ```
  - **Tambahkan fungsi `window.contactLocaleUpdate`** di akhir file (sebelum `renderMessages()` awal):
    - Perbarui `fields.fullName.label` dan `fields.message.label` dari `window.i18n.t(...)`
    - Perbarui teks tombol submit (jika tidak sedang loading/disabled) menggunakan `window.i18n.t('contact.form.submit')`
    - Panggil `renderMessages()` untuk memperbarui label message count
  - **Update `validateField()`** — gunakan `window.i18n?.t(key)` untuk pesan validasi jika tersedia, dengan fallback ke string hardcoded yang sudah ada
  - **Update `showFormNotice()`** di submit handler — ganti string success hardcoded dengan `window.i18n?.t('contact.form.success')?.replace('{name}', name) || 'Pesan berhasil dikirim! Terima kasih, ' + name + '.'`
  - **Update `deleteMessage()`** — ganti string toast hardcoded dengan `window.i18n?.t('contact.toast.deleted') || 'Pesan berhasil dihapus.'`
  - **Update character counter** — ganti format string hardcoded dengan `window.i18n?.t('contact.form.counter')?.replace('{n}', len) || ...`
  - Pastikan semua perubahan menggunakan optional chaining (`?.`) agar tidak error jika `i18n.js` belum dimuat
  - _Requirements: 5.6_

  - [ ]* 6.1 Tulis unit test untuk integrasi contact.js + i18n
    - Test: `contactLocaleUpdate('en')` mengubah label field menjadi teks English
    - Test: `contactLocaleUpdate('id')` mengubah label field kembali ke Bahasa Indonesia
    - Test: `contactLocaleUpdate` aman dipanggil ketika `window.i18n` belum ada (tidak throw)
    - _Requirements: 5.6_

- [ ] 7. Checkpoint — Verifikasi HTML & CSS sebelum lanjut ke wiring
  - Buka browser dan load `portfolio/index.html`
  - Pastikan dua tombol (`#themeToggle` dan `#langToggle`) terlihat di navbar, di antara nav links dan tombol CTA
  - Pastikan di mobile viewport (≤ 768px) kedua tombol masih terlihat
  - Pastikan tidak ada JavaScript error di console (file JS belum semuanya ada, tapi tidak boleh ada error CSS)
  - Jika ada masalah tampilan, perbaiki CSS sebelum lanjut

- [ ] 8. Update script loading order di index.html dan finalisasi wiring
  - Buka `portfolio/index.html`
  - Ubah urutan tag `<script>` sebelum `</body>` menjadi:
    ```html
    <script src="js/main.js"></script>
    <script src="js/theme.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/contact.js"></script>
    ```
  - Verifikasi `js/theme.js` dimuat **pertama** di antara file baru untuk mencegah FOUC
  - Verifikasi `js/i18n.js` dimuat **sebelum** `js/contact.js` agar `window.i18n` sudah tersedia saat `contact.js` dijalankan
  - _Requirements: 8.3, 8.4_

  - [ ]* 8.1 Tulis property test untuk init round-trip dari localStorage (Property 3 & 8)
    - **Property 3: Theme init round-trip dari localStorage**
    - **Validates: Requirements 3.2**
    - **Property 8: Language init round-trip dari localStorage**
    - **Validates: Requirements 6.2**
    - Simulasikan inisialisasi ulang dengan mock localStorage berisi nilai tertentu, verifikasi class/attribute yang diterapkan

- [ ] 9. Checkpoint Final — Pastikan semua fitur berjalan end-to-end
  - Pastikan semua tests pass, tanyakan kepada user jika ada pertanyaan
  - Checklist manual:
    - Klik `#themeToggle` → halaman berganti ke light mode (background putih, teks gelap)
    - Refresh halaman → tema yang terakhir dipilih tetap aktif (tersimpan di localStorage)
    - Klik `#langToggle` → semua teks berganti ke English
    - Refresh halaman → bahasa yang terakhir dipilih tetap aktif
    - Buka di mobile (≤ 768px) → kedua tombol masih tampil di navbar
    - Buka di Safari private mode → tidak ada error (localStorage unavailable fallback)

---

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Urutan task **sangat penting**: HTML structure (1–2) harus selesai sebelum CSS (3), CSS sebelum JS (4–5), JS sebelum integrasi (6), semua sebelum wiring final (8)
- Task 2 (data-i18n attributes) adalah yang paling verbose — gunakan Translation_Map di design.md sebagai panduan key
- Semua property test menggunakan [fast-check](https://fast-check.io/) minimal 100 iterasi
- `theme.js` memanipulasi `document.documentElement` sebelum DOM ready — ini by design untuk mencegah FOUC
- `contact.js` menggunakan optional chaining (`?.`) ke `window.i18n` agar tetap berfungsi normal sebelum i18n.js dimuat

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2", "3"] },
    { "id": 2, "tasks": ["4", "5"] },
    { "id": 3, "tasks": ["4.1", "4.2", "5.1", "5.2", "6"] },
    { "id": 4, "tasks": ["6.1", "7"] },
    { "id": 5, "tasks": ["8"] },
    { "id": 6, "tasks": ["8.1", "9"] }
  ]
}
```
