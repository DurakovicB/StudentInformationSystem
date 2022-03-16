<?php
class Dao
{
  private $connection;
  private $dbname = "systeminformationsystem";
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
  public function select_all($table)
  {
    $query = "select * from $this->dbname.$table";
    $query = "select * from $this->dbname.$table";
    print_r($query);
    echo("<br>");
    $select = $this->connection->prepare($query);

    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function insert($name,$email)
  {
    $table='students';
    $query = "INSERT INTO $table (fullname, email) VALUES ($name, $email)";
    $insert = $this->connection->prepare($query);
    $insert->execute();
  }

  public function update($id,$name,$email)
  {
    $table='students';
    $query = "update $table set fullname=$name, email=$mail where id=$id";
    $insert = $this->connection->prepare($query);
    $insert->execute();
  }
  public function delete($id)
  {
    $table = "students";
    $query = "delete from $table where id=$id";
    $delete = $this->connection->prepare($query);
  }


}
 ?>
