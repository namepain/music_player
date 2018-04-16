// 播放时进度条控制
(function ($, root) {

  function progress() {
    this.startTime = 0;
    this.lastPercent = 0;
    this.duration = 0;
    this.frameId = null;
  }

  progress.prototype.setDuration = function(du){
    this.duration = du;
  }

  progress.prototype.start = function (per) {
    var that = this;
    that.startTime = +new Date();
    that.lastPercent = per === undefined ? that.lastPercent : per;
    cancelAnimationFrame(that.frameId);

    function frame() {
      var now = +new Date();
      var cost = now - that.startTime;
      that.startTime = now;
      that.lastPercent += cost / (that.duration * 1000);
      if (that.lastPercent <= 1) {
        that.update(that.lastPercent);
        that.frameId = requestAnimationFrame(frame);
      } else {
        console.log('-------------' + that.lastPercent + '------');
        console.log('-----> ' + app.audio.getCurrentTime() + '---------')
        cancelAnimationFrame(that.frameId);
        $('.wrapper .btn-right').trigger('click');
      }
    };
    frame();
  }

  progress.prototype.stop = function () {
    cancelAnimationFrame(this.frameId);
  }

  progress.prototype.update = function (per) {
    $('.wrapper .curtime').html(function(s){
      var min = parseInt(s / 60),
        sec = parseInt(s % 60);
      min = min > 9 ? min : '0' + min;
      sec = sec > 9 ? sec : '0' + sec;
      return min + ':' + sec;
    }(this.duration * per));
    per = 100 - per * 100;
    $('.wrapper .progress-font').css({
      transform: 'translateX(-' + per + '%)'
    });
  }

  root.progress = progress;

})($, window.player || (window.player = {}));