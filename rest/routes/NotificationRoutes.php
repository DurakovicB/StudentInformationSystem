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
/**
* @OA\Post(
*     path="/notification", security={{"ApiKeyAuth": {}}},
*     description="Add a notification",
*     tags={"Notification"},
*     @OA\RequestBody(description="Basic notification info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="title", type="string", example="Welcome!",	description="Title of the notification"),
*    				@OA\Property(property="description", type="string", example="The University would hereby like to welcome you to the University.",	description="Notification text/description" ),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Notification that has been created"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /notification', function(){
  Flight::json(Flight::notificationService()->add(Flight::request()->data->getData()));
});

/**
* update notification
*/
// Flight::route('PUT /notification/@id', function($id){
//   $data = Flight::request()->data->getData();
//   //$data['id'] = $id;
//   Flight::json(Flight::notificationService()->update($id, $data));
// });

/**
* delete notification
*/
/**
* @OA\Delete(
*     path="/notification/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete a notification",
*     tags={"Notification"},
*     @OA\Response(
*         response=200,
*         description="Notification deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /notification/@id', function($id){
  Flight::notificationService()->delete($id);
  Flight::json(["message" => "deleted"]);
});
?>
