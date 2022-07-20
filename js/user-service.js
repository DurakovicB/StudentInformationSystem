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

    });
  },
  fillName: function(){
    if(localStorage.getItem("student_id")!=0)
    {
      $.ajax({
            url: "rest/student/"+localStorage.getItem("student_id"),
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $("#user_full_name").text(data.fullname);
            }});

    }
  },
  logout: function(){
    localStorage.clear();
    window.location.replace("login.html");
  },
}
