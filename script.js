// 暗色模式切換與記憶
const toggleBtn = document.getElementById("toggle-dark-mode");
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
}
toggleBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.removeItem("dark-mode");
  }
});

// --- 將使用者輸入的 Email 同步到 _replyto（讓信件可以直接「回覆」） ---
const emailInput = document.getElementById("email");
const hiddenReplyTo = document.getElementById("hidden-replyto");
if (emailInput && hiddenReplyTo) {
  const syncReplyTo = () => { hiddenReplyTo.value = emailInput.value.trim(); };
  syncReplyTo();
  emailInput.addEventListener("input", syncReplyTo);
}

// 攔截表單，使用 AJAX 提交給 FormSubmit
const form = document.getElementById('consult-form');
const resultMsg = document.getElementById('result-msg');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  // 清掉舊 class
  resultMsg.classList.remove("error");

  if (response.ok) {
    resultMsg.textContent = "感謝您！問題已送出，我們會盡快回覆。";
    resultMsg.style.color = ""; // 讓 CSS 控制
  } else {
    resultMsg.textContent = "寄信失敗，請稍後再試。";
    resultMsg.classList.add("error");
    resultMsg.style.color = ""; // 讓 CSS 控制
  }
  form.reset();

  // 送出後也重設 hidden _replyto
  if (hiddenReplyTo) hiddenReplyTo.value = "";
});
