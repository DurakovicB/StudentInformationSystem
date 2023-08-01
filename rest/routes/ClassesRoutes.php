<?php
Flight::route('GET /studentclasses/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_student($id));
  });

?>