import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class SpaceTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_add_space(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and select a course from the dropdown
        course_dropdown = driver.find_element(By.ID, "courseFilterSpaces")
        course_dropdown.select_by_value("26")  # Replace with the appropriate value

        # Wait for the space list to load (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "space-list"))
        )

        # Locate and click the "Add Space" button
        add_space_button = driver.find_element(By.ID, "addSpaceButton")
        add_space_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addSpaceModal"))
        )

        # Locate the input fields in the modal
        title_input = driver.find_element(By.NAME, "title")
        content_input = driver.find_element(By.NAME, "content")
        course_select = driver.find_element(By.ID, "courseSelectAddModal")

        # Enter space information
        title_input.send_keys("Sample Space Title")
        content_input.send_keys("This is a sample space content.")
        course_select.select_by_value("course1")  # Replace with the appropriate value

        # Locate and click the "Add" button in the modal
        add_button = driver.find_element(By.XPATH, "//button[text()='Add']")
        add_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "addSpaceModal"))
        )

        # Verify that the new space is displayed on the page
        new_space = driver.find_element(By.XPATH, "//h5[text()='Sample Space Title']")
        self.assertEqual(new_space.text, "Sample Space Title")

    # Add more test cases for other space-related functionalities (e.g., filtering, editing, deleting, etc.)

if __name__ == "__main__":
    unittest.main()
