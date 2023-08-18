var ClassesService = {
    init: function() {
        ClassesService.list("all");
    }
    ,
    list: function(type) {
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
    },
      
      
      
}