let replyMode = false;
let contextMsg = null;
let replyToMessage = null;
let editMode = false;
let editMsgSpan = null;
let currentSender = 'me';
const inputMsg = document.getElementById('msg');
const sendIcon = document.getElementById('sendIcon');
const translations = {
  ro: {
    status_online: "Online",
    status_offline: ora => `Văzut ultima dată astăzi ${ora}`,
    settings: "Setări mesaje",
    fontSize: "Mărime text mesaje",
    corners: "Colțuri mesaje",
    reply: "Răspunde",
    delete: "Șterge mesajul",
    edit: "Schimbă mesajul",
    placeholder: "Mesaj...",
    save: "Salvează",
    clear: "Șterge",
    notesTitle: "Notițe",
    notesPlaceholder: "Scrie aici",
    setTime: "Setează ora:",
    saveTime: "Salvează",
    setData: "Setează data:",
    saveDate: "Salvează",
    setD: "Ziua",
    setN: "Noaptea",
    deleteAllQuestion: "Sigur vrei să ștergi toate mesajele?",
    deleteAllConfirm: "Da",
    deleteAllCancel: "Nu",
    edited: "Editat",
    status_free_label: "Văzut",
    status_free_placeholder: "Scrie orice...",
    deleted_message: "Ai șters un mesaj",
    you: 'Tu'
  },
  ru: {
    status_online: "В сети",
    status_offline: ora => `В сети: ${ora}`,
    settings: "Настройки сообщений",
    fontSize: "Размер текста сообщений",
    corners: "Скругление углов",
    reply: "Ответить",
    delete: "Удалить сообщение",
    edit: "Изменить",
    placeholder: "Сообщение...",
    save: "Сохранить",
    clear: "Удалить",
    notesTitle: "Заметки",
    notesPlaceholder: "Пиши здесь",
    setTime: "Уст. время:",
    saveTime: "Сохранить",
    setData: "Установить дату:",
    saveDate: "Сохранить", 
    setD: "День",
    setN: "Ночь",
    deleteAllQuestion: "Вы уверены, что хотите удалить все сообщения?",
    deleteAllConfirm: "Да",
    deleteAllCancel: "Нет",
    edited: "Изменено",
    status_free_label: "В сети:",
    status_free_placeholder: "Пиши что угодно...",
    deleted_message: "Вы удалили сообщение",
    you: 'Вы'
  },
  en: {
    status_online: "Online",
    status_offline: ora => `last seen at ${ora}`,
    settings: "Message Settings",
    fontSize: "Message text size",
    corners: "Message corners",
    reply: "Reply",
    delete: "Delete message",
    edit: "Edit message",
    placeholder: "Message...",
    save: "Save",
    clear: "Clear",
    notesTitle: "Notes",
    notesPlaceholder: "Write here",
    setTime: "Set time:",
    saveTime: "Save",
    setData: "Set date:",
    saveDate: "Save",
    setD: "Day",
    setN: "Night",
    deleteAllQuestion: "Are you sure you want to delete all messages?",
    deleteAllConfirm: "Yes",
    deleteAllCancel: "No",
    edited: "Edited",
    status_free_label: "Seen at",
    status_free_placeholder: "Write anything...",
    deleted_message: "You deleted a message",
    you: 'You'
  }
};

let currentLang = 'ro';
let customStatusText = '';
let customStatusModal = null;
let customStatusBackdrop = null;
let customStatusInput = null;
let freeStatusText = ''; 
let freeStatusModal = null;
let freeStatusBackdrop = null;
let freeStatusInput = null;

