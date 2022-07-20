<?php

/**
 * @OA\Get(path="/course", tags={"Course"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all courses from the API. ",
 *         @OA\Response( response=200, description="List of courses.")
 * )
 */
Flight::route('GET /course', function(){
  Flight::json(Flight::courseService()->select_all());
});

//search for course
Flight::route('GET /course/search', function(){
  Flight::json(Flight::courseService()->select_all());
});


/**
* List invidiual course
*/
/**
 * @OA\Get(path="/course/@id", tags={"Course"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return info about a specific course from the API. ",
 *         @OA\Response( response=200, description="List of course details.")
 * )
 */
Flight::route('GET /course/@id', function($id){
  Flight::json(Flight::courseService()->select_by_id($id));
});

/**
 * @OA\Get(path="/coursesforstudent/@id", tags={"Course"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all courses a specific student is taking. ",
 *         @OA\Response( response=200, description="List of courses.")
 * )
 */
Flight::route('GET /coursesforstudent/@id', function($id){
  Flight::json(Flight::courseService()->select_for_student($id));
});

/**
* add course
*/
Flight::route('POST /course', function(){
  Flight::json(Flight::courseService()->add(Flight::request()->data->getData()));
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
