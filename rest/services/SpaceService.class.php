
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/SpaceDao.class.php';

class SpaceService extends BaseService{

  public function __construct(){
    parent::__construct(new SpaceDao());
  }

  public function get_spaces_for_course($course_id){
    return $this->dao->get_spaces_for_course($course_id);
  }

  public function get_reactions_for_space($id){
    return $this->dao->get_reactions_for_space($id);
  }

  public function get_reactions(){
    return $this->dao->get_reactions();
  }

  public function insert_reaction($student_id, $space_id, $comment){
    return $this->dao->insert_reaction($student_id, $space_id, $comment);
  }

  public function get_replies($space_id){
    return $this->dao->get_replies($space_id);
  }
}
?>
