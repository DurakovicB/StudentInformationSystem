<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class StudentDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("student");
  }


  public function search($string)
  {
    $query="SELECT  *  FROM systeminformationsystem.course WHERE CONCAT(name, ' ', description) LIKE '%$string%';";
    $stmt = $this->connection->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function select_colleagues($id)
  {
    $query = "select DISTINCT s.id,s.fullname,s.gender,s.phone,s.email from student s, student_courses sc
    where sc.course_id in (select course_id from student_courses where student_id=$id)
    and s.id!=$id and sc.student_id=s.id;";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function select_students_for_professor($id){

    $query= "Select * from student where id in (select student_id from student_courses where course_id in (select id from course where professor_id=$id))";
    $stmt = $this->connection->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}
 ?>
