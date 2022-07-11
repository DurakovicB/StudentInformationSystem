<?php
/**
* List all students
*/


Flight::route('GET /student', function(){
  Flight::json(Flight::studentService()->select_all());
});

/**
* List an  invidiual student
*/
Flight::route('GET /student/@id', function($id){
  Flight::json(Flight::studentService()->select_by_id($id));
});

/**
* add student
*/
Flight::route('POST /student', function(){
  Flight::json(Flight::studentService()->add(Flight::request()->data->getData()));
});

/**
* update student
*/
Flight::route('PUT /student/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::studentService()->update($id, $data));
});

/**
* delete student
*/
Flight::route('DELETE /student/@id', function($id){
  Flight::studentService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

 ?>
