/* ---------------------------
 *
 サイトマップでページIDラベル表示
   & 別タブリンク設定をする
 *
 ----------------------------*/
javascript:(function(){
  function editorUtil() {
    this.d = document;
    this.url = location.href;
    this.cr_base_url = new RegExp(/(https:\/\/.+?\/).*/);
    this.cr_sitemaps = new RegExp(/(\/cms\/site_maps\/)(page|frame$)/);
    this.cr_part_templates = new RegExp(/\/cms\/part_templates$/);
  }
  editorUtil.prototype = {
    is_sitemaps_page: function() {
      if(this.cr_sitemaps.test(this.url)) return true;
      else return false;
    },
    get_pageID: function(str) {
      var pat = new RegExp(/\?id=(.+)/);
      if(pat.test(str)) return str.match(pat)[1].toString();
      else return null;
    },
    disp_pageID_label: function() {
      try {
        var cnt = 0;
        var pr = this.d.getElementsByClassName("tree").item(0);
        var uls = pr.getElementsByTagName("ul").item(0);
        var lis = uls.getElementsByTagName("li");
        for(var i=0; i<lis.length; i++) {
          var li = lis.item(i);
          var ats = li.getElementsByTagName("a");
          var pgname = ats.item(0).innerText;
          var pv_url = ats.item(0).getAttribute("href");
          var ed_url = ats.item(1).getAttribute("href");
          var pid = this.get_pageID(pv_url);
          this.add_label(ats.item(0), cnt, pid);
          this.add_target_blk(ats.item(0));
          cnt++;
        }
        alert("処理が完了しました!");
      } catch(e) {
        alert("エラーが発生しました!再度お試しください。");
      }
    },
    add_label: function (obj, cnt, pid) {
        var css_txt = "margin-left:20px;color:#000!important;font-size:90%;padding:2px;border:3px solid gray;border-radius:5px;";
        span = '<span style="' + css_txt + '">' + pid + '</span>';
        obj.insertAdjacentHTML('beforeend', span);
  	},
    add_target_blk: function(obj) {
      obj.setAttribute("target", "_blank");
    }
  };

  var app = new editorUtil();
  if(!app.is_sitemaps_page()) {
    alert("このページでは実行できません!サイトマップページに戻って実行してください。");
    return;
  }
  app.disp_pageID_label();

})();
