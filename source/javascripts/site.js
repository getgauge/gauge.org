$(document).ready(function(){
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
    // $('.mobile-heading').removeClass('open');
    // $('.tab-content').removeClass('active')
    $(this).toggleClass('open');
    $('span .fa').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    $(this).find('span .fa').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    $(id).toggleClass('active');
  });
  
});
