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
/**
* @OA\Post(
*     path="/course",
*     description="Add/create a new course",
*     tags={"Course"},
*     @OA\RequestBody(description="Basic course info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Calculus II",	description="Name of the course"),
*    				@OA\Property(property="description", type="string", example="A course in basic mathematics",	description="Description of the course" ),
*    				@OA\Property(property="professor_id", type="int", example="2",	description="Id of the professor that teaches the class" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Created course on successful response"
*     ),
*     @OA\Response(
*         response=404,
*         description="Something went wrong"
*     ),
summary="Add a course to the API.",

* )
*/
Flight::route('POST /course', function(){
  Flight::json(Flight::courseService()->add(Flight::request()->data->getData()));
});

/**
* update course
*/
/**
* @OA\Put(
*     path="/course/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update course",
*     tags={"Course"},
*     @OA\RequestBody(description="Basic course details", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Calculus II",	description="Name of the course"),
*    				@OA\Property(property="description", type="string", example="A course in basic mathematics",	description="Description of the course" ),
*    				@OA\Property(property="professor_id", type="int", example="2",	description="Id of the professor that teaches the class" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Course that has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     ),
 *         summary="Update a course from the API.",

* )
*/
Flight::route('PUT /course/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::courseService()->update($id, $data));
});

/**
* delete course
*/
/**
* @OA\Delete(
*     path="/course/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete a course",
*     tags={"Course"},
*     @OA\Response(
*         response=200,
*         description="Course deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     ),
      summary="Delete a course from the API.",
* )
*/
Flight::route('DELETE /course/@id', function($id){
  Flight::courseService()->delete($id);
  Flight::json(["message" => "deleted"]);
});


/**
* @OA\Get(
*     path="/coursesforprofessor/{id}",
*     tags={"Course"},
*     summary="Get courses for a professor by providing the professor's ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the professor",
*         @OA\Schema(
*             type="integer",
*             format="int64"
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="List of courses for the professor."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     ),
*     summary="Get courses for a professor by providing the professor's ID.",
* )
*/
Flight::route('GET /coursesforprofessor/@id', function($id){
  Flight::json(Flight::courseService()->select_for_professor($id));
});


?>
