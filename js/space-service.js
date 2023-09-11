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
              
              // Loop through the course data to create the other options
              for (var i = 0; i < courseData.length; i++) {
                html += '<option value="' + courseData[i].course_id + '">' + courseData[i].name + ' (' + courseData[i].student_count + ')</option>';
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
            var showRepliesBtn = $('<button class="btn btn-link show-replies-btn">Show Replies</button>');
            cardBody.append(showRepliesBtn);
    
            // Create a div to hold comments, initially hidden
            var repliesDiv = $('<div class="replies-div d-none">');
    
            // Add comments to the replies div
            comments.forEach(function(comment) {
              var studentName = comment.student_name; // Assuming you have student_name in reactionsData
              var commentText = comment.comment;
              repliesDiv.append('<p class="comment">Student Name: ' + studentName + '<br>' + commentText + '</p>');
            });
    
            cardBody.append(repliesDiv);
    
            // Toggle visibility of replies when the "Show Replies" button is clicked
            showRepliesBtn.on('click', function () {
              repliesDiv.toggleClass('d-none');
            });
          }
    
          spaceCard.append(cardBody);
    
          // Append the card to the space list
          spaceList.append(spaceCard);
        }
      }
    }
    
    
    
    
    
      }
