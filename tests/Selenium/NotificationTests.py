import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class NotificationTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_add_notification(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and click the "Add Notification" button
        add_notification_button = driver.find_element(By.ID, "addNotificationButton")
        add_notification_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addNotificationModal"))
        )

        # Locate the input fields in the modal
        title_input = driver.find_element(By.NAME, "title")
        description_input = driver.find_element(By.NAME, "description2")

        # Enter notification information
        title_input.send_keys("Sample Notification Title")
        description_input.send_keys("This is a sample notification description.")

        # Locate and click the "Add" button in the modal
        add_button = driver.find_element(By.XPATH, "//button[text()='Add']")
        add_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "addNotificationModal"))
        )

        # Verify that the new notification is displayed in the table
        new_notification_title = driver.find_element(By.XPATH, "//tbody/tr/td[1][contains(text(),'Sample Notification Title')]")
        self.assertIsNotNone(new_notification_title)

    # Add more test cases for other notification-related functionalities (e.g., viewing details, etc.)

if __name__ == "__main__":
    unittest.main()
