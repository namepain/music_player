// 右下角列表
(function($, root){

  function renderList(list){
    var html = list.map(function(ele, i){
      return '<li class="list-item">\
        <h3>' + ele.song + '</h3> \
        - \
        <span>' + ele.singer + '</span></li>'
    }).join('');
    $('.list-box').html(html);
    bindEvent();
  }

  function bindEvent(){
    $('.gray, .close').click(hide);
    $('.list-box').on('click', 'li', function(e){
      console.log(e);
      var i = $(e.currentTarget).index();
      redSong(i);
      app.changeSong(i);
      setTimeout(hide, 200)
    })
  }

  function show(i){
    $('.gray, .playlist').addClass('active');
    redSong(i);
  }

  function hide(){
    $('.gray, .playlist').removeClass('active');
  }

  function redSong(i){
    $('.list-box')
      .find('li').eq(i)
      .addClass('active')
      .siblings('.active')
      .removeClass('active');
  }

  root.playList = {
    render: renderList,
    show: show
  }

})($, window.player || (window.player = {}));