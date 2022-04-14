<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/ProfessorDao.class.php';

class ProfessorService extends BaseService{

  public function __construct(){
    parent::__construct(new ProfessorDao());
  }

}
?>
