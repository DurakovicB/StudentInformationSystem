<?php
use PHPUnit\Framework\TestCase;

class CourseTests extends TestCase
{
    public function testGetAllCourses()
    {
        $response = Flight::get('/course');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetCourseById()
    {
        $courseId = 1;
        $response = Flight::get("/course/$courseId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetCoursesForStudent()
    {
        $studentId = 1;
        $response = Flight::get("/coursesforstudent/$studentId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testAddCourse()
    {
        $data = [
            'name' => 'New Course',
            'description' => 'Description of the new course',
            'professor_id' => 2,
        ];

        $response = Flight::post('/course', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUpdateCourse()
    {
        $courseId = 1;
        $data = [
            'name' => 'Updated Course Name',
            'description' => 'Updated course description',
            'professor_id' => 3,
        ];

        $response = Flight::put("/course/$courseId", $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteCourse()
    {
        $courseId = 1;
        $response = Flight::delete("/course/$courseId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetCoursesForProfessor()
    {
        $professorId = 2;
        $response = Flight::get("/coursesforprofessor/$professorId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}

?>