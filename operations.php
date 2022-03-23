<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'rest/dao/courseDao.class.php';

$dao=new courseDao();
if(isset($_REQUEST['op']))$op = $_REQUEST['op'];
else $op=" ";
$table = 'course';


switch($op)
{
  case 'insert':
  $name= $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $dao->insert($name,$email);
  break;

  case 'delete':
  $id = $_REQUEST['email'];
  $dao->insert($name,$email);
  echo "DELETED $id";
  break;

  case 'update':
  $name= $_REQUEST['name'];
  $email= $_REQUEST['email'];
  $dao->update($name,$email);
  break;

  case 'select':
  default:
  $result = $dao->select_all();
  print_r($result);

  break;

}
 ?>
