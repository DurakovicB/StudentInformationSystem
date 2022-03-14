<?php
require 'vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "WebProgrammer";
$password = "WebProgrammer";
$dbname = "systeminformationsystem";
$table = $_REQUEST['table'];

  $conn = new PDO("mysql:host=$servername;$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully <br>";

  $select = $conn->prepare("SELECT * FROM $dbname.$table ;");
  $select->execute();
  $result = $select->fetchAll(PDO::FETCH_ASSOC);
  print_r($result);



 ?>
