# mauLportofolio.dev 2.0

> Portfolio pribadi **Hafiizh Maulana** — RPL Student & Junior Web Developer

Website portfolio statis yang dibangun sepenuhnya dengan HTML5, CSS3, dan Vanilla JavaScript — tanpa framework, tanpa backend.

---

## Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| **HTML5** | Semantic markup, SEO meta tags |
| **CSS3** | Custom properties, Flexbox, Grid, animasi scroll |
| **Vanilla JavaScript ES6+** | Tanpa framework apapun |
| **Font Awesome 6** (CDN) | Ikon di seluruh halaman |
| **Google Fonts** (CDN) | Inter + JetBrains Mono |

> Tidak menggunakan Laravel, React, Vue, Bootstrap, Tailwind, atau framework lainnya.

---

## Struktur Folder

```
portfolio/
├── index.html                        # Satu halaman utama (single-page)
│
├── css/
│   └── style.css                     # Semua styling (3.200+ baris)
│
├── js/
│   ├── main.js                       # Navbar scroll, hamburger, animasi, back-to-top
│   └── contact.js                    # Formulir kontak + localStorage message board
│
├── assets/
│   ├── images/
│   │   ├── fotoprofil.png.png        # Foto profil (hero section)
│   │   ├── kantin.jpg.png            # Thumbnail project Kantin Melati Area
│   │   ├── galeri.png.png            # Thumbnail project Galeri Sekolah
│   │   ├── majelissayur.png.jpeg     # Thumbnail project Majelis Sayur
│   │   ├── linguanova.jpg.png        # Thumbnail project LinguaNova
│   │   ├── SDN Cipete Selatan School Emblem.png   # Logo SDN (timeline)
│   │   ├── YAPENKA Book Burst Logo.png            # Logo SMP YAPENKA (timeline)
│   │   └── SMKN 20 JAKARTA.jpeg                  # Logo SMK Negeri 20 Jakarta (timeline)
│   └── favicon/
│       └── favicon.svg               # Favicon
│
└── README.md
```

---

## Sections

| Section | ID | Isi |
|---------|----|-----|
| Hero / Tentang | #tentang | Intro, foto profil, stat chips |
| Keahlian | #keahlian | Tech stack: PHP, Laravel, MySQL, HTML5, CSS3, JavaScript |
| Project | #project | 4 project card dengan gambar background blur + tombol GitHub |
| Riwayat | #riwayat | Timeline pendidikan (SDN → SMP → SMK) dengan logo sekolah dan link Google Maps |
| Kontak | #kontak | 4 contact card + formulir pesan berbasis localStorage |

---

## Project

| # | Nama | Repository |
|---|------|------------|
| 1 | Website Kantin Melati Area | [MauL2209/kantin](https://github.com/MauL2209/kantin.git) |
| 2 | Galeri Sekolah | [MauL2209/galeri-sekolah](https://github.com/MauL2209/galeri-sekolah.git) |
| 3 | Majelis Sayur | [VoxluxcK-A/Majelis-Sayur](https://github.com/VoxluxcK-A/Majelis-Sayur.git) |
| 4 | LinguaNova | [mbintangjuniro2009-byte/LunaVerse](https://github.com/mbintangjunior2009-byte/LunaVerse.git) |

---

## Riwayat Pendidikan

| Sekolah | Periode | Status |
|---------|---------|--------|
| SDN Cipete Selatan 03 Pagi | 2015 — 2021 | Lulus |
| SMP YAPENKA | 2021 — 2024 | Lulus |
| SMK Negeri 20 Jakarta (RPL) | 2024 — Sekarang | Sedang Berlangsung |

---

## Fitur JavaScript

### main.js
- Navbar sticky dengan efek scrolled setelah 20px scroll
- Hamburger menu mobile (slide-in dari kanan)
- Active nav highlight berdasarkan section yang terlihat (IntersectionObserver)
- Animasi nimate-on-scroll saat elemen masuk viewport
- Tombol back-to-top (muncul setelah scroll 400px)
- Footer year dinamis
- Placeholder project button (disabled, tidak bisa diklik)

### contact.js
- Formulir kontak: field **Nama Lengkap** + **Pesan** (email & subjek dihapus)
- Validasi: tidak boleh kosong, pesan minimal 5 karakter
- Pesan disimpan ke **localStorage** (key: maul_messages) — tidak ada backend/SMTP
- Daftar pesan ditampilkan real-time, terbaru di atas
- Tombol hapus per pesan
- Counter jumlah pesan
- Empty state saat belum ada pesan
- Semua output menggunakan 	extContent (XSS-safe)
- Character counter pada textarea

---

## Desain

| Token | Nilai |
|-------|-------|
| Background | #0B0F19 |
| Surface | #111827 |
| Surface-2 | #131c2e |
| Accent Cyan | #06B6D4 |
| Text | #e2e8f0 |
| Text Muted | #94a3b8 |
| Error | #f87171 |
| Success | #4ade80 |
| Font Sans | Inter |
| Font Mono | JetBrains Mono |

---

## Cara Menjalankan

1. Clone atau download repository ini
2. Buka folder portfolio/ di VS Code
3. Klik **Go Live** (VS Code Live Server) pada index.html

`
Tidak perlu npm install, build step, atau konfigurasi apapun.
`

> Koneksi internet diperlukan untuk Google Fonts dan Font Awesome (CDN).

---

## Responsive Breakpoints

| Breakpoint | Perilaku |
|------------|---------|
| > 1024px | Layout dua kolom (hero, contact) |
| ≤ 1024px | Hero satu kolom, foto di atas, contact stack |
| ≤ 768px | Hamburger menu, project grid 1 kolom |
| ≤ 480px | Font lebih kecil, hero actions full-width |

---

## Kontak

| Platform | Akun |
|----------|------|
| Email | [hafiizmln22309@gmail.com](mailto:hafiizmln22309@gmail.com) |
| Instagram | [@maulanaaapis_](https://www.instagram.com/maulanaaapis_) |
| GitHub | [MauLz17](https://github.com/MauLz17) |
| LinkedIn | [Hafiizh Maulana](https://www.linkedin.com/in/hafiizh-maulana-sohibbull-waffa-2b70b643b) |

---

© 2026 Hafiizh Maulana. All rights reserved.  
Designed & Built by Hafiizh Maulana.