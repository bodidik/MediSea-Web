let videolar = [];

window.onload = async function () {
  const alan = document.getElementById("videoListesi");

  try {
    const yanit = await fetch("videos.json");
    videolar = await yanit.json();
    videolariGoster(videolar);
  } catch (hata) {
    alan.innerHTML = "<p>Videolar yüklenemedi.</p>";
    console.error("Video verileri alınamadı:", hata);
  }
};

function videolariGoster(liste) {
  const alan = document.getElementById("videoListesi");
  alan.innerHTML = ""; // Öncekileri temizle

  liste.forEach(video => {
    const kart = document.createElement("div");
    kart.className = "video-karti";
    kart.innerHTML = `
      <h3>${video.baslik}</h3>
      <p><em>${video.kategori || "Kategori Yok"}</em></p>
      <iframe src="${video.link}" allowfullscreen></iframe>
    `;
    alan.appendChild(kart);
  });
}

function aramaYap() {
  const arama = document.getElementById("searchInput").value.toLowerCase();
  const kategori = document.getElementById("kategoriSec").value;

  const filtrelenmis = videolar.filter(video => {
    const baslikUyum = video.baslik.toLowerCase().includes(arama);
    const kategoriUyum = kategori === "hepsi" || video.kategori === kategori;
    return baslikUyum && kategoriUyum;
  });

  videolariGoster(filtrelenmis);
}

function kategoriFiltrele() {
  aramaYap(); // Arama ve kategori birlikte çalışsın
}
