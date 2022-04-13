<?php
/**
* List all professor
*/
Flight::route('GET /professor', function(){
  Flight::json(Flight::professorService()->select_all());
});

/**
* List invidiual professor
*/
Flight::route('GET /professor/@id', function($id){
  Flight::json(Flight::professorService()->selectByID($id));
});

/**
* add professor
*/
Flight::route('POST /professor', function(){
  Flight::json(Flight::professorService()->insert(Flight::request()->data->getData()));
});

/**
* update professor
*/
Flight::route('PUT /professor/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::professorService()->update($id, $data));
});

/**
* delete professor
*/
Flight::route('DELETE /professor/@id', function($id){
  Flight::professorService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

 ?>
