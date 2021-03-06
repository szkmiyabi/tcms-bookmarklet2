/* ------------------------------
 *
   現在のURLを表示する
 *
--------------------------------*/
javascript:(function(){
  /* --- url判定のregExpクラス --- */
  function regxDatas() {
    this.cr_base_url = new RegExp(/(https:\/\/.+?\/).*/);
    this.cr_pv_page = new RegExp(/(\/cms\/)(frames|article_pages)(\/view\?id=[0-9]+)/);
  }
  regxDatas.prototype = {
    get_home: function(str) {
      var ret = "";
      if(this.cr_base_url.test(str)) {
        var mt = str.match(this.cr_base_url);
        ret = mt[1];
      }
      return ret;
    },
    is_cr_pv_page: function(str) {
      if(this.cr_pv_page.test(str)) return true;
      else return false;
    }
  };
  /* --- appメインクラス --- */
  function urlUtil() {
    this.d = document;
    this.url = location.href;
    this.urlRegx = new regxDatas();
  }
  urlUtil.prototype = {
    disp_current_url: function() {
      var cr_url = window.location.href;
      this.myAlert("currentURLDialog", window.location.href);
    },
    myAlert: function(dialogID, txt) {
			var y = window.pageYOffset;
			var divcss = 'font-family:\'メイリオ\',Meiryo,sans-serif;font-size:90%;padding:5px;position:absolute;top:' + y + 'px;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:600px;height:135px;';
			var tacss = ' style=\'width:590px; height: 100px; clear: both;\'';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			var panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>Dialog</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' + tacss + '>';
			var panel_end = '</textarea>';
			var elm = document.createElement("div");
			elm.id = dialogID;
			elm.style.cssText = divcss;
			elm.innerHTML = panel_start + txt + panel_end;
			document.getElementsByTagName("body")[0].appendChild(elm);
		},
  };
  var app = new urlUtil();
  if(app.urlRegx.is_cr_pv_page(app.url)) app.disp_current_url();
  else alert("プレビュー画面を開いていません!");
})();
