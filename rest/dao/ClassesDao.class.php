<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class ClassesDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("classes");
  }

  public function select_all_classrooms(){
    $query = "SELECT * FROM classroom";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function select_all(){
    $query = "SELECT co.name,starting_time as time, day,active,c.id as class_id, cr.id as classroom_id,
    type,cr.name as classroom, co.name as course_name, p.id , p.fullname as professor_name
    FROM classes c join professor p on c.professor_id = p.id 
    join course co on c.course_id = co.id 
    join classroom cr on c.classroom_id = cr.id
    order by day, starting_time";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function get_classes_for_student($student_id)
  {
    $query = "SELECT day, GROUP_CONCAT(CONCAT(c.name, ' - ', p.fullname, ' - ', cr.name , ' - ', type, ' - ', starting_time) ORDER BY starting_time) AS classes_on_day
    FROM classes
    JOIN student_courses sc ON classes.course_id = sc.course_id
    JOIN course c ON classes.course_id = c.id
    join classroom cr on classes.classroom_id = cr.id
    JOIN professor p ON classes.professor_id = p.id
    WHERE sc.student_id = $student_id AND classes.active = 'true'
    GROUP BY day;
    ";

    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function get_classes_for_professor($professor_id)
  {
   $query = "SELECT day, GROUP_CONCAT(CONCAT(c.name,  ' - ', professor_name, ' - ', cr.name, ' - ', type, ' - ' , starting_time, ' - ', active) ORDER BY starting_time) AS classes_on_day
    FROM classes join course c on classes.course_id = c.id
    join classroom cr on classes.classroom_id = cr.id
    WHERE c.id in (select id from course where professor_id = $professor_id)
    AND classes.active = 'true'
    GROUP BY day;";

    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function get_classes_for_course($courseId)
{
    $query = "SELECT day, GROUP_CONCAT(CONCAT(co.name,  ' - ', professor_name, ' - ', cr.name, ' - ', type, ' - ' , starting_time, ' - ',active) ORDER BY starting_time) AS classes_on_day
            FROM classes c
            JOIN classroom cr ON c.classroom_id = cr.id
            JOIN professor p ON c.professor_id = p.id
            join course co on c.course_id = co.id
            WHERE c.course_id = :courseId AND c.active = 'true'
            GROUP BY day;";

    $select = $this->connection->prepare($query);
    $select->bindParam(':courseId', $courseId, PDO::PARAM_INT);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

}
?>
