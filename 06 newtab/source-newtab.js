javascript:(function(){
  function newTabUtil() {
  }
  newTabUtil.prototype = {
    exec: () => {
      var pr = document.getElementsByTagName("table").item(0);
      var trs = pr.rows;
      for(var i=0; i<trs.length; i++) {
        if(i < 1) continue;
        var tr = trs.item(i);
        var pv_atag = tr.cells.item(1).getElementsByTagName("a").item(0);
        var ed_atag = tr.cells.item(8).getElementsByTagName("a").item(0);
        if(!pv_atag.hasAttribute("target")) pv_atag.setAttribute("target", "_blank");
        if(!ed_atag.hasAttribute("target")) ed_atag.setAttribute("target", "_blank");
      }
      alert("処理完了");
    }
  };

  let app = new newTabUtil();
  app.exec();
})();
