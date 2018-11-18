/* ------------------------------
 *
   貼り付けのためのPastepad
 *
--------------------------------*/
javascript:(function(){
  function popupUtil() {
  }
  popupUtil.prototype = {
    myNotepad: function() {
      var y = window.pageYOffset;
      var dtfunc = 'javascript:(function(){';
      dtfunc += 'var src=document.getElementById(\'tcms-bkmk-mynotepad-ta\');';
      dtfunc += 'var txt=src.value;';
      dtfunc += 'txt=txt.replace(/( |　|日)/mg,\'\');';
      dtfunc += 'txt=txt.replace(/^(　| |\t)+/mg,\'\');';
      dtfunc += 'txt=txt.replace(/(年|月)/mg,\'-\');';
      dtfunc += 'src.value=txt;';
      dtfunc += '})();';
      var exfunc = 'javascript:(function(){';
      exfunc += 'var src=document.getElementById(\'tcms-bkmk-mynotepad-ta\');';
      exfunc += 'var txt=src.value;';
      exfunc += 'txt=txt.replace(/　/mg,\' \');';
      exfunc += 'txt=txt.replace(/^(　| )+/mg,\'\');';
      exfunc += 'txt=txt.replace(/ {2,}/mg,\' \');';
      exfunc += 'src.value=txt;';
      exfunc += '})();';
      var delfunc = 'javascript:(function(){document.getElementById(\'tcms-bkmk-mynotepad-ta\').value=\'\';})();';
      var divcss = 'font-family:\'メイリオ\',Meiryo,sans-serif;font-size:90%;padding:5px;position:absolute;top:' + y + 'px;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:600px;height:155px;';
      var tacss = ' style=\'width:590px; height: 100px; clear: both;\'';
      var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
      var panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>Notepad</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea id="tcms-bkmk-mynotepad-ta"' + tacss + '>';
      var panel_end = '</textarea><br><button onclick="' + exfunc + '">文章を整形</button>';
      panel_end += '&nbsp;&nbsp;&nbsp;<button onclick="' + dtfunc + '">日付を整形</button>';
      panel_end += '&nbsp;&nbsp;&nbsp;<button onclick="' + delfunc + '">クリア</button>';
      var elm = document.createElement("div");
      elm.id = "tcms-bkmk-mynotepad";
      elm.style.cssText = divcss;
      elm.innerHTML = panel_start + panel_end;
      document.getElementsByTagName("body")[0].appendChild(elm);
    },
  };
  var app = new popupUtil();
  app.myNotepad();
})();
