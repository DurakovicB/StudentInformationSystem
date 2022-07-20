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
    $query = "select distinct c.name from student_courses sc, course c where student_id=$id and c.id=sc.course_id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  
}
?>
