<?php
/**
* List all notification
*/
/**
 * @OA\Get(path="/notification", tags={"notes"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all user notes from the API. ",
 *         @OA\Response( response=200, description="List of notes.")
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
