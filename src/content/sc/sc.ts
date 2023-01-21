// SQUARE ENIX のロゴをクリックしたとき大広場へ遷移させる
const link = document.getElementById("logo_square_enix");
if (link) {
  link.addEventListener("click", () => {
    document.location.href = "https://hiroba.dqx.jp/oo/";
  });
  link.style.cursor = "pointer";
}
