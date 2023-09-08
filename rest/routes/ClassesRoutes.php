<?php
Flight::route('GET /studentclasses/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_student($id));
  });

  Flight::route('GET /studentclasses', function(){
    Flight::json(Flight::classesService()->select_all());
  });

  Flight::route('GET /professorclasses/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_professor($id));
  });

  Flight::route('GET /class/@id', function($id){
    Flight::json(Flight::classesService()->select_by_id($id));
  });

  Flight::route('GET /classesforcourse/@id', function($id){
    Flight::json(Flight::classesService()->get_classes_for_course($id));
  });
  
?>