//HAVEN?T DONE ANYTHING HERE WAITING FOR HTML
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
        success: function(result) {
          StudentService.list();
        }
      });
    }
  },


  list: function() {
    $.get("rest/student", function(data) {
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
                  <p class="card-text">`+ data[i].phone +`</p>
                  <p class="card-text" id='studentID' type="hidden">`+ data[i].id +`</p>
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

    });
  },
  showCourses: function showCourses(id) {
    $.get('rest/studentcourses/' + id, function(data) {
      var data2=data;
      $.get('rest/student/' + id, function(data) {
        $("#studentCoursesLabel").text(data.fullname+"'s Courses");
      });
           $('#forCourses').html("");
               var html = "";
               for (let i = 0; i < data2.length; i++) {
                 html += `
                 <div class="col-lg-3" style="float:left;">
                       <div class="card"   margin-bottom: 25px;">
                         <img class="card-img-top" style="height: 200px; width: auto;"; src="https://st2.depositphotos.com/3687485/12226/v/950/depositphotos_122265864-stock-illustration-isometric-book-icon-vector-illustration.jpg" alt="Card image cap">
                         <div class="card-body">
                           <h5 class="card-title">`+ data2[i].name +`</h5>
                           </div>
                   </div>
               </div>`;
               }
               $('#forCourses').html(html);
      $("#studentCoursesModal").modal("show");
    });
  },
  showStudentModal: function showStudentModal(id) {
    $.get('rest/student/' + id, function(data) {
      console.log(data);
      $("#studentInfo").text(JSON.stringify(data));

      $("#studentModal").modal("show");
    });
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
    $.get('rest/student/' + id, function(data) {
      console.log(data);
      $("#fullname").val(data.fullname);
      $("#id").val(data.id);
      $("#phone").val(data.phone);
      $("#email").val(data.email);
      $("#exampleModal").modal("show");

    })},
  search: function search(string){

  }


}
