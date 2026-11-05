// Keep current specials here so the displayed table can be updated in one place.
const pricing = [
  { product: "Galvanised Sheet 0.3mm", price: "R60", unit: "per meter" },
  { product: "Galvanised Sheet 0.4mm", price: "R78", unit: "per meter" },
  { product: "Charcoal Sheet 0.4mm", price: "R95", unit: "per meter" },
  { product: "Charcoal Sheet 0.47mm", price: "R110", unit: "per meter" },
  { product: "Chromerdek Coils", price: "R19 000", unit: "per ton · all colours available" },
];

const pricingList = document.querySelector("#pricing-list");

pricing.forEach(({ product, price, unit }) => {
  const row = document.createElement("div");
  row.className = "price-row";

  const name = document.createElement("strong");
  name.textContent = product;

  if (unit) {
    const note = document.createElement("small");
    note.textContent = unit;
    name.append(note);
  }

  const value = document.createElement("span");
  value.className = "price-value";
  value.textContent = price;

  row.append(name, value);
  pricingList.append(row);
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNavigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

primaryNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) {
    return;
  }

  const formData = new FormData(quoteForm);
  const answers = {
    name: formData.get("name").trim(),
    product: formData.get("product"),
    quantity: formData.get("quantity").trim(),
    sizes: formData.get("sizes").trim(),
    location: formData.get("location").trim(),
  };
  const message = [
    "Hi SteelMax Solutions, I would like to request a quote.",
    "",
    `Name: ${answers.name}`,
    `Products required: ${answers.product}`,
    `Quantity: ${answers.quantity}`,
    `Required lengths / sizes: ${answers.sizes}`,
    `Delivery location: ${answers.location}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/27635206616?text=${encodeURIComponent(message)}`;

  formStatus.textContent = "Thanks! Your WhatsApp quote request is ready. Send the message in WhatsApp to complete your request.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

const revealElements = document.querySelectorAll(".reveal");
document.documentElement.classList.add("js");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
