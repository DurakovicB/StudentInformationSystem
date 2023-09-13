<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class SpaceDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("space");
  }

  public function get_spaces_for_course($course_id)
  {
    $query = "SELECT * from space
    WHERE course_id = $course_id"
    ;
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function get_reactions_for_space($id){
    $query="SELECT space_id,student_id, comment from space_reactions
    WHERE space_id = $id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;

  }

  public function get_reactions(){
    $query="SELECT s.gender, sr.student_id, s.fullname as student_name, sr.comment, sr.space_id from space_reactions sr 
    left join student s on s.id = sr.student_id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function get_replies($space_id){
    $query="SELECT s.gender, sr.student_id, s.fullname as student_name, sr.comment, sr.space_id from space_reactions sr 
    left join student s on s.id = sr.student_id
    where sr.space_id = $space_id
    and comment is not null";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function insert_reaction($student_id, $space_id, $comment){
    $query="INSERT INTO space_reactions (student_id, space_id, comment)
    VALUES ($student_id, $space_id, :comment)";
    $select = $this->connection->prepare($query);
    $select->bindParam(':comment',$comment);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
