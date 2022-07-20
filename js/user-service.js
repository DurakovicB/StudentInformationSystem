var UserService = {
  init: function(){
    var token = localStorage.getItem("token");
    var student_id = localStorage.getItem("student_id");
    
    if (token && student_id>0)
    {
      window.location.replace("index.html");
    }



    $('#login-form').validate({
      submitHandler: function(form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        UserService.login(entity);
      }
    });
  },
  login: function(entity){
    $.ajax({
      url: 'rest/login',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("student_id", result.student_id);
        if(localStorage.getItem("student_id")>0)
        window.location.replace("index.html");
        else  window.location.replace("admin.html");

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },
  fillName: function(){
    if(localStorage.getItem("student_id")==0)
    {
      $("#user_full_name").text("ADMIN ACCESS");

    }
    $("#user_full_name")
  },
  logout: function(){
    localStorage.clear();
    window.location.replace("login.html");
  },
}
