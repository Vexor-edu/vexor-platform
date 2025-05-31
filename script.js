// 🌐 تبديل اللغة بين العربي والإنجليزي
function toggleLang() {
  const html = document.documentElement;
  const btn = document.querySelector('.lang-switch');

  if (html.getAttribute('lang') === 'ar') {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    document.querySelector('h1').textContent = 'Welcome to Vexor';
    document.querySelector('p:nth-of-type(2)').textContent = 'Student services in Turkey and China.';
    btn.textContent = 'العربية';

    // تحديث الروابط
    document.querySelectorAll('a')[0].textContent = 'About Us';
    document.querySelectorAll('a')[1].textContent = 'Turkey';
    document.querySelectorAll('a')[2].textContent = 'China';
    document.querySelectorAll('a')[3].textContent = 'Become an Agent';

    // تحديث العناوين
    document.querySelectorAll('h2')[0].innerHTML = 'About Us ▾';
    document.querySelectorAll('h2')[1].innerHTML = 'Services in Turkey ▾';
    document.querySelectorAll('h2')[2].innerHTML = 'Services in China ▾';
    document.querySelectorAll('h2')[3].innerHTML = 'Become an Agent ▾';

    // تحديث أزرار التقديم
    document.querySelectorAll('.apply-button')[0].textContent = 'Apply for Turkey';
    document.querySelectorAll('.apply-button')[1].textContent = 'Apply for China';
    document.querySelectorAll('.apply-button')[2].textContent = 'Register as Agent Now';

  } else {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    document.querySelector('h1').textContent = 'مرحباً بك في فيكسور';
    document.querySelector('p:nth-of-type(2)').textContent = 'خدمات الطلاب في تركيا والصين.';
    btn.textContent = 'English';

    // تحديث الروابط
    document.querySelectorAll('a')[0].textContent = 'من نحن؟';
    document.querySelectorAll('a')[1].textContent = 'تركيا';
    document.querySelectorAll('a')[2].textContent = 'الصين';
    document.querySelectorAll('a')[3].textContent = 'كن وكيلًا';

    // تحديث العناوين
    document.querySelectorAll('h2')[0].innerHTML = 'من نحن؟ ▾';
    document.querySelectorAll('h2')[1].innerHTML = 'خدمات تركيا ▾';
    document.querySelectorAll('h2')[2].innerHTML = 'خدمات الصين ▾';
    document.querySelectorAll('h2')[3].innerHTML = 'كن وكيلًا ▾';

    // تحديث أزرار التقديم
    document.querySelectorAll('.apply-button')[0].textContent = 'قدم الآن لتركيا';
    document.querySelectorAll('.apply-button')[1].textContent = 'قدم الآن للصين';
    document.querySelectorAll('.apply-button')[2].textContent = 'سجل كوكيل الآن';
  }
}

// ➕ توسيع الأقسام عند الضغط عليها
function toggleContent(id) {
  const content = document.getElementById(id);
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// 💬 إظهار وإخفاء نافذة الشات بوت
document.getElementById('chatbot-btn').addEventListener('click', () => {
  const chatWindow = document.getElementById('chatbot-window');
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('close-chat').addEventListener('click', () => {
  document.getElementById('chatbot-window').style.display = 'none';
});

// 🤖 شات بوت ذكي - يتصل بـ OpenAI عبر Vercel Function
document.getElementById('chat-input').addEventListener('keypress', async function(e) {
  if (e.key === 'Enter' && this.value.trim() !== '') {
    const userMsg = this.value;
    appendMessage('user', userMsg);

    this.value = '';
    
    try {
      const botReply = await getBotResponse(userMsg);
      appendMessage('bot', botReply);
    } catch (error) {
      appendMessage('bot', 'عذرًا، حدث خطأ في الاتصال.');
    }
  }
});

async function getBotResponse(question) {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: question })
  });

  const data = await response.json();
  return data.reply || 'عذرًا، لم أتمكن من فهم سؤالك.';
}

// 📩 دالة إضافة الرسائل إلى الدردشة
function appendMessage(sender, message) {
  const chat = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.style.margin = '5px 0';
  msgDiv.style.padding = '10px';
  msgDiv.style.borderRadius = '5px';
  msgDiv.style.maxWidth = '80%';
  msgDiv.style.clear = 'both';

  if (sender === 'user') {
    msgDiv.style.float = 'right';
    msgDiv.style.background = '#eef2f3';
    msgDiv.style.textAlign = 'right';
  } else {
    msgDiv.style.float = 'left';
    msgDiv.style.background = '#dceaf0';
    msgDiv.style.textAlign = 'right';
  }

  msgDiv.textContent = message;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}