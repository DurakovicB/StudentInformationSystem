<?php

use PHPUnit\Framework\TestCase;

class SpaceTests extends TestCase
{
    public function testGetAllSpaces()
    {
        $response = Flight::get('/space');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetSpaceById()
    {
        $spaceId = 1;
        $response = Flight::get("/space/$spaceId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testAddSpace()
    {
        $data = [
            'title' => 'New Space',
            'description' => 'A new space description',
        ];

        $response = Flight::post('/space', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteSpace()
    {
        $spaceId = 1;
        $response = Flight::delete("/space/$spaceId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetReactionsForSpace()
    {
        $spaceId = 1;
        $response = Flight::get("/reactionsforspace/$spaceId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetSpacesForCourse()
    {
        $courseId = 1;
        $response = Flight::get("/spacesforcourse/$courseId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetReactions()
    {
        $response = Flight::get('/reactions');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testInsertReaction()
    {
        $data = [
            'student_id' => 1,
            'space_id' => 1,
            'comment' => 'This is a test comment',
        ];

        $response = Flight::post('/reaction', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetRepliesForSpace()
    {
        $spaceId = 1;
        $response = Flight::get("/repliesforspace/$spaceId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteLike()
    {
        $studentId = 1;
        $spaceId = 1;
        $response = Flight::delete("/like/$studentId/$spaceId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}