const defaultAvatarLight = window.defaultAvatarLightSrc || 'Vimg/Avatar_Day.jpg';
const defaultAvatarDark = window.defaultAvatarDarkSrc || 'Vimg/Avatar_Night.jpg';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  const settingsH2 = document.querySelector('.settings-window h2');
  if (settingsH2) settingsH2.textContent = t.settings;
  const fontSizeLabel = document.querySelector('label[for="fontSizeRange"]');
  if (fontSizeLabel) fontSizeLabel.textContent = t.fontSize;
  const radiusLabel = document.querySelector('label[for="radiusRange"]');
  if (radiusLabel) radiusLabel.textContent = t.corners;
  const replyMsg = document.getElementById('replyMsg');
  if (replyMsg) replyMsg.textContent = t.reply;
  const deleteMsg = document.getElementById('deleteMsg');
  if (deleteMsg) deleteMsg.textContent = t.delete;
  const editMsg = document.getElementById('editMsg');
  if (editMsg) editMsg.textContent = t.edit;
  const msgInput = document.getElementById('msg');
  if (msgInput) msgInput.placeholder = t.placeholder;
  const modalLabel = document.querySelector('.modal-label');
  if (modalLabel) modalLabel.textContent = t.setTime;
  const dateModalLabel = document.querySelector('.date-modal-label');
  if (dateModalLabel) dateModalLabel.textContent = t.setData;
  const saveDateBtn = document.getElementById('save-date-btn');
  if (saveDateBtn) saveDateBtn.textContent = t.saveDate;
  const saveTimeBtn = document.getElementById('saveTime');
  if (saveTimeBtn) saveTimeBtn.textContent = t.save;
  const setDBtn = document.getElementById('setDayBgBtn');
  if (setDBtn) setDBtn.textContent = t.setD;
  const setNBtn = document.getElementById('setNightBgBtn');
  if (setNBtn) setNBtn.textContent = t.setN;
  const question = document.querySelector('.deleteAllQuestion');
  if (question) question.textContent = t.deleteAllQuestion;
  const yesBtn = document.querySelector('.deleteAllConfirm');
  if (yesBtn) yesBtn.textContent = t.deleteAllConfirm;
  const noBtn = document.querySelector('.deleteAllCancel');
  if (noBtn) noBtn.textContent = t.deleteAllCancel;
  const notesHeader = document.querySelector('#notesBox .notes-header span');
  if (notesHeader) notesHeader.textContent = t.notesTitle;
  const notesArea = document.getElementById('notesText');
  if (notesArea) notesArea.placeholder = t.notesPlaceholder;
  const saveNotesBtn = document.getElementById('saveNotes');
  if (saveNotesBtn) saveNotesBtn.textContent = t.save;
  const clearNotesBtn = document.getElementById('clearNotes');
  if (clearNotesBtn) clearNotesBtn.textContent = t.clear;
  const editedLabels = document.querySelectorAll('.edited-label');
  editedLabels.forEach(label => {
    label.textContent = translations[currentLang].edited;
  });

  const rpAuthor = document.getElementById('replyPreviewAuthor');
  if (rpAuthor && contextMsg && contextMsg.classList.contains('me')) {
    rpAuthor.textContent = translations[currentLang].you || rpAuthor.textContent;
  }
}

  document.addEventListener('DOMContentLoaded', () => {
  let replyPreview = document.getElementById('replyPreview');
  if (!replyPreview) {
    replyPreview = document.createElement('div');
    replyPreview.id = 'replyPreview';
    replyPreview.style.display = 'none';
    replyPreview.style.position = 'absolute';
    replyPreview.style.left = '0';
    replyPreview.style.right = '0';
    replyPreview.style.bottom = '65px';
    replyPreview.style.zIndex = '30';
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) chatWindow.appendChild(replyPreview);
  }
  const replyMsgBtn = document.getElementById('replyMsg');
  if (replyMsgBtn) {
    replyMsgBtn.addEventListener('click', function() {
      if (contextMsg) {
        replyMode = true;
        replyToMessage = contextMsg;
        let replyPreview = document.getElementById('replyPreview');
          replyPreview.style.display = 'flex';
          replyPreview.style.alignItems = 'center';
          const isDark = document.body.classList.contains('dark');
          if (isDark) {
            replyPreview.style.background = '#3c4249ff';
            replyPreview.style.borderLeft = '3px solid #ffffffff';
          } else {
            replyPreview.style.background = '#e6f0ff';
            replyPreview.style.borderLeft = '3px solid #111111';
          }
          replyPreview.style.padding = '6px 48px 6px 14px'; 
          replyPreview.style.marginBottom = '0';
          replyPreview.innerHTML = `
          <div class="reply-preview-viber">
            <div class="reply-preview-author-viber" id="replyPreviewAuthor"></div>
            <div class="reply-preview-row-viber">
              <span class="reply-preview-text-viber" id="replyPreviewText"></span>
              <button id="cancelReply" class="reply-preview-cancel-viber" aria-label="Cancel reply">×</button>
            </div>
          </div>
        `;
        const replyTextSpan = replyPreview.querySelector('#replyPreviewText');
        const replyRow = replyPreview.querySelector('.reply-preview-row-viber');
        if (replyRow) {
          replyRow.style.display = 'flex';
          replyRow.style.alignItems = 'center';
          replyRow.style.width = '100%';
        }
        const msgText = contextMsg.querySelector('.message-text')?.textContent || '';
        const firstLine = (msgText || '').split(/\r?\n/)[0].trim();
        const collapsed = firstLine.replace(/\s+/g, ' ');
        const maxWords = 8;
        const words = collapsed.split(' ').filter(w => w.length > 0);
        let shown = collapsed;
        if (words.length > maxWords) {
          shown = words.slice(0, maxWords).join(' ') + '...';
        }
        replyTextSpan.textContent = shown;
        replyTextSpan.title = msgText; 
        const authorElem = replyPreview.querySelector('#replyPreviewAuthor');
        let author = '';
        if (contextMsg.classList.contains('me')) author = translations[currentLang].you || 'Tu';
        else if (contextMsg.classList.contains('other')) {
          author = document.querySelector('.chat-header .chat-name')?.textContent || 'Celălalt';
        } else {
          author = contextMsg.querySelector('.author')?.innerText || '';
        }
        authorElem.textContent = author;
        if (authorElem) {
          authorElem.style.fontSize = '12px';
          authorElem.style.fontWeight = '700';
          authorElem.style.marginRight = '8px';
          authorElem.style.color = isDark ? '#ffffff' : '#111111';
        }
        if (replyTextSpan) {
          replyTextSpan.style.fontSize = '14px';
          replyTextSpan.style.color = isDark ? '#ffffff' : '#222';
          replyTextSpan.style.overflow = 'hidden';
          replyTextSpan.style.textOverflow = 'ellipsis';
          replyTextSpan.style.whiteSpace = 'nowrap';
          replyTextSpan.style.flex = '1';
          replyTextSpan.style.minWidth = '0';
        }
        const cancelBtn = replyPreview.querySelector('#cancelReply');
        if (cancelBtn) {
            cancelBtn.style.position = 'absolute';
            cancelBtn.style.right = '12px';
            cancelBtn.style.top = '50%';
            cancelBtn.style.transform = 'translateY(-50%)';
            cancelBtn.style.background = 'transparent';
            cancelBtn.style.border = 'none';
            cancelBtn.style.color = isDark ? '#ffffff' : '#888';
            cancelBtn.style.fontSize = '22px';
            cancelBtn.style.cursor = 'pointer';
        }
        replyPreview.querySelector('#cancelReply').onclick = function() {
          replyPreview.style.display = 'none';
          replyMode = false;
          replyToMessage = null;
        };
        hideContextMenu();
      }
    });
  }
    const cancelReply = document.getElementById('cancelReply');
    if (cancelReply) {
      cancelReply.addEventListener('click', () => {
        const replyPreview = document.getElementById('replyPreview');
        if (replyPreview) replyPreview.style.display = 'none';
        replyMode = false;
        contextMsg = null;
        replyToMessage = null;
      });
    }
    
  setLanguage('ro');
  renderStatus();

    const changeBgBtn = document.getElementById('changebackgroundIcon');
    const bgMenu = document.getElementById('backgroundMenu');
    if (changeBgBtn && bgMenu) {
      changeBgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMenu.style.display === 'flex') {
          bgMenu.style.display = 'none';
          return;
        }
        const rect = changeBgBtn.getBoundingClientRect();
        bgMenu.style.display = 'flex';
        bgMenu.style.position = 'fixed';
        bgMenu.style.left = (rect.left + 70) + 'px';
        bgMenu.style.top = (rect.bottom + 1) + 'px';
        bgMenu.style.zIndex = '2000';
        bgMenu.style.transform = 'none';
      });
      document.addEventListener('click', (e) => {
        if (bgMenu.style.display !== 'none' && !bgMenu.contains(e.target) && e.target !== changeBgBtn) {
          bgMenu.style.display = 'none';
        }
      });
    }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
      localStorage.setItem('viberLang', lang);
    });
  });

