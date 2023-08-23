<?php
/**
* List all students
*/

/**
 * @OA\Get(path="/student", tags={"Student"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all students from the API. ",
 *         @OA\Response( response=200, description="List of students.")
 * )
 */
Flight::route('GET /student', function(){
  Flight::json(Flight::studentService()->select_all());
});

/**
* List an  invidiual student
*/
/**
 * @OA\Get(path="/student/{id}", tags={"Student"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all info about a specific student. ",
 *         @OA\Response( response=200, description="List of student details.")
 * )
 */
Flight::route('GET /student/@id', function($id){
  Flight::json(Flight::studentService()->select_by_id($id));
});

/**
 * @OA\Get(path="/studentcolleagues/{id}", tags={"Student"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all student's colleagues - students that take one or more courses as the student. ",
 *         @OA\Response( response=200, description="List of students.")
 * )
 */
Flight::route('GET /studentcolleagues/@id', function($id){
  Flight::json(Flight::studentService()->select_colleagues($id));
});
/**
* add student
*/
/**
* @OA\Post(
*     path="/student",
*     description="Add a new Student",
*     tags={"Student"},
*     @OA\RequestBody(description="Student Information", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="bilal.durakovic@stu.ibu.edu.ba",	description="Student e-mail adress"),
*    				@OA\Property(property="fullname", type="string", example="Bilal Durakovic",	description="Student's full name" ),
*    				@OA\Property(property="phone", type="string", example="061/504-221",	description="Student's phone number" ),
*    				@OA\Property(property="gender", type="string", example="male",	description="Student's gender" )

*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Succesfully added a student"
*     ),
*     @OA\Response(
*         response=404,
*         description="Something went wrong"
*     )
* )
*/
Flight::route('POST /student', function(){
  Flight::json(Flight::studentService()->add(Flight::request()->data->getData()));
});

/**
* update student
*/
/**
* @OA\Put(
*     path="/student/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update student",
*     tags={"Student"},
*     @OA\RequestBody(description="Basic student info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="bilal.durakovic@stu.ibu.edu.ba",	description="Student e-mail adress"),
*    				@OA\Property(property="fullname", type="string", example="Bilal Durakovic",	description="Student's full name" ),
*    				@OA\Property(property="phone", type="string", example="061/504-221",	description="Student's phone number" ),
*    				@OA\Property(property="gender", type="string", example="male",	description="Student's gender" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Student that has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('PUT /student/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::studentService()->update($id, $data));
});

/**
* delete student
*/
/**
* @OA\Delete(
*     path="/student/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete a specific student",
*     tags={"Student"},
*     @OA\Response(
*         response=200,
*         description="Student deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /student/@id', function($id){
  Flight::studentService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

Flight::route('GET /professorstudents/@id', function($id){
  Flight::json(Flight::studentService()->select_students_for_professor($id));
});

 ?>
