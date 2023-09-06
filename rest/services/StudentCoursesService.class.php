
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
  
  public function select_grades_for_course($student_id,$course_id){
    return $this->dao->select_grades_for_course($student_id,$course_id);
  }

  public function insertMultipleGrades($grades) {
    return $this->dao->insertMultipleGrades($grades);
  }
}
?>
