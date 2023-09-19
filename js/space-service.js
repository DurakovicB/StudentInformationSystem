var SpaceService={
    init:function(){
        if(localStorage.getItem("student_id")!=0)$("#addSpaceButton").hide();
        SpaceService.populateCourseSelect();
        SpaceService.list();

        $('#addSpaceForm').validate({
          submitHandler: function(form) {
            var space = Object.fromEntries((new FormData(form)).entries());
            SpaceService.add(space);
          }
        });
        if(localStorage.getItem("student_id")!=0)$("#addSpaceButton").hide();
          


        
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
            $("#courseSelectAddModal").html(html);
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
    
          if (data.length === 0) {
            // Display a message when there are no spaces for the course
            $('#space-list').html("<p>No spaces available for this course.</p>");
          } else {
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
          }
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
          var likeCount = 0; // Initialize like count for each space
      
          // Filter reactions for the current space
          var reactionsForSpace = reactionsData.filter(function (reaction) {
            return reaction.space_id === spaceId;
          });
      
          // Separate comments from likes
          reactionsForSpace.forEach(function (reaction) {
            if (reaction.comment !== null) {
              comments.push(reaction);
            } else {
              likeCount++;
            }
          });
      
          var isProfessor = (localStorage.getItem("professor_id") !== '0');
      
          // Create a Bootstrap card for the space
          var spaceCard = $('<div class="card mb-3">');

          // Card Header with Title
          var cardHeader = $('<div class="card-header d-flex justify-content-between align-items-center">');

          // Create a div to hold the space title and delete button
          var titleAndDeleteDiv = $('<div class="d-flex align-items-center">');

          // Create the space title
          var spaceTitleElement = $('<h5 class="card-title">' + spaceTitle + '</h5>');

          // Display the "Delete" button only for professors
          if (isProfessor) {
              var deleteButton = $('<button type="button" class="btn btn-danger btn-sm ml-2" style ="margin-left:10px" id="deleteButton" onclick="SpaceService.delete(' + spaceId + ')">X</button>');
              titleAndDeleteDiv.append(spaceTitleElement, deleteButton);
          } else {
              titleAndDeleteDiv.append(spaceTitleElement);
          }

          cardHeader.append(titleAndDeleteDiv);
      
          // Create a clickable like emoji with a default class
          var likeEmoji = $('<p class="card-text text-muted like-emoji clickable" style="cursor: pointer;color: blue;" data-space-id="' + spaceId + '">👍 ' + likeCount + '</p>');

          // Check if the space is liked by the user and change the emoji appearance
          if (localStorage.getItem("student_id") != 0 && isSpaceLikedByStudent(spaceId)) {
            likeEmoji.addClass('liked');
          }
          
          // Add a click event handler for the like emoji
          if (localStorage.getItem("student_id") != 0) {
            likeEmoji.on('click', function () {
              var spaceId = $(this).data('space-id');
              var isLiked = $(this).hasClass('liked');
              var likeCountElement = $(this); // Get the like count element by the clicked like emoji
          
              if (isLiked) {
                // Call unlike function if already liked
                SpaceService.unlike(spaceId);
                $(this).removeClass('liked');
                // Decrement like count for this space
                var currentLikeCount = parseInt(likeCountElement.text().split(' ')[1]);
                likeCountElement.text('👍 ' + (currentLikeCount - 1));
              } else {
                // Call like function if not liked
                SpaceService.like(spaceId);
                $(this).addClass('liked');
                // Increment like count for this space
                var currentLikeCount = parseInt(likeCountElement.text().split(' ')[1]);
                likeCountElement.text('👍 ' + (currentLikeCount + 1));
              }
            });
          }
      
          cardHeader.append(likeEmoji);
      
          spaceCard.append(cardHeader);
      
          // Card Body with Content
          var cardBody = $('<div class="card-body">');
          cardBody.append('<p class="card-text">' + spaceContent + '</p>');
      
          // Create a "Show Replies" button for every space
          var showRepliesBtn = $('<button class="btn btn-link show-replies-btn" style="margin-bottom:10px" data-space-id="' + spaceId + '">Show Replies</button>');
          cardBody.append(showRepliesBtn);
      
          // Create a div to hold comments and the reply section, initially hidden
          var repliesDiv = $('<div class="replies-div d-none" data-space-id="' + spaceId + '">');
      
          // Add "Comments" separator
          repliesDiv.prepend('<hr><h6>Comments</h6>');
      
          // Add comments to the replies div
          comments.forEach(function (comment) {
            var studentName = comment.student_name; // Assuming you have student_name in reactionsData
            var commentText = comment.comment;
            var gender = comment.gender; // Assuming you have gender in reactionsData
      
            var picture;
            if (comment.gender) {
              if (gender.toLowerCase() === 'male') {
                picture = 'resources/pictures/muskiavatar.png'; // Adjust the path to your custom profile picture
              } else {
                picture = 'resources/pictures/zenskiavatar.png'; // Adjust the path to your custom profile picture
              }
            } else {
              picture = "resources/pictures/studentcap.png";
            }
      
            // Create a comment with a smaller profile picture
            var commentDiv = $('<div class="comment-div row">');
      
            // Create a div for the profile picture (on the left)
            var pictureDiv = $('<div class="profile-picture-div col-2" style="margin-right: 20px;">');
            pictureDiv.append('<img src="' + picture + '" alt="Profile Picture" style="width:40px;">');
            commentDiv.append(pictureDiv);
      
            // Create a div for the comment text and input section (on the right)
            var commentTextDiv = $('<div class="comment-text-div col-10">');
            if (studentName) {
              commentTextDiv.append('<p class="student-name">' + studentName + ':</p>');
            } else {
              commentTextDiv.append('<p class="student-name">Professor:</p>');
            }
            commentTextDiv.append('<p class="comment-text">' + commentText + '</p>');
      
            // Append comment text and input section
            commentDiv.append(commentTextDiv);
      
            repliesDiv.append(commentDiv);
          });
      
          // Input field for replying
          var replyInput = $('<input type="text" class="form-control" placeholder="Write a comment..." id="reply' + spaceId + '">');
          var replyBtn = $('<button class="btn btn-primary btn-sm float-right">Reply</button>');
      
          // Handle reply button click
          replyBtn.on('click', (function (id) {
            return function () {
              SpaceService.reply(id); // Call SpaceService.reply with the correct space ID
            };
          })(spaceId));
      
          // Append the reply input and button
          repliesDiv.append(replyInput);
          repliesDiv.append(replyBtn);
      
          cardBody.append(repliesDiv);
      
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
      
        function isSpaceLikedByStudent(space_id) {
          student_id = localStorage.getItem("student_id");
          var liked = false;
      
          // Make a GET request to fetch all reactions
          $.ajax({
            url: 'rest/reactions',
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            async: false, // Make the request synchronous for simplicity
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (reactionsData) {
              // Check if there's a reaction from the student for the specified space with an empty content column (indicating a like)
              for (var i = 0; i < reactionsData.length; i++) {
                var reaction = reactionsData[i];
                if (
                  reaction.space_id === space_id &&
                  reaction.student_id === student_id &&
                  reaction.comment === null
                ) {
                  liked = true;
                  break;
                }
              }
            },
            error: function (error) {
              console.error('Error fetching reactions:', error);
            }
          });
      
          return liked;
        }
      }
      
      
      
    },
    reply: function(spaceId) {
      var reply = {};
      reply.space_id = spaceId;
      reply.comment = $("#reply" + spaceId).val();
    
      if (localStorage.getItem("student_id") != 0) {
        reply.student_name = $("#user_full_name").text(); // Assuming you have a DOM element with the user's full name
        reply.student_id = localStorage.getItem("student_id");
      } else {
        reply.student_id = 0;
      }
    
      if (reply.comment == "") return;
    
      $.ajax({
        url: 'rest/reaction',
        type: 'POST',
        data: JSON.stringify(reply),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (result) {
         
             SpaceService.fetchComments(spaceId);
           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
          UserService.logout();
        }
      });
    },
    fetchComments:function(spaceId) {
      $.ajax({
        url: 'rest/repliesforspace/' + spaceId, // Replace with the correct API endpoint to fetch comments
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (commentsData) {
          // Update the comments section with the fetched comments
          SpaceService.updateCommentsSection(spaceId, commentsData);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
          UserService.logout();
        }
      });
    },
    // Function to update the comments section with fetched comments
    updateCommentsSection: function(spaceId, commentsData) {
      var repliesDiv = $('.replies-div[data-space-id="' + spaceId + '"]');
      
      // Clear existing comments
      repliesDiv.empty();
      
      if (commentsData.length === 0) {
        // Handle the case when there are no comments
        repliesDiv.append('<p>No comments yet.</p>');
      } else {
        // Iterate through the fetched comments and append them to the comments section
        commentsData.forEach(function (comment) {
          // Create comment elements and append them to repliesDiv
          var commentDiv = $('<div class="comment-div row">');
    
          // Create a div for the profile picture (on the left)
          var pictureDiv = $('<div class="profile-picture-div col-2" style="margin-right: 20px;">');
          var picturePath = "";
          if (comment.gender) {
            if (comment.gender.toLowerCase() == 'male') {
              picturePath = 'resources/pictures/muskiavatar.png';
            } else {
              picturePath = 'resources/pictures/zenskiavatar.png';
            }
          } else {
            picturePath = "resources/pictures/studentcap.png";
          }
          pictureDiv.append('<img src="' + picturePath + '" alt="Profile Picture" style="width:40px;">');
          commentDiv.append(pictureDiv);
    
          // Create a div for the comment text and input section (on the right)
          var commentTextDiv = $('<div class="comment-text-div col-10">');
          if (comment.student_id != 0) {
            commentTextDiv.append('<p class="student-name">' + comment.student_name + ':</p>');
          } else {
            commentTextDiv.append('<p class="student-name">Professor:</p>');
          }
          commentTextDiv.append('<p class="comment-text">' + comment.comment + '</p>');
    
          // Append comment text and input section
          commentDiv.append(commentTextDiv);
    
          // Append the commentDiv to repliesDiv
          repliesDiv.append(commentDiv);
        });
      }
    
      // Add the reply input field and button
      var replyInput = $('<input type="text" class="form-control" placeholder="Write a comment..." id="reply' + spaceId + '">');
      var replyBtn = $('<button class="btn btn-primary btn-sm float-right">Reply</button>');
    
      // Handle reply button click
      replyBtn.on('click', function () {
        // Call the reply function passing the spaceId
        SpaceService.reply(spaceId);
      });
    
      // Append the reply input and button
      repliesDiv.append(replyInput);
      repliesDiv.append(replyBtn);
    
      // Make the repliesDiv visible if there are comments
      repliesDiv.removeClass('d-none');
    },
    add: function(space) {
      $.ajax({
        url: 'rest/space',
        type: 'POST',
        data: JSON.stringify(space),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          $("#addSpaceModal").modal("hide");
          SpaceService.list(); // perf optimization
          $('#addSpaceForm').trigger("reset");
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
          url: 'rest/space/' + id,
          type: 'DELETE',
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(result) {
            SpaceService.list();
          }
        });
      }
    },
    like: function(spaceId) {
      // Get the student ID from localStorage
      var studentId = localStorage.getItem('student_id');
      
      // Create a JSON object for the like reaction
      var likeReaction = {
        student_id: studentId,
        space_id: spaceId,
        comment: null // This indicates a like reaction (no comment)
      };
    
      // Make a POST request to add the like reaction
      $.ajax({
        url: 'rest/reaction',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(likeReaction),
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(response) {
          // Handle the success response, if needed
          //console.log('Like reaction added successfully:', response);
        },
        error: function(error) {
          // Handle any errors that occur during the POST request
          console.error('Error adding like reaction:', error);
        }
      });
    },
    unlike: function(spaceId) {

      var studentId = localStorage.getItem('student_id');
            $.ajax({
              url: 'rest/like/' + studentId + '/'+ spaceId,
              type: 'DELETE',
              beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
              },
              success: function(result) {
                //SpaceService.list();
              }
            });
    }

      }
