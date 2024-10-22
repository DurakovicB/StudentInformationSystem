//HAVEN?T DONE ANYTHING HERE WAITING FOR HTML
var ProfessorService = {
  init: function() {
    $('#addProfessorForm').validate({
      submitHandler: function(form) {
        var professor = Object.fromEntries((new FormData(form)).entries());
        ProfessorService.add(professor);
      }
    });
    ProfessorService.list();
    ProfessorService.fillOptions();
  },

  add: function(professor) {
    $.ajax({
      url: 'rest/professor',
      type: 'POST',
      data: JSON.stringify(professor),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#addProfessorModal").modal("hide");
        ProfessorService.list(); // perf optimization
        $('#addProfessorForm').trigger("reset");

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
        url: 'rest/professor/' + id,
        type: 'DELETE',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          ProfessorService.list();
        }
      });
    }
  },


  list: function() {
    if(localStorage.getItem("student_id")==0&&localStorage.getItem("professor_id")==0)
    {
      $.ajax({
        url: 'rest/professor',
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(data) {
          $('professor-list').html("");
          var html = "";
          for (let i = 0; i < data.length; i++) {
            var picture="";
            if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/maleprofessoravatar.png";
            else picture = "resources/pictures/femaleprofessoravatar.png";
            html += `
            <div class="col-lg-3">
                  <div class="card" style="width: 18rem;" margin-bottom: 25px;>
                    <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+ data[i].fullname +`</h5>
                      <p class="card-text">`+ data[i].email +`</p>
                      <p class="card-text">`+data[i].office+`</p> 
                      <p class="card-text" id='professorID' type="text">ProfessorID: `+ data[i].id +`</p>
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary professor-button" onclick="ProfessorService.showEditModal(`+data[i].id+`)">Edit</button>
                        <button type="button" class="btn btn-danger professor-button" onclick="ProfessorService.delete(`+data[i].id+`)">Delete</button>
                        <button type="button" class="btn btn-success professor-button" onclick="ProfessorService.showCourses(`+data[i].id+`)">Show Courses</button>
                      </div>
                      </div>
              </div>
          </div>`;
          }
          $('#professor-list').html(html);
        }});
      }
    else if(localStorage.getItem("professor_id")!=0){
      $("#assignCourseButton,#addProfessorButton").hide();
      $.ajax({
        url: 'rest/professor',
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(data) {
          $('professor-list').html("");
          var html = "";
          for (let i = 0; i < data.length; i++) {
            var picture="";
            if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/maleprofessoravatar.png";
            else picture = "resources/pictures/femaleprofessoravatar.png";
            html += `
            <div class="col-lg-3">
                  <div class="card" style="width: 18rem;" margin-bottom: 25px;>
                    <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+ data[i].fullname +`</h5>
                      <p class="card-text">`+ data[i].email +`</p>
                      <p class="card-text">`+data[i].office+`</p> 
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-success professor-button" onclick="ProfessorService.showCourses(`+data[i].id+`)">Show Courses</button>

                      </div>
                      </div>
              </div>
          </div>`;
          }
          $('#professor-list').html(html);
        }});
  }
  else {
    $("#assignCourseButton,#addProfessorButton").hide();
    $.ajax({
            url: "rest/professorsforstudent/"+localStorage.getItem("student_id"),
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $('professor-list').html("");
              var html = "";
              for (let i = 0; i < data.length; i++) {
                var picture="";
                if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/maleprofessoravatar.png";
                else picture = "resources/pictures/femaleprofessoravatar.png";
                html += `
                <div class="col-lg-3">
                      <div class="card" style="width: 18rem;" margin-bottom: 25px;>
                        <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">`+ data[i].fullname +`</h5>
                          <p class="card-text">`+ data[i].email +`</p>
                          <p class="card-text">`+data[i].office+`</p> 
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-success professor-button" onclick="ProfessorService.showCourses(`+data[i].id+`)">Show Courses</button>

                          </div>
                          </div>
                  </div>
              </div>`;
              }
              $('#professor-list').html(html);

            }});
  }

  },

  showCourses: function showCourses(id) {
    $.ajax({
      url: 'rest/professor/' + id + '/courses',
      type: 'GET',
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        var data2 = data;
  
        $.ajax({
          url: 'rest/professor/' + id,
          type: 'GET',
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(data) {
            $("#professorCoursesLabel").text(data.fullname + "'s Courses");
          }
        });
  
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
        html += '</div>';
        $('#forCourses').html(html);
        $("#professorCoursesModal").modal("show");
      }
    });
  }
  ,
  showProfessorModal: function showProfessorModal(id) {
    $.ajax({
            url: 'rest/professor/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $("#professorInfo").text(JSON.stringify(data));

              $("#professorModal").modal("show");
            }});
  },
  update: function() {
    $('.save-professor-button').attr('disabled', true);
    var professor = {};

    professor.fullname = $("#fullname").val();
    professor.email = $("#email").val();
    professor.phone = $("#phone").val();

    $.ajax({
      url: 'rest/professor/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(professor),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#exampleModal").modal("hide");
        $('.save-professor-button').attr('disabled', false);
        $("#professor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        ProfessorService.list(); // perf optimization
      }
    });
  },



  showEditModal: function showEditModal(id) {$.ajax({
            url: 'rest/professor/' + id,
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
    fillOptions: function fillOptions()
    {
      $.ajax({
            url: "rest/course",
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
            }});

            $.ajax({
            url: "rest/professor",
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
              $("#professor_id").html(html);

            }});
        },

        assignCourse: function() {
          // $('.save-professor-button').attr('disabled', true);
          var professor = {};

          professor.professor_id = $("#professor_id").val();

          $.ajax({
            url: 'rest/course/' + $('#course_id').val(),
            type: 'PUT',
            data: JSON.stringify(professor),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(result){
              $("#assignCourseModal").modal("hide");
              // $('.save-professor-button').attr('disabled', false);
              ProfessorService.list(); //
              ProfessorService.fillOptions(); // perf optimization
            }
              });
            },


  search: function search(string){


  }


}
