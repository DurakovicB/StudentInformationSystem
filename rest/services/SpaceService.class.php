
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/SpaceDao.class.php';

class SpaceService extends BaseService{

  public function __construct(){
    parent::__construct(new SpaceDao());
  }

}
?>
