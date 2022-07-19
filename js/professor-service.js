//HAVEN?T DONE ANYTHING HERE WAITING FOR HTML
var ProfessorService = {
  init: function() {
    $('#addProfessorForm').validate({
      submitHandler: function(form) {
        var professor = Object.fromEntries((new FormData(form)).entries());
        console.log(professor);
        ProfessorService.add(professor);
      }
    });
    ProfessorService.list();
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
        success: function(result) {
          ProfessorService.list();
        }
      });
    }
  },


  list: function() {
    $.get("rest/professor", function(data) {
      console.log(data);
      $('professor-list').html("");
      var html = "";
      for (let i = 0; i < data.length; i++) {
        var picture="";
        if(data[i].gender.toLowerCase()=="male") picture ="resources/pictures/maleprofessoravatar.png";
        else picture = "resources/pictures/femaleprofessoravatar.png";
        html += `
        <div class="col-lg-3">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="`+picture+`" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">`+ data[i].fullname +`</h5>
                  <p class="card-text">`+ data[i].email +`</p>
                  <p class="card-text">`+ data[i].phone +`</p>
                  <p class="card-text">`+ data[i].dateofbirth +`</p>
                  <p class="card-text" id='professorID' type="hidden">`+ data[i].id +`</p>
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

    });
  },

  showCourses: function showCourses(id) {
    $.get('rest/professor/' + id+'/courses', function(data) {
      var data2=data;
      $.get('rest/professor/' + id, function(data) {
        $("#professorCoursesLabel").text(data.fullname+"'s Courses");
      });
           $('#forCourses').html("");
               var html = "";
               for (let i = 0; i < data2.length; i++) {
                 html += `
                 <div class="col-lg-3" style="float:left;">
                       <div class="card"   margin-bottom: 25px;">
                         <img class="card-img-top" style="height: auto; width: auto;"; src="https://st2.depositphotos.com/3687485/12226/v/950/depositphotos_122265864-stock-illustration-isometric-book-icon-vector-illustration.jpg" alt="Card image cap">
                         <div class="card-body">
                           <h5 class="card-title">`+ data2[i].name +`</h5>
                           <p class="card-text">`+ data2[i].description +`</p>
                           </div>
                   </div>
               </div>`;
               }
               $('#forCourses').html(html);
      $("#professorCoursesModal").modal("show");
    });
  },
  showProfessorModal: function showProfessorModal(id) {
    $.get('rest/professor/' + id, function(data) {
      $("#professorInfo").text(JSON.stringify(data));

      $("#professorModal").modal("show");
    });
  },
  update: function() {
    $('.save-professor-button').attr('disabled', true);
    var professor = {};

    professor.fullname = $("#fullname").val();
    professor.email = $("#email").val();
    professor.phone = $("#phone").val();
    console.log(professor);

    $.ajax({
      url: 'rest/professor/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(professor),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#exampleModal").modal("hide");
        $('.save-professor-button').attr('disabled', false);
        $("#professor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        ProfessorService.list(); // perf optimization
        console.log(result);
      }
    });
  },



  showEditModal: function showEditModal(id) {
    $.get('rest/professor/' + id, function(data) {
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
