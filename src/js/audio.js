// 控制音频播放
(function ($, root) {

  function audio(len) {
    this.audio = new Audio();
    this.status = 'paused';
  }

  audio.prototype.play = function () {
    this.audio.play();
    this.status = 'playing';
  }
  audio.prototype.pause = function () {
    this.audio.pause();
    this.status = 'paused';
  }
  audio.prototype.getAudio = function (src) {
    this.audio.src = src;
    this.audio.load();
  }
  audio.prototype.getCurrentTime = function(){
    return this.audio.currentTime;
  }
  audio.prototype.jumpTo = function(time){
    this.audio.currentTime = time;
    this.play();
  }

  root.audio = audio;
})(window.$, window.player || (window.player = {}));