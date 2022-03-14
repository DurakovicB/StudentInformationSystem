<?php
require 'vendor/autoload.php';

Flight::route("/", function()
{
  echo 'Hello world!#2';
});
Flight::start();
 ?>
