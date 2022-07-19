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
    $query = "select c.name,c.description  from professor p, course c where (c.professor_id=$id and c.professor_id=p.id)";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
