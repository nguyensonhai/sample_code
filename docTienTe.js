/// Format số tiền
Number.prototype.format = function (n, x) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

// Replaces all instances of the given substring.15
String.prototype.replaceAll = function (
  strTarget, // The substring you want to replace
  strSubString // The string you want to replace in.
) {
  var strText = this;
  var intIndexOfMatch = strText.indexOf(strTarget);

  // Keep looping while an instance of the target string
  // still exists in the string.
  while (intIndexOfMatch != -1) {
    // Relace out the current instance.
    strText = strText.replace(strTarget, strSubString);

    // Get the index of any next matching substring.
    intIndexOfMatch = strText.indexOf(strTarget);
  } // -- End strSubString

  // Return the updated string with ALL the target strings
  // replaced out with the new substring.
  return strText;
};

var ChuSo = new Array(
  " không ",
  " một ",
  " hai ",
  " ba ",
  " bốn ",
  " năm ",
  " sáu ",
  " bảy ",
  " tám ",
  " chín "
);
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
var TienCaseBillion = new Array(
  "",
  " nghìn",
  " triệu",
  " tỷ",
  " nghìn",
  " triệu tỷ"
);
var dolaMoney = new Array(
  "",
  "mươi",
  "trăm",
  "nghìn",
  "mươi nghìn ",
  "trăm nghìn",
  "triệu",
  "mươi triệu"
);

//1. Hàm đọc số có 3 chữ số
function DocSo3ChuSo(baso, ismax) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = "";
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return "";
  if (tram == 0 && !ismax) {
    KetQua += ChuSo[tram] + " trăm";
    if (chuc == 0 && donvi != 0) KetQua += " lẻ";
  }
  if (tram > 0) {
    KetQua += ChuSo[tram] + " trăm";
    if (chuc == 0 && donvi != 0) KetQua += " lẻ";
  }

  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + " mươi";
    if (chuc == 0 && donvi != 0) KetQua = KetQua + " lẻ ";
  }

  if (chuc == 1) KetQua += " mười ";
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += " mốt ";
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += " lăm ";
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
} // End fucntion Docsoco3chuso

//2. Hàm đọc thành chữ (Sử dụng hàng đọc có 3 chữ số)
Number.prototype.ReadNumber = function () {
  var SoTien = this.valueOf();
  SoTien = Math.abs(SoTien);
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = "";
  var tmp = "";
  var ViTri = new Array();
  if (SoTien < 0) return "Số tiền âm!";
  if (SoTien < 1) return "Không đồng.";
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return "Sô quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = "0";
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = "0";
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = "0";
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = "0";
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = "0";
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = "0";
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    var ismax = i == lan ? true : false;
    tmp = DocSo3ChuSo(ViTri[i], ismax);
    KetQua += tmp;
    if (ViTri[i] > 0 && ViTri[4] > 0 && ViTri[3] > 0)
      KetQua += TienCaseBillion[i];
    else if (ViTri[i] > 0) KetQua += Tien[i];
  }
  KetQua =
    KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + " đồng.";
  return KetQua;
};

function getArray(number) {
  var ret = [];
  while (number / 10 > 0) {
    ret.push(number % 10);
    number = Math.floor(number / 10);
  }

  if (ret.length % 3 > 0) {
    var tem = 3 - (ret.length % 3);
    for (var i = 0; i < tem; i++) ret.push(0);
  }
  return ret;
}
