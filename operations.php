<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'rest/dao/Dao.class.php';

$dao=new Dao();
$op = $_REQUEST['op'];
$table = $_REQUEST['table'];


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
  $email $_REQUEST['email'];
  $dao->update($name,$email);
  break;

  case 'select':
  default:
  $result = $dao.select_all($table);
  print_r($results);

  break;

}
 ?>