const savedLang = localStorage.getItem('viberLang');
if (savedLang && savedLang !== currentLang) {
  setLanguage(savedLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
  });
}

      const newChat = document.querySelector('.new-chat');
    if (newChat) {
      newChat.addEventListener('click', () => {
        window.location.href = 'config.html';
      });
  renderStatus();
    }
  });
  const statuses = [
    () => {
      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, '0');
      const currentMinute = now.getMinutes().toString().padStart(2, '0');
      return translations[currentLang].status_offline(`<span id="statusTime" title="Click pentru a schimba ora" style="cursor:pointer;">${currentHour}:${currentMinute}</span>`);
    },
    () => translations[currentLang].status_online,
    () => {
      return `<span id="freeStatusLabel">${translations[currentLang].status_free_label}</span>
        <span id="freeStatusText" style="cursor:pointer;">${freeStatusText || translations[currentLang].status_free_placeholder}</span>
        <span id="editFreeStatus" style="cursor:pointer; </span>`;
    }
  ];

  let statusIndex = 0;
  function renderStatus() {
    document.querySelectorAll('.chat-status').forEach(statusElem => {
      statusElem.innerHTML = statuses[statusIndex]();
      statusElem.classList.toggle('online', statusIndex === 1);

      statusElem.onclick = function(e) {
        if (
          e.target.id === 'editFreeStatus' ||
          e.target.id === 'freeStatusText'
        ) {
          return;
        }
        statusIndex = (statusIndex + 1) % statuses.length;
        renderStatus();
      };

      if (statusIndex === 0) {
        const timeSpan = statusElem.querySelector('#statusTime');
        if (timeSpan && !timeSpan.dataset.listenerAdded) {
          timeSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            openTimeModal(timeSpan);
          });
          timeSpan.dataset.listenerAdded = 'true';
        }
      }
      if (statusIndex === 2) {
        const editIcon = statusElem.querySelector('#editFreeStatus');
        const freeText = statusElem.querySelector('#freeStatusText');
        if (editIcon && !editIcon.dataset.listenerAdded) {
          editIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openFreeStatusModal();
          });
          editIcon.dataset.listenerAdded = 'true';
        }
        if (freeText && !freeText.dataset.listenerAdded) {
          freeText.addEventListener('click', (e) => {
            e.stopPropagation();
            openFreeStatusModal();
          });
          freeText.dataset.listenerAdded = 'true';
        }
      }
    });
  }

  setTimeout(() => {
    renderStatus();
  }, 0);

document.addEventListener('click', function (e) {
  const timeSpan = e.target.closest('.time-text');
  if (timeSpan) {
    openTimeModal(timeSpan);
    document.querySelector(".modal-label").textContent = "Setează ora:";
  }
});

    const modalBackdrop = document.getElementById('modalBackdrop');
    const timeModal = document.getElementById('timeModal');
    const newTimeInput = document.getElementById('newTime');
    let selectedTimeSpan = null;

