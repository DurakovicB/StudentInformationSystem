
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/StudentCoursesDao.class.php';

class StudentCoursesService extends BaseService{

  public function __construct(){
    parent::__construct(new StudentCoursesDao());
  }
  public function select_all_courses($id){
    return $this->dao->select_all_courses($id);
  }
}
?>
