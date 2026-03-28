const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

// Замени на свой URL:
// - для теста: webhook.site
// - для сильного кейса: webhook из n8n / Make / backend
const WEBHOOK_URL = "https://example.com/webhook";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusEl.textContent = "Отправка...";
  statusEl.className = "form-status";
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка...";

  const formData = new FormData(form);

  const payload = {
    name: formData.get("name")?.toString().trim(),
    contact: formData.get("contact")?.toString().trim(),
    message: formData.get("message")?.toString().trim(),
    source: "premium-telegram-bot-landing",
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    form.reset();
    statusEl.textContent = "Спасибо! Заявка отправлена.";
    statusEl.className = "form-status success";
  } catch (error) {
    console.error("Ошибка отправки формы:", error);
    statusEl.textContent = "Не удалось отправить заявку. Проверь URL webhook или повторите позже.";
    statusEl.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить заявку";
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add("is-visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
