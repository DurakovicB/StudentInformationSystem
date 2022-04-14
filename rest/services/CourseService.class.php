
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/CourseDao.class.php';

class CourseService extends BaseService{

  public function __construct(){
    parent::__construct(new CourseDao());
  }

}
?>
