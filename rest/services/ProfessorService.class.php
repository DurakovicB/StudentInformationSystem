<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/ProfessorDao.class.php';

class ProfessorService extends BaseService{

  public function __construct(){
    parent::__construct(new ProfessorDao());
  }
  public function find_courses($id){
    return $this->dao->find_courses($id);
  }
  public function find_professors_for_student($id)
  {
    return $this->dao->find_professors_for_student($id);

  }


}
?>
