var CourseService = {
  init: function() {
    $('#addCourseForm').validate({
      submitHandler: function(form) {
        var course = Object.fromEntries((new FormData(form)).entries());
        console.log(course);
        CourseService.add(course);
      }
    });
    CourseService.list();
  },

  add: function(course) {

    $.ajax({
      url: 'rest/course/',
      type: 'POST',
      data: JSON.stringify(course),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#addCourseModal").modal("hide");
        CourseService.list(); // perf optimization
        console.log(result);
        $('#addCourseForm').trigger("reset");
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
         url: "rest/course/"+id,
         type: "DELETE",
         beforeSend: function(xhr){
           xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
         },
         success: function(data) {
           CourseService.list();
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
         toastr.error(XMLHttpRequest.responseJSON.message);
         UserService.logout();
         }
         });

    }
  },

  list: function(){
        $.ajax({
           url: "rest/course",
           type: "GET",
           beforeSend: function(xhr){
             xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
           },
           success: function(data) {
             $('course-list').html("");
                 var html = "";
                 for (let i = 0; i < data.length; i++) {
                   html += `
                   <div class="col-lg-3">
                         <div class="card" style="width: 18rem;  margin-bottom: 25px;">
                           <img class="card-img-top" src="https://st2.depositphotos.com/3687485/12226/v/950/depositphotos_122265864-stock-illustration-isometric-book-icon-vector-illustration.jpg" alt="Card image cap">
                           <div class="card-body">
                             <h5 class="card-title">`+ data[i].name +`</h5>
                             <p class="card-text">`+ data[i].description +`</p>
                             <div class="btn-group" role="group">
                               <button type="button" class="btn btn-primary course-button" onclick="CourseService.showEditModal(`+data[i].id+`)">Edit</button>
                               <button type="button" class="btn btn-danger course-button" onclick="CourseService.delete(`+data[i].id+`)">Delete</button>
                               <button type="button" class="btn btn-success course-button" onclick="CourseService.showProfessorModal(`+data[i].professor_id+`)">Show Professor</button>
                             </div>
                             </div>
                     </div>
                 </div>`;
                 }
                 $('#course-list').html(html);

             },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
             toastr.error(XMLHttpRequest.responseJSON.message);
             UserService.logout();
           }
        });
      },

  showProfessorModal: function showProfessorModal(id) {
    $.ajax({
       url: "rest/professor/"+ id,
       type: "GET",
       beforeSend: function(xhr){
         xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
       },
       success: function(data) {
         console.log(data);
         if(data.gender.toLowerCase()=="male") picture ="resources/pictures/maleprofessoravatar.png";
         else picture = "resources/pictures/femaleprofessoravatar.png";
         $("#professorImage").attr("src",picture);
         $("#email").text(data.email);
         $("#phone").text(data.phone);
         $("#fullname").text(data.fullname);
         $("#dateofbirth").text(data.dateofbirth);


         $("#professorModal").modal("show");
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
       toastr.error(XMLHttpRequest.responseJSON.message);
       UserService.logout();
       }
       });

  },
  update: function() {
    $('.save-course-button').attr('disabled', true);
    var course = {};

    course.description = $("#description").val();
    course.name = $("#name").val();
    course.professor_id = $("#professor_id").val();
    $.ajax({
             url: "rest/course/"+ $('#id').val(),
             type: "PUT",
             data: JSON.stringify(course),
             contentType: "application/json",
             dataType: "json",
             beforeSend: function(xhr){
               xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
             },
             success: function(data) {
               $("#exampleModal").modal("hide");
               $('.save-course-button').attr('disabled', false);
               $("#course-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
               CourseService.list(); // perf optimization
             },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
             toastr.error(XMLHttpRequest.responseJSON.message);
             UserService.logout();
             }
             });
},



  showEditModal: function showEditModal(id) {
    $.ajax({
         url: "rest/course/"+id,
         type: "GET",
         beforeSend: function(xhr){
           xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
         },
         success: function(data) {
           console.log(data);
           $("#description").val(data.description);
           $("#id").val(data.id);
           $("#name").val(data.name);
           $("#professor_id").val(data.professor_id);
           $("#exampleModal").modal("show");
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
         toastr.error(XMLHttpRequest.responseJSON.message);
         UserService.logout();
         }
         });
  },

  search: function search(string){
    $.get('rest/course/search/' + string, function(data) {
    });

  }


}
