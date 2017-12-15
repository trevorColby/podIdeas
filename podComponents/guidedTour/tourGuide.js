//Trevor Colby
//12/15/2016
//tourGuide.js

//Floating element that is created when the tour begins
//Is used to navigate around the tour.
//Supplies the user with information about the current
//element.


var topPosition = $('.floating-div').offset().top - 10;
var floatingDivHeight = $('.floating-div').outerHeight();
var footerFromTop = $('footer').offset().top;
var absPosition = footerFromTop - floatingDivHeight - 20;
var win = $(window);
var floatingDiv = $('.floating-div');
  win.scroll(function() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if ((win.scrollTop() > topPosition) && (win.scrollTop() < absPosition)) {
        floatingDiv.addClass('sticky');
        floatingDiv.removeClass('abs');

      } else if ((win.scrollTop() > topPosition) && (win.scrollTop() > absPosition)) {
        floatingDiv.removeClass('sticky');
        floatingDiv.addClass('abs');

      } else {
        floatingDiv.removeClass('sticky');
        floatingDiv.removeClass('abs');
      }
    }
  });
