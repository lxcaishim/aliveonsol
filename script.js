// Set your Solana mint here when ready — Dexscreener + Buy button wire up automatically.
const TOKEN_MINT = "";

document.getElementById("year").textContent = new Date().getFullYear();

const caText = document.getElementById("ca-text");
const copyCaBtn = document.getElementById("copy-ca-btn");
const buyBtn = document.getElementById("buy-btn");

if (TOKEN_MINT.trim().length > 0) {
  caText.textContent = `CA: ${TOKEN_MINT}`;
  buyBtn.href = `https://pump.fun/coin/${TOKEN_MINT}`;
} else {
  caText.textContent = "CA: TBD";
  buyBtn.href = "https://pump.fun";
  buyBtn.setAttribute("aria-disabled", "true");
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open");
});

navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    history.replaceState(null, "", href);
  });
});

copyCaBtn.addEventListener("click", async () => {
  if (!TOKEN_MINT.trim()) {
    copyCaBtn.textContent = "TBD";
    setTimeout(() => { copyCaBtn.textContent = "Copy"; }, 1200);
    return;
  }
  try {
    await navigator.clipboard.writeText(TOKEN_MINT);
    copyCaBtn.textContent = "Copied";
    setTimeout(() => { copyCaBtn.textContent = "Copy"; }, 1200);
  } catch (_error) {
    copyCaBtn.textContent = "Failed";
    setTimeout(() => { copyCaBtn.textContent = "Copy"; }, 1200);
  }
});

const dexscreenerContainer = document.getElementById("dexscreener-widget");
const dexChain = "solana";
const contractAddress = TOKEN_MINT;

if (contractAddress.trim().length > 0) {
  const iframe = document.createElement("iframe");
  iframe.title = "Dexscreener chart widget";
  iframe.src = `https://dexscreener.com/${dexChain}/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;
  iframe.allow = "clipboard-write";
  dexscreenerContainer.appendChild(iframe);
} else {
  dexscreenerContainer.innerHTML = `
    <div class="widget-placeholder">
      <p>
        Dexscreener widget will appear here once the official contract address is set in <code>script.js</code>.<br />
        Open <a href="https://dexscreener.com" target="_blank" rel="noreferrer">dexscreener.com</a> for market discovery in the meantime.
      </p>
    </div>
  `;
}
