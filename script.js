window.onload = function () {
  fetch("videos.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("videos.json yüklenemedi.");
      }
      return response.json();
    })
    .then(videolar => {
      const alan = document.getElementById("videoListesi");
      videolar.forEach(video => {
        const kart = document.createElement("div");
        kart.className = "video-karti";
        kart.innerHTML = `
          <h3>${video.baslik}</h3>
          <iframe src="${video.link}" allowfullscreen></iframe>
        `;
        alan.appendChild(kart);
      });
    })
    .catch(error => {
      console.error("Hata:", error);
      document.getElementById("videoListesi").innerHTML = "<p>Videolar yüklenemedi.</p>";
    });
};

function aramaYap() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const kartlar = document.querySelectorAll(".video-karti");

  kartlar.forEach(kart => {
    const baslik = kart.querySelector("h3").innerText.toLowerCase();
    kart.style.display = baslik.includes(input) ? "block" : "none";
  });
}
