
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/CourseDao.class.php';

class CourseService extends BaseService{

  public function __construct(){
    parent::__construct(new CourseDao());
  }
  public function select_for_student($id){
    return $this->dao->select_for_student($id);
  }
}
?>
