// Scripts for registration
$(document).ready(function(){
      $("#reg-button").click(function(){
        var email = $("#email-reg").val();
        var pw = $("#pw-reg").val();
        var password1 = $("#pw-reg1").val();
        var name = $("#name-reg").val();
        if(pw === password1){
            $.ajax({
              url: '/register',
              type: 'POST',
              data: {
                    name: name,
                    email: email, 
                    pw: pw, 
                    type: 'register'
              }
            }).then(function(data) {
              $("#msg-reg").text(data.msg);
            });
        } else {
            $("#msg-reg").text("Your passwords do not match");
        }
       
        
      });
      function resend() {
        var email = $("#email-resend").val();
        $.ajax({
          url: '/register',
          type: 'POST',
          data: {email: email, type: 'resend'}
        }).then(function(data) {
          $("#msg-resend").text(data.msg);
        });
      };
      
});

// scripts for order edits
$(document).ready(function(){
  $(".order-info").click(function(){
    $("#edit-btn").text("Update")
  })
})


// animate scripts
$(function(){
    // initiate wow.js
    new WOW().init();
});

// navbar changes upon navigation on landing page
$(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() < 100 ) {
      // hide navbar
      $("nav").removeClass("lb-top-nav");
    } else {
      // show navbar
      $("nav").addClass("lb-top-nav");
    }
    
  })
});

function openOrderStatus(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();