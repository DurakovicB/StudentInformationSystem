<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class ProfessorDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("professor");
  }

  public function find_courses($id)
  {
    $query = "SELECT c.id, c.name, c.description, COUNT(sc.student_id) as student_count
    FROM course c
    LEFT JOIN student_courses sc ON c.id = sc.course_id
    WHERE c.professor_id = $id
    GROUP BY c.id
    ";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function find_professors_for_student($id)
  {
  $query = "select DISTINCT p.id,p.office,p.fullname,p.email,p.gender from professor p, student_courses sc,course c where c.id=sc.course_id and sc.student_id=$id and p.id=c.professor_id";
  $select = $this->connection->prepare($query);
  $select->execute();
  $result = $select->fetchAll(PDO::FETCH_ASSOC);
  return $result;
  }
}
?>
