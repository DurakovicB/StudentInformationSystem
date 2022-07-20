<?php
/**
* List all professors
*/


/**
 * @OA\Get(path="/professor", tags={"Professor"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all professors from the API. ",
 *         @OA\Response( response=200, description="List of professors.")
 * )
 */
Flight::route('GET /professor', function(){
  Flight::json(Flight::professorService()->select_all());
});

/**
 * @OA\Get(path="/professor/@id/courses", tags={"Professor"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all courses a specific professr teaches. ",
 *         @OA\Response( response=200, description="List of courses.")
 * )
 */
Flight::route('GET /professor/@id/courses', function($id){
  Flight::json(Flight::professorService()->find_courses($id));
});

/**
* List an  invidiual professor
*/
/**
 * @OA\Get(path="/professor/@id", tags={"Professor"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all info about a professor from the API. ",
 *         @OA\Response( response=200, description="List of professor details.")
 * )
 */
Flight::route('GET /professor/@id', function($id){
  Flight::json(Flight::professorService()->select_by_id($id));
});

/**
 * @OA\Get(path="/professorsforstudent/@id", tags={"Professor"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all professors that teach a specific student. ",
 *         @OA\Response( response=200, description="List of professors.")
 * )
 */
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
