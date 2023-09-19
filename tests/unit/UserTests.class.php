<?php

use PHPUnit\Framework\TestCase;

class UserTests extends TestCase
{
    public function testUserLoginSuccess()
    {
        $data = [
            'email' => 'admin@ibu.edu.ba',
            'password' => '123',
        ];

        $response = Flight::post('/login', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUserLoginWrongPassword()
    {
        $data = [
            'email' => 'admin@ibu.edu.ba',
            'password' => 'wrong_password',
        ];

        $response = Flight::post('/login', $data);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUserLoginUserNotFound()
    {
        $data = [
            'email' => 'nonexistent_user@ibu.edu.ba',
            'password' => '123',
        ];

        $response = Flight::post('/login', $data);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetAllUsers()
    {
        $response = Flight::get('/user');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetUserById()
    {
        $userId = 1;
        $response = Flight::get("/user/$userId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testUpdateUser()
    {
        $userId = 1;
        $data = [
            'name' => 'Updated User',
            'email' => 'updated_user@example.com',
            'role' => 'updated_role',
        ];

        $response = Flight::put("/user/$userId", $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteUser()
    {
        $userId = 1;
        $response = Flight::delete("/user/$userId");

        $this->assertEquals(204, $response->getStatusCode());
    }

    public function testAddUser()
    {
        $data = [
            'name' => 'New User',
            'email' => 'new_user@example.com',
            'role' => 'new_role',
        ];

        $response = Flight::post('/user', $data);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}
?>