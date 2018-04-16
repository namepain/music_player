// 播放器播放控制
(function ($, root) {

  function controler(len) {
    this.index = root.nowIndex || 0;
    this.len = len;
  }

  controler.prototype.prev = function () {
    return this.getIndex(-1);
  }
  controler.prototype.next = function () {
    return this.getIndex(1);
  }
  controler.prototype.getIndex = function (i) {
    var index = this.index,
      len = this.len;
    return (this.index = (index + len + i) % len);
  }

  root.controler = controler;
})(window.$, window.player || (window.player = {}));