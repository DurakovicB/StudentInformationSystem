<?php
/**
* List all studentcourses
*/
/**
 * @OA\Get(path="/studentcourses/@id", tags={"Grades"}, security={{"ApiKeyAuth": {}}},
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
*     tags={"Grades"},
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
*     tags={"Grades"},
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
*     tags={"Grades"},
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

/**
* @OA\Get(
*     path="/studentgrades/@student_id/@course_id",
*     tags={"Grades"},
*     summary="Get grades for a specific student in a specific course by providing student and course IDs.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns grades for the student in the specified course."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /studentgrades/@student_id/@course_id', function($student_id, $course_id){
  Flight::json(Flight::studentcoursesService()->select_grades_for_course($student_id, $course_id));
});

/**
* @OA\Delete(
*     path="/studentcourses/@id",
*     tags={"Grades"},
*     summary="Delete a student course by providing the student course ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=204,
*         description="No content"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /studentcourses/@id', function($id){
  Flight::studentcoursesService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

/**
* @OA\Get(
*     path="/studentcourses",
*     tags={"Grades"},
*     summary="Get a list of all student courses.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of all student courses."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /studentcourses', function(){
  Flight::json(Flight::studentcoursesService()->select_all());
});

/**
* @OA\Post(
*     path="/multiplestudentcourses",
*     tags={"Grades"},
*     summary="Insert multiple student courses with grades by providing course data.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(
*         description="List of student course data with grades",
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 type="array",
*                 @OA\Items(
*                     @OA\Property(property="student_id", type="integer", example="1", description="ID of the student"),
*                     @OA\Property(property="course_id", type="integer", example="101", description="ID of the course"),
*                     @OA\Property(property="grade", type="string", example="A", description="Grade for the student in the course")
*                 )
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Student courses with grades inserted successfully."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /multiplestudentcourses', function(){
  Flight::json(Flight::studentcoursesService()->insertMultipleGrades(Flight::request()->data->getData()));
});


?>
