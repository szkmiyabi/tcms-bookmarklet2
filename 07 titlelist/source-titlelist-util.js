javascript:(function(){
  class titleListUtil {
    constructor() {
      this.linkRows = document.getElementsByClassName("title");
    }

    get_pid(a_element) {
      let attr = a_element.getAttribute("href");
      let pt = new RegExp(/(.+\/)([0-9]+)(\/$)/);
      let ret = "";
      if(pt.test(attr)) {
        let mt = attr.match(pt);
        ret = mt[2];
      }
      return ret;
    }

    add_pid_label() {
      let rows = this.linkRows;
      for(var i=0; i<rows.length; i++) {
        var row = rows[i];
        var atag = row.getElementsByTagName("a").item(0);
        atag.setAttribute("target", "_blank");
        console.log(atag.getAttribute("href"));
        var pid = this.get_pid(atag);
        var edit_link_url = this.edit_url_base + pid;
        var a_style = 'background:#C03030;font-weight:bold;border-radius:5px;text-decoration:none;color:#fff';
        var a_html = '<a style="' + a_style + '">' + pid + '</a>';
        atag.insertAdjacentHTML("afterend", a_html);
      }
    }
  }
  let app = new titleListUtil();
  app.add_pid_label();
})();
