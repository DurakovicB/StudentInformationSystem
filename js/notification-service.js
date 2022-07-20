//HAVEN?T DONE ANYTHING HERE WAITING FOR HTML
var NotificationService = {
  init: function() {
     if(localStorage.getItem("student_id")!=0)
     {
    $("[id=addNotificationButton]").hide();
      }


    $('#addNotificationForm').validate({
      submitHandler: function(form) {
        var notification = Object.fromEntries((new FormData(form)).entries());
        console.log(notification);
        NotificationService.add(notification);
      }
    });


    NotificationService.list();
  },

  add: function(notification) {
    $.ajax({
      url: 'rest/notification',
      type: 'POST',
      data: JSON.stringify(notification),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#addNotificationModal").modal("hide");
        NotificationService.list(); // perf optimization
        $('#addNotificationForm').trigger("reset");

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
        url: 'rest/notification/' + id,
        type: 'DELETE',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          NotificationService.list();
        }
      });
    }
  },


  list: function() {
    $.ajax({
       url: "rest/notification",
       type: "GET",
       beforeSend: function(xhr){
         xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
       },
       success: function(data) {
      console.log(data);
      $('notifications-table').html("");
      var html = `<thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody></tbody>`;
      for (let i = 0; i < data.length; i++) {
        html +=`<tr>
            <th>` + data[i].title + `</th>
            <th>` + data[i].created_at + `</th>
            <th><button class="editbtn" onclick=NotificationService.showNotificationModal(` + data[i].id + `)>Show</button></th>
            <th><button class="editbtn deletebutton" onclick=NotificationService.delete(` + data[i].id + `)>Delete</button></th>
          </tr>`;
      }
      $('#notifications-table').html(html);
      if(localStorage.getItem("student_id")!=0)$(".deletebutton").hide();
}
    });
  },

  showNotificationModal: function showNotificationModal(id) {
    $.ajax({
       url: "rest/notification/" + id,
       type: "GET",
       beforeSend: function(xhr){
         xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
       },
       success: function(data) {

      console.log(data);
      $("#notificationInfo").text(data.description);

      $("#notificationModal").modal("show");
    }
    });
  },


  search: function search(string){

  }


}
