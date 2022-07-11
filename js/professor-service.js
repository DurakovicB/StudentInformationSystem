//HAVEN?T DONE ANYTHING HERE WAITING FOR HTML
var ProfessorService = {
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
      url: 'rest/professor/',
      type: 'POST',
      data: JSON.stringify(course),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#addCourseModal").modal("hide");
        CourseService.list(); // perf optimization
        console.log(result);
        $('#addCourseForm').trigger("reset");
      }
    });
  },

  delete: function(id) {
    if (confirm('Are you sure?') == true) {
      $.ajax({
        url: 'rest/professor/' + id,
        type: 'DELETE',
        success: function(result) {
          CourseService.list();
        }
      });
    }
  },


  list: function() {
    $.get("rest/professor", function(data) {
      console.log(data);
      $('course-list').html("");
      var html = "";
      for (let i = 0; i < data.length; i++) {
        html += `
        <div class="col-lg-3">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="https://st2.depositphotos.com/3687485/12226/v/950/depositphotos_122265864-stock-illustration-isometric-book-icon-vector-illustration.jpg" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">`+ data[i].name +`</h5>
                  <p class="card-text">`+ data[i].description +`</p>
                  <p class="card-text" id='professorID' type="hidden">`+ data[i].professor_id +`</p>
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

    });
  },

  showProfessorModal: function showProfessorModal(id) {
    $.get('rest/professor/' + id, function(data) {
      console.log(data);
      $("#professorInfo").text(JSON.stringify(data));

      $("#professorModal").modal("show");
    });
  },
  update: function() {
    $('.save-course-button').attr('disabled', true);
    var course = {};

    course.description = $("#description").val();
    course.name = $("#name").val();
    course.professor_id = $("#professor_id").val();
    console.log(course);

    $.ajax({
      url: 'rest/course/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(course),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#exampleModal").modal("hide");
        $('.save-course-button').attr('disabled', false);
        $("#course-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        CourseService.list(); // perf optimization
        console.log(result);
      }
    });
  },



  showEditModal: function showEditModal(id) {
    $.get('rest/course/' + id, function(data) {
      console.log(data);
      $("#description").val(data.description);
      $("#id").val(data.id);
      $("#name").val(data.name);
      $("#professor_id").val(data.professor_id);
      $("#exampleModal").modal("show");

    })},
  search: function search(string){

  }


}
