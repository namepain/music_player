// 渲染
(function ($, root) {

  var $wrapper = $('.wrapper'),
    $songInfo = $('.song-info'),
    $img = $('.img-wrapper img'),
    $allTime = $('.song-progress .alltime'),
    $btnLike = $('.control .btn-like');

  function renderSong(info) {
    var html = [
      '<div class="song-name">' + info.song + '</div>',
      '<div class="songer">' + info.singer + '</div>',
      '<div class="song-album">' + info.album + '</div>'
    ].join('');
    $songInfo.html(html);
  }

  function renderImg(info) {
    var img = new Image();
    img.src = info.image;
    img.onload = function () {
      root.blurImg(img, $wrapper);
      $img.attr('src', this.src);
    }
  }

  function renderAlltime(info) {
    var dura = info.duration;
    var sec, min,
      fix = function (num) {
        return String(num).length == 1 ? '0' + num : num;
      }
    min = fix(parseInt(dura / 60));
    sec = fix(dura % 60);
    $allTime.html(min + ':' + sec);
  }

  function renderIsLike(info) {
    $btnLike[info.isLike ? 'addClass' : 'removeClass']('liked');
  }

  root.render = function (song) {
    renderSong(song);
    renderImg(song);
    renderAlltime(song);
    renderIsLike(song);
  }

})(window.$, window.player || (window.player = {}))