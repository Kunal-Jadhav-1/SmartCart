from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

def get_driver():
    options = Options()
    options.add_argument("--headless")  # Use only one headless argument
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920x1080")
    options.add_argument("--disable-blink-features=AutomationControlled")
    
    # Create the WebDriver and return it
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    return driver

# Using the driver with a 'with' statement ensures proper cleanup
def run_scraper():
    # Create WebDriver instance using context manager
    with get_driver() as driver:
        # Your scraping logic here
        pass  # Replace with actual logic
