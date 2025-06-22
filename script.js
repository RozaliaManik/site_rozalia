// === УКАЖИТЕ ВАШИ ДАННЫЕ ===
const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // замените на свой токен
const CHAT_ID = "YOUR_CHAT_ID"; // замените на ваш chat_id
const FORM_STATUS = document.getElementById("form-status");

document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !phone || !date || !time) {
    FORM_STATUS.textContent = "Заполните все поля.";
    FORM_STATUS.style.color = "red";
    return;
  }

  const message = `Новая запись:\nИмя: ${name}\nТелефон: ${phone}\nДата: ${date}\nВремя: ${time}`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
  .then(response => {
    if (response.ok) {
      FORM_STATUS.textContent = "Заявка успешно отправлена!";
      FORM_STATUS.style.color = "green";
      document.getElementById("booking-form").reset();
    } else {
      throw new Error("Ошибка отправки");
    }
  })
  .catch(err => {
    console.error(err);
    FORM_STATUS.textContent = "Ошибка отправки заявки.";
    FORM_STATUS.style.color = "red";
  });
});
