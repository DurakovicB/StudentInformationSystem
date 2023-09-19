<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseDao.class.php';

class CourseDao extends BaseDao
{
  //constructor
  public function __construct()
  {
    parent::__construct("course");
  }

  public function select_all()
  {
    $query = "select distinct name, description, professor_id,c.id as course_id, COUNT(distinct sc.student_id) as student_count
    from course c
    left join student_courses sc on c.id = sc.course_id
    group by c.id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function select_for_student($id)
  {
    $query = "select distinct name, description, professor_id,course_id, COUNT(distinct sc.student_id) as student_count
    from course c
    join student_courses sc on c.id = sc.course_id
    where c.id in(select course_id from student_courses where student_id  = $id)
    group by c.id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function select_for_professor($id)
  {
    $query = "SELECT c.id, c.name, c.description, c.professor_id, COUNT(distinct sc.student_id) as student_count
    FROM course c
    LEFT JOIN student_courses sc ON c.id = sc.course_id
    WHERE c.professor_id = $id
    GROUP BY c.id";
    $select = $this->connection->prepare($query);
    $select->execute();
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
}
?>
