import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class CourseTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate the email and password input fields
        email_input = driver.find_element(By.ID, "email")
        password_input = driver.find_element(By.ID, "password")

        # Enter valid email and password
        email_input.send_keys("admin@ibu.edu.ba")
        password_input.send_keys("123")

        # Locate and click the login button
        login_button = driver.find_element(By.ID, "login-button")
        login_button.click()

        # Wait for the login to complete (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "welcome-message"))
        )

        # Verify that the welcome message is displayed
        welcome_message = driver.find_element(By.ID, "welcome-message")
        self.assertEqual(welcome_message.text, "Welcome, Admin!")

    def test_add_course(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and click the "Add Course" button
        add_course_button = driver.find_element(By.ID, "addCourseButton")
        add_course_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addCourseModal"))
        )

        # Locate the input fields in the modal
        name_input = driver.find_element(By.NAME, "name")
        description_input = driver.find_element(By.NAME, "description")
        professor_id_input = driver.find_element(By.NAME, "professor_id")

        # Enter course information
        name_input.send_keys("Sample Course")
        description_input.send_keys("This is a sample course.")
        professor_id_input.send_keys("123")

        # Locate and click the "Submit" button in the modal
        submit_button = driver.find_element(By.XPATH, "//button[text()='Submit']")
        submit_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "addCourseModal"))
        )

        # Verify that the new course is displayed on the page
        new_course = driver.find_element(By.XPATH, "//h5[text()='Sample Course']")
        self.assertEqual(new_course.text, "Sample Course")

    def test_view_user_profile(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Perform actions to navigate to the user's profile page
        # For example, click on a user's name or profile picture

        # Wait for the user profile page to load (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "user-profile"))
        )

        # Verify that the user profile information is displayed correctly
        user_name = driver.find_element(By.ID, "user-name")
        self.assertEqual(user_name.text, "John Doe")

    def test_delete_course(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Perform actions to navigate to a course's details page
        # For example, click on a course title or button to view details

        # Wait for the course details page to load (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "course-details"))
        )

        # Locate and click the "Delete" button
        delete_button = driver.find_element(By.ID, "delete-course-button")
        delete_button.click()

        # Handle the confirmation dialog (if any) and confirm the deletion

        # Wait for the course to be deleted (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "course-details"))
        )

        # Verify that the course has been successfully deleted

if __name__ == "__main__":
    unittest.main()
