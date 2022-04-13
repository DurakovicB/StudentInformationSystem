<?php
/**
* List all course
*/
Flight::route('GET /course', function(){
  Flight::json(Flight::courseService()->select_all());
});

/**
* List invidiual course
*/
Flight::route('GET /course/@id', function($id){
  Flight::json(Flight::courseService()->selectByID($id));
});

/**
* add course
*/
Flight::route('POST /course', function(){
  Flight::json(Flight::courseService()->insert(Flight::request()->data->getData()));
});

/**
* update course
*/
Flight::route('PUT /course/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::courseService()->update($id, $data));
});

/**
* delete course
*/
Flight::route('DELETE /course/@id', function($id){
  Flight::courseService()->delete($id);
  Flight::json(["message" => "deleted"]);
});
?>
