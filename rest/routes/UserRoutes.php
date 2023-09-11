<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__.'/../Config.class.php';
/**
* Check user login
*/

/**
* @OA\Post(
*     path="/login",
*     description="Login to the system",
*     tags={"User"},
*     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="admin@ibu.edu.ba",	description="Email"),
*    				@OA\Property(property="password", type="string", example="123",	description="Password" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT Token on successful response"
*     ),
*     @OA\Response(
*         response=404,
*         description="Wrong Password | User doesn't exist"
*     ),
summary="Login to the system "
* )
*/
Flight::route('POST /login', function(){
    $login = Flight::request()->data->getData();
    $user = Flight::userDao()->get_user_by_email($login['email']);
    if (isset($user['id'])){
      if($user['password'] == md5($login['password'])){
        unset($user['password']);
        $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');

        Flight::json(array('student_id' => $user['student_id'],'professor_id'=>$user['professor_id'],'token' => $jwt));

      }else{
        Flight::json(["message" => "Wrong password"], 404);
      }
    }else{
      Flight::json(["message" => "User doesn't exist"], 404);
    }
});



/**
* @OA\Get(
*     path="/user",
*     tags={"User"},
*     summary="Get a list of all users.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Response(
*         response=200,
*         description="Returns a list of all users."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /user', function(){
  Flight::json(Flight::userService()->select_all());
});

/**
* @OA\Get(
*     path="/user/@id",
*     tags={"User"},
*     summary="Get user details by providing the user ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the user",
*         @OA\Schema(
*             type="integer",
*             format="int64"
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns details of the user."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('GET /user/@id', function($id){
  Flight::json(Flight::userService()->select_by_id($id));
});

/**
* @OA\Put(
*     path="/user/@id",
*     tags={"User"},
*     summary="Update user details by providing the user ID and new data.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the user",
*         @OA\Schema(
*             type="integer",
*             format="int64"
*         )
*     ),
*     @OA\RequestBody(
*         description="New user data",
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 @OA\Property(property="name", type="string", example="John Doe", description="Name of the user"),
*                 @OA\Property(property="email", type="string", example="john.doe@example.com", description="Email of the user"),
*                 @OA\Property(property="role", type="string", example="student", description="Role of the user")
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="User that has been updated."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('PUT /user/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/user/@id",
*     tags={"User"},
*     summary="Delete a user by providing the user ID.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the user",
*         @OA\Schema(
*             type="integer",
*             format="int64"
*         )
*     ),
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
Flight::route('DELETE /user/@id', function($id){
  Flight::userService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

/**
* @OA\Post(
*     path="/user",
*     tags={"User"},
*     summary="Add a new user by providing user details.",
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(
*         description="User details",
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 @OA\Property(property="name", type="string", example="John Doe", description="Name of the user"),
*                 @OA\Property(property="email", type="string", example="john.doe@example.com", description="Email of the user"),
*                 @OA\Property(property="role", type="string", example="student", description="Role of the user")
*             )
*         )
*     ),
*     @OA\Response(
*         response=201,
*         description="User created successfully."
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /user', function(){
  Flight::json(Flight::userService()->add(Flight::request()->data->getData()));
});


?>
