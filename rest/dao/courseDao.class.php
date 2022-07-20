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
    $query = "select DISTINCT c.id,c.professor_id,name,description from course c, student_courses sc where c.id=sc.course_id and sc.student_id=$id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
