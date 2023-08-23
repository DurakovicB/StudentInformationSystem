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
  public function get_classes_for_student($student_id)
  {
    $query = "SELECT day, GROUP_CONCAT(CONCAT(c.name, ' - ', p.fullname, ' - ', classroom, ' - ', type, ' - ', starting_time) ORDER BY starting_time) AS classes_on_day
    FROM classes
    JOIN student_courses sc ON classes.course_id = sc.course_id
    JOIN course c ON classes.course_id = c.id
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
   $query = "SELECT day, GROUP_CONCAT(CONCAT(c.name,  ' - ', professor_name, ' - ', classroom, ' - ', type, ' - ' , starting_time) ORDER BY starting_time) AS classes_on_day
    FROM classes join course c on classes.course_id = c.id
    WHERE classes.professor_id = $professor_id AND classes.active = 'true'
    GROUP BY day;";

    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
