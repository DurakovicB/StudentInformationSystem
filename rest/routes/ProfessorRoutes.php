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
/**
* @OA\Post(
*     path="/professor",
*     description="Add a new professor",
*     tags={"Professor"},
*     @OA\RequestBody(description="Basic professor info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="dino.keco@ibu.edu.ba",	description="Professor e-mail adress"),
*    				@OA\Property(property="fullname", type="string", example="Dino Keco",	description="Professor's full name" ),
*    				@OA\Property(property="phone", type="string", example="061/504-221",	description="Professor's phone number" ),
*    				@OA\Property(property="date-of-birth", type="date", example="1976-04-09",	description="Birth date " ),
*    				@OA\Property(property="gender", type="string", example="male",	description="Professor's gender" )

*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Added professor"
*     ),
*     @OA\Response(
*         response=404,
*         description="Something went wrong"
*     )
* )
*/
Flight::route('POST /professor', function(){
  Flight::json(Flight::professorService()->add(Flight::request()->data->getData()));
});

/**
* update professor
*/
/**
* @OA\Put(
*     path="/professor/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update professor",
*     tags={"Professor"},
*     @OA\RequestBody(description="Basic Professor info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="dino.keco@ibu.edu.ba",	description="Professor e-mail adress"),
*    				@OA\Property(property="fullname", type="string", example="Dino Keco",	description="Professor's full name" ),
*    				@OA\Property(property="phone", type="string", example="061/504-221",	description="Professor's phone number" ),
*    				@OA\Property(property="date-of-birth", type="date", example="1976-04-09",	description="Birth date " ),
*    				@OA\Property(property="gender", type="string", example="male",	description="Professor's gender" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Updated Professor"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('PUT /professor/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::professorService()->update($id, $data));
});

/**
* delete professor
*/
/**
* @OA\Delete(
*     path="/professor/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete professor",
*     tags={"Professor"},
*     @OA\Response(
*         response=200,
*         description="Professor deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /professor/@id', function($id){
  Flight::professorService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

 ?>
