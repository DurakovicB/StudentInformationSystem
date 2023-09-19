import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TimetableTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_filter_classes(self):
        driver = self.driver
        driver.get("http://localhost/your-class-schedule-page")  # Replace with your website URL

        # Wait for the page to load (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "courseFilterClasses"))
        )

        # Select a specific class from the dropdown
        course_dropdown = driver.find_element(By.ID, "courseFilterClasses")
        course_dropdown.select_by_value("class1")  # Replace with the appropriate value

        # Wait for the timetable to update based on the selected class
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element((By.XPATH, "//td[@data-day='1' and @data-time='9']"), "Class 1")
        )

        # Verify that the timetable displays the selected class

    def test_add_class(self):
        driver = self.driver
        driver.get("http://localhost/your-class-schedule-page")  # Replace with your website URL

        # Wait for the page to load (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addClassButton"))
        )

        # Click the "Add Class" button to open the modal
        add_class_button = driver.find_element(By.ID, "addClassButton")
        add_class_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addClassModal"))
        )

        # Locate the input fields in the modal
        # Fill in class details (e.g., course, professor, time, etc.)

        # Click the "Submit" button in the modal to add the class

        # Wait for the modal to close

        # Verify that the added class is displayed on the timetable

    # Add more test cases for other class-related functionalities (e.g., editing, deleting, etc.)

if __name__ == "__main__":
    unittest.main()
