<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/services/CourseService.class.php';
require_once __DIR__.'/services/ProfessorService.class.php';
require_once __DIR__.'/dao/UserDao.class.php' ;

Flight::register('userDao', 'UserDao');
Flight::register('courseService', 'CourseService');
Flight::register('professorService', 'ProfessorService');
/*
Flight::map('error', function(Exception $ex){
    // Handle error
    Flight::json(['message' => $ex->getMessage()], 500);
});*/

Flight::route('/*', function(){
  //perform JWT decode
  $path = Flight::request()->url;
  if ($path == '/login') return TRUE; // exclude login route from middleware

  $headers = getallheaders();
  if (@!$headers['Authorization']){
    Flight::json(["message" => "Authorization is missing"], 403);
    return FALSE;
  }else{
    try {
      $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
      Flight::set('user', $decoded);
      return TRUE;
    } catch (\Exception $e) {
      Flight::json(["message" => "Authorization token is  not valid"], 403);
      return FALSE;
    }
  }
});

  require_once __DIR__.'../routes/ProfessorRoutes.php';
require_once __DIR__.'../routes/CourseRoutes.php';
require_once __DIR__.'../routes/UserRoutes.php';


Flight::start();

?>
