$(document).ready(function(){
  setGithubStar();
  $('.f-tab_item').click(function () {
    var id = $(this).attr('data-attr');
    id = ('#' + id);
    // $('.f-tab_item').removeClass('f-active-tab');
    $(this).closest('.feature').find('.f-tab_item').removeClass('f-active-tab');
    $(this).closest('.feature').find('.f-tab-content').removeClass('f-active')
    $(this).addClass('f-active-tab');
    $(id).addClass('f-active');
  });
  

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
    $('body').toggleClass('noscroll');
    $('.top').toggleClass('open');
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

  // Github star count
  function gitHubStars(){
    $.ajax({
      url: "https://api.github.com/repos/getgauge/gauge",
      success: function(data){
        if(data['stargazers_count'] != undefined){
          window.localStorage.setItem('star',data['stargazers_count'])
        }
      }
    })
  }

  function setGithubStar(){
    gitHubStars();
    var star = window.localStorage.getItem('star')
    $('.github_star').text(star);
  }
});
