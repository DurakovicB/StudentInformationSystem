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
  break;

  case 'delete':
  break;

  case 'update':
  break;

  case 'select':
  default:
  $result = $dao.select_all($table);
  print_r($results);

  break;

}
 ?>
