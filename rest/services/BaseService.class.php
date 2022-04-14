<?php
abstract class BaseService {

  protected $dao;

  public function __construct($dao){
    $this->dao = $dao;
  }

  public function select_all(){
    return $this->dao->select_all();
  }

  public function select_by_id($id){
    return $this->dao->select_by_id($id);
  }

  public function add($entity){
    return $this->dao->add($entity);
  }

  public function update($id, $entity){
    return $this->dao->update($id, $entity);
  }

  public function delete($id){
    return $this->dao->delete($id);
  }
}
?>
