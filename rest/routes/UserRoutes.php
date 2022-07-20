<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__.'/../Config.class.php';
/**
* Check user login
*/
Flight::route('POST /login', function(){
    $login = Flight::request()->data->getData();
    $user = Flight::userDao()->get_user_by_email($login['email']);
    if (isset($user['id'])){
      if($user['password'] == md5($login['password'])){
        unset($user['password']);
        $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');

        Flight::json(array('student_id' => $user['student_id'],'token' => $jwt));

      }else{
        Flight::json(["message" => "Wrong password"], 404);
      }
    }else{
      Flight::json(["message" => "User doesn't exist"], 404);
    }
});

?>
