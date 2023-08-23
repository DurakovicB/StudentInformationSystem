<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/StudentDao.class.php';

class StudentService extends BaseService{

  public function __construct(){
    parent::__construct(new StudentDao());
  }
  public function select_colleagues($id)
  {
    return $this->dao->select_colleagues($id);

  }

  public function select_students_for_professor($id)
  {
    return $this->dao->select_students_for_professor($id);

  }

  public function students_for_course($id)
  {
    return $this->dao->students_for_course($id);

  }
}
?>
