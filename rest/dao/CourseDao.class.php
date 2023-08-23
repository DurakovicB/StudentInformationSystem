<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class CourseDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("course");
  }
  public function select_for_student($id)
  {
    $query = "select distinct name, description, professor_id,course_id from course c join student_courses sc on c.id = sc.course_id where sc.student_id = $id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function select_for_professor($id)
  {
    $query = "select * from course where professor_id= $id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
