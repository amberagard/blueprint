/* jshint unused:false */
/* global building */

(function(){
  'use strict';

  $(document).ready(init);

  var begin, end;

  function init(){
    $('#create-room').click(createRoom);
    $('#save-room').click(saveRoom);
    paintBuilding();
  }

  function paintBuilding() {
    building.rooms.forEach(r=>{

      var selectors = [];

      for (var y = r.begin.y; y <= r.end.y; y++) {
        for(var x = r.begin.x; x <= r.end.x; x++){
          selectors.push(`.cell[data-x=${x}][data-y=${y}]`);
        }
      }

      var selector = selectors.join(', ');
      $(selector).css('background-image', `url(${r.floor.photo})`);
    });
  }

  function saveRoom(){
    var id = $('#building').data('id');
    var name = $('#name').val();
    var floorId = $('#floors').val();

    $.ajax({
      url: `/buildings/${id}/rooms`,
      type: 'put',
      data: {name:name, beginX:begin.x, endX:end.x, beginY:begin.y, endY:end.y, floorId:floorId},
      dataType: 'json',
      success: data => {
        console.log('here is the data');
        console.log(data);
        $('#cost').empty().text(`$${data.cost.toFixed(2)}`);
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
    end = {x:$(this).data('x')*1, y:$(this).data('y')*1};
    var img = $('#floors option:selected').data('img');
    var selectors = [];

    for(var y=begin.y; y<=end.y; y++){
      for(var x=begin.x; x<=end.x; x++){
        selectors.push(`.cell[data-x=${x}][data-y=${y}]`);
      }
    }

    var selector = selectors.join(', ');
    $(selector).css('background-image', `url(${img})`);
  }

})();
