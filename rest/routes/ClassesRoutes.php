<?php
Flight::route('GET /studentclasses/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_student($id));
  });

  Flight::route('GET /professorclasses/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_professor($id));
  });
?>