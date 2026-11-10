/**
 * contact.js - mauLportofolio.dev 2.0
 * Author : Hafiizh Maulana
 * Handles: Contact form (nama + pesan), localStorage message board,
 *           daftar pesan dengan hapus, XSS-safe rendering
 */

'use strict';

/* --------------------------------------------------
   DOM References
-------------------------------------------------- */
const contactForm  = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const formNotice   = document.getElementById('formNotice');
const messageList  = document.getElementById('messageList');
const messageEmpty = document.getElementById('messageEmpty');
const messageCount = document.getElementById('messageCount');

const fields = {
  fullName: {
    input:   document.getElementById('fullName'),
    errorEl: document.getElementById('nameError'),
    label:   'Nama Lengkap',
  },
  message: {
    input:   document.getElementById('message'),
    errorEl: document.getElementById('messageError'),
    label:   'Pesan',
  },
};

/* --------------------------------------------------
   localStorage helpers
-------------------------------------------------- */
const STORAGE_KEY = 'maul_messages';

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (_) {
    return [];
  }
}

function saveMessages(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch (_) { /* storage penuh */ }
}

/* --------------------------------------------------
   Render message list
-------------------------------------------------- */
function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function renderMessages() {
  const msgs = loadMessages();

  if (messageCount) {
    const n = msgs.length;
    const countTpl = (typeof window.i18n !== 'undefined') ? window.i18n.t('contact.inbox.count').replace('{n}', n) : n + ' pesan'; messageCount.textContent = countTpl;
  }

  if (messageEmpty) {
    messageEmpty.style.display = msgs.length === 0 ? 'flex' : 'none';
  }

  if (!messageList) return;
  messageList.innerHTML = '';
  if (msgs.length === 0) return;

  const sorted = [...msgs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  sorted.forEach(msg => {
    const item = document.createElement('div');
    item.className = 'msg-item';
    item.dataset.id = msg.id;

    const header = document.createElement('div');
    header.className = 'msg-item__header';

    const nameBadge = document.createElement('span');
    nameBadge.className = 'msg-item__name';
    nameBadge.textContent = msg.name;

    const timeEl = document.createElement('span');
    timeEl.className = 'msg-item__time';
    timeEl.textContent = formatDateTime(msg.createdAt);

    const delBtn = document.createElement('button');
    delBtn.className = 'msg-item__delete';
    delBtn.setAttribute('aria-label', 'Hapus pesan dari ' + msg.name);
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash-can';
    trashIcon.setAttribute('aria-hidden', 'true');
    delBtn.appendChild(trashIcon);
    delBtn.addEventListener('click', () => deleteMessage(msg.id));

    header.appendChild(nameBadge);
    header.appendChild(timeEl);
    header.appendChild(delBtn);

    const body = document.createElement('p');
    body.className = 'msg-item__body';
    body.textContent = msg.text;

    item.appendChild(header);
    item.appendChild(body);
    messageList.appendChild(item);
  });
}

function deleteMessage(id) {
  const msgs = loadMessages().filter(m => m.id !== id);
  saveMessages(msgs);
  renderMessages();
  if (typeof window.showToast === 'function') {
    window.showToast(typeof window.i18n !== 'undefined' ? window.i18n.t('contact.toast.deleted') : 'Pesan berhasil dihapus.');
  }
}

/* --------------------------------------------------
   Validators
-------------------------------------------------- */
function isEmpty(value) {
  return !value || value.trim().length === 0;
}

function validateField(key) {
  const { input, label } = fields[key];
  const value = input.value;
  clearFieldError(key);

  if (isEmpty(value)) {
    const emptyKey = key === 'fullName' ? 'contact.validate.name.empty' : 'contact.validate.msg.empty'; setFieldError(key, typeof window.i18n !== 'undefined' ? window.i18n.t(emptyKey) : label + ' tidak boleh kosong.');
    return false;
  }
  if (key === 'message' && value.trim().length < 5) {
    setFieldError(key, typeof window.i18n !== 'undefined' ? window.i18n.t('contact.validate.msg.short') : 'Pesan minimal 5 karakter.');
    return false;
  }
  setFieldSuccess(key);
  return true;
}

function setFieldError(key, message) {
  const { input, errorEl } = fields[key];
  input.classList.add('error');
  input.classList.remove('success');
  errorEl.textContent = '';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-circle-exclamation';
  icon.setAttribute('aria-hidden', 'true');
  icon.style.marginRight = '5px';
  errorEl.appendChild(icon);
  errorEl.appendChild(document.createTextNode(message));
}

function setFieldSuccess(key) {
  const { input, errorEl } = fields[key];
  input.classList.remove('error');
  input.classList.add('success');
  errorEl.textContent = '';
}

function clearFieldError(key) {
  const { input, errorEl } = fields[key];
  input.classList.remove('error', 'success');
  errorEl.textContent = '';
}

/* --------------------------------------------------
   Live validation
-------------------------------------------------- */
Object.keys(fields).forEach(key => {
  const { input } = fields[key];
  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') validateField(key);
  });
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) validateField(key);
  });
});

