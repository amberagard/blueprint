/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  var begin, end;

  function init(){
    $('#create-room').click(createRoom);
    $('#save-room').click(saveRoom);
  }

  function saveRoom(){
    var id = $('#building').data('id');
    var name = $('#name').val();
    var floorId = $('#floors').val();

    $.ajax({
      url: `/buildings/${id}/rooms`,
      type: 'put',
      data: {name:name, begin:begin, end:end, floorId:floorId},
      dataType: 'json',
      success: data => {
        console.log('here is the data');
        console.log(data);
      }
    });
  }

  function createRoom(){
    begin = end = null;
    $('#building').on('click', '.cell', selectBegin);
  }

  function selectBegin(){
    begin = {x:$(this).data('x')*1, y:$(this).data('y')*1};
    $('#building').off('click');
    $('#building').on('mouseenter', '.cell', previewing);
  }

  function selectEnd(){
    end = {x:$(this).data('x')*1, y:$(this).data('y')*1};
    $('#building').off('click');
    $('#building').off('mouseenter');
  }

  function previewing(){
    $('#building').on('click', '.cell', selectEnd);
    $('.temp').css('background-image', 'none');
    var temp = {x:$(this).data('x')*1, y:$(this).data('y')*1};
    var img = $('#floors option:selected').data('img');
    var selectors = [];

    for(var y=begin.y; y<=temp.y; y++){
      for(var x=begin.x; x<=temp.x; x++){
        selectors.push(`.cell[data-x=${x}][data-y=${y}]`);
      }
    }

    var selector = selectors.join(', ');
    $(selector).addClass('temp').css('background-image', `url(${img})`);
  }
})();
