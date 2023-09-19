import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class StudentTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver (e.g., for Chrome)
        self.driver = webdriver.Chrome(executable_path='C://programming//chromedriver_win32//chromedriver.exe')

    def tearDown(self):
        # Close the WebDriver after each test
        self.driver.quit()

    def test_add_student(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and click the "Add Student" button
        add_student_button = driver.find_element(By.ID, "addStudentButton")
        add_student_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "addStudentModal"))
        )

        # Locate the input fields in the modal
        fullname_input = driver.find_element(By.NAME, "fullname")
        email_input = driver.find_element(By.NAME, "email")
        phone_input = driver.find_element(By.NAME, "phone")
        gender_select = driver.find_element(By.NAME, "gender")

        # Enter student information
        fullname_input.send_keys("John Doe")
        email_input.send_keys("johndoe@example.com")
        phone_input.send_keys("1234567890")
        gender_select.select_by_value("male")  # Selecting 'Male' from the dropdown

        # Locate and click the "Submit" button in the modal
        submit_button = driver.find_element(By.XPATH, "//button[text()='Submit']")
        submit_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "addStudentModal"))
        )

        # Verify that the new student is displayed in the student list
        new_student_name = driver.find_element(By.XPATH, "//div[@id='student-list']//div[contains(text(),'John Doe')]")
        self.assertIsNotNone(new_student_name)

    def test_edit_student(self):
        # Implement test for editing a student
        pass

    def test_assign_single_grade(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate and click the "Assign Single Grade" button
        assign_grade_button = driver.find_element(By.ID, "addGradeButton")
        assign_grade_button.click()

        # Wait for the modal to appear (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "assignGradeModal"))
        )

        # Locate and select course and student options
        course_select = driver.find_element(By.ID, "grade_modal_course_id")
        student_select = driver.find_element(By.ID, "student_id")

        # Select a course and student (you may need to adjust the values)
        course_select.select_by_value("course1")
        student_select.select_by_value("1")

        # Enter grade information
        grade_title_input = driver.find_element(By.ID, "grade_title")
        percentage_total_input = driver.find_element(By.ID, "percentage_total_amount")
        percentage_acquired_input = driver.find_element(By.ID, "percentage_acquired")

        grade_title_input.send_keys("Math Quiz")
        percentage_total_input.send_keys("100")
        percentage_acquired_input.send_keys("90")

        # Locate and click the "Assign Grade" button in the modal
        assign_grade_button = driver.find_element(By.XPATH, "//button[text()='Assign Grade']")
        assign_grade_button.click()

        # Wait for the modal to close (you may need to adjust the wait time)
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, "assignGradeModal"))
        )

        # Verify that the grade is assigned successfully (you may need to implement this verification)

    def test_filter_students_by_class(self):
        driver = self.driver
        driver.get("http://localhost/WebProgramming")  # Replace with your website URL

        # Locate the class filter dropdown
        class_filter_select = driver.find_element(By.ID, "courseFilterStudents")

        # Select a class (you may need to adjust the value)
        class_filter_select.select_by_value("class1")

        # Wait for the student list to update (you may need to adjust the wait time)
        time.sleep(2)  # Sleep for 2 seconds to allow the list to update

        # Verify that the student list is filtered by the selected class (you may need to implement this verification)

if __name__ == "__main__":
    unittest.main()
