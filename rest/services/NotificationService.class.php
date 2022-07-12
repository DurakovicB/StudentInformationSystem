
<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/NotificationDao.class.php';

class NotificationService extends BaseService{

  public function __construct(){
    parent::__construct(new NotificationDao());
  }

}
?>
