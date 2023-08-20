<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class NotificationDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("notification");
  }

  public function select_all()
  {
    $query = "SELECT id, title, description, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at FROM notification order by created_at desc;
  ";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
