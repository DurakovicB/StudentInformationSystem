<?php

use PHPUnit\Framework\TestCase;

class NotificationTests extends TestCase
{
    public function testGetAllNotifications()
    {
        $response = Flight::get('/notification');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testGetNotificationById()
    {
        $notificationId = 1;
        $response = Flight::get("/notification/$notificationId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testAddNotification()
    {
        $data = [
            'title' => 'New Notification',
            'description' => 'Description of the new notification',
        ];

        $response = Flight::post('/notification', $data);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }

    public function testDeleteNotification()
    {
        $notificationId = 1;
        $response = Flight::delete("/notification/$notificationId");

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody());
    }
}
