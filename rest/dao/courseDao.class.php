<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
class courseDao
{


  private $connection;
  private $dbname = "systeminformationsystem";
  private $table='course';
  //constructor
  public function __construct()
  {
    $servername = "localhost";
    $username = "WebProgrammer";
    $password = "WebProgrammer";




    $this->connection = new PDO("mysql:host=$servername;$this->dbname", $username, $password);
    // set the PDO error mode to exception
    $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully <br>";
  }

  //READ ALL FROM A TABLE
  public function select_all()
  {
    $query = "select * from $this->dbname.$this->table";
    print_r($query);
    echo("<br>");
    $select = $this->connection->prepare($query);

    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function selectByID($id)
  {
    $query = "select * from $this->dbname.$this->table ";
    $query.="where id=$id";

    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }

  public function insert($course)
  {
    $query = "INSERT INTO $this->dbname.$this->table (name, description,professor_id) VALUES (:name, :description,:professor_id)";
    $insert = $this->connection->prepare($query);
    $insert->execute($course);
  }

  public function update($course)
  {
    $query = "update $this->dbname.$this->table set name=:name, description=:description, professor_id=:professor_id WHERE id=:id";
    $insert = $this->connection->prepare($query);
    $insert->execute($course);
    return $course;
  }
  public function delete($id)
  {
    $query = "delete from $this->dbname.$this->table where id=:id";
    $delete = $this->connection->prepare($query);
    $delete->bindParam(':id',$id); //SQL injection prevention
    $delete->execute();
  }


}
 ?>
