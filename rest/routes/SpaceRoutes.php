<?php
/**
* List all space
*/
/**
 * @OA\Get(path="/space", tags={"Space"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all spaces from the API. ",
 *         @OA\Response( response=200, description="List of spaces.")
 * )
 */
Flight::route('GET /space', function(){
  Flight::json(Flight::spaceService()->select_all());
});

/**
* List invidiual space
*/

/**
 * @OA\Get(path="/space/@id", tags={"Space"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all info about a specific space from the API. ",
 *         @OA\Response( response=200, description="List of space details.")
 * )
 */
Flight::route('GET /space/@id', function($id){
  Flight::json(Flight::spaceService()->select_by_id($id));
});


/**
* add space
*/
/**
* @OA\Post(
*     path="/space", security={{"ApiKeyAuth": {}}},
*     description="Add a space",
*     tags={"Space"},
*     @OA\RequestBody(description="Basic space info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="title", type="string", example="Welcome!",	description="Title of the space"),
*    				@OA\Property(property="description", type="string", example="The University would hereby like to welcome you to the University.",	description="space text/description" ),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Space that has been created"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     ),
* summary="Add a new space "
* )
*/
Flight::route('POST /space', function(){
  Flight::json(Flight::spaceService()->add(Flight::request()->data->getData()));
});

/**
* update space
*/
// Flight::route('PUT /space/@id', function($id){
//   $data = Flight::request()->data->getData();
//   //$data['id'] = $id;
//   Flight::json(Flight::spaceService()->update($id, $data));
// });

/**
* delete space
*/
/**
* @OA\Delete(
*     path="/space/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete a space",
*     tags={"Space"},
*     @OA\Response(
*         response=200,
*         description="Space deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     ),
*summary="Delete a space from the API. "
* )
*/
Flight::route('DELETE /space/@id', function($id){
  Flight::spaceService()->delete($id);
  Flight::json(["message" => "deleted"]);
});
?>