function openTimeModal(timeSpan) {
  selectedTimeSpan = timeSpan;
  newTimeInput.value = selectedTimeSpan.textContent.trim();

  const modalLabel = document.querySelector(".modal-label");
  modalLabel.dataset.type = "time";
  modalLabel.textContent = translations[currentLang].setTime;

  modalBackdrop.style.display = 'block';
  timeModal.style.display = 'flex';
}

    function closeModal() {
      modalBackdrop.style.display = 'none';
      timeModal.style.display = 'none';
      selectedTimeSpan = null;
    }

    document.getElementById('saveTime').addEventListener('click', () => {
      const newTime = newTimeInput.value.trim();
      if (/^\d{1,2}:\d{2}$/.test(newTime)) {
        const [h, m] = newTime.split(':').map(Number);
        if (h >= 0 && h < 24 && m >= 0 && m < 60 && selectedTimeSpan) {
          selectedTimeSpan.textContent = newTime;
        }
      }
      closeModal();
    });

    document.getElementById('closeTimeModal').addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    const roleToggleIcon = document.getElementById('roleToggleIcon');
    if (roleToggleIcon) {
      roleToggleIcon.addEventListener('click', () => {
        currentSender = currentSender === 'me' ? 'other' : 'me';
        
        
      });
    }
    function adaugaMesaj(sender, text, replyTo) {
      if (text.trim() === '') return;
      const chatBody = document.getElementById('chat-body');
      let isFirstInGroup = true;
      if (chatBody) {
        const allMessages = chatBody.querySelectorAll('.message');
        const lastMsg = allMessages.length ? allMessages[allMessages.length - 1] : null;
      
        if (lastMsg) {
          const lastTextSpan = lastMsg.querySelector('.message-text');
          const lastDeleted = lastTextSpan && lastTextSpan.classList.contains('deleted-message');
      
          if (!lastDeleted && lastMsg.classList.contains(sender)) {
            isFirstInGroup = false;
          } else {
            isFirstInGroup = true;
          }
        } else {
          isFirstInGroup = true;
        }
      }

      let messageContainer;
      const div = document.createElement('div');
      div.className = 'message ' + sender;
      if (isFirstInGroup) {
        div.classList.add(sender === 'me' ? 'first-me' : 'first-other');
      }

      if (replyTo) {
        let author = '';
      if (replyTo.classList.contains('me')) author = translations[currentLang].you || 'Tu';
        else if (replyTo.classList.contains('other')) author = document.querySelector('.chat-header .chat-name')?.textContent || 'Celălalt';
        else author = replyTo.querySelector('.author')?.innerText || '';
        const replyText = replyTo.querySelector('.message-text')?.innerText || '';
        const replyBlock = document.createElement('div');
        replyBlock.className = 'reply-block viber-reply';
        replyBlock.innerHTML = `
          <div class="reply-author-viber">${author}</div>
          <div class="reply-text-viber">${replyText}</div>
        `;
      div.appendChild(replyBlock);
      }

      let heartInactive = 'Vimg/heart_inactive.png';
      let heartActive = 'Vimg/heart_active.png';
      let heartSrc = heartInactive;
      const avatarCircle = document.createElement('div');
      avatarCircle.className = 'avatar-circle';
      const avatarCircleImg = document.createElement('img');
      avatarCircleImg.src = heartSrc;
      avatarCircleImg.alt = 'status';
      avatarCircle.appendChild(avatarCircleImg);
      avatarCircleImg.addEventListener('click', function() {
        if (this.src.includes('heart_inactive')) {
          this.src = heartActive;
        } else {
          this.src = heartInactive;
        }
      });
      if (sender === 'me') {
        div.insertBefore(avatarCircle, div.firstChild);
      } else {
              document.querySelectorAll('.message-text.deleted-message').forEach(span => {
                if (span) span.textContent = t.deleted_message;
              });
        div.appendChild(avatarCircle);
      }

      if (sender === 'other') {
        let lastGroup = null;
        if (chatBody) {
          const groups = chatBody.querySelectorAll('.avatar-message-group');
          if (groups.length) {
            const g = groups[groups.length - 1];
            const msgs = g.querySelectorAll('.message');
            const lastInGroup = msgs.length ? msgs[msgs.length - 1] : null;
            if (lastInGroup && lastInGroup.classList.contains('other')) {
              lastGroup = g;
            }
          }
        }
      
        let allDeleted = false;
        if (lastGroup) {
          const messages = Array.from(lastGroup.querySelectorAll('.message'));
          allDeleted = messages.length > 0 && messages.every(m => {
            const textSpan = m.querySelector('.message-text');
            return textSpan && textSpan.classList.contains('deleted-message');
          });
        }
      
        if (isFirstInGroup || !lastGroup || allDeleted) {
          messageContainer = document.createElement('div');
          messageContainer.className = 'avatar-message-group';
          let avatarSrc = '';
          if (window.chatData && window.chatData.otherImage && window.chatData.otherImage !== '' && window.chatData.otherImage !== '../img/el.jpg') {
            avatarSrc = window.chatData.otherImage;
          } else {
            const isDarkMode = document.body.classList.contains('dark');
            avatarSrc = isDarkMode ? 'Vimg/Avatar_Night.jpg' : 'Vimg/Avatar_Day.jpg';
          }
          const avatar = document.createElement('img');
          avatar.className = 'avatar-other';
          avatar.src = avatarSrc;
          avatar.onerror = function() {
            this.src = isDarkMode ? 'Vimg/Avatar_Night.jpg' : 'Vimg/Avatar_Day.jpg';
          };
          messageContainer.appendChild(avatar);
          messageContainer.appendChild(div);
          if (chatBody) {
            chatBody.appendChild(messageContainer);
          }
        } else {
          lastGroup.appendChild(div);
          messageContainer = null;
        }
      } else {
        messageContainer = div;
      }

      const spanText = document.createElement('span');
      spanText.className = 'message-text';
      spanText.textContent = text;
      div.appendChild(spanText);

      const ora = new Date();
      const hour = ora.getHours().toString().padStart(2, '0');
      const min = ora.getMinutes().toString().padStart(2, '0');
      const timeContent = document.createElement('span');
      timeContent.className = 'time-text';
      timeContent.textContent = `${hour}:${min}`;

      const isShort = text.length < 15;

      if (isShort) {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.appendChild(spanText);

        const inlineTimestamp = document.createElement('span');
        inlineTimestamp.className = 'inline-timestamp';
        inlineTimestamp.appendChild(timeContent);

        if (sender === 'me') {
          const checks = document.createElement('span');
          checks.className = 'checks';
          const tickSrcs = ['Vimg/tick.png', 'Vimg/tick1.png', 'Vimg/tick2.png'];
          let tickState = 0;
          const check = document.createElement('img');
          check.src = tickSrcs[0];
          check.dataset.state = '0';
          function setTickSize(idx) {
            if (idx === 0) {
              check.style.width = '19px';
              check.style.height = '8px';
            } else {
              check.style.width = '15px';
              check.style.height = '8px';
            }
          }
          setTickSize(0);
          check.style.marginLeft = '2px';
          check.style.verticalAlign = 'middle';
          checks.appendChild(check);
          checks.style.display = 'inline-flex';
          checks.style.alignItems = 'center';
          checks.addEventListener('click', () => {
            tickState = (tickState + 1) % 3;
            check.src = tickSrcs[tickState];
            check.dataset.state = String(tickState);
            setTickSize(tickState);
          });
          inlineTimestamp.appendChild(checks);
        }

        container.appendChild(inlineTimestamp);
        div.appendChild(container);
      } else {
        div.appendChild(spanText);

        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.appendChild(timeContent);

        if (sender === 'me') {
          const checks = document.createElement('span');
          checks.className = 'checks';
          const tickSrcs = ['Vimg/tick.png', 'Vimg/tick1.png', 'Vimg/tick2.png'];
          let tickState = 0;
          const check = document.createElement('img');
          check.src = tickSrcs[0];
          check.dataset.state = '0';
          function setTickSize(idx) {
            if (idx === 0) {
              check.style.width = '20px';
              check.style.height = '9px';
            } else {
              check.style.width = '15px';
              check.style.height = '8px';
            }
          }
          setTickSize(0);
          check.style.marginLeft = '2px';
          check.style.verticalAlign = 'middle';
          checks.appendChild(check);
          checks.style.display = 'inline-flex';
          checks.style.alignItems = 'center';
          checks.addEventListener('click', () => {
            tickState = (tickState + 1) % 3;
            check.src = tickSrcs[tickState];
            check.dataset.state = String(tickState);
            setTickSize(tickState);
          });
          timestamp.appendChild(checks);
        }

        div.appendChild(timestamp);
      }

      div.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, div);
      });

  if (chatBody) {
    if (messageContainer) {
      chatBody.appendChild(messageContainer);
      const lastMsg = messageContainer.lastElementChild || messageContainer;
      lastMsg.scrollIntoView({ behavior: 'auto', block: 'end' });
    } else {
      chatBody.appendChild(div);
      div.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }

  const containerNode = messageContainer ? (messageContainer.querySelector('.message') || messageContainer.lastElementChild) : div;
  const replyEl = containerNode?.querySelector('.viber-reply');
  if (replyEl && containerNode) {
    requestAnimationFrame(() => {
      const h = replyEl.offsetHeight || 56;
      containerNode.style.setProperty('--viber-reply-height', h + 'px');
      containerNode.classList.add('has-viber-reply');
    });
  }

  return div;
}

