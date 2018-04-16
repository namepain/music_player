/**
 * require:
 * zepto、audio、control、gaussBlur、render、progress、playList
 */

var app = {
  url: '../mock/data.json',
  player: window.player,
  nowIndex: 0,
  sonList: null,
  controler: null,
  audio: new window.player.audio(),
  progress: new window.player.progress(),
  playList: window.player.playList,
  init: function () {
    this.getData(this.url)
    this.bindEvent();
  },
  bindEvent: function () {
    var that = this;
    $('.wrapper')
      .on('click', '.btn-left', this.prevSong.bind(this))
      .on('click', '.btn-play', this.playSong.bind(this))
      .on('click', '.btn-right', this.nextSong.bind(this))
      .on('click', '.btn-list', this.listSong.bind(this))

    var $slidePoint = $('.wrapper .progress-pointer'),
      offset = $('.wrapper .progress-wrapper').offset(),
      left = offset.left,
      width = offset.width;

    $slidePoint
      .on('touchstart', function(){
        that.progress.stop();
      })
      .on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0 || per > 1){
          per = 0;
        }
        that.progress.update(per);
        console.log(per);
      })
      .on('touchend', function(e){
        console.log(e);
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        var song = that.sonList[that.nowIndex];
        var dura = song.duration;
        if(per < 0 || per > 1){
          per = 0;
        }
        that.progress.update(per);
        that.progress.start(per);
        that.audio.jumpTo(dura * per);
        $('.btn-play').addClass('paused');
        console.log(dura * per);
        console.log(per);
      })
  },
  prevSong: function () {
    var i = this.controler.prev();
    this.changeSong(i);
  },
  nextSong: function () {
    var i = this.controler.next();
    this.changeSong(i);
  },
  playSong: function () {
    var isPlaying = this.audio.status == 'playing';
    if (!isPlaying) {
      this.audio.play();
      this.progress.start();
      $('.btn-play').addClass('paused');
    } else {
      this.audio.pause();
      this.progress.stop();
      $('.btn-play').removeClass('paused');
    }
  },
  changeSong: function (i) {
    this.loadSong(i);
    this.audio.play();
    this.progress.start(0);
    $('.btn-play').addClass('paused');
  },
  listSong: function () {
    this.playList.show(this.nowIndex);
  },
  
  loadSong: function(i){
    var song = this.sonList[i];
    this.nowIndex = i;
    this.player.render(song);
    this.audio.getAudio(song.audio);
    this.progress.setDuration(song.duration);
  },
  getData: function (url) {
    var that = this;
    $.ajax({
      url: url,
      type: 'GET',
      success: function (data) {
        console.log('---------ajax success-------');

        var len = data.length,
          p = that.player;

        that.sonList = data;
        p.render(data[that.nowIndex]);
        that.loadSong(that.nowIndex);
        that.controler = new p.controler(len);
        that.playList.render(data);
        // that.changeSong(that.nowIndex);
      },
      error: function () {
        console.log('---------ajax error---------');
      }
    });
  }
}

app.init();