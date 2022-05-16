<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/services/CourseService.class.php';
require_once __DIR__.'/services/ProfessorService.class.php';
require_once __DIR__.'/dao/UserDao.class.php' ;

Flight::register('userDao', 'UserDao');
Flight::register('courseService', 'CourseService');
Flight::register('professorService', 'ProfessorService');

Flight::map('error', function(Exception $ex){
    // Handle error
    Flight::json(['message' => $ex->getMessage()], 500);
});

require_once __DIR__.'../routes/ProfessorRoutes.php';
require_once __DIR__.'../routes/CourseRoutes.php';
require_once __DIR__.'../routes/UserRoutes.php';


Flight::start();

?>