function clearReplySpacing(container) {
  if (!container) return;
  const msg = container.classList && container.classList.contains('message') ? container : container.querySelector && container.querySelector('.message');
  const node = msg || container;
  node.classList && node.classList.remove('has-viber-reply');
  try { node.style.removeProperty && node.style.removeProperty('--viber-reply-height'); } catch (e) {}
}

function trimiteMesaj() {
  if (!inputMsg) return;
  const text = inputMsg.value.trim();
  inputMsg.value = '';
  inputMsg.blur();
  if (text === '') return;

  const chatBody = document.getElementById('chat-body');
  let lastMsgIsDeleted = false;
  
  if (chatBody) {
    let lastMsg = chatBody.lastElementChild;
    while (lastMsg && !lastMsg.classList.contains('message') && !lastMsg.classList.contains('avatar-message-group')) {
      lastMsg = lastMsg.lastElementChild || lastMsg.previousElementSibling;
    }
    if (lastMsg && lastMsg.classList.contains('message')) {
      const textSpan = lastMsg.querySelector('.message-text');
      if (textSpan && textSpan.classList.contains('deleted-message')) {
        lastMsgIsDeleted = true;
      }
    }
  }

if (editMode && editMsgSpan) {
    if (!editMsgSpan.classList.contains('deleted-message')) {
        editMsgSpan.textContent = text;

        const container = editMsgSpan.closest('.message');
        const timeSpan = container.querySelector('.time-text');
        if (container && !container.querySelector('.edited-label')) {
            const editedLabel = document.createElement('span');
            editedLabel.className = 'edited-label';
            editedLabel.textContent = translations[currentLang].edited;
            editedLabel.style.marginLeft = '10px';
            editedLabel.style.fontSize = '11px';
            editedLabel.style.verticalAlign = 'middle';
            if (timeSpan) {
                timeSpan.parentElement.insertBefore(editedLabel, timeSpan);
            } else {
                container.appendChild(editedLabel);
            }
        }
    }
    editMode = false;
    editMsgSpan = null;
    return;
}

adaugaMesaj(currentSender, text, replyMode ? replyToMessage : null);
  replyMode = false;
  replyToMessage = null;
  const replyPreview = document.getElementById('replyPreview');
  if (replyPreview) replyPreview.style.display = 'none';
}

    if (sendIcon) sendIcon.addEventListener('click', trimiteMesaj);
    if (inputMsg) {
      inputMsg.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          trimiteMesaj();
        }
      });
    }

    const contextMenu = document.getElementById('contextMenu');


