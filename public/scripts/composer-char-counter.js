
$(document).ready(function() {
  
  $(".i2").keyup(function() {
    let inputValue = $(this).val().length;
    $(".i3i2").val( 140 - (inputValue ));
    if (inputValue > 140) {
      $(".i3i2").css("color", "red");
    } else {
      $(".i3i2").css("color", "#545149");
    }
  });
});
