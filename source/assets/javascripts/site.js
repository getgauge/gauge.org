$(document).ready(function(){

  // $('.tab-nav_item').click(function(){
  //   var id = $(this).attr('data-attr');
  //   id = ('#'+ id);
  //   $('.tab-nav_item').removeClass('active-tab');
  //   $('.tab-content').removeClass('active')
  //   $(this).addClass('active-tab');
  //   $(id).addClass('active');
  // });
  
  // $('.mobile-heading').click(function(){
  //   var id = $(this).attr('data-attr');
  //   id = ('#'+ id);
  //   $(this).toggleClass('open');
  //   $('span .fa').removeClass('fa-chevron-down').addClass('fa-chevron-right');
  //   $(this).find('span .fa').removeClass('fa-chevron-right').addClass('fa-chevron-down');
  //   $(id).toggleClass('active');
  // });
  

    // get started
    
    $('.tab-nav_item').click(function(){
      var id = $(this).attr('data-attr');
      id = ('#'+ id);
      $('.tab-nav_item').removeClass('active-tab');
      $('.tab-content').removeClass('active')
      $(this).addClass('active-tab');
      $(id).addClass('active');
    });
    
    $('.mobile-heading').click(function(){
      var id = $(this).attr('data-attr');
      id = ('#'+ id);
      $(this).toggleClass('open');
      
      var icon = $(this).find('span .fa')  
    
      if(icon.hasClass('fa-chevron-down') == true){
        icon.removeClass('fa-chevron-down').addClass('fa-chevron-right')
      }else{
        icon.removeClass('fa-chevron-right').addClass('fa-chevron-down')
      }

      $(id).toggleClass('active');
    });


// mobile nav button

  $('.navbtn').on('click', function () {
    $('.bar').toggleClass('animate');
    // $('.nav').slideToggle();
    $('.nav').toggleClass('open');
  });

    //sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.top').addClass('sticky');
    } else {
      $('.top').removeClass('sticky');
    }
  });

});
