const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const themeToggle = document.querySelector("#theme-toggle");

const formFields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error")
  },

  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error")
  },

  message: {
    input: document.querySelector("#message"),
    error: document.querySelector("#message-error")
  }
};


function getValidationMessage(fieldName, input) {
  const value = input.value.trim();

  if (value === "") {
    if (fieldName === "name") {
      return "Please enter your name.";
    }

    if (fieldName === "email") {
      return "Please enter your email address.";
    }

    return "Please enter a message.";
  }

  if (fieldName === "email" && !input.validity.valid) {
    return "Please enter a valid email address.";
  }

  return "";
}


function showFieldError(field, message) {
  field.input.setAttribute("aria-invalid", "true");
  field.error.textContent = message;
}


function clearFieldError(field) {
  field.input.removeAttribute("aria-invalid");
  field.error.textContent = "";
}


function validateField(fieldName) {
  const field = formFields[fieldName];
  const message = getValidationMessage(fieldName, field.input);

  if (message !== "") {
    showFieldError(field, message);
    return false;
  }

  clearFieldError(field);
  return true;
}


function validateContactForm(event) {
  event.preventDefault();

  formStatus.textContent = "";

  const fieldNames = Object.keys(formFields);

  const validationResults = fieldNames.map((fieldName) => {
    return validateField(fieldName);
  });

  const firstInvalidIndex = validationResults.findIndex(
    (isValid) => !isValid
  );

  if (firstInvalidIndex !== -1) {
    const firstInvalidField =
      formFields[fieldNames[firstInvalidIndex]].input;

    formStatus.textContent =
      "Please correct the highlighted fields.";

    firstInvalidField.focus();
    return;
  }

  formStatus.textContent =
    "Your message is ready. This form does not send or store contact details.";
}


const formElementsExist =
  contactForm &&
  formStatus &&
  Object.values(formFields).every((field) => {
    return field.input && field.error;
  });


if (formElementsExist) {
  contactForm.addEventListener(
    "submit",
    validateContactForm
  );

  Object.entries(formFields).forEach(
    ([fieldName, field]) => {
      field.input.addEventListener("input", () => {
        formStatus.textContent = "";

        if (
          field.input.getAttribute("aria-invalid") === "true"
        ) {
          validateField(fieldName);
        }
      });
    }
  );
}


function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (!themeToggle) {
    return;
  }

  const lightThemeActive = theme === "light";

  themeToggle.textContent =
    lightThemeActive ? "Dark theme" : "Light theme";

  themeToggle.setAttribute(
    "aria-pressed",
    String(lightThemeActive)
  );
}


function getSavedTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}


function changeTheme() {
  const currentTheme =
    document.documentElement.dataset.theme;

  const nextTheme =
    currentTheme === "light" ? "dark" : "light";

  applyTheme(nextTheme);

  localStorage.setItem(
    "portfolio-theme",
    nextTheme
  );
}


if (themeToggle) {
  applyTheme(getSavedTheme());

  themeToggle.addEventListener(
    "click",
    changeTheme
  );
}