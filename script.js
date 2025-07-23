let tumVideolar = []; // Tüm videoları globalde tut

// Sayfa yüklendiğinde çalışır
window.onload = function () {
  fetch("videos.json")
    .then(response => response.json())
    .then(data => {
      tumVideolar = data;
      kategoriSecenekleriniDoldur(data);
      videolariGoster(data);
    });
};

// Videoları gösteren fonksiyon
function videolariGoster(veri) {
  const alan = document.getElementById("videoListesi");
  alan.innerHTML = ""; // Önce temizle
  veri.forEach(video => {
    const kart = document.createElement("div");
    kart.className = "video-karti";
    kart.innerHTML = `
      <h3>${video.baslik}</h3>
      <iframe src="${video.link}" allowfullscreen></iframe>
    `;
    alan.appendChild(kart);
  });
}

// Kategori select menüsünü doldur
function kategoriSecenekleriniDoldur(veri) {
  const select = document.createElement("select");
  select.id = "kategoriSecimi";

  // Benzersiz kategorileri al
  const kategoriler = [...new Set(veri.map(v => v.kategori))];
  const tumSecenek = document.createElement("option");
  tumSecenek.value = "Hepsi";
  tumSecenek.textContent = "Tüm Kategoriler";
  select.appendChild(tumSecenek);

  kategoriler.forEach(kat => {
    const secenek = document.createElement("option");
    secenek.value = kat;
    secenek.textContent = kat;
    select.appendChild(secenek);
  });

  // Kategori seçim değişince filtrele
  select.onchange = function () {
    const secilen = this.value;
    if (secilen === "Hepsi") {
      videolariGoster(tumVideolar);
    } else {
      const filtrelenmis = tumVideolar.filter(v => v.kategori === secilen);
      videolariGoster(filtrelenmis);
    }
  };

  // Header'a ekle
  document.querySelector("header").appendChild(select);
}

