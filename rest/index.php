<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/courseDao.class.php';
require_once '../vendor/autoload.php';

Flight::register('courseDao', 'courseDao');

// CRUD operations for todos entity

/**
* List all course
*/
Flight::route('GET /course', function(){
  Flight::json(Flight::courseDao()->select_all());
});

/**
* List invidiual course
*/
Flight::route('GET /course/@id', function($id){
  Flight::json(Flight::courseDao()->selectByID($id));
});

/**
* add course
*/
Flight::route('POST /course', function(){
  Flight::json(Flight::courseDao()->add(Flight::request()->data->getData()));
});

/**
* update course
*/
Flight::route('PUT /course/@id', function($id){
  $data = Flight::request()->data->getData();
  $data['id'] = $id;
  Flight::json(Flight::courseDao()->update($data));
});

/**
* delete course
*/
Flight::route('DELETE /course/@id', function($id){
  Flight::courseDao()->delete($id);
  Flight::json(["message" => "deleted"]);
});

Flight::start();

?>
