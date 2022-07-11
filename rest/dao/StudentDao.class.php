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



}
 ?>
