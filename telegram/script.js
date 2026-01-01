const translations = {
  ro: {
    status_online: "online",
    status_offline: ora => `văzut(ă) la ${ora}`,
    status_recent: "văzut(ă) de curând",
    status_long: "văzut(ă) acum mult timp",
    settings: "Setări mesaje",
    fontSize: "Mărime text mesaje",
    corners: "Colțuri mesaje",
    reply: "Răspunde",
    delete: "Șterge mesajul",
    edit: "Schimbă mesajul",
    placeholder: "Mesaj",
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
    edited: "schimbat"
  },
  ru: {
    status_online: "в сети",
    status_offline: ora => `был(а) в ${ora}`,
    status_recent: "был(а) недавно",
    status_long: "был(а) давно",
    settings: "Настройки сообщений",
    fontSize: "Размер текста сообщений",
    corners: "Скругление углов",
    reply: "Ответить",
    delete: "Удалить сообщение",
    edit: "Изменить",
    placeholder: "Сообщение",
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
    edited: "изменено"
  },
  en: {
    status_online: "online",
    status_offline: ora => `last seen at ${ora}`,
    status_recent: "last seen recently",
    status_long: "last seen a long time ago",
    settings: "Message Settings",
    fontSize: "Message text size",
    corners: "Message corners",
    reply: "Reply",
    delete: "Delete message",
    edit: "Edit message",
    placeholder: "Message",
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
    edited: "edited"
  }
};

  let currentLang = 'ro';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.querySelector('.settings-window h2').textContent = t.settings;
  document.querySelector('label[for="fontSizeRange"]').textContent = t.fontSize;
  document.querySelector('label[for="radiusRange"]').textContent = t.corners;
  document.getElementById('replyMsg').textContent = t.reply;
  document.getElementById('deleteMsg').textContent = t.delete;
  document.getElementById('editMsg').textContent = t.edit;
  document.getElementById('msg').placeholder = t.placeholder;
  const modalLabel = document.querySelector('.modal-label');

const dateModalLabel = document.querySelector('.date-modal-label');
if (dateModalLabel) dateModalLabel.textContent = t.setData;
const saveDateBtn = document.getElementById('save-date-btn');
if (saveDateBtn) saveDateBtn.textContent = t.saveDate;
const saveTimeBtn = document.getElementById('saveTime');
if (saveTimeBtn) saveTimeBtn.textContent = t.save;

  const setDBtn = document.getElementById('setDayBgBtn');
  const setNBtn = document.getElementById('setNightBgBtn');
  if (setDBtn) setDBtn.textContent = t.setD;
  if (setNBtn) setNBtn.textContent = t.setN;

  const question = document.querySelector('.deleteAllQuestion');
  const yesBtn = document.querySelector('.deleteAllConfirm');
  const noBtn = document.querySelector('.deleteAllCancel');
  if(question) question.textContent = t.deleteAllQuestion;
  if(yesBtn) yesBtn.textContent = t.deleteAllConfirm;
  if(noBtn) noBtn.textContent = t.deleteAllCancel;

  const notesHeader = document.querySelector('#notesBox .notes-header span');
  const notesArea = document.getElementById('notesText');
  const saveNotesBtn = document.getElementById('saveNotes');
  const clearNotesBtn = document.getElementById('clearNotes');

  if (notesHeader) notesHeader.textContent = t.notesTitle;
  if (notesArea) notesArea.placeholder = t.notesPlaceholder;
  if (saveNotesBtn) saveNotesBtn.textContent = t.save;
  if (clearNotesBtn) clearNotesBtn.textContent = t.clear;

  const editedLabels = document.querySelectorAll('.edited-label'); 
