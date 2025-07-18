AOS.init();
//////////////////// Slider ////////////////////
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000, // 30 detik
    disableOnInteraction: false,
  },
  speed: 2000, // slide speed
  slidesPerView: 1,
  spaceBetween: 0,
});

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const dropdownIcon = document.getElementById("dropdown-icon");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
    dropdownIcon.classList.toggle("rotate-180");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const promoContainer = document.getElementById("promoContainer");
  const noPromoMessage = document.getElementById("noPromoMessage");
  const promoTitle = document.getElementById("promoTitle");

  const promoData = {
    "best-seller": ["../assets/paket/fix2-nb-01.png"],
    silver: ["../assets/paket/fix2-nb-01.png"],
    gold: [],
    platinum: ["../assets/paket/fix2-nb-01.png"],
    all: ["../assets/paket/fix2-nb-01.png"],
  };

  function getCategoryFromPath() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "all";
  }

  function setActiveTab(activeBtn) {
    tabButtons.forEach((btn) => {
      btn.classList.remove("text-white", "bg-[#447EBE]", "font-bold");
    });
    activeBtn.classList.add("text-white", "bg-[#447EBE]", "font-bold");
  }

  function renderPromos(category) {
    promoContainer.innerHTML = "";
    let promos = [];

    if (category === "all") {
      promos = Object.values(promoData).flat();
    } else {
      promos = promoData[category] || [];
    }

    if (promoTitle) {
      promoTitle.textContent = `Promo Paket ${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
    }

    if (promos.length === 0) {
      noPromoMessage?.classList.remove("hidden");
    } else {
      noPromoMessage?.classList.add("hidden");

      promos.forEach((src, index) => {
        // Bungkus dengan div relative
        const wrapper = document.createElement("div");
        wrapper.className = "relative w-full mt-3";

        // Gambar
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Promo Paket";
        img.className = "rounded  h-auto z-0";

        img.setAttribute("data-aos", "zoom-out");
        img.setAttribute("data-aos-delay", `${index * 300}`);
        // promoContainer.appendChild(wrapper);
        // wrapper.appendChild(img);

        // Tombol Daftar Sekarang
        const daftarBtn = document.createElement("a");
        daftarBtn.href = "#daftar";
        daftarBtn.textContent = "Daftar!";
        daftarBtn.className = "absolute top-[86%] left-[35%] -translate-x-1/2 -translate-y-1/2 " + "bg-white text-[#447EBE] text-[0.25rem] font-bold px-1 py-0.5 rounded-full shadow-lg " + "hover:bg-blue-100 transition z-10";

        // Tombol Hubungi Kami
        const hubungiBtn = document.createElement("a");
        hubungiBtn.href = "https://wa.me/6281234567890";
        hubungiBtn.textContent = "Hubungi Kami";
        hubungiBtn.className = "absolute top-[86%] left-[45%] -translate-x-1/2 -translate-y-1/2 " + "bg-[#447EBE] text-white text-[0.25rem] font-bold px-1 py-0.5 rounded-full shadow-lg " + "hover:bg-blue-100 transition z-10";

        // Icon Whatsapp
        const whatsappIcon = document.createElement("img");
        whatsappIcon.src = "../assets/Icon/WhatsApp-w.png";
        whatsappIcon.alt = "Icon Whatsapp";
        whatsappIcon.className = "w-1.5 h-1.5 inline-block mr-0.5";
        hubungiBtn.prepend(whatsappIcon);

        // wrapper.appendChild(hubungiBtn);

        promoContainer.appendChild(wrapper);
        wrapper.appendChild(img);
        wrapper.appendChild(daftarBtn);
        wrapper.appendChild(hubungiBtn);
        // baru masukkan wrapper ke halaman
      });
    }
  }

  // Inisialisasi
  const defaultCategory = getCategoryFromPath();
  const defaultTab = document.querySelector(`[data-category="${defaultCategory}"]`);
  if (defaultTab) {
    setActiveTab(defaultTab);
    renderPromos(defaultCategory);
    updateLihatSemuaLink(defaultCategory);
  }

  tabButtons.forEach((btn) => {
    btn.classList.add("tab-underline");
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      setActiveTab(btn);
      renderPromos(category);
      updateLihatSemuaLink(category);
    });
  });
});