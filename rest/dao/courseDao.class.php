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






}
 ?>