function showContextMenu(event, msgDiv) {
  contextMsg = msgDiv;
  if (contextMenu) {
    contextMenu.style.top = event.pageY + 'px';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.display = 'block';
  }
  document.addEventListener('click', hideContextMenu, { once: true });
}

function hideContextMenu(e) {
  if (contextMenu && (!e || !contextMenu.contains(e.target))) {
    contextMenu.style.display = 'none';
  }
}

const deleteMsgBtn = document.getElementById('deleteMsg');
if (deleteMsgBtn) {
  deleteMsgBtn.addEventListener('click', function() {
    if (contextMsg) {
      const group = contextMsg.closest('.avatar-message-group');
      clearReplySpacing(contextMsg);
      contextMsg.remove();
      if (group && group.querySelectorAll('.message.other').length === 0) {
        group.remove();
      }
      contextMsg = null;
      hideContextMenu();
    }
  });
}

const editMsgBtn = document.getElementById('editMsg');
if (editMsgBtn) {
  editMsgBtn.addEventListener('click', function() {
    if (contextMsg) {
      const textSpan = contextMsg.querySelector('.message-text');
      if (textSpan && textSpan.classList.contains('deleted-message')) {
        hideContextMenu();
        return;
      }
      if (textSpan) {
        inputMsg.value = textSpan.textContent;
        inputMsg.focus();
        editMode = true;
        editMsgSpan = textSpan;
      }
      hideContextMenu();
    }
  });
}

    const sendBtnMicroImg = document.querySelector('.send-btn img');
    if (sendBtnMicroImg) {
      let microSrc = 'Vimg/micro.png';
      let videoSrc = 'Vimg/video.png';
      sendBtnMicroImg.addEventListener('click', function() {
        if (this.src.includes('micro.png')) {
          this.src = videoSrc;
        } else {
          this.src = microSrc;
        }
        this.style.width = '70px';
        this.style.height = '70px';
        this.style.marginLeft = '20px';
        this.style.objectFit = 'contain';
      });
    }

    const radiusRange = document.getElementById('radiusRange');
    const radiusValue = document.getElementById('radiusValue');

  if (radiusRange && radiusValue) {
    radiusRange.addEventListener('input', () => {
      const value = parseInt(radiusRange.value);
      radiusValue.textContent = value;

      document.querySelectorAll('.message').forEach((msg, idx, arr) => {
        const sender = msg.classList.contains('me') ? 'me' : 'other';
        if (idx > 0) {
          const prevMsg = arr[idx - 1];
         if (lastMsg) {
  const textSpan = lastMsg.querySelector('.message-text');
  if (textSpan && textSpan.classList.contains('deleted-message')) {
    isFirstInGroup = true;
  } else if (lastMsg.classList.contains(sender)) {
    isFirstInGroup = false;
  }
}

        }
        if (isFirstInGroup) {
          msg.style.borderTopLeftRadius = '0px';
          msg.style.borderTopRightRadius = '0px';
          msg.style.borderBottomLeftRadius = '0px';
          msg.style.borderBottomRightRadius = '0px';
        } else {
          msg.style.borderTopLeftRadius = value + 'px';
          msg.style.borderTopRightRadius = value + 'px';
          msg.style.borderBottomLeftRadius = value + 'px';
          msg.style.borderBottomRightRadius = value + 'px';
        }
      });
    });
  }

    const fontSizeRange = document.getElementById('fontSizeRange');
    const fontSizeValue = document.getElementById('fontSizeValue');

    if (fontSizeRange && fontSizeValue) {
      fontSizeRange.addEventListener('input', () => {
        const size = fontSizeRange.value;
        fontSizeValue.textContent = size;

        document.querySelectorAll('.message').forEach(msg => {
          msg.style.fontSize = `${size}px`;
        });
      });
    }

  const darkModeCheckbox = document.getElementById("checkbox");
  if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener("change", function () {
      const isDarkMode = this.checked;
      document.body.classList.toggle("dark", isDarkMode);

      updateEditedLabelsColor();

      if (isDarkMode && nightBg) {
        chatBody.style.backgroundImage = `url('${nightBg}')`;
      } else if (!isDarkMode && dayBg) {
        chatBody.style.backgroundImage = `url('${dayBg}')`;
      }

      document.querySelectorAll('.avatar-other').forEach(avatar => {
        if (!window.chatData.otherImage || window.chatData.otherImage === '' || window.chatData.otherImage === '../img/el.jpg') {
          avatar.src = isDarkMode ? 'Vimg/Avatar_Night.jpg' : 'Vimg/Avatar_Day.jpg';
        }
      });
    });
  }

  function updateEditedLabelsColor() {
    const isDarkMode = document.body.classList.contains('dark');
  }

  const screenshotIcon = document.getElementById('screenshotIcon');
    if (screenshotIcon) {
      screenshotIcon.addEventListener('click', () => {
        alert('Ai dat click pe screenshot!');
        import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js').then(() => {
          const chatWindow = document.querySelector('.chat-window');
          if (!chatWindow) return;
          html2canvas(chatWindow).then(canvas => {
            const link = document.createElement('a');
            link.download = 'chat-screenshot.png';
            link.href = canvas.toDataURL();
            link.click();
          });
        });
      });
    }

  const chatBody = document.getElementById('chat-body');
  const bgOptions = document.querySelectorAll('.bg-option');
  let dayBg = null;
  let nightBg = null;
  let bgMode = 'day';
  const savedCustomDayBg = localStorage.getItem('customDayBg');
  const savedCustomNightBg = localStorage.getItem('customNightBg');

  if (savedCustomDayBg) dayBg = savedCustomDayBg;
  if (savedCustomNightBg) nightBg = savedCustomNightBg;
  const dayBtn = document.getElementById('setDayBgBtn');
  const nightBtn = document.getElementById('setNightBgBtn');

  dayBtn.addEventListener('click', () => {
    bgMode = 'day';
    dayBtn.classList.add('active');
    nightBtn.classList.remove('active');
    updateBgSelection();
  });

  nightBtn.addEventListener('click', () => {
    bgMode = 'night';
    nightBtn.classList.add('active');
    dayBtn.classList.remove('active');
    updateBgSelection();
  });

  bgOptions.forEach(img => {
    img.addEventListener('click', () => {
      if (bgMode === 'day') {
        dayBg = img.src;
        if (!document.body.classList.contains('dark')) {
          chatBody.style.backgroundImage = `url('${dayBg}')`;
        }
      } else {
        nightBg = img.src;
        if (document.body.classList.contains('dark')) {
          chatBody.style.backgroundImage = `url('${nightBg}')`;
        }
      }
      updateBgSelection();
    });
  });

  function updateBgSelection() {
    bgOptions.forEach(img => {
      img.classList.remove('selected');
      if (img.classList.contains('custom-bg-option')) return; 
      
      if (bgMode === 'day' && img.src === dayBg) {
        img.classList.add('selected');
      }
      if (bgMode === 'night' && img.src === nightBg) {
        img.classList.add('selected');
      }
    });
  }

  document.getElementById('customBackgroundBtn')?.addEventListener('click', function(e) {
    e.stopPropagation(); 
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg, image/png, image/webp, image/jpg';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Imaginea este prea mare. Te rog alege una sub 5MB.');
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const imgUrl = event.target.result;

        document.getElementById('chat-body').style.backgroundImage = `url('${imgUrl}')`;
        
        if (bgMode === 'day') {
          dayBg = imgUrl;
          localStorage.setItem('customDayBg', imgUrl);
        } else {
          nightBg = imgUrl;
          localStorage.setItem('customNightBg', imgUrl);
        }

        updateBgSelection();
      };
      
      reader.readAsDataURL(file);
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
    
  });

  if (savedCustomDayBg) dayBg = savedCustomDayBg;
  if (savedCustomNightBg) nightBg = savedCustomNightBg;  

