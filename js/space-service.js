var SpaceService={
    init:function(){
        SpaceService.populateCourseSelect();
        setTimeout(function () {
          // Code to run after the delay
          SpaceService.list();
        }, 500);
    },
    populateCourseSelect:function() {
        if(localStorage.getItem("professor_id")!=0)
        {
        $.ajax({
          url: "rest/coursesforprofessor/" + localStorage.getItem("professor_id"),
          type: 'GET',
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(courseData) {
            courseData.sort(function(a, b) {
              return a.name.localeCompare(b.name);
            });
            
            var html = '';
            
            // Loop through the course data to create the other options
            for (var i = 0; i < courseData.length; i++) {
              html += '<option value="' + courseData[i].id + '">' + courseData[i].name + '</option>';
            }
            
            // Set the HTML of the select element
            $("#courseFilterSpaces").html(html);
            
            // Function to calculate the total number of students
            
          }
        });
        }
        else if(localStorage.getItem("student_id")!=0)
        {
          $.ajax({
            url: "rest/coursesforstudent/" + localStorage.getItem("student_id"),
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(courseData) {
              courseData.sort(function(a, b) {
                return a.name.localeCompare(b.name);
              });
              var html="";
              // Loop through the course data to create the other options
              for (var i = 0; i < courseData.length; i++) {
                html += '<option value="' + courseData[i].course_id + '">' + courseData[i].name + '</option>';
              }
              
              // Set the HTML of the select element
              $("#courseFilterSpaces").html(html);
              
              SpaceService.list();

            }
          });
        }
    },
    list: function() {
      $("#addSpaceButton").hide();
      $.ajax({
        url: "rest/spacesforcourse/" + $("#courseFilterSpaces").val(),
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (data) {
          $('#space-list').html(""); // Clear existing content
    
          // Fetch all reactions for the spaces
          $.ajax({
            url: "rest/reactions", // Adjust the URL as needed
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (reactionsData) {
              // Call displaySpaces with both space and reactions data
              displaySpaces(data, reactionsData);
            },
            error: function (error) {
              console.error("Error fetching reactions for spaces:", error);
            }
          });
        },
        error: function (error) {
          console.error("Error fetching spaces:", error);
        }
      });    
    
      function displaySpaces(spacesData, reactionsData) {
        var spaceList = $('#space-list');
      
        for (var i = 0; i < spacesData.length; i++) {
          var space = spacesData[i];
          var spaceId = space.id;
          var spaceTitle = space.title;
          var spaceContent = space.content;
          var comments = [];
          var likeCount = 0;
      
          // Filter reactions for the current space
          var reactionsForSpace = reactionsData.filter(function(reaction) {
            return reaction.space_id === spaceId;
          });
      
          // Separate comments from likes
          reactionsForSpace.forEach(function(reaction) {
            if (reaction.comment !== null) {
              comments.push(reaction);
            } else {
              likeCount++;
            }
          });
      
          // Create a Bootstrap card for the space
          var spaceCard = $('<div class="card mb-3">');
      
          // Card Header with Title
          var cardHeader = $('<div class="card-header">');
          cardHeader.append('<h5 class="card-title">' + spaceTitle + '</h5>');
          spaceCard.append(cardHeader);
      
          // Card Body with Content
          var cardBody = $('<div class="card-body">');
          cardBody.append('<p class="card-text">' + spaceContent + '</p>');
      
          // Display like count in the format of an emoji and count
          var likeEmoji = '👍';
          cardBody.append('<p class="card-text text-muted">' + likeEmoji + ' ' + likeCount + '</p>');
      
          // Create a "Show Replies" button if there are comments
          if (comments.length > 0) {
            var showRepliesBtn = $('<button class="btn btn-link show-replies-btn" style="margin-bottom:10px" data-space-id="' + spaceId + '">Show Replies</button>');
            cardBody.append(showRepliesBtn);
      
            // Create a div to hold comments and the reply section, initially hidden
            var repliesDiv = $('<div class="replies-div d-none" data-space-id="' + spaceId + '">');
      
            // Add "Comments" separator
            repliesDiv.prepend('<hr><h6>Comments</h6>');
      
            // Add comments to the replies div
            comments.forEach(function(comment) {
              var studentName = comment.student_name; // Assuming you have student_name in reactionsData
              var commentText = comment.comment;
              var gender = comment.gender; // Assuming you have gender in reactionsData
      
              var picture;
              if (gender.toLowerCase() === 'male') {
                picture = 'resources/pictures/muskiavatar.png'; // Adjust the path to your custom profile picture
              } else {
                picture = 'resources/pictures/zenskiavatar.png'; // Adjust the path to your custom profile picture
              }
      
              // Create a comment with a smaller profile picture
              var commentDiv = $('<div class="comment-div row">');
      
              // Create a div for the profile picture (on the left)
              var pictureDiv = $('<div class="profile-picture-div col-2" style="margin-right: 20px;">');
              pictureDiv.append('<img src="' + picture + '" alt="Profile Picture" style="width:40px;">');
              commentDiv.append(pictureDiv);
      
              // Create a div for the comment text and input section (on the right)
              var commentTextDiv = $('<div class="comment-text-div col-10">');
              commentTextDiv.append('<p class="student-name">' + studentName + ':</p>');
              commentTextDiv.append('<p class="comment-text">' + commentText + '</p>');
      
              // Append comment text and input section
              commentDiv.append(commentTextDiv);
      
              repliesDiv.append(commentDiv);
            });
      
            // Input field for replying
            var replyInput = $('<input type="text" class="form-control" placeholder="Write a comment..." id="reply' + spaceId + '">');
            var replyBtn = $('<button class="btn btn-primary btn-sm float-right">Reply</button>');
      
            // Handle reply button click
            replyBtn.on('click', (function(id) {
              return function() {
                SpaceService.reply(id); // Call SpaceService.reply with the correct space ID
              };
            })(spaceId));
      
            // Append the reply input and button
            repliesDiv.append(replyInput);
            repliesDiv.append(replyBtn);
      
            cardBody.append(repliesDiv);
          }
      
          spaceCard.append(cardBody);
      
          // Append the card to the space list
          spaceList.append(spaceCard);
        }
      
        // Toggle visibility of replies when the "Show Replies" button is clicked
        $('.show-replies-btn').on('click', function () {
          var spaceId = $(this).data('space-id');
          var repliesDiv = $('.replies-div[data-space-id="' + spaceId + '"]');
          repliesDiv.toggleClass('d-none');
        });
      }
      

    },
    reply: function(spaceId) {
      var reply = {};
      reply.space_id = spaceId;
      reply.comment = $("#reply" + spaceId).val();
      if(localStorage.getItem("student_id")!=0) 
      {
        reply.student_name =$("#user_full_name");
      reply.student_id=localStorage.getItem("student_id");
      }
      else reply.student_id = 0;
      if (reply.comment == "") return;
      $.ajax({
        url: 'rest/reaction',
        type: 'POST',
        data: JSON.stringify(reply),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          //Appending the new comment to the replies div
           // Fetch the gender information for the student who posted the comment
           $.ajax({
            url: 'rest/student/' + localStorage.getItem("student_id"), // Replace with the correct URL
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(studentData) {
              // Get the gender information from the student data
              var gender = studentData.gender;
        
              // Create a new comment div with the correct profile picture
              var commentDiv = $('<div class="comment-div row">');
        
              // Create a div for the profile picture (on the left)
              var pictureDiv = $('<div class="profile-picture-div col-2" style="margin-right: 20px;">');
              var picturePath = (gender.toLowerCase() === 'male') ? 'resources/pictures/muskiavatar.png' : 'resources/pictures/zenskiavatar.png';
              pictureDiv.append('<img src="' + picturePath + '" alt="Profile Picture" style="width:40px;">');
              commentDiv.append(pictureDiv);
        
              // Create a div for the comment text and input section (on the right)
              var commentTextDiv = $('<div class="comment-text-div col-10">');
              commentTextDiv.append('<p class="student-name">' + reply.fullname + ':</p>');
              commentTextDiv.append('<p class="comment-text">' + reply.comment + '</p>');
        
              // Append comment text and input section
              commentDiv.append(commentTextDiv);
        
              // Append the new comment div to the replies div
              var spaceId = reply.space_id;
              var repliesDiv = $('.replies-div[data-space-id="' + spaceId + '"]');
              repliesDiv.append(commentDiv);
        
              // Clear the reply input field
              $('#reply' + spaceId).val('');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              toastr.error(XMLHttpRequest.responseJSON.message);
              UserService.logout();
            }
          });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        UserService.logout();
      }
      });
    }
                       


      }
