AOS.init();

document.addEventListener("DOMContentLoaded", function () {
  const paketLink = document.getElementById("paketToggle");
  const arrowIcon = document.getElementById("arrowIcon");
  const dropdown = document.getElementById("dropdownMenu");

  let isOpen = false;

  paketLink.addEventListener("click", function (e) {
    e.preventDefault();
    isOpen = !isOpen;
    dropdown.classList.toggle("hidden", !isOpen);
    arrowIcon.classList.toggle("rotate-180", isOpen);
  });

  document.addEventListener("click", function (e) {
    if (!paketLink.contains(e.target) && !dropdown.contains(e.target)) {
      isOpen = false;
      dropdown.classList.add("hidden");
      arrowIcon.classList.remove("rotate-180");
    }
  });
});

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
  const tabButtons = document.querySelectorAll(".tab-btn");
  const promoContainer = document.getElementById("promoContainer");
  const noPromoMessage = document.getElementById("noPromoMessage");
  const lihatSemuaBtn = document.getElementById("lihatSemuaBtn");
  const promoTitle = document.getElementById("promoTitle");

  const promoData = {
    "best-seller": ["../assets/paket/full-01.png", "../assets/paket/full-01.png", "../assets/paket/full-01.png", "../assets/paket/full-01.png", "../assets/paket/full-01.png"],
    silver: ["../assets/paket/full-01.png"],
    gold: [],
    platinum: ["../assets/paket/full-01.png", "../assets/paket/full-01.png"],
    all: ["../assets/paket/full-01.png", "../assets/paket/full-01.png", "../assets/paket/full-01.png"],
  };

  function getCategoryFromPath() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "all";
  }

  function setActiveTab(activeBtn) {
    tabButtons.forEach((btn) => {
      btn.classList.remove("text-[#447EBE]", "font-bold", "tab-underline-active");
    });
    activeBtn.classList.add("text-[#447EBE]", "font-bold", "tab-underline-active");
  }

  function renderPromos(category) {
    promoContainer.innerHTML = "";
    let promos = [];

    if (category === "all") {
      promos = Object.values(promoData).flat();
    } else {
      promos = promoData[category] || [];
    }

    // Update Judul Promo jika elemen ada
    if (promoTitle) {
      promoTitle.textContent = `Promo Paket ${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
    }

    if (promos.length === 0) {
      noPromoMessage.classList.remove("hidden");
    } else {
      noPromoMessage.classList.add("hidden");
      promos.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Promo Paket";
        img.className = "rounded w-full  mt-5 object-cover ";

        // Tambahkan animasi AOS
        img.setAttribute("data-aos", "zoom-out");
        img.setAttribute("data-aos-delay", `${index * 500}`);

        promoContainer.appendChild(img);
      });
    }
  }

  function updateLihatSemuaLink(category) {
    if (lihatSemuaBtn) {
      if (category === "all") {
        lihatSemuaBtn.href = "/public/pages/paket.html";
      } else {
        lihatSemuaBtn.href = `/public/pages/paket.html?category=${category}`;
      }
    }
  }

  // Inisialisasi awal: pilih "Semua"
  const defaultCategory = getCategoryFromPath();
  const defaultTab = document.querySelector(`[data-category="${defaultCategory}"]`);
  if (defaultTab) {
    setActiveTab(defaultTab);
    renderPromos(defaultCategory);
    updateLihatSemuaLink(defaultCategory);
  }

  // Event listener tombol tab
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