const deleteAllBtn = document.getElementById("deleteAllBtn");
const confirmOverlay = document.getElementById("confirmOverlay");
const confirmYes = document.querySelector(".deleteAllConfirm");
const confirmNo = document.querySelector(".deleteAllCancel");

deleteAllBtn.addEventListener("click", () => {
  confirmOverlay.style.display = "flex";
  document.body.classList.add("modal-open");
});

confirmYes.addEventListener("click", () => {
  const chatBody = document.getElementById("chat-body");
  chatBody.querySelectorAll('.message, .avatar-message-group').forEach(el => el.remove());
  const dateElement = document.getElementById("chatDate");
  if (dateElement && !chatBody.contains(dateElement)) {
    chatBody.prepend(dateElement);
  }
  confirmOverlay.style.display = "none";
  document.body.classList.remove("modal-open");
});

confirmNo.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  document.body.classList.remove("modal-open");
});

const notesIcon = document.getElementById("notesIcon");
const notesBox = document.getElementById("notesBox");
const closeNotes = document.getElementById("closeNotes");
const notesText = document.getElementById("notesText");
const saveNotes = document.getElementById("saveNotes");
const clearNotes = document.getElementById("clearNotes");
const notesHeader = notesBox.querySelector(".notes-header");

notesIcon.addEventListener("click", () => {
  if (notesBox.style.display === "flex") {
    notesBox.style.display = "none";
  } else {
    notesBox.style.display = "flex";
    notesText.value = localStorage.getItem("myNotes") || "";
  }
});

closeNotes.addEventListener("click", () => {
  notesBox.style.display = "none";
});

