
<?php
require_once __DIR__.'/BaseService.class.php';
require __DIR__.'/../dao/ClassesDao.class.php';

class ClassesService extends BaseService{

  public function __construct(){
    parent::__construct(new ClassesDao());
  }
  public function get_classes_for_student($student_id){
    return $this->dao->get_classes_for_student($student_id);
  }
  public function get_classes_for_professor($professor_id){
    return $this->dao->get_classes_for_professor($professor_id);
  }

  public function get_classes_for_course($courseId){
    return $this->dao->get_classes_for_course($courseId);
  }

  public function select_all_classrooms(){
    return $this->dao->select_all_classrooms();
  }
}
?>
