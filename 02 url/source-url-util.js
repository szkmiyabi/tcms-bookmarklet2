/* ------------------------------
 *
   URLに関するユーティリティ
 *
--------------------------------*/
javascript:(function(){
  /* --- url判定のregExpクラス --- */
  function regxDatas() {
    this.cr_base_url = new RegExp(/(https:\/\/.+?\/).*/);
    this.cr_pv_page = new RegExp(/\/cms\/frames\/view\?id=[0-9]+/);
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
    disp_public_url: function() {
      var arr = this.get_page_info_tbl_arr();
      var str = "";
      str += arr[2][0] + ": ";
      str += '<a href="' + arr[2][1] + '" target="_blank">' + arr[2][1] + "</a><br>";
      str += arr[4][0] + ": " + arr[4][1] + "<br>" + arr[1][0] + ": " + arr[1][1] + "<br>";
      alert(str);
    },
    get_page_info_tbl_arr: function() {
      var data = new Array();
      var tbl = this.d.getElementsByTagName("table").item(0);
      var trs = tbl.rows;
      for(var i=0; i<trs.length; i++) {
        var tr = trs.item(i);
        var cols = tr.cells;
        var colname = "";
        var colval = "";
        colname = cols.item(0).innerText;
        if(i == 2) {
          colval = cols.item(1).getElementsByTagName("div").item(0).getElementsByTagName("span").item(1).innerText;
        } else {
          colval = cols.item(1).innerText;
        }
        data[i] = [colname, colval];
      }
      return data;
    }
  };
  var app = new urlUtil();
  if(app.urlRegx.is_cr_pv_page(app.url)) app.disp_public_url();
})();