saveNotes.addEventListener("click", () => {
  localStorage.setItem("myNotes", notesText.value);
});

clearNotes.addEventListener("click", () => {
  notesText.value = "";
  localStorage.removeItem("myNotes");
});


let isDragging = false;
let offsetX, offsetY;

notesHeader.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - notesBox.getBoundingClientRect().left;
  offsetY = e.clientY - notesBox.getBoundingClientRect().top;
  document.body.style.userSelect = "none"; 
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    notesBox.style.left = `${e.clientX - offsetX}px`;
    notesBox.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

const dateElement = document.getElementById("chatDate");
const dateModal = document.getElementById("date-modal");
const dateBackdrop = document.getElementById("date-modal-backdrop");
const dateInput = document.getElementById("date-input");
const dateCloseBtn = document.querySelector(".date-close-btn");
const saveDateBtn = document.getElementById("save-date-btn");

function getCurrentDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('ro-RO', { month: 'long' });
  return `${day} ${month}`;
}

if (dateElement) {
  dateElement.textContent = getCurrentDate();
  
  dateElement.addEventListener("click", () => {
    dateInput.value = dateElement.textContent;
    dateBackdrop.style.display = "block";
    dateModal.style.display = "flex";
  });
}
function closeDateModal() {
  dateBackdrop.style.display = 'none';
  dateModal.style.display = 'none';
}

if (dateCloseBtn) dateCloseBtn.addEventListener("click", closeDateModal);
if (dateBackdrop) dateBackdrop.addEventListener("click", closeDateModal);

if (saveDateBtn) {
  saveDateBtn.addEventListener("click", () => {
    const newDate = dateInput.value.trim();
    if (newDate && dateElement) {
      dateElement.textContent = newDate;
    }
    closeDateModal();
  });
}

function openFreeStatusModal() {
  let modal = document.getElementById('free-status-modal');
  let backdrop = document.getElementById('free-status-backdrop');
  let input = document.getElementById('free-status-input');
  let saveBtn = document.getElementById('save-free-status-btn');
  let closeBtn = document.getElementById('close-free-status-btn');

  if (!modal) {
    backdrop = document.createElement('div');
    backdrop.id = 'free-status-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.style.display = 'block';
    backdrop.style.zIndex = '9999';

    modal = document.createElement('div');
    modal.id = 'free-status-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.zIndex = '10000';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
      <div class="modal-header">
        <button id="close-free-status-btn" aria-label="Închide" title="Închide" class="close-btn">×</button>
      </div>
      <label for="free-status-input" class="modal-label">${translations[currentLang].status_free_label}</label>
      <input type="text" id="free-status-input" value="${freeStatusText}" placeholder="${translations[currentLang].status_free_placeholder}" style="margin-bottom:10px;" />
      <button id="save-free-status-btn">${translations[currentLang].save}</button>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    input = modal.querySelector('#free-status-input');
    saveBtn = modal.querySelector('#save-free-status-btn');
    closeBtn = modal.querySelector('#close-free-status-btn');

    closeBtn.onclick = closeFreeStatusModal;
    backdrop.onclick = closeFreeStatusModal;
    saveBtn.onclick = () => {
      freeStatusText = input.value.trim();
      closeFreeStatusModal();
      renderStatus();
    };
  } else {
    input.value = freeStatusText;
    backdrop.style.display = 'block';
    modal.style.display = 'flex';
  }
}
function closeFreeStatusModal() {
  const modal = document.getElementById('free-status-modal');
  const backdrop = document.getElementById('free-status-backdrop');
  if (modal && backdrop) {
    modal.style.display = 'none';
    backdrop.style.display = 'none';
  }
}

let chatData = {};
try {
  chatData = JSON.parse(localStorage.getItem('chatData')) || {};
} catch (e) {
  chatData = {};
}

try {
  window.chatData = JSON.parse(localStorage.getItem('chatData')) || {};
} catch (e) {
  window.chatData = {};
}

  const nameElem = document.querySelector('.chat-header .chat-name');
  if (nameElem) {
    nameElem.textContent = chatData.otherName || 'Celălalt';
  }

function getCurrentAvatar() {
  const isDarkMode = document.body.classList.contains('dark');
  return isDarkMode ? (window.defaultAvatarDarkSrc || defaultAvatarDark) : (window.defaultAvatarLightSrc || defaultAvatarLight);
}

const openCategories = document.getElementById('OpenCategories');
const iconBox = document.querySelector('.icon-box');
const roleChangeBox = document.querySelector('.role-changebox');
const backArrow = document.querySelector('.back-arrow');
let iconBoxOpen = false; 
if (iconBox) {
  iconBox.classList.add('icon-box-closed');
}
if (roleChangeBox) {
  roleChangeBox.style.top = '250px';
}

if (openCategories && iconBox && roleChangeBox && backArrow) {
  openCategories.addEventListener('click', () => {
    if (iconBoxOpen) {
      iconBox.classList.add('icon-box-closed');
      roleChangeBox.style.top = '250px';
      openCategories.src = 'Vimg/arrow-down.png'; 
    } else {
      iconBox.classList.remove('icon-box-closed');
      roleChangeBox.style.top = '620px';
      openCategories.src = 'Vimg/arrow-up.png'; 
    }
    iconBoxOpen = !iconBoxOpen;
    });
}
