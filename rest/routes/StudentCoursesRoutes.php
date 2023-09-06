<?php
/**
* List all studentcourses
*/
/**
 * @OA\Get(path="/studentcourses/@id", tags={"Student","Course"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all grades for a student. ",
 *         @OA\Response( response=200, description="List of Courses.")
 * )
 */

Flight::route('GET /studentcourses/@id', function($id){
  Flight::json(Flight::studentcoursesService()->select_all_courses($id));
});


/**
* add studentcourses
*/

/**
* @OA\Post(
*     path="/studentcourses",
*     description="Enter a new Grade",
*     tags={"Student"},
*     @OA\RequestBody(description="Grade info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="percentage_total_amount", type="int", example="30",	description="Weight of the grade in terms of percentage"),
*    				@OA\Property(property="percentage_acquired", type="int", example="45",	description="Acquired percentage of the grade" ),
*    				@OA\Property(property="student_id", type="int", example="2",	description="Id of the student to be graded" ),
*    				@OA\Property(property="course_id", type="int", example="2",	description="Id of the course the grade is from") ,
*    				@OA\Property(property="grade_title", type="string", example="Final Exam",	description="Grade Title" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Succesfully entered grade"
*     ),
*     @OA\Response(
*         response=404,
*         description="Something went wrong"
*     )
* )
*/
Flight::route('POST /studentcourses', function(){
  Flight::json(Flight::studentcoursesService()->add(Flight::request()->data->getData()));
});

/**
* update studentcourses
*/
/**
* @OA\Put(
*     path="/studentcourses/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update a grade",
*     tags={"Student"},
*     @OA\RequestBody(description="Basic grade information", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="percentage_total_amount", type="int", example="30",	description="Weight of the grade in terms of percentage"),
*    				@OA\Property(property="percentage_acquired", type="int", example="45",	description="Acquired percentage of the grade" ),
*    				@OA\Property(property="student_id", type="int", example="2",	description="Id of the student to be graded" ),
*    				@OA\Property(property="course_id", type="int", example="2",	description="Id of the course the grade is from") ,
*    				@OA\Property(property="grade_title", type="string", example="Final Exam",	description="Grade Title" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Grade that has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('PUT /studentcourses/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::studentcoursesService()->update($id, $data));
});

/**
* delete studentcourses
*/
/**
* @OA\Delete(
*     path="/studentcourses/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete a grade",
*     tags={"Student"},
*     @OA\Response(
*         response=200,
*         description="Grade deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/

Flight::route('GET /studentgrades/@student_id/@course_id', function($student_id,$course_id){
  Flight::json(Flight::studentcoursesService()->select_grades_for_course($student_id,$course_id));
});


Flight::route('DELETE /studentcourses/@id', function($id){
  Flight::studentcoursesService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

Flight::route('GET /studentcourses', function(){
  Flight::json(Flight::studentcoursesService()->select_all());
});

Flight::route('POST /multiplestudentcourses', function(){
  Flight::json(Flight::studentcoursesService()->insertMultipleGrades(Flight::request()->data->getData()));
});
?>
