const captchas = [
  { src: "images/captcha1.jpg", answer: "silence is golden" },
  { src: "images/captcha2.jpg", answer: "sharing is caring" },
];

const randomCaptcha = captchas[Math.floor(Math.random() * captchas.length)];
document.getElementById("captchaImage").src = randomCaptcha.src;

const result = document.getElementById("result");
const verifyBtn = document.getElementById("verifyBtn");

let x = window.innerWidth / 3;
let y = window.innerHeight / 3;
const maxErrors = 20;

$(".error").hide();

function duplicateError() {
  const newError = $('<div class="error">' + $('.error').first().html() + '</div>');
  $('body').append(newError);
  newError
    .css({
      top: y + 'px',
      left: x + 'px',
      opacity: 1,
      display: "block"
    })
    .draggable();
  x += 4;
  y += 4;
}

verifyBtn.addEventListener("click", () => {
  const userAnswer = document.getElementById("captchaInput").value.trim().toLowerCase();

  if (userAnswer === randomCaptcha.answer.toLowerCase()) {
    result.textContent = "Correct.";
    $(".error").first().fadeIn(200).css("opacity", "1").draggable();
  } else {
    result.textContent = "Incorrect, try again.";
  }
});

$(document).on("click", ".ok, .close-button", function () {
  for (let i = 0; i < maxErrors; i++) {
    setTimeout(duplicateError, 50 * i);
  }
});


