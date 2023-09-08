var UsersCrudService = {
    init: function() {
      $('#addUserForm').validate({
        submitHandler: function(form) {
          var user = Object.fromEntries((new FormData(form)).entries());
          UsersCrudService.add(user);
        }
      });
      UsersCrudService.list();
    },
  
    add: function(user) {
        // Calculate the MD5 hash of the password
        var passwordHash = CryptoJS.MD5(user.password).toString();
      
        // Replace the plain text password with the hash in the user object
        user.password = passwordHash;
      
        $.ajax({
          url: 'rest/user/',
          type: 'POST',
          data: JSON.stringify(user),
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(result) {
            $("#addUserModal").modal("hide");
            UsersCrudService.list(); // perf optimization
            console.log(result);
            $('#addUserForm').trigger("reset");
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest.responseJSON.message);
            UserService.logout();
          }
        });
      }
      ,
  
    delete: function(id) {
      if (confirm('Are you sure?') == true) {
  
      $.ajax({
           url: "rest/user/"+id,
           type: "DELETE",
           beforeSend: function(xhr){
             xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
           },
           success: function(data) {
             UsersCrudService.list();
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
           UserService.logout();
           }
           });
  
      }
    },
  
    list: function(){
      {
          $.ajax({
             url: "rest/user",
             type: "GET",
             beforeSend: function(xhr){
               xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
             },
             success: function(data) {
               $('user-table').html("");
                   var html = "";
                   for (let i = 0; i < data.length; i++) {
                     html += `
                     <tr>
                    <td>`+ data[i].email +`</td>
                    <td>`+ data[i].student_id +`</td>
                    <td>`+ data[i].professor_id +`</td>
                    <td>`+ data[i].id +`</td>
                    <td>
                        <button type="button" class="btn btn-primary user-button" onclick="UsersCrudService.showEditModal(`+data[i].id+`)">Edit</button>
                        <button type="button" class="btn btn-danger user-button" onclick="UsersCrudService.delete(`+data[i].id+`)">Delete</button>
                    </td>
                    </tr>`
                   }
                   $('#user-table').html(html);
  
               },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
               //UserService.logout();
             }
          });
        }  
        },
    
    update: function() {
      $('.save-user-button').attr('disabled', true);
      var user = {};
  
      user.student_id = $("#student_id").val();
      user.email = $("#email").val();
      user.professor_id = $("#professor_id").val();
      $.ajax({
               url: "rest/user/"+ $('#id').val(),
               type: "PUT",
               data: JSON.stringify(user),
               contentType: "application/json",
               dataType: "json",
               beforeSend: function(xhr){
                 xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
               },
               success: function(data) {
                 $("#exampleModal").modal("hide");
                 $('.save-user-button').attr('disabled', false);
                 $("#user-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
                 UsersCrudService.list(); // perf optimization
               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
               toastr.error(XMLHttpRequest.responseJSON.message);
               UserService.logout();
               }
               });
  },
  
  
  
    showEditModal: function showEditModal(id) {
      $.ajax({
           url: "rest/user/"+id,
           type: "GET",
           beforeSend: function(xhr){
             xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
           },
           success: function(data) {
             //console.log(data);
             $("#professor_id").val(data.professor_id);
             $("#id").val(data.id);
             $("#email").val(data.email);
             $("#student_id").val(data.student_id);
             $("#exampleModal").modal("show");
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
           toastr.error(XMLHttpRequest.responseJSON.message);
           UserService.logout();
           }
           });
    },
  
  }
  