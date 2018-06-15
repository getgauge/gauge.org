$(document).ready(function(){
  setGithubStar();
  
  $('.tab_item').click(function () {
    var id = $(this).attr('data-attr');
    id = ('#' + id);
    $(this).parent().find('.active-tab').removeClass('active-tab');
    $(this).parent().parent().find('.tab-content-container').find('.tab-content').removeClass('active')
    $(this).addClass('active-tab');
    $(this).parent().parent().find('.tab-content-container').find(id).addClass('active');
  });
  

  // get started
  $('.tab-nav_item').click(function(){
    var id = $(this).attr('data-attr');
    id = ('#'+ id);
    $('.tab-nav_item').removeClass('active-tab');
    $('.content-container > .tab-content').removeClass('active')
    $(this).addClass('active-tab');
    $(id).addClass('active');
  });

  $('.mobile-heading').click(function(){
    var id = $(this).attr('data-attr');
    id = ('#'+ id);
    $(this).toggleClass('open');
    
    var icon = $(this).find('.expander')

    if(icon.hasClass('arrow-active') == true){
      icon.removeClass('arrow-active').addClass('arrow')
    }else{
      icon.removeClass('arrow').addClass('arrow-active')
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
    if ($(this).scrollTop() > 20) {
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

  $(".gdpr-cookie-banner .close").click(function () {
    document.cookie = "cookie-consent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    $(".gdpr-cookie-banner").hide();
  });

  if(document.cookie.indexOf("cookie-consent=true") >= 0 ) {
    $(".gdpr-cookie-banner").hide();
  }

  function determinePackageNameBasedOnOS() {
    var userDefinedPackageName = window.location.hash.substr(1);
    var validPackageNames = ['windows', 'mac', 'debian', 'yum', 'curl'];
    if (userDefinedPackageName !== "" && validPackageNames.includes(userDefinedPackageName)) {
      return userDefinedPackageName;
    }
    var userAgent = navigator.userAgent;
    var packageName = 'windows';
    if (userAgent.indexOf("Win") !== -1) packageName = "windows";
    if (userAgent.indexOf("Mac") !== -1) packageName = "mac";
    if (userAgent.indexOf("Debian") !== -1) packageName = "debian";
    if (userAgent.indexOf("Ubuntu") !== -1) packageName = "debian";
    if (userAgent.indexOf("RedHat") !== -1) packageName = "yum";
    if (userAgent.indexOf("CentOS") !== -1) packageName = "yum";

    return packageName
  };

  if($(".tab-nav-get_started").length) {
    var packageName = determinePackageNameBasedOnOS();
    $(".tab-nav-get_started li.tab-nav_item[data-attr='" + packageName + "']").click();
  }
});
