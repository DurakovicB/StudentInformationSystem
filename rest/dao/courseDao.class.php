<?php
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
    $query = "select * from $this->dbname.$table ";
    $query.="where id=$id";
  }

  public function insert($name,$email)
  {
    $query = "INSERT INTO $table (fullname, email) VALUES ($name, $email)";
    $insert = $this->connection->prepare($query);
    $insert->execute();
  }

  public function update($id,$name,$email)
  {
    $query = "update $table set fullname=$name, email=$mail where id=$id";
    $insert = $this->connection->prepare($query);
    $insert->execute();
  }
  public function delete($id)
  {
    $query = "delete from $table where id=$id";
    $delete = $this->connection->prepare($query);
    $delete->execute();
  }


}
 ?>
