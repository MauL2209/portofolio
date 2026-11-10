/**
 * i18n.js - mauLportofolio.dev 2.0
 * Language_Manager: Bahasa Indonesia / English toggle
 * Translation_Map lengkap untuk semua section halaman.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'maul_lang';
  var DEFAULT     = 'id';

  var TRANSLATIONS = {
    id: {
      /* Navbar */
      'nav.tentang': 'Tentang',
      'nav.keahlian': 'Keahlian',
      'nav.project': 'Project',
      'nav.riwayat': 'Riwayat',
      'nav.kontak': 'Kontak',
      'nav.cta': 'Hubungi Saya',
      /* Hero */
      'hero.badge': 'RPL Student & Junior Web Developer',
      'hero.title.line1': 'Hi, saya',
      'hero.desc': 'Saya adalah siswa Rekayasa Perangkat Lunak yang tertarik pada Web Development dan Software Development. Saya senang membangun website yang modern, fungsional, dan mudah digunakan.',
      'hero.btn.project': 'Lihat Project',
      'hero.btn.contact': 'Hubungi Saya',
      'hero.stat.projects.label': 'Projects',
      'hero.stat.stack.label': 'Tech Stack',
      'hero.stat.years.label': 'Tahun Belajar',
      'hero.photo.badge': 'RPL Student & Junior Web Developer',
      /* Skills */
      'skills.eyebrow': 'My Arsenal',
      'skills.title': 'Tech Stack & Skills',
      'skills.desc': 'Teknologi dan tools yang saya gunakan untuk membangun aplikasi web.',
      'skills.level.backend': 'Backend',
      'skills.level.framework': 'Framework',
      'skills.level.database': 'Database',
      'skills.level.markup': 'Markup',
      'skills.level.styling': 'Styling',
      'skills.level.frontend': 'Frontend',
      /* Projects */
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
      /* Education */
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
      /* Contact */
      'contact.eyebrow': 'Get In Touch',
      'contact.title': 'Hubungi Saya',
      'contact.desc': 'Jangan ragu untuk menghubungi saya. Saya terbuka untuk diskusi project, kolaborasi, maupun pertanyaan seputar pengembangan web.',
      'contact.form.name.label': 'Nama Lengkap',
      'contact.form.name.placeholder': 'Masukkan nama lengkap Anda',
      'contact.form.msg.label': 'Pesan',
      'contact.form.msg.placeholder': 'Tulis pesan Anda di sini...',
      'contact.form.submit': 'Kirim Pesan',
      'contact.inbox.title': 'Pesan Masuk',
      'contact.empty': 'Belum ada pesan yang masuk.',
      'contact.validate.name.empty': 'Nama Lengkap tidak boleh kosong.',
      'contact.validate.msg.empty': 'Pesan tidak boleh kosong.',
      'contact.validate.msg.short': 'Pesan minimal 5 karakter.',
      'contact.validate.general': 'Mohon periksa kembali isian formulir Anda.',
      'contact.form.success': 'Pesan berhasil dikirim! Terima kasih, {name}.',
      'contact.toast.deleted': 'Pesan berhasil dihapus.',
      'contact.toast.sent': 'Pesan berhasil dikirim!',
      'contact.counter': '{n} karakter',
      'contact.counter.min': '{n} karakter (min. {min})',
      'contact.inbox.count': '{n} pesan',
      /* Footer */
      'footer.tagline': 'Hafiizh Maulana',
      'footer.subtitle': 'RPL Student & Junior Web Developer',
      'footer.nav.title': 'Navigasi',
      'footer.social.title': 'Social Media',
    },

    en: {
      /* Navbar */
      'nav.tentang': 'About',
      'nav.keahlian': 'Skills',
      'nav.project': 'Projects',
      'nav.riwayat': 'Education',
      'nav.kontak': 'Contact',
      'nav.cta': 'Contact Me',
      /* Hero */
      'hero.badge': 'RPL Student & Junior Web Developer',
      'hero.title.line1': 'Hi, I\'m',
      'hero.desc': 'I\'m a Software Engineering student passionate about Web Development and Software Development. I enjoy building modern, functional, and user-friendly websites.',
      'hero.btn.project': 'View Projects',
      'hero.btn.contact': 'Contact Me',
      'hero.stat.projects.label': 'Projects',
      'hero.stat.stack.label': 'Tech Stack',
      'hero.stat.years.label': 'Years Learning',
      'hero.photo.badge': 'RPL Student & Junior Web Developer',
      /* Skills */
      'skills.eyebrow': 'My Arsenal',
      'skills.title': 'Tech Stack & Skills',
      'skills.desc': 'Technologies and tools I use to build web applications.',
      'skills.level.backend': 'Backend',
      'skills.level.framework': 'Framework',
      'skills.level.database': 'Database',
      'skills.level.markup': 'Markup',
      'skills.level.styling': 'Styling',
      'skills.level.frontend': 'Frontend',
      /* Projects */
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
      /* Education */
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
      /* Contact */
      'contact.eyebrow': 'Get In Touch',
      'contact.title': 'Contact Me',
      'contact.desc': 'Feel free to reach out. I am open to project discussions, collaborations, and questions about web development.',
      'contact.form.name.label': 'Full Name',
      'contact.form.name.placeholder': 'Enter your full name',
      'contact.form.msg.label': 'Message',
      'contact.form.msg.placeholder': 'Write your message here...',
      'contact.form.submit': 'Send Message',
      'contact.inbox.title': 'Inbox',
      'contact.empty': 'No messages yet.',
      'contact.validate.name.empty': 'Full Name is required.',
      'contact.validate.msg.empty': 'Message is required.',
      'contact.validate.msg.short': 'Message must be at least 5 characters.',
      'contact.validate.general': 'Please review your form entries.',
      'contact.form.success': 'Message sent successfully! Thank you, {name}.',
      'contact.toast.deleted': 'Message deleted successfully.',
      'contact.toast.sent': 'Message sent successfully!',
      'contact.counter': '{n} characters',
      'contact.counter.min': '{n} characters (min. {min})',
      'contact.inbox.count': '{n} messages',
      /* Footer */
      'footer.tagline': 'Hafiizh Maulana',
      'footer.subtitle': 'RPL Student & Junior Web Developer',
      'footer.nav.title': 'Navigation',
      'footer.social.title': 'Social Media',
    },
  };

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT; }
    catch (_) { return DEFAULT; }
  }

  function applyLocale(locale) {
    /* 1. Update <html lang> */
    document.documentElement.setAttribute('lang', locale);

    var map = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT];

    /* 2. textContent */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = map[key];
      if (val !== undefined) el.textContent = val;
    });

    /* 3. placeholder */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = map[key];
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    /* 4. aria-label */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var val = map[key];
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    /* 5. Update lang toggle button itself */
    var btn = document.getElementById('langToggle');
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

    /* 6. Notify contact.js */
    if (typeof window.contactLocaleUpdate === 'function') {
      window.contactLocaleUpdate(locale);
    }
  }

  function saveLocale(locale) {
    try { localStorage.setItem(STORAGE_KEY, locale); }
    catch (_) { /* storage tidak tersedia */ }
  }

  var _current = getSaved();

  window.i18n = {
    getLocale: function () { return _current; },
    setLocale: function (value) {
      _current = value;
      applyLocale(_current);
      saveLocale(_current);
    },
    toggle: function () {
      this.setLocale(_current === 'id' ? 'en' : 'id');
    },
    t: function (key) {
      var map = TRANSLATIONS[_current] || TRANSLATIONS[DEFAULT];
      return map[key] !== undefined ? map[key] : key;
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyLocale(_current);

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        window.i18n.toggle();
      });
    }
  });
})();
