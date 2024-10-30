"use strict";
// ０がコース、１がゴール、２がプレゼント、６をかぼちゃ
const data = [
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6],
  [6, 0, 6, 6, 0, 6, 6, 0, 0, 6, 0, 1, 6, 0, 0, 0, 6, 0, 0, 6],
  [6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 6],
  [6, 0, 6, 6, 6, 0, 6, 2, 0, 6, 0, 0, 6, 6, 6, 0, 0, 6, 6, 6],
  [6, 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6],
  [6, 6, 6, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 6, 0, 0, 0, 6],
  [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 6],
  [6, 0, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6],
  [6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

// G'sに表示
// const data = [
//   [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
//   [6, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6],
//   [6, 0, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6],
//   [6, 0, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 6],
//   [6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6],
//   [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
// ];

// プレイヤー初期座標
let gc = null;
let px = 12;
let py = 8;
// プレゼント初期座標
let presentX = 6;
let presentY = 4;

// 画像の読み込み
let pumpkin = new Image();
pumpkin.src = "img/pumpkin.png";
let born = new Image();
born.src = "img/born.png";
let obake = new Image();
obake.src = "img/obake.png";
let present = new Image();
present.src = "img/present.png";

// 関数①　初期設定を行い、キャンバスの初期設定を行い、ユーザーのキー入力を処理し、画面を再描画するための基盤を作る
function init() {
  gc = document.getElementById("soko").getContext("2d");
  window.onkeydown = mykeydown;
  repaint();
}

//関数②　ユーザーがキーボードを押した時の処理動作
function mykeydown(e) {
  console.log("Key pressed:", e.keyCode); // 確認用: キーコードをコンソールに表示
  let dx0 = px;
  let dy0 = py;
  let dx1 = px;
  let dy1 = py;
  switch (e.keyCode) {
    case 37: //左
      dx0--;
      dx1 -= 2;
      break;
    case 38: //上
      dy0--;
      dy1 -= 2;
      break;
    case 39: //右
      dx0++;
      dx1 += 2;
      break;
    case 40: //下
      dy0++;
      dy1 += 2;
      break;
  }

  if ((data[dy0][dx0] & 0x2) == 0) {
    px = dx0;
    py = dy0;
  } else if ((data[dy0][dx0] & 0x6) == 2) {
    if ((data[dy1][dx1] & 0x2) == 0) {
      console.log("Present moved from", { dx0, dy0 }, "to", { dx1, dy1 }); // 追加: プレゼントの移動ログ
      data[dy0][dx0] ^= 2; // ^= と ⌃= は違う。^= (XOR 演算子)でa ^= b; は a = a ^ b; と同じ意味。
      data[dy1][dx1] |= 2;
      presentX = dx1;
      presentY = dy1;
      px = dx0;
      py = dy0;
    }
  }

  // ゴール判定
  // ビット演算・・・
  if (data[presentY][presentX] & 0x1 && data[presentY][presentX] & 0x2) {
    alert("Game Clear!! Happy Halloween!");
    // アラートなったら１０秒待ってページ遷移
    setTimeout(function () {
      window.location.href = "thanks.html"; //画面(window)に、該当ページを読み込む(location.href)
    }, 1000);
  }

  repaint();
}

// 関数③ ゲームの状態を反映するためにcanvasをクリアし、背景を塗りつぶし、data 配列の内容に基づいてアイコンを描画する
function repaint() {
  gc.fillStyle = "#333333";
  gc.fillRect(0, 0, 800, 440);

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] & 0x1) {
        gc.drawImage(born, x * 40, y * 40, 40, 40);
      }
      if (data[y][x] & 0x2) {
        gc.drawImage(present, x * 40, y * 40, 40, 40);
      }
      if (data[y][x] == 6) {
        gc.drawImage(pumpkin, x * 40, y * 40, 40, 40);
      }
    }
  }
  gc.drawImage(obake, px * 40, py * 40, 40, 40);
}
