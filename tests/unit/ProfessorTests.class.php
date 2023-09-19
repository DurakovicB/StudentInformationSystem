<?php

use PHPUnit\Framework\TestCase;

class ProfessorTests extends TestCase
{
    public function testGetAllProfessors()
    {
        $response = Flight::get('/professor');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetProfessorById()
    {
        $professorId = 1;
        $response = Flight::get("/professor/$professorId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetProfessorCourses()
    {
        $professorId = 1;
        $response = Flight::get("/professor/$professorId/courses");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testAddProfessor()
    {
        $data = [
            'email' => 'newprofessor@example.com',
            'fullname' => 'New Professor',
            'phone' => '123-456-7890',
            'date-of-birth' => '1990-01-01',
            'gender' => 'male',
        ];

        $response = Flight::post('/professor', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUpdateProfessor()
    {
        $professorId = 1;
        $data = [
            'email' => 'updated@example.com',
            'fullname' => 'Updated Professor',
            'phone' => '987-654-3210',
            'date-of-birth' => '1980-01-01',
            'gender' => 'female',
        ];

        $response = Flight::put("/professor/$professorId", $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteProfessor()
    {
        $professorId = 1;
        $response = Flight::delete("/professor/$professorId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}
