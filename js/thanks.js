$(window).on("load", function () {
  //window指定の時は""がいらない
  let thx = "Thank you for playing";
  let txt = 0;

  setTimeout(function () {
    let int = setInterval(function () {
      if (txt < thx.length) {
        $("#tkfp").append(thx.charAt(txt)); //文字列を順番の数字で管理　charAt()
        txt++;
      } else {
        clearInterval(int);
      }
    }, 180);
  }, 500);
});
