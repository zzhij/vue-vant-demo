(function () {
  function setMeta (isWrite) {
    var eleMate = isWrite && document.getElementById('metaViewport')
    var width = (window.meta && window.meta.uiWidth) || 750 // 设计稿宽，默认750px,//设计稿宽度
    var pw = parseInt(window.screen.width)
    var scale = pw / width
    var u = navigator.userAgent
    var contentValue = ''

    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      var version = parseFloat(u.slice(u.indexOf('Android') + 8))
      var dpr = window.devicePixelRatio < 1.4 ? '330' : window.devicePixelRatio <= 2 ? '400' : 'device-dpi'
      contentValue = version > 2.3 ? 'width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',target-densitydpi=' + dpr + ',user-scalable=no' : 'width=' + width + ',target-densitydpi=device-dpi,user-scalable=no'
    } else {
      // 适配iphone底部1px白边
      scale = Math.floor(scale * 100) / 100
      contentValue = 'width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',target-densitydpi=device-dpi,user-scalable=no'
    }

    if (!isWrite) {
      document.write('<meta id="metaViewport" name="viewport" content="' + contentValue + '">')
    } else {
      eleMate.setAttribute('content', contentValue)
    }
  }

  setMeta(false)
  window.onresize = function () {
    setMeta(true)
  }
})()
