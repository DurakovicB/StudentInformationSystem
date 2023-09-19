<?php
use PHPUnit\Framework\TestCase;

class ClassesTests extends TestCase
{
    public function testGetAllStudentClasses()
    {
        $studentId = 1;
        $response = Flight::get("/studentclasses/$studentId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetAllClasses()
    {
        $response = Flight::get('/studentclasses');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetAllProfessorClasses()
    {
        $professorId = 2;
        $response = Flight::get("/professorclasses/$professorId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetClassById()
    {
        $classId = 1;
        $response = Flight::get("/class/$classId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetClassesForCourse()
    {
        $courseId = 1;
        $response = Flight::get("/classesforcourse/$courseId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteClass()
    {
        $classId = 1;
        $response = Flight::delete("/class/$classId");

        $this->assertEquals(204, $response->getStatusCode());
    }

    public function testGetAllClassrooms()
    {
        $response = Flight::get('/classrooms');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testAddClass()
    {
        $data = [
            'name' => 'New Class',
            'description' => 'Description of the new class',
            'professor_id' => 2,
        ];

        $response = Flight::post('/class', $data);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUpdateClass()
    {
        $classId = 1;
        $data = [
            'name' => 'Updated Class Name',
            'description' => 'Updated class description',
            'professor_id' => 3,
        ];

        $response = Flight::put("/class/$classId", $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}
?>