editedLabels.forEach(label => {
  label.textContent = translations[currentLang].edited;   
});
}

  document.addEventListener('DOMContentLoaded', () => {
    const cancelReply = document.getElementById('cancelReply');
    if (cancelReply) {
      cancelReply.addEventListener('click', () => {
        const replyPreview = document.getElementById('replyPreview');
        if (replyPreview) replyPreview.style.display = 'none';
        replyMode = false;
        replyToMessage = null;
      });
    }
    
  setLanguage('ro');

    const changeBgBtn = document.getElementById('changebackgroundIcon');
    const bgMenu = document.getElementById('backgroundMenu');
    if (changeBgBtn && bgMenu) {
      changeBgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bgMenu.style.display = bgMenu.style.display === 'none' ? 'flex' : 'none';
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
    });
  });

      const newChat = document.querySelector('.new-chat');
    if (newChat) {
      newChat.addEventListener('click', () => {
        window.location.href = 'config.html';
      });
    }

    let myName = 'Tu';
    let otherName = 'Celălalt';
    const chatDataJSON = localStorage.getItem('chatData');
    if (chatDataJSON) {
      const chatData = JSON.parse(chatDataJSON);
      if (chatData.myName) myName = chatData.myName;
      if (chatData.otherName) otherName = chatData.otherName;
      const nameElem = document.querySelector('.chat-header .name');
      const avatarElem = document.querySelector('.chat-header .avatar');
      if (nameElem) nameElem.textContent = chatData.otherName || 'Celălalt';
      if (avatarElem && chatData.otherImage) avatarElem.src = chatData.otherImage;
    }

  const statuses = [
    () => {
      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, '0');
      const currentMinute = now.getMinutes().toString().padStart(2, '0');
      return translations[currentLang].status_offline(
        `<span id="statusTime" title="Click pentru a schimba ora">${currentHour}:${currentMinute}</span>`
      );
    },
    () => translations[currentLang].status_recent,
    () => translations[currentLang].status_long,
    () => translations[currentLang].status_online
  ];

    let statusIndex = 0;

    function renderStatus() {
      document.querySelectorAll('.status').forEach(statusElem => {
        statusElem.innerHTML = statuses[statusIndex]();

        if (statusIndex === 3) {
          statusElem.classList.add('online');
        } else {
          statusElem.classList.remove('online');
        }

        if (statusIndex === 0) {
          const timeSpan = statusElem.querySelector('#statusTime');
          if (timeSpan) {
            timeSpan.style.cursor = 'pointer';
            if (!timeSpan.dataset.listenerAdded) {
              timeSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                openTimeModal(timeSpan);
              });
              timeSpan.dataset.listenerAdded = 'true';
            }
          }
        }
      });
    }

    renderStatus();

    const statusElem = document.querySelector('.status');
    if (statusElem) {
      statusElem.addEventListener('click', () => {
        statusIndex = (statusIndex + 1) % statuses.length;
        renderStatus();
      });
    }

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

    let replyMode = false;
    let replyToMessage = null;
    let editMode = false;
    let editMsgSpan = null;
    let currentSender = 'me'; 

  
    const roleToggleIcon = document.getElementById('roleToggleIcon');
    if (roleToggleIcon) {
      roleToggleIcon.addEventListener('click', () => {
        currentSender = currentSender === 'me' ? 'other' : 'me';
        
        
      });
    }

    function adaugaMesaj(sender, text, replyTo) {
      if (text.trim() === '') return;

  const chatBody = document.getElementById('chat-body');
    if (chatBody) {
      const lastMsg = chatBody.lastElementChild;
      if (lastMsg && lastMsg.classList.contains('message')) {
        if (lastMsg.classList.contains(sender)) {
          const tail = lastMsg.querySelector('.tail-img');
          if (tail) tail.remove();
          lastMsg.classList.add('stacked');
        }
      }
    }

      const div = document.createElement('div');
      div.className = 'message ' + sender;

    
      if (replyTo) {
        let author = '';
        if (replyTo.classList.contains('me')) author = myName;
        else if (replyTo.classList.contains('other')) author = otherName;
        else author = replyTo.querySelector('.author')?.innerText || '';
        const replyText = replyTo.querySelector('.message-text')?.innerText || '';

        const isDarkMode = document.body.classList.contains('dark');
        let replyTypeClass = '';
        if (sender === 'me' && replyTo.classList.contains('other')) replyTypeClass = 'reply-me-to-other';
        else if (sender === 'me' && replyTo.classList.contains('me')) replyTypeClass = 'reply-me-to-me';
        else if (sender === 'other' && replyTo.classList.contains('me')) replyTypeClass = 'reply-other-to-me';
        else if (sender === 'other' && replyTo.classList.contains('other')) replyTypeClass = 'reply-other-to-other';


        const replyBlockHTML = `
          <div class="reply-block ${replyTypeClass}" style="display: flex; flex-direction: column;">
            <div class="reply-author">${author}</div>
            <div class="reply-text">${replyText}</div>
          </div>
        `;

        div.insertAdjacentHTML('afterbegin', replyBlockHTML);
      }

      const spanText = document.createElement('span');
      spanText.className = 'message-text';
      spanText.textContent = text;

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

          const check = document.createElement('img');
          check.src = 'Timg/tick.png';
          check.dataset.state = 'unread';

          checks.appendChild(check);

          checks.addEventListener('click', () => {
            const currentState = check.dataset.state;
            const newState = currentState === 'unread' ? 'read' : 'unread';
            check.dataset.state = newState;
            check.src = newState === 'read' ? 'Timg/2tick.png' : 'Timg/tick.png';
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
          const checks = document.createElement('div');
          checks.className = 'checks';

          const check = document.createElement('img');
          check.src = 'Timg/tick.png';
          check.dataset.state = 'unread';

          checks.appendChild(check);

          checks.addEventListener('click', () => {
            const currentState = check.dataset.state;
            const newState = currentState === 'unread' ? 'read' : 'unread';
            check.dataset.state = newState;
            check.src = newState === 'read' ? 'Timg/2tick.png' : 'Timg/tick.png';
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
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (sender === 'me') {
    const tail = document.createElement('img');
    tail.className = 'tail-img';
    if (document.body.classList.contains('dark')) {
      tail.src = 'Timg/tailviolet.png';
    } else {
      tail.src = 'Timg/tail.png';
    }
    div.appendChild(tail);
  }
  if (sender === 'other') {
    const tail = document.createElement('img');
    tail.className = 'tail-img';
    tail.src = 'Timg/tail.png';
    div.appendChild(tail);
  }

      replyMode = false;
      replyToMessage = null;
      const replyPreview = document.getElementById('replyPreview');
      if (replyPreview) replyPreview.style.display = 'none';
    }

    const inputMsg = document.getElementById('msg');
    const chatInputDiv = document.querySelector('.chat-input');
    const sendIcon = document.getElementById('sendIcon');

    if (inputMsg) {
      inputMsg.addEventListener('input', () => {
        if (inputMsg.value.trim() !== '') {
          chatInputDiv.classList.add('show-send');
          if (sendIcon) sendIcon.style.display = 'inline';
        } else {
          chatInputDiv.classList.remove('show-send');
          if (sendIcon) sendIcon.style.display = 'none';
        }
      });
    }

  function createMessageElement(text, sender, replyingTo = null) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    if (editingMessage === messageDiv) {
      messageDiv.classList.add("editing");
    }

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.innerHTML = text;

    if (replyingTo) {
      const replyDiv = document.createElement("div");
      replyDiv.classList.add("reply");

      const replyTextDiv = document.createElement("div");
      replyTextDiv.classList.add("reply-text");
      replyTextDiv.innerText = replyingTo.querySelector(".text").innerText;

      replyDiv.appendChild(replyTextDiv);
      messageDiv.appendChild(replyDiv);
    }

    messageDiv.appendChild(textDiv);

    if (sender === "sent") {
      const tailDiv = document.createElement("div");
      tailDiv.classList.add("tail-svg");
      messageDiv.appendChild(tailDiv);
    }

    return messageDiv;
  }

    function trimiteMesaj() {
      if (!inputMsg) return;
      const text = inputMsg.value.trim();
      if (text === '') return;

      if (editMode && editMsgSpan) {
        editMsgSpan.textContent = text;

        const container = editMsgSpan.closest('.message');
        const timeSpan = container.querySelector('.time-text');
        const sender = container.classList.contains('me') ? 'me' : 'other';

  if (container && !container.querySelector('.edited-label')) {
    const editedLabel = document.createElement('span');
    editedLabel.className = 'edited-label';
    editedLabel.textContent = translations[currentLang].edited;
    editedLabel.style.marginLeft = '-2px';
    editedLabel.style.fontSize = '11px';
    editedLabel.style.verticalAlign = 'middle';

    const isDarkMode = document.body.classList.contains('dark');
    if (sender === 'me') {
      editedLabel.style.color = isDarkMode ? '#ffffff' : '#62c159';
    } else {
      editedLabel.style.color = '#888888';
    }

    if (timeSpan) {
      timeSpan.parentElement.insertBefore(editedLabel, timeSpan);
    } else {
      container.appendChild(editedLabel);
    }
  }


        editMode = false;
        editMsgSpan = null;
      } else {
        adaugaMesaj(currentSender, text, replyMode ? replyToMessage : null);
      }

      inputMsg.value = '';
      chatInputDiv.classList.remove('show-send');
      if (sendIcon) sendIcon.style.display = 'none';
      inputMsg.blur();
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
    let contextMsg = null;

    function showContextMenu(event, msgDiv) {
      contextMsg = msgDiv;
      if (contextMenu) {
        contextMenu.style.top = event.pageY + 'px';
        contextMenu.style.left = event.pageX + 'px';
        contextMenu.style.display = 'block';
      }
    }

    document.addEventListener('click', (e) => {
      if (contextMenu && contextMenu.style.display === 'block' && !contextMenu.contains(e.target)) {
        contextMenu.style.display = 'none';
        contextMsg = null;
      }
    });

if (contextMenu) {
  contextMenu.querySelector('#deleteMsg').onclick = () => {
    if (contextMsg) {
      contextMsg.remove();
      contextMenu.style.display = 'none';
      contextMsg = null;
    }
  };

      contextMenu.querySelector('#editMsg').onclick = () => {
        if (contextMsg) {
          const span = contextMsg.querySelector('.message-text');
          if (span && inputMsg) {
            inputMsg.value = span.textContent;
            inputMsg.focus();
            editMode = true;
            editMsgSpan = span;
            chatInputDiv.classList.add('show-send');
            if (sendIcon) sendIcon.style.display = 'inline';
          }
          contextMenu.style.display = 'none';
        }
      };

      contextMenu.querySelector('#replyMsg').onclick = () => {
        if (contextMsg) {
          replyMode = true;
          replyToMessage = contextMsg;
          const replyTextElem = document.getElementById('replyText');
          if (replyTextElem) {
            replyTextElem.textContent = contextMsg.querySelector('.message-text').textContent;
          }
          const replyPreview = document.getElementById('replyPreview');
          if (replyPreview) {
            replyPreview.classList.remove('reply-me-to-other', 'reply-me-to-me', 'reply-other-to-me', 'reply-other-to-other');
            let replyTypeClass = '';
            if (currentSender === 'me' && contextMsg.classList.contains('other')) replyTypeClass = 'reply-me-to-other';
            else if (currentSender === 'me' && contextMsg.classList.contains('me')) replyTypeClass = 'reply-me-to-me';
            else if (currentSender === 'other' && contextMsg.classList.contains('me')) replyTypeClass = 'reply-other-to-me';
            else if (currentSender === 'other' && contextMsg.classList.contains('other')) replyTypeClass = 'reply-other-to-other';
            if (replyTypeClass) replyPreview.classList.add(replyTypeClass);
            replyPreview.style.display = 'block';
          }
          if (inputMsg) {
            inputMsg.focus();
            chatInputDiv.classList.add('show-send');
            if (sendIcon) sendIcon.style.display = 'inline';
          }
          contextMenu.style.display = 'none';
        }
      };
    }

    window.addEventListener('scroll', () => {
      if (contextMenu) contextMenu.style.display = 'none';
    });
    window.addEventListener('resize', () => {
      if (contextMenu) contextMenu.style.display = 'none';
    });

    const stickerImg = document.getElementById('emojiIcon');
    const microImg = document.getElementById('microIcon');

    const stickerSources = ['Timg/sticker.png', 'Timg/emoji.png'];
    const microSources = ['Timg/micro.png', 'Timg/camera.png'];

    let stickerIndex = 0;
    let microIndex = 0;

    if (stickerImg) {
      stickerImg.addEventListener('click', () => {
        stickerIndex = (stickerIndex + 1) % stickerSources.length;
        stickerImg.src = stickerSources[stickerIndex];
        stickerImg.className = stickerIndex === 0 ? 'emoji-default' : 'emoji-alt';
      });
    }

    if (microImg) {
      microImg.addEventListener('click', () => {
        microIndex = (microIndex + 1) % microSources.length;
        microImg.src = microSources[microIndex];
        microImg.className = microIndex === 0 ? 'micro-default' : 'micro-alt';
      });
    }

    const radiusRange = document.getElementById('radiusRange');
    const radiusValue = document.getElementById('radiusValue');

  if (radiusRange && radiusValue) {
    radiusRange.addEventListener('input', () => {
      const value = parseInt(radiusRange.value);
      radiusValue.textContent = value;

      document.querySelectorAll('.message').forEach(msg => {

          msg.style.borderTopLeftRadius = value + 'px';
          msg.style.borderTopRightRadius = value + 'px';

          if (msg.classList.contains('me')) {
            msg.style.borderBottomLeftRadius = value + 'px';
            msg.style.borderBottomRightRadius = value > 2 ? '3px' : '0px';
          } else {
            msg.style.borderBottomRightRadius = value + 'px';
            msg.style.borderBottomLeftRadius = value > 2 ? '3px' : '0px';
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

      document.querySelectorAll('.message.me .tail-img').forEach(tail => {
        tail.src = isDarkMode ? 'Timg/tailviolet.png' : 'Timg/tail.png';
      });

      if (isDarkMode && nightBg) {
        chatBody.style.backgroundImage = `url('${nightBg}')`;
      } else if (!isDarkMode && dayBg) {
        chatBody.style.backgroundImage = `url('${dayBg}')`;
      }
    });
  }

  function updateEditedLabelsColor() {
    const isDarkMode = document.body.classList.contains('dark');
    document.querySelectorAll('.edited-label').forEach(label => {
      const messageDiv = label.closest('.message');
      const sender = messageDiv.classList.contains('me') ? 'me' : 'other';
      if (sender === 'me') {
        label.style.color = isDarkMode ? '#ffffff' : '#62c159';
      } else {
        label.style.color = '#888888';
      }
    });
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
  const dateElement = document.getElementById("chatDate");
  chatBody.innerHTML = "";
  
  if (dateElement) {
    chatBody.appendChild(dateElement);
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
  notesBox.style.display = "flex";
  notesText.value = localStorage.getItem("myNotes") || "";
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
  dateBackdrop.style.display = "none";
  dateModal.style.display = "none";
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
      openCategories.src = 'Timg/arrow-down.png'; 
    } else {
      iconBox.classList.remove('icon-box-closed');
      roleChangeBox.style.top = '620px';
      openCategories.src = 'Timg/arrow-up.png'; 
    }
    iconBoxOpen = !iconBoxOpen;
    });
}

});

