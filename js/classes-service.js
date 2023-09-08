var ClassesService = {
    init: function() {
        ClassesService.list("all");
        ClassesService.populateCourseFilter();
    }
    ,
    list: function(type) {
      if(localStorage.getItem("student_id") == 0 && localStorage.getItem("professor_id")==0){
        $("#timetable").html("");
        $("#downloadTimetableButton, #checkboxes").hide()
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
              $("<td>").text(item["day"]).appendTo(row);
        
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
            const row = dayToRow[day];
    
            // Populate the cells with class information in the respective columns
            classes.forEach(classInfo => {
              const [courseId, professorName, classroom, classType, startingTime] = classInfo.split(" - ");
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
      if($("#courseFilter option:selected").val() == "all") {
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
            const row = dayToRow[day];
    
            // Populate the cells with class information in the respective columns
            classes.forEach(classInfo => {
              const [courseId, professorName, classroom, classType, startingTime] = classInfo.split(" - ");
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
          url: "rest/classesforcourse/" + $("#courseFilter option:selected").val(),
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
              const row = dayToRow[day];
      
              // Populate the cells with class information in the respective columns
              classes.forEach(classInfo => {
                const [courseId, professorName, classroom, classType, startingTime] = classInfo.split(" - ");
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
          console.log(data);
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
          $("#courseFilter").html(html);
          
         
       }
      });
    }
    
      
      
      
}