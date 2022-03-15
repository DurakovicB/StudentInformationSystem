<?php
require 'vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'rest/dao/Dao.class.php';

$dao=new Dao();

print_r($dao->select_all("student"));







 ?>
