

var StudentService = {
  
  init: function() {
    $('#addStudentForm').validate({
      submitHandler: function(form) {
        var student = Object.fromEntries((new FormData(form)).entries());
        console.log(student);
        StudentService.add(student);
      }
    });
    StudentService.list();
    StudentService.fillCourseOptions();
    if(localStorage.getItem("student_id")!=0)$("#addStudentButton,#addStudentCourseButton").hide();


  },

  add: function(student) {
    $.ajax({
      url: 'rest/student',
      type: 'POST',
      data: JSON.stringify(student),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#addStudentModal").modal("hide");
        StudentService.list(); // perf optimization
        $('#addStudentForm').trigger("reset");

        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      toastr.error(XMLHttpRequest.responseJSON.message);
      UserService.logout();
    }
    });
  },

  delete: function(id) {
    if (confirm('Are you sure?') == true) {
      $.ajax({
        url: 'rest/student/' + id,
        type: 'DELETE',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          StudentService.list();
        }
      });
    }
  },

showFinalGrade: function(student_id,course_id)
{
  $.ajax({
    url: 'rest/studentgrades/'+student_id+'/'+course_id,
    type: 'get',
    beforeSend: function(xhr){
      xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    },
    contentType: "application/json",
    dataType: "json",
    success: function(result) {

    }
  });
},

  list: function() {
    if(localStorage.getItem("student_id")==0 && localStorage.getItem("professor_id")==0)
    {
      $.ajax({
            url: "rest/student",
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $('student-list').html("");
              var html = "";
              for (let i = 0; i < data.length; i++) {
                var picture="";
                if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/muskiavatar.png";
                else picture = "resources/pictures/zenskiavatar.png";
                html += `
                <div class="col-lg-3">
                      <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">`+ data[i].fullname +`</h5>
                          <p class="card-text">`+ data[i].email +`</p>
                          <p class="card-text">Phone: `+ data[i].phone +`</p>
                          <p id='studentID' >StudentID: `+ data[i].id +`</p>
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-primary student-button" onclick="StudentService.showEditModal(`+data[i].id+`)">Edit</button>
                            <button type="button" class="btn btn-danger student-button" onclick="StudentService.delete(`+data[i].id+`)">Delete</button>
                            <button type="button" class="btn btn-success " onclick="StudentService.showCourses(`+data[i].id+`)">Show Courses</button>
                          </div>
                          </div>
                  </div>
              </div>`;
              }
              $('#student-list').html(html);
            }});
  }
  else if(localStorage.getItem("student_id")!=0)
  {
    $("#addStudentCourseButton").hide();
    $.ajax({
            url: "rest/studentcolleagues/"+localStorage.getItem("student_id"),
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $('student-list').html("");
              var html = "";
              for (let i = 0; i < data.length; i++) {
                var picture="";
                if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/muskiavatar.png";
                else picture = "resources/pictures/zenskiavatar.png";
                html += `
                <div class="col-lg-3">
                      <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">`+ data[i].fullname +`</h5>
                          <p class="card-text">`+ data[i].email +`</p>
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-success " onclick="StudentService.showCourses(`+data[i].id+`)">Show Courses</button>
                          </div>
                          </div>
                  </div>
              </div>`;
              }
              $('#student-list').html(html);
            }});

  }else{
    $("#addStudentButton").hide();
    $.ajax({
      url: "rest/professorstudents/"+localStorage.getItem("professor_id"),
      type: 'GET',
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $('student-list').html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          var picture="";
          if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/muskiavatar.png";
          else picture = "resources/pictures/zenskiavatar.png";
          html += `
          <div class="col-lg-3">
                <div class="card" style="width: 18rem;">
                  <img class="c ard-img-top" src="`+picture+`" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">`+ data[i].fullname +`</h5>
                    <p class="card-text">`+ data[i].email +`</p>
                    <div class="btn-group" role="group">
                    </div>
                    </div>
            </div>
        </div>`;
        }
        $('#student-list').html(html);
      }});
  }
  },
  showCourses: function showCourses(id) {
    $.ajax({
            url: 'rest/studentcourses/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              var data2=data;
              $.ajax({
            url: 'rest/student/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $("#studentCoursesLabel").text(data.fullname+"'s Courses");
            }});
                   $('#forCourses').html("");
                   var html = '<div class="row">';
                   for (let i = 0; i < data2.length; i++) {
                        html += `
                        <div class="col-lg-5 mb-4">
                          <div class="card course-card">
                            <img class="card-img-top" src="https://st2.depositphotos.com/3687485/12226/v/950/depositphotos_122265864-stock-illustration-isometric-book-icon-vector-illustration.jpg" alt="Course Image">
                            <div class="card-body">
                              <h5 class="card-title">${data2[i].name}</h5>
                            </div>
                          </div>
                        </div>`;
                       }
                       $('#forCourses').html(html);
              $("#studentCoursesModal").modal("show");
            }});
            },


  showStudentModal: function showStudentModal(id) {
    $.ajax({
            url: 'rest/student/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $("#studentInfo").text(JSON.stringify(data));

              $("#studentModal").modal("show");
            }});

  },
  update: function() {
    $('.save-student-button').attr('disabled', true);
    var student = {};

    student.fullname = $("#fullname").val();
    student.email = $("#email").val();
    student.phone = $("#phone").val();
    console.log(student);

    $.ajax({
      url: 'rest/student/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(student),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#exampleModal").modal("hide");
        $('.save-student-button').attr('disabled', false);
        $("#student-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        StudentService.list(); // perf optimization
        console.log(result);
      }
    });
  },



  showEditModal: function showEditModal(id) {
    $.ajax({
            url: 'rest/student/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $("#fullname").val(data.fullname);
              $("#id").val(data.id);
              $("#phone").val(data.phone);
              $("#email").val(data.email);
              $("#exampleModal").modal("show");
            }});
    },
    fillCourseOptions: function fillCourseOptions()
    {
      $.ajax({
            url: "rest/coursesforprofessor/"+localStorage.getItem("professor_id"),
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              var html = "";
              for (let i = 0; i < data.length; i++) {
                html += `<option value=` + data[i].id + ` >` + data[i].name  + `</option>`;
              }
              $("#course_id").html(html);
              StudentService.fillStudentOptions();
            }});
        },
    fillStudentOptions: function fillStudentOptions()
    {
        $.ajax({
        url: "rest/studentsforcourse/"+$("#course_id").val(),
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(data) {
          var html = "";

          for (let i = 0; i < data.length; i++) {
            html += `<option value=` + data[i].id + ` >` + data[i].fullname  + `</option>`;
          }
          $("#student_id").html(html);
        }});
    },
        assignCourse: function() {
          // $('.save-professor-button').attr('disabled', true);
          var student = {};

          student.student_id = $("#student_id").val();
          student.course_id = $("#course_id").val();
          student.percentage_total_amount = $("#percentage_total_amount").val();
          student.percentage_acquired = $("#percentage_acquired").val();
          student.grade_title = $("#grade_title").val();


          $.ajax({
            url: 'rest/studentcourses',
            type: 'POST',
            data: JSON.stringify(student),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(result){
              $("#assignCourseModal").modal("hide");
              // $('.save-professor-button').attr('disabled', false);
              StudentService.list(); //
              StudentService.fillCourseOptions(); // perf optimization
            }
              });
            },
  search: function search(string){

  }


}
