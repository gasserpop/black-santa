// ✅ الكتابة المتحركة// ✅ الكتابة المتحركة
if (document.getElementById('typed')) {
  new Typed('#typed', {
    strings: ["Your Vision . Our Edit . One Viral Outcome"],
    typeSpeed: 50,
    backSpeed: 20,
    loop: true
  });
}

// ✅ تأثيرات عند السحب
window.addEventListener('scroll', function () {
  const header = document.querySelector('.head');
  const tyt = document.querySelector(".tyt");
  const isMobile = window.innerWidth <= 768;
  const trigger = isMobile ? 200 : 600;

  if (window.scrollY > trigger) {
    header?.classList.add('blur');
    tyt?.classList.add('visible');
  } else {
    header?.classList.remove('blur');
    tyt?.classList.remove("visible");
  }
});

// ✅ إعادة الصفحة لأعلى عند إعادة التحميل
window.onbeforeunload = () => window.scrollTo(0, 0);

// ✅ تفعيل الأنيميشن عند الظهور
window.addEventListener("scroll", () => {
  document.querySelectorAll(".section").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// ✅ نموذج الحجز + إرسال البيانات إلى Google Sheets
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerText = "جاري الإرسال...";

    const successMsg = document.createElement("p");
    successMsg.innerText = "تم الإرسال بنجاح ✅";
    successMsg.style.color = "green";
    this.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
      submitBtn.disabled = false;
      submitBtn.innerText = "إرسال الحجز";
      this.reset();
    }, 4000);

    fetch('https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec', {
      method: 'POST',
      body: new FormData(this)
    });
  });
}

// ✅ دالة عرض الفيديو حسب نوع الرابط
function renderVideo(link) {
  if (link.includes('youtube.com') || link.includes('youtu.be')) {
    const videoId = link.includes('v=') ? link.split('v=')[1].split('&')[0] : link.split('/').pop();
    return <iframe width="300" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>;
  } else if (link.endsWith('.mp4')) {
    return <video width="300" height="400" controls><source src="${link}" type="video/mp4"></video>;
  } else {
    return <a href="${link}" target="_blank" style="color:white; font-size:18px;">🎬 مشاهدة الفيديو</a>;
  }
}

// ✅ تحميل الريلز من Google Sheets
function loadReels() {
  const container = document.getElementById('reels');
  if (!container) return;

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw_jwp1-bBlXnOZZDCxnpT5uwvitxJ6HAd_KSm2WPv5QZhwSk-pRUAp8ZIBZ746f1c/exec';

  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('reel-box');
        div.innerHTML = renderVideo(item.link);
        container.appendChild(div);
      });
    })
    .catch(err => {
      container.innerHTML = <p style="color:orange;">⚠ فشل تحميل الريلز</p>;
      console.error(err);
    });
}

// ✅ تشغيل عند تحميل الصفحة
window.onload = () => {
  loadReels();
};
