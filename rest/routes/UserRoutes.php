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
*     tags={"User-Related"},
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
*     )
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



Flight::route('GET /user', function(){
  Flight::json(Flight::userService()->select_all());
});

Flight::route('GET /user/@id', function($id){
  Flight::json(Flight::userService()->select_by_id($id));
});

Flight::route('PUT /user/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::userService()->update($id, $data));
});

Flight::route('DELETE /user/@id', function($id){
  Flight::userService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

Flight::route('POST /user', function(){
  Flight::json(Flight::userService()->add(Flight::request()->data->getData()));
});


?>
