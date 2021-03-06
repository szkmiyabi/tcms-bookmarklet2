/* ---------------------------
 *
 ページリストを別タブで表示
 *
 ----------------------------*/
javascript:(function(){
  /* --- url判定のregExpクラス --- */
  function regxDatas() {
    this.cr_base_url = new RegExp(/(https:\/\/.+?\/).*/);
    this.cr_sitemaps = new RegExp(/(\/cms\/site_maps\/)(page|frame$)/);
    this.cr_part_templates = new RegExp(/\/cms\/part_templates$/);
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
    is_cr_sitemaps: function(str) {
      if(this.cr_sitemaps.test(str)) return true;
      else return false;
    },
    is_cr_part_templates: function(str) {
      if(this.cr_part_templates.test(str)) return true;
      else return false;
    }
  };
  /* --- appメインクラス --- */
  function pageListUtil() {
    this.d = document;
    this.url = location.href;
    this.urlRegx = new regxDatas();
  }
  pageListUtil.prototype = {
    /* サイトマップページでページ一覧を表示する */
    disp_page_list_sitemaps: function() {
      var str = "";
      var arr = this.get_page_list_sitemaps_arr();
      for(var i=0; i<arr.length; i++) {
        str += "<div>";
        str += '<p><input type="checkbox" onclick="javascript:(function(){var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];var me = e.target || e.srcElement;var pdv = me.parentNode.parentNode;if(pdv.getAttribute(\'style\')===null) {pdv.setAttribute(\'style\', \'background:yellow\');}else{pdv.removeAttribute(\'style\');}})();"></p>';
				str += "<p>" + arr[i][0] + "</p>";
				str += '<p><a href="' + arr[i][1] + '" target="_blank">' + arr[i][1] + "</a></p>";
				str += '<p><a href="' + arr[i][2] + '" target="_blank">' + arr[i][2] + "</a></p>";
				str += "</div>";
      }
      this.browse_new_tab_flex("List&lt;sitemaps&gt;", str);
    },
    get_page_list_sitemaps_arr: function() {
      var data = new Array();
      var pr = this.d.getElementsByClassName("tree").item(0);
      var uls = pr.getElementsByTagName("ul").item(0);
      var lis = uls.getElementsByTagName("li");
      for(var i=0; i<lis.length; i++) {
        var li = lis.item(i);
        var ats = li.getElementsByTagName("a");
        var pgname = ats.item(0).innerText;
        var pv_url = this.urlRegx.get_home(this.url) + ats.item(0).getAttribute("href");
          pv_url = this.clean_referer(pv_url);
        var ed_url = this.urlRegx.get_home(this.url) + ats.item(1).getAttribute("href");
          ed_url = this.clean_referer(ed_url);
        data[i] = [pgname, pv_url, ed_url];
      }
      return data;
    },
    /* パーツテンプレートでページ一覧を表示する */
    disp_page_list_part_templates: function() {
      var str = "";
      var arr = this.get_page_list_part_templates_arr();
      for(var i=0; i<arr.length; i++) {
        str += "<div>";
        str += '<p><input type="checkbox" onclick="javascript:(function(){var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];var me = e.target || e.srcElement;var pdv = me.parentNode.parentNode;if(pdv.getAttribute(\'style\')===null) {pdv.setAttribute(\'style\', \'background:yellow\');}else{pdv.removeAttribute(\'style\');}})();"></p>';
				str += "<p>" + arr[i][0] + "</p>";
				str += '<p><a href="' + arr[i][1] + '" target="_blank">' + arr[i][1] + "</a></p>";
				str += '<p><a href="' + arr[i][2] + '" target="_blank">' + arr[i][2] + "</a></p>";
				str += "</div>";
      }
      this.browse_new_tab_flex("List&lt;parts&gt;", str);
    },
    get_page_list_part_templates_arr: function() {
      var data = new Array();
      var pr = this.d.getElementsByTagName("table").item(0);
      var trs = pr.rows;
      var j = 0;
      for(var i=0; i<trs.length; i++) {
        if(i < 1) continue;
        var tr = trs.item(i);
        var pgname = tr.cells.item(1).getElementsByTagName("a").item(0).innerText;
        var pv_url = this.urlRegx.get_home(this.url) + tr.cells.item(1).getElementsByTagName("a").item(0).getAttribute("href");
        var ed_url = this.urlRegx.get_home(this.url) + tr.cells.item(8).getElementsByTagName("a").item(0).getAttribute("href");
        data[j] = [pgname, pv_url, ed_url];
        j++;
      }
      return data;
    },
    /* func, refererをカットする */
    clean_referer: function(str) {
       return str.replace(/&site_group_top.*/, "");
    },
    /* 別タブ表示, 引数:区切り文字 */
		browse_new_tab: function(title, str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>' + title + '</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;}</style>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln(str);
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
		/* 別タブ表示 */
		browse_new_tab_flex: function(title, str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>' + title + '</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;}');
			nwd.writeln('.flex-table div { display: flex; }');
			nwd.writeln('.flex-table div p { margin-right: 25px; }');
			nwd.writeln('.flex-table div p:last-child { margin-right: none; }');
			nwd.writeln('</style>');
      nwd.writeln('<script>');
      nwd.writeln('function add_color_handle() {');
      nwd.writeln('var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];');
      nwd.writeln('var me = e.target || e.srcElement;');
      nwd.writeln('var pdv = me.parentNode.parentNode;');
      nwd.writeln('if(pdv.getAttribute("style")===null) {');
      nwd.writeln('pdv.setAttribute("style", "background:yellow");');
      nwd.writeln('}else{');
      nwd.writeln('pdv.removeAttribute("style");');
      nwd.writeln('}');
      nwd.writeln('}');
      nwd.writeln('</script>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln('<section class="flex-table" id="flex-table-wrap">');
			nwd.writeln(str);
			nwd.writeln('</section>');
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
  };

  var app = new pageListUtil();
  if(app.urlRegx.is_cr_sitemaps(app.url)) app.disp_page_list_sitemaps();
  else if(app.urlRegx.is_cr_part_templates(app.url)) app.disp_page_list_part_templates();
})();
