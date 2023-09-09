<?php
/**
* @OA\Get(
*     path="/studentclasses/@id",
*     tags={"Classes"},
*     summary="Get classes for a student by providing the student's ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of classes for the student."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /studentclasses/@id', function($id){
  Flight::json(Flight::classesService()->get_classes_for_student($id));
});

/**
* @OA\Get(
*     path="/studentclasses",
*     tags={"Classes"},
*     summary="Get all student classes available.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of all student classes."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /studentclasses', function(){
  Flight::json(Flight::classesService()->select_all());
});

/**
* @OA\Get(
*     path="/professorclasses/@id",
*     tags={"Classes"},
*     summary="Get classes for a professor by providing the professor's ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of classes for the professor."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /professorclasses/@id', function($id){
  Flight::json(Flight::classesService()->get_classes_for_professor($id));
});

/**
* @OA\Get(
*     path="/class/@id",
*     tags={"Classes"},
*     summary="Get class details by providing the class ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns details of the class."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /class/@id', function($id){
  Flight::json(Flight::classesService()->select_by_id($id));
});

/**
* @OA\Get(
*     path="/classesforcourse/@id",
*     tags={"Classes"},
*     summary="Get classes for a course by providing the course ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of classes for the course."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /classesforcourse/@id', function($id){
  Flight::json(Flight::classesService()->get_classes_for_course($id));
});

/**
* @OA\Delete(
*     path="/class/@id",
*     tags={"Classes"},
*     summary="Delete a class by providing the class ID.",
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
Flight::route('DELETE /class/@id', function($id){
  Flight::classesService()->delete($id);
});

/**
* @OA\Get(
*     path="/classrooms",
*     tags={"Classrooms"},
*     summary="Get a list of all available classrooms.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of all classrooms."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /classrooms', function(){
  Flight::json(Flight::classesService()->select_all_classrooms());  
});

/**
* @OA\Post(
*     path="/class",
*     tags={"Classes"},
*     summary="Add a new class by providing class details.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=201,
*         description="Class created successfully."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /class', function(){
  Flight::json(Flight::classesService()->add(Flight::request()->data->getData()));
});

/**
* @OA\Put(
*     path="/class/@id",
*     tags={"Classes"},
*     summary="Update class details by providing the class ID and new data.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Class that has been updated."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('PUT /class/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::classesService()->update($id, $data));
});

?>