const WEDDING_DATE = new Date("2026-11-28T17:00:00+06:00");

// Укажите номер WhatsApp организатора в международном формате.
// Например: 996700000000
const WHATSAPP_NUMBER = "996778211727";

const translations = {
    ru: {
        navInvitation: "Приглашение",
        navDetails: "Детали",
        navRsvp: "Подтверждение",

        heroEyebrow: "Свадебное приглашение",
        heroDate: "28 ноября 2026",
        heroCity: "Баткен, Кыргызстан",

        invitationEyebrow: "Дорогие родные и близкие",
        invitationTitle: "Будем рады разделить<br>с вами этот особенный день.",
        invitationText:
            "Приглашаем вас на нашу свадьбу. Нам будет очень приятно видеть вас рядом в этот важный для нас день.",

        detailsEyebrow: "Будем ждать вас",
        detailsTitle: "День нашей свадьбы",

        dateLabel: "Дата",
        dateValue: "Суббота, 28 ноября",
        timeLabel: "Время",
        timeNote: "Начало мероприятия",
        placeLabel: "Место",
        placeNote: "Тойканасы, Баткен",
        mapLink: "Посмотреть на карте ↗",

        countdownEyebrow: "До нашей встречи осталось",
        days: "дней",
        hours: "часов",
        minutes: "минут",
        seconds: "секунд",

        rsvpEyebrow: "Пожалуйста, ответьте",
        rsvpTitle: "Вы будете с нами?",
        rsvpText: "Будем благодарны, если вы сообщите о своём присутствии.",
        nameLabel: "Ваше имя",
        namePlaceholder: "Имя и фамилия",
        attendanceLabel: "Сможете присутствовать?",
        attendanceYes: "Да, обязательно буду",
        attendanceNo: "К сожалению, не смогу",
        submitButton: "Отправить ответ",
        phoneMissing: "Для отправки ответа необходимо указать номер WhatsApp в файле js/main.js.",
        footerText: "Будем рады видеть вас!",
    },

    kg: {
        navInvitation: "Чакыруу",
        navDetails: "Маалымат",
        navRsvp: "Жооп берүү",

        heroEyebrow: "Үйлөнүү тоюна чакыруу",
        heroDate: "28-ноябрь, 2026-жыл",
        heroCity: "Баткен, Кыргызстан",

        invitationEyebrow: "Урматтуу туугандар жана жакындар",
        invitationTitle: "Өзгөчө күнүбүздү<br>сиздер менен бирге өткөрүүгө кубанычтабыз.",
        invitationText:
            "Сиздерди үйлөнүү тоюбузга чакырабыз. Бул маанилүү күнү жаныбызда болуп, кубанычыбызды тең бөлүшсөңүздөр, биз үчүн чоң сыймык.",

        detailsEyebrow: "Сиздерди күтөбүз",
        detailsTitle: "Той күнү",

        dateLabel: "Күнү",
        dateValue: "Ишемби, 28-ноябрь",
        timeLabel: "Убактысы",
        timeNote: "Тойдун башталышы",
        placeLabel: "Дареги",
        placeNote: "Буркан Ата тойканасы, Баткен",
        mapLink: "Картадан көрүү ↗",

        countdownEyebrow: "Тойго чейин калды",
        days: "күн",
        hours: "саат",
        minutes: "мүнөт",
        seconds: "секунд",

        rsvpEyebrow: "Жообуңузду күтөбүз",
        rsvpTitle: "Тойго келесизби?",
        rsvpText: "Келериңизди алдын ала билдирип койсоңуздар, ыраазы болобуз.",
        nameLabel: "Атыңыз",
        namePlaceholder: "Аты-жөнүңүз",
        attendanceLabel: "Тойго катыша аласызбы?",
        attendanceYes: "Ооба, сөзсүз келем",
        attendanceNo: "Тилекке каршы, келе албайм",
        submitButton: "Жоопту жөнөтүү",
        phoneMissing: "Жооп жөнөтүү үчүн js/main.js файлындагы WhatsApp номерин көрсөтүңүз.",
        footerText: "Сиздерди күтөбүз!",
    },
};

function setLanguage(language) {
    const dictionary = translations[language];

    if (!dictionary) return;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;

        if (dictionary[key]) {
            element.innerHTML = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;

        if (dictionary[key]) {
            element.placeholder = dictionary[key];
        }
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.lang === language);
    });

    document.title =
        language === "ru" ? "Иса и Сезим | Свадебное приглашение" : "Иса жана Сезим | Үйлөнүү тоюна чакыруу";
}

document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

// Обратный отсчёт
function updateCountdown() {
    const now = Date.now();
    const difference = WEDDING_DATE.getTime() - now;

    const elements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };

    if (difference <= 0) {
        Object.values(elements).forEach((element) => {
            element.textContent = "00";
        });
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    elements.days.textContent = String(days).padStart(3, "0");
    elements.hours.textContent = String(hours).padStart(2, "0");
    elements.minutes.textContent = String(minutes).padStart(2, "0");
    elements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Появление элементов при прокрутке
const revealElements = document.querySelectorAll(
    ".invitation__content, .details__header, .detail, .countdown__content, .rsvp__content",
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        },
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// Подтверждение присутствия
const rsvpForm = document.getElementById("rsvpForm");
const rsvpNote = document.getElementById("rsvpNote");

rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const language = document.documentElement.lang || "ru";
    const dictionary = translations[language];

    const guestName = document.getElementById("guestName").value.trim();

    const attendance = document.getElementById("attendance").value;

    if (!guestName) return;

    if (!WHATSAPP_NUMBER) {
        rsvpNote.textContent = dictionary.phoneMissing;
        return;
    }

    const attendanceText =
        language === "ru"
            ? attendance === "yes"
                ? "Да, буду присутствовать"
                : "К сожалению, не смогу присутствовать"
            : attendance === "yes"
              ? "Ооба, катышам"
              : "Тилекке каршы, катыша албайм";

    const message =
        language === "ru"
            ? `Здравствуйте! Меня зовут ${guestName}. ${attendanceText} на свадьбе Исы и Сезим 28 ноября 2026 года.`
            : `Саламатсыздарбы! Менин атым ${guestName}. Иса менен Сезимдин 2026-жылдын 28-ноябрындагы тоюна байланыштуу: ${attendanceText}.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

// Язык по умолчанию
setLanguage("ru");
