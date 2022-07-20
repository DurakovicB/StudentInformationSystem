<?php
/**
* List all professors
*/


Flight::route('GET /professor', function(){
  Flight::json(Flight::professorService()->select_all());
});

Flight::route('GET /professor/@id/courses', function($id){
  Flight::json(Flight::professorService()->find_courses($id));
});

/**
* List an  invidiual professor
*/
Flight::route('GET /professor/@id', function($id){
  Flight::json(Flight::professorService()->select_by_id($id));
});

Flight::route('GET /professorsforstudent/@id', function($id){
  Flight::json(Flight::professorService()->find_professors_for_student($id));
});


/**
* add professor
*/
Flight::route('POST /professor', function(){
  Flight::json(Flight::professorService()->add(Flight::request()->data->getData()));
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
