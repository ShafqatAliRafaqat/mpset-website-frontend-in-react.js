(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

if (typeof Chart === 'undefined') {
  throw new Error('Dashboard requires the Chart.js library in order to function properly.');
}

window.dashboard = window.dashboard ? window.dashboard : {};

$.extend($.easing, {
  easeOutSine: function easeOutSine(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }
});

/**
 * Chart.js - Line Chart with Vertical Line
 */
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function draw(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      var activePoint = this.chart.tooltip._active[0],
          ctx = this.chart.ctx,
          x = activePoint.tooltipPosition().x,
          topY = this.chart.scales['y-axis-0'].top,
          bottomY = this.chart.scales['y-axis-0'].bottom;

      // Draw the line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
      ctx.restore();
    }
  }
});

$(document).ready(function () {

  //$('.op-cash').hide();
  $('.op-tour').hide();
  $('.op-type').hide();

  $('#game-type').change(function(){

    var selection1 = $('#game-type').val();
    switch(selection1)
    {
      case 'cash':
        $('.op-cash').show();
        $('.op-tour').hide();
      break;
      case 'tournament':
        $('.op-cash').hide();
        $('.op-tour').show();
      break;
      case 'both':
        $('.op-tour').show();
        $('.op-cash').show();
      break;
      case 'default':
        $('.op-cash').hide();
        $('.op-tour').hide();
      break;
    }
  }); 

  $('#event-type').change(function(){
    
    var selection2 = $('#event-type').val();
    switch(selection2)
    {
      case 'private':
        $('.op-type').show();
      break;
      case 'public':
        $('.op-type').hide();
      break;
      case 'default':
        $('.op-type').hide();
      break;
    }
  }); 




  /**
   * Dropdown adjustments
   */

  var slideConfig = {
    duration: 270,
    easing: 'easeOutSine'
  };

  // Add dropdown animations when toggled.
  $(':not(.main-sidebar--icons-only) .dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(slideConfig);
  });

  $(':not(.main-sidebar--icons-only) .dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(slideConfig);
  });

  /**
   * Sidebar toggles
   */
  $('.toggle-sidebar').click(function (e) {
    $('.main-sidebar').toggleClass('open');
  });
});

})));

