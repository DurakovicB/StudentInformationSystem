<?php
/**
* List all notification
*/
/**
 * @OA\Get(path="/notification", tags={"Notification"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all notifications from the API. ",
 *         @OA\Response( response=200, description="List of notifications.")
 * )
 */
Flight::route('GET /notification', function(){
  Flight::json(Flight::notificationService()->select_all());
});

//search for notification
Flight::route('GET /notification/search', function(){
  Flight::json(Flight::notificationService()->select_all());
});


/**
* List invidiual notification
*/

/**
 * @OA\Get(path="/notification/@id", tags={"Notification"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all info about a specific notification from the API. ",
 *         @OA\Response( response=200, description="List of notification details.")
 * )
 */
Flight::route('GET /notification/@id', function($id){
  Flight::json(Flight::notificationService()->select_by_id($id));
});


/**
* add notification
*/
Flight::route('POST /notification', function(){
  Flight::json(Flight::notificationService()->add(Flight::request()->data->getData()));
});

/**
* update notification
*/
Flight::route('PUT /notification/@id', function($id){
  $data = Flight::request()->data->getData();
  //$data['id'] = $id;
  Flight::json(Flight::notificationService()->update($id, $data));
});

/**
* delete notification
*/
Flight::route('DELETE /notification/@id', function($id){
  Flight::notificationService()->delete($id);
  Flight::json(["message" => "deleted"]);
});
?>
