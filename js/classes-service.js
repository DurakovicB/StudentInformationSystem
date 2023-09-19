var ClassesService = {
    init: function() {
      $('#addClassForm').validate({
        submitHandler: function(form) {
          var classData = Object.fromEntries((new FormData(form)).entries());
          //console.log(classData);
          ClassesService.add(classData);
        }
      });

        ClassesService.list("all");
        ClassesService.populateAddModal();
        ClassesService.populateEditModalSelects();
        ClassesService.populateCourseFilter();
    }
    ,
    list: function(type) {
      if(localStorage.getItem("student_id") == 0 && localStorage.getItem("professor_id")==0){
        $("#timetable").html("");
        $("#downloadTimetableButton, #checkboxes").hide();
        $("#courseFilterClasses").hide();
        $.ajax({
          url: "rest/studentclasses",
          type: "GET",
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(jsonData) {
            const table = $("#timetable");
        
            // Clear existing table content
            table.empty();
        
            // Add a table header with CSS classes for styling
            const tableHead = $("<thead>").appendTo(table);
            const headerRow = $("<tr>").appendTo(tableHead);
            $("<th>").text("Class ID").appendTo(headerRow);
            $("<th>").text("Course Name").appendTo(headerRow);
            $("<th>").text("Professor Name").appendTo(headerRow);
            $("<th>").text("Type").appendTo(headerRow);
            $("<th>").text("Classroom").appendTo(headerRow);
            $("<th>").text("Time").appendTo(headerRow);
            $("<th>").text("Day").appendTo(headerRow);
            $("<th>").text("Active").appendTo(headerRow);
            $("<th>").text("Actions").appendTo(headerRow); // Add Actions column
        
            // Add a table body
            const tableBody = $("<tbody>").appendTo(table);
        
            // Populate the table with data
            jsonData.forEach(item => {
              const row = $("<tr>").appendTo(tableBody);
        
              // Create and populate table cells
              $("<td>").text(item["class_id"]).appendTo(row);
              $("<td>").text(item["course_name"]).appendTo(row);
              $("<td>").text(item["professor_name"]).appendTo(row);
              $("<td>").text(item["type"]).appendTo(row);
              $("<td>").text(item["classroom"]).appendTo(row);
              $("<td>").text(item["time"]).appendTo(row);
              $("<td>").text(`${getDayName(item["day"])}`).appendTo(row);
              $("<td>").text(item["active"]).appendTo(row);

        
              // Add hidden divs for course_id, professor_id, and classroom_id
              $("<div>")
                .addClass("d-none")
                .text(item["course_id"])
                .appendTo(row);
        
              $("<div>")
                .addClass("d-none")
                .text(item["professor_id"])
                .appendTo(row);
        
              $("<div>")
                .addClass("d-none")
                .text(item["classroom_id"])
                .appendTo(row);
        
              // Add Actions column with delete and update buttons
              const actionsCell = $("<td>").appendTo(row);
              const deleteButton = $("<button>")
                .text("Delete")
                .addClass("btn btn-danger btn-sm")
                .on("click", function() {
                  // Call the delete function from ClassesService
                  ClassesService.delete(item["class_id"]);
                })
                .appendTo(actionsCell);
        
              const updateButton = $("<button>")
                .text("Update")
                .addClass("btn btn-primary btn-sm")
                .on("click", function() {
                  // Call the update function from ClassesService
                  ClassesService.showEditModal(item["class_id"]);
                  ClassesService.populateEditModal(item["class_id"]);
                })
                .appendTo(actionsCell);
        
              // Add a line after each entry
              row.addClass("table-row-divider");
            });
        
            // Add CSS classes to the table for styling
            table.addClass("table table-bordered table-striped");
          }
        });
      }
      else if(localStorage.getItem("student_id") != 0)
     { 
      $("#courseFilterClasses").hide();
      $("#addClassButton").hide();
      $.ajax({
        url: "rest/studentclasses/" + localStorage.getItem("student_id"),
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(jsonData) {
          const dayToRow = {
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5
          };
    
          // Map starting times to their respective table columns
          const timeToCol = {
            "9": 1,
            "10": 3, // Adjusting the columns to account for colspan
            "11": 5,
            "12": 7,
            "13": 9,
            "14": 11,
            "15": 13,
            "16": 15,
            "17": 17,
            "18": 19,
            "19": 21
          };
    
          // Iterate over the JSON data
          jsonData.forEach(entry => {
            const { day, classes_on_day } = entry;
            const classes = classes_on_day.split(",");
    
            // Get the corresponding row for the day
            const row = day;
    
            // Populate the cells with class information in the respective columns
            classes.forEach(classInfo => {
              const [courseId, professorName, classroom, classType, startingTime,active] = classInfo.split(" - ");
              const col = timeToCol[startingTime];
    
              // Check if the type matches the desired type for display
              if ((type === "all") || (type === "lab" && classType === "lab") || (type === "class" && classType !== "lab")) {
                // Get the corresponding table cell and populate it with class information
                const cell = $(`.timetable-cell[data-day="${day}"][data-time="${startingTime}"]`);
                if (cell.length) {
                  cell.attr('colspan', 2); // Set the colspan to 2 for two-hour time slots
                  let displayType = ''; // Initialize an empty string for type display
                  if (classType === 'lab') {
                    displayType = ` - ${classType}`; // Add type only for lab classes
                  }
                  cell.html(`
                    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                      <div style="text-align: left; font-size: 10px;">
                        ${classroom}
                      </div>
                      <div style="text-align: center;">
                        ${courseId}${displayType}
                      </div>
                      <div style="text-align: right; font-size: 10px;">
                        ${professorName}
                      </div>
                    </div>
                  `);
                  const nextCell = cell.next();
                  nextCell.addClass('timetable-cell-hidden');
                }
              }
            });
          });
        }
      });
    }
    else if (localStorage.getItem("professor_id") != 0){
      $("#addClassButton").hide();
      if($("#courseFilterClasses option:selected").val() == "all") {
      $.ajax({
        url: "rest/professorclasses/" + localStorage.getItem("professor_id"),
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(jsonData) {
          const dayToRow = {
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5
          };
    
          // Map starting times to their respective table columns
          const timeToCol = {
            "9": 1,
            "10": 3, // Adjusting the columns to account for colspan
            "11": 5,
            "12": 7,
            "13": 9,
            "14": 11,
            "15": 13,
            "16": 15,
            "17": 17,
            "18": 19,
            "19": 21
          };
    
          // Iterate over the JSON data
          jsonData.forEach(entry => {
            const { day, classes_on_day } = entry;
            const classes = classes_on_day.split(",");
    
            // Get the corresponding row for the day
            const row = day;
    
            // Populate the cells with class information in the respective columns
            classes.forEach(classInfo => {
              const [courseId, professorName, classroom, classType, startingTime,active] = classInfo.split(" - ");
              const col = timeToCol[startingTime];
    
              // Check if the type matches the desired type for display
              if ((type === "all") || (type === "lab" && classType === "lab") || (type === "class" && classType !== "lab")) {
                // Get the corresponding table cell and populate it with class information
                const cell = $(`.timetable-cell[data-day="${day}"][data-time="${startingTime}"]`);
                if (cell.length) {
                  cell.attr('colspan', 2); // Set the colspan to 2 for two-hour time slots
                  let displayType = ''; // Initialize an empty string for type display
                  if (classType === 'lab') {
                    displayType = ` - ${classType}`; // Add type only for lab classes
                  }
                  cell.html(`
                    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                      <div style="text-align: left; font-size: 10px;">
                        ${classroom}
                      </div>
                      <div style="text-align: center;">
                        ${courseId}${displayType}
                      </div>
                      <div style="text-align: right; font-size: 10px;">
                        ${professorName}
                      </div>
                    </div>
                  `);
                  const nextCell = cell.next();
                  nextCell.addClass('timetable-cell-hidden');
                }
              }
            });
          });
        }
      });}
      else{
        $.ajax({
          url: "rest/classesforcourse/" + $("#courseFilterClasses option:selected").val(),
          type: "GET",
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(jsonData) {
            const dayToRow = {
              "Monday": 1,
              "Tuesday": 2,
              "Wednesday": 3,
              "Thursday": 4,
              "Friday": 5
            };
      
            // Map starting times to their respective table columns
            const timeToCol = {
              "9": 1,
              "10": 3, // Adjusting the columns to account for colspan
              "11": 5,
              "12": 7,
              "13": 9,
              "14": 11,
              "15": 13,
              "16": 15,
              "17": 17,
              "18": 19,
              "19": 21
            };
      
            // Iterate over the JSON data
            if (jsonData.length >0){
            jsonData.forEach(entry => {
              const { day, classes_on_day } = entry;
              const classes = classes_on_day.split(",");
      
              // Get the corresponding row for the day
              const row = day;
      
              // Populate the cells with class information in the respective columns
              classes.forEach(classInfo => {
                const [courseId, professorName, classroom, classType, startingTime,active] = classInfo.split(" - ");
                const col = timeToCol[startingTime];
      
                // Check if the type matches the desired type for display
                if ((type === "all") || (type === "lab" && classType === "lab") || (type === "class" && classType !== "lab")) {
                  // Get the corresponding table cell and populate it with class information
                  const cell = $(`.timetable-cell[data-day="${day}"][data-time="${startingTime}"]`);
                  if (cell.length) {
                    cell.attr('colspan', 2); // Set the colspan to 2 for two-hour time slots
                    let displayType = ''; // Initialize an empty string for type display
                    if (classType === 'lab') {
                      displayType = ` - ${classType}`; // Add type only for lab classes
                    }
                    cell.html(`
                      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                        <div style="text-align: left; font-size: 10px;">
                          ${classroom}
                        </div>
                        <div style="text-align: center;">
                          ${courseId}${displayType}
                        </div>
                        <div style="text-align: right; font-size: 10px;">
                          ${professorName}
                        </div>
                      </div>
                    `);
                    const nextCell = cell.next();
                    nextCell.addClass('timetable-cell-hidden');
                  }
                }
              });
            });
          }

          }
        });
      }
    }
    },
    showEditModal: function showEditModal(id) {
      $.ajax({
        url: "rest/class/" + id,
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(data) {
          //console.log(data);
          $("#class_id").val(data.class_id);
          $("#course_name").val(data.course_name);
          $("#professor_name").val(data.professor_name);
          $("#type").val(data.type);
          $("#classroom").val(data.classroom);
          $("#time").val(data.time);
          $("#day").val(data.day);
          $("#editClassModal").modal("show");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
          UserService.logout();
        }
      });
    },
    populateCourseFilter: function(){
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
          
          // Add the "All Courses" option at the beginning
          var html = '<option value="all">All Courses</option>';
          
          for (var i = 0; i < courseData.length; i++) {
            html += '<option value="' + courseData[i].id + '">' + courseData[i].name + '</option>';
          }
          
          // Set the HTML of the select element
          $("#courseFilterClasses").html(html);
          
         
       }
      });
    },
    delete: function(id) {
      if (confirm('Are you sure?') == true) {
        $.ajax({
          url: 'rest/class/' + id,
          type: 'DELETE',
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(result) {
            ClassesService.list();
          }
        });
      }
    },
    populateAddModal: function() {
            
          // Function to populate the "Course" select element
      const courseSelect = $("#courseSelectAddModal");

      $.ajax({
          url: "rest/course", // Replace with your API endpoint
          type: "GET",
          success: function (data) {
              // Clear existing options
              courseSelect.empty();

              // Populate options dynamically from the API response
              data.forEach(course => {
                  const option = $("<option>")
                      .val(course.course_id) // Use the appropriate ID from your data
                      .text(course.name); // Use the appropriate property from your data
                  courseSelect.append(option);
              });
          },
          error: function (error) {
              console.error("Error loading courses:", error);
          }
      });


    // Function to populate the "Professor" select element
      const professorSelect = $("#professorSelectAddModal");

      $.ajax({
          url: "rest/professor", // Replace with your API endpoint
          type: "GET",
          success: function (data) {
              // Clear existing options
              professorSelect.empty();

              // Populate options dynamically from the API response
              data.forEach(professor => {
                  const option = $("<option>")
                      .val(professor.id) // Use the appropriate ID from your data
                      .text(professor.fullname); // Use the appropriate property from your data
                  professorSelect.append(option);
              });
          },
          error: function (error) {
              console.error("Error loading professors:", error);
          }
      });

      const classroomSelect = $("#classroomSelectAddModal");

    $.ajax({
        url: "rest/classrooms", // Replace with your API endpoint for classrooms
        type: "GET",
        success: function (data) {
            // Clear existing options
            classroomSelect.empty();

            // Populate options dynamically from the API response
            data.forEach(classroom => {
                const option = $("<option>")
                    .val(classroom.id) // Use the appropriate ID from your data
                    .text(classroom.name); // Use the appropriate property from your data
                classroomSelect.append(option);
            });
        },
        error: function (error) {
            console.error("Error loading classrooms:", error);
        }
    });
    },
    populateEditModalSelects: function() {
            
      // Function to populate the "Course" select element
  const courseSelect = $("#courseSelectEditModal");

  $.ajax({
      url: "rest/course", // Replace with your API endpoint
      type: "GET",
      success: function (data) {
          // Clear existing options
          courseSelect.empty();

          // Populate options dynamically from the API response
          data.forEach(course => {
              const option = $("<option>")
                  .val(course.course_id) // Use the appropriate ID from your data
                  .text(course.name); // Use the appropriate property from your data
              courseSelect.append(option);
          });
      },
      error: function (error) {
          console.error("Error loading courses:", error);
      }
  });


// Function to populate the "Professor" select element
  const professorSelect = $("#professorSelectEditModal");

  $.ajax({
      url: "rest/professor", // Replace with your API endpoint
      type: "GET",
      success: function (data) {
          // Clear existing options
          professorSelect.empty();

          // Populate options dynamically from the API response
          data.forEach(professor => {
              const option = $("<option>")
                  .val(professor.id) // Use the appropriate ID from your data
                  .text(professor.fullname); // Use the appropriate property from your data
              professorSelect.append(option);
          });
      },
      error: function (error) {
          console.error("Error loading professors:", error);
      }
  });

  const classroomSelect = $("#classroomSelectEditModal");

$.ajax({
    url: "rest/classrooms", // Replace with your API endpoint for classrooms
    type: "GET",
    success: function (data) {
        // Clear existing options
        classroomSelect.empty();

        // Populate options dynamically from the API response
        data.forEach(classroom => {
            const option = $("<option>")
                .val(classroom.id) // Use the appropriate ID from your data
                .text(classroom.name); // Use the appropriate property from your data
            classroomSelect.append(option);
        });
    },
    error: function (error) {
        console.error("Error loading classrooms:", error);
    }
});
},

    add: function(classdata) {
      $.ajax({
        url: 'rest/class',
        type: 'POST',
        data: JSON.stringify(classdata),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          $("#addClassModal").modal("hide");
          ClassesService.list(); // perf optimization
          $('#addClassForm').trigger("reset");
  
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        UserService.logout();
      }
      });
    },
    populateEditModal: function(id) {
      $.ajax({
        url: 'rest/class/'+id ,
        type: "GET",
        success: function (data) {
          // Populate the modal fields with data
          $("#classIdEditModal").val(data.id); // Assuming the ID field exists in your data
          $("#courseSelectEditModal").val(data.course_id); // Assuming course_id is available in your data
          $("#professorSelectEditModal").val(data.professor_id); // Assuming professor_id is available in your data
          $("#typeSelectEditModal").val(data.type); // Assuming type is available in your data
          $("#classroomSelectEditModal").val(data.classroom_id); // Assuming classroom_id is available in your data
          $("#timeSelectEditModal").val(data.starting_time); // Assuming starting_time is available in your data
          $("#daySelectEditModal").val(data.day); // Assuming day is available in your data
          $("#activeEditModal").val(data.active); // Assuming active is available in your data
  
          // Show the edit modal
          $("#editClassModal").modal("show");
        },
        error: function (error) {
          // Handle error if necessary
          console.error("Error fetching class data:", error);
        },
      });
    },
    update: function() {
  // Function to update class data    $('.save-class-button').attr('disabled', true);
    var updatedClass = {};

    updatedClass.course_id = $("#courseSelectEditModal").val();
    updatedClass.professor_id = $("#professorSelectEditModal").val();
    updatedClass.type = $("#typeSelectEditModal").val();
    updatedClass.classroom_id = $("#classroomSelectEditModal").val();
    updatedClass.starting_time = $("#timeSelectEditModal").val();
    updatedClass.day = $("#daySelectEditModal").val();
    updatedClass.active = $("#activeEditModal").val();

    //console.log(updatedClass);

    $.ajax({
      url: 'rest/class/' + $('#classIdEditModal').val(),
      type: 'PUT',
      data: JSON.stringify(updatedClass),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#editClassModal").modal("hide");
        $('.save-class-button').attr('disabled', false);
        // You can update the class list or perform any other actions here
        ClassesService.list();      },
      error: function(error) {
        // Handle error if necessary
        console.error("Error updating class:", error);
      },
    });
    }

    
   
}
function getDayName(dayValue) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  if (dayValue >= 1 && dayValue <= 5) {
      return daysOfWeek[dayValue - 1];
  } else {
      return "Invalid Day";
  }
}