<?php
/**
* List all studentcourses
*/
/**
 * @OA\Get(path="/studentcourses", tags={"notes"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all user notes from the API. ",
 *         @OA\Response( response=200, description="List of notes.")
 * )
 */

/**
* List all student courses
*/
Flight::route('GET /studentcourses/@id', function($id){
  Flight::json(Flight::studentcoursesService()->select_all_courses($id));
});


/**
* add studentcourses
*/
Flight::route('POST /studentcourses', function(){
  Flight::json(Flight::studentcoursesService()->add(Flight::request()->data->getData()));
});

/**
* update studentcourses
*/
Flight::route('PUT /studentcourses/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::studentcoursesService()->update($id, $data));
});

/**
* delete studentcourses
*/
Flight::route('DELETE /studentcourses/@id', function($id){
  Flight::studentcoursesService()->delete($id);
  Flight::json(["message" => "deleted"]);
});
?>
