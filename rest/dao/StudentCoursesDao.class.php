<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class StudentCoursesDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("student_courses");
  }

  public function select_all_courses($id)
  {
    $query = "select  c.name, sum(percentage_acquired/100*percentage_total_amount) as total_grade from student_courses sc, course c where student_id=$id and c.id=sc.course_id group by c.id" ;
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  

  public function select_grades_for_course($student_id, $course_id)
{
    $query = "SELECT * FROM student_courses WHERE student_id = :student_id AND course_id = :course_id
    and grade_title !='enrolment grade'";
    $select = $this->connection->prepare($query);
    $select->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $select->bindParam(':course_id', $course_id, PDO::PARAM_INT);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

public function insertMultipleGrades($grades) {
  // Define the SQL query to insert grades
  $query = "INSERT INTO student_courses (student_id, course_id, grade_title, percentage_acquired, percentage_total_amount) VALUES ";
  
  $valueStrings = [];
  $values = [];
  
  foreach ($grades as $grade) {
      // Sanitize data to prevent SQL injection
      $studentId = intval($grade['student_id']);
      $courseId = intval($grade['course_id']);
      $gradeTitle = $grade['grade_title'];
      $percentageAcquired = $grade['percentage_acquired'];
      $percentageTotalAmount = $grade['percentage_total_amount'];
      
      // Add the values to the array
      $valueStrings[] = "(?, ?, ?, ?, ?)";
      $values[] = $studentId;
      $values[] = $courseId;
      $values[] = $gradeTitle;
      $values[] = $percentageAcquired;
      $values[] = $percentageTotalAmount;
  }
  
  $query .= implode(", ", $valueStrings);
  
  ##return $query;

  // Prepare and execute the query
  $stmt = $this->connection->prepare($query);
  $stmt->execute($values);
  
  // Check for success
  if ($stmt->rowCount() > 0) {
      return true; // Insertion successful
  } else {
      return false; // Insertion failed
  }
}


}
?>
