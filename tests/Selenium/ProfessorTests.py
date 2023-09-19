import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class ProfessorTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_add_professor(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and click the "Add Professor" button
        add_professor_button = driver.find_element(By.ID, "addProfessorButton")
        add_professor_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addProfessorModal"))
        )

        # Locate the input fields in the modal
        fullname_input = driver.find_element(By.NAME, "fullname")
        email_input = driver.find_element(By.NAME, "email")
        phone_input = driver.find_element(By.NAME, "phone")
        gender_select = driver.find_element(By.NAME, "gender")
        dob_input = driver.find_element(By.NAME, "dateofbirth")

        # Enter professor information
        fullname_input.send_keys("John Doe")
        email_input.send_keys("johndoe@example.com")
        phone_input.send_keys("1234567890")
        gender_select.select_by_value("male")  # Replace with the appropriate value
        dob_input.send_keys("2000-01-01")  # Replace with the appropriate date

        # Locate and click the "Submit" button in the modal
        submit_button = driver.find_element(By.XPATH, "//button[text()='Submit']")
        submit_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "addProfessorModal"))
        )

        # Verify that the new professor is displayed on the page
        new_professor = driver.find_element(By.XPATH, "//h5[text()='John Doe']")
        self.assertEqual(new_professor.text, "John Doe")

    # Add more test cases for other professor-related functionalities (e.g., editing, deleting, viewing profile, etc.)

if __name__ == "__main__":
    unittest.main()