/* --------------------------------------------------
   Form submission
-------------------------------------------------- */
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const results = Object.keys(fields).map(key => validateField(key));
  const isValid = results.every(r => r === true);

  if (!isValid) {
    for (const key of Object.keys(fields)) {
      if (fields[key].input.classList.contains('error')) {
        fields[key].input.focus();
        break;
      }
    }
    showFormNotice(typeof window.i18n !== 'undefined' ? window.i18n.t('contact.validate.general') : 'Mohon periksa kembali isian formulir Anda.', 'error');
    return;
  }

  const name = fields.fullName.input.value.trim();
  const text = fields.message.input.value.trim();

  const msgs = loadMessages();
  msgs.push({
    id:        Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name:      name,
    text:      text,
    createdAt: new Date().toISOString(),
  });
  saveMessages(msgs);
  renderMessages();

  const _sm = typeof window.i18n !== 'undefined' ? window.i18n.t('contact.form.success').replace('{name}', name) : 'Pesan berhasil dikirim! Terima kasih, ' + name + '.'; showFormNotice(_sm, 'success');

  if (typeof window.showToast === 'function') {
    window.showToast(typeof window.i18n !== 'undefined' ? window.i18n.t('contact.toast.sent') : 'Pesan berhasil dikirim!');
  }

  setButtonLoading(true);
  setTimeout(() => {
    contactForm.reset();
    Object.keys(fields).forEach(clearFieldError);
    setButtonLoading(false);
    setTimeout(hideFormNotice, 5000);
  }, 600);
});

/* --------------------------------------------------
   Button loading state
-------------------------------------------------- */
function setButtonLoading(loading) {
  if (loading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Mengirim...';
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Kirim Pesan';
  }
}

/* --------------------------------------------------
   Form notice (XSS-safe)
-------------------------------------------------- */
function showFormNotice(text, type) {
  formNotice.textContent = '';
  const icon = document.createElement('i');
  icon.setAttribute('aria-hidden', 'true');
  icon.style.marginRight = '6px';
  icon.className = type === 'success'
    ? 'fa-solid fa-check-circle'
    : 'fa-solid fa-triangle-exclamation';
  formNotice.appendChild(icon);
  formNotice.appendChild(document.createTextNode(text));
  formNotice.className = 'form-notice ' + type;
  formNotice.style.display = 'block';
  formNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (type === 'success') setTimeout(hideFormNotice, 6000);
}

function hideFormNotice() {
  formNotice.className = 'form-notice';
  formNotice.style.display = 'none';
  formNotice.textContent = '';
}

/* --------------------------------------------------
   Character counter
-------------------------------------------------- */
(function setupCharCounter() {
  const msgInput  = fields.message.input;
  const minLength = 5;
  const counter   = document.createElement('span');
  counter.style.cssText =
    'font-size:0.72rem;color:var(--clr-text-dim);display:block;text-align:right;margin-top:4px;';
  counter.textContent = '0 karakter (min. ' + minLength + ')';
  msgInput.parentNode.insertBefore(counter, msgInput.nextSibling);

  msgInput.addEventListener('input', () => {
    const len = msgInput.value.length;
    counter.textContent = len + ' karakter' +
      (len >= minLength ? '' : ' (min. ' + minLength + ')');
    counter.style.color = len >= minLength
      ? 'var(--clr-success)'
      : 'var(--clr-text-dim)';
  });
})();

/* --------------------------------------------------
   Locale Update
-------------------------------------------------- */
window.contactLocaleUpdate = function (locale) {
  fields.fullName.label = typeof window.i18n !== 'undefined' ? window.i18n.t('contact.form.name.label') : (locale === 'en' ? 'Full Name' : 'Nama Lengkap');
  fields.message.label = typeof window.i18n !== 'undefined' ? window.i18n.t('contact.form.msg.label') : (locale === 'en' ? 'Message' : 'Pesan');
  renderMessages();
};

/* --------------------------------------------------
   Init
-------------------------------------------------- */
renderMessages();
