<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
class BaseDao
{


  private $connection;
  protected $dbname = "systeminformationsystem";
  private $table;
  //constructor
  public function __construct($table)
  {
    $this->table=$table;
    $servername = "localhost";
    $username = "WebProgrammer";
    $password = "WebProgrammer";

    $this->connection = new PDO("mysql:host=$servername;dbname=$this->dbname", $username, $password);
    // set the PDO error mode to exception
    $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connected successfully <br>";
  }

  public function select_all()
  {
    $query = "select * from $this->dbname.$this->table";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function select_by_id($id)
  {
    $query = "select * from $this->dbname.$this->table ";
    $query.="where id=$id";

    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }
  public function delete($id)
  {
    $query = "delete from $this->dbname.$this->table where id=:id";
    $delete = $this->connection->prepare($query);
    $delete->bindParam(':id',$id); //SQL injection prevention
    $delete->execute();
  }
  public function add($entity){
    $query = "INSERT INTO $this->dbname.$this->table ";$query.=" (";
    foreach ($entity as $column => $value) {
      $query .= $column.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ") VALUES (";
    foreach ($entity as $column => $value) {
      $query .= ":".$column.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ")";
    print_r($query);
    $stmt= $this->connection->prepare($query);
    $stmt->execute($entity); // sql injection prevention
    $entity['id'] = $this->connection->lastInsertId();
    return $entity;
  }

  public function update($id, $entity, $id_column = "id"){
    $query = "UPDATE $this->dbname.$this->table SET ";
    foreach($entity as $name => $value){
      $query .= $name ."= :". $name. ", ";
    }
    $query = substr($query, 0, -2);
    $query .= " WHERE ${id_column} = :id";

    $stmt= $this->connection->prepare($query);
    $entity['id'] = $id;
    $stmt->execute($entity);
  }
  protected function query($query, $params){
    $stmt = $this->connection->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  protected function query_unique($query, $params){
    $results = $this->query($query, $params);
    return reset($results);
  }

}
?>
