from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from undetected_chromedriver import Chrome, ChromeOptions
from tracker.utils.browser import get_driver

# Function to scrape Amazon product details
def scrape_amazon(url):
    driver = get_driver()
    driver.get(url)
    
    try:
        product_name = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//*[@id='productTitle']"))
        )
        
        image_url = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//*[@id='landingImage']"))
        )
        
        product_price = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//*[@id='corePriceDisplay_desktop_feature_div']/div[1]/span[3]/span[2]/span[2]"))
        )
        price = product_price.text.strip()
        
        print(f"Amazon - Product Name: {product_name.text.strip()}")
        print(f"Amazon - Price: {price}")
        print(f"Amazon - Image: {image_url.get_attribute('src')}")
        return product_name.text.strip(), price, image_url.get_attribute('src')
    
    except Exception as e:
        print(f"[Amazon Error]: {e}")
        return "Product not found", "Price not available", "Image not available"
    
    finally:
        if driver:
            driver.quit()

# Function to scrape Flipkart product details
def scrape_flipkart(url):
    driver = get_driver()
    driver.get(url)
    
    try:
        try:
            close_login = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'✕')]"))
            )
            close_login.click()
        except:
            pass

        product_name = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(@class, 'VU-ZEz') or contains(text(), 'realme') or contains(@class, 'B_NuCI')]"))
        )
        
        product_price = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(@class, '_30jeq3') or contains(@class, 'Nx9bqj')]"))
        )

        image_url = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//*[@id='container']/div/div[3]/div[1]/div[1]/div[1]/div/div[1]/div[2]/div/div[2]/img"))
        )
        
        print(f"Flipkart - Product Name: {product_name.text.strip()}")
        print(f"Flipkart - Price: {product_price.text.strip()}")
        print(f"Flipkart - Image: {image_url.get_attribute('src')}")
        return product_name.text.strip(), product_price.text.strip(), image_url.get_attribute('src')
    
    except Exception as e:
        print(f"[Flipkart Error]: {e}")
        return "Product not found", "Price not available", "Image not available"
    
    finally:
        if driver:
            driver.quit()

# Function to scrape Myntra product details
def scrape_myntra(url):
    try:
        driver = get_driver()
        driver.get(url)

        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(@class,'pdp-title')]"))
        )
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(@class,'pdp-name')]"))
        )
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(@class,'pdp-price')]//span[@class='pdp-price']"))
        )

        product_name = driver.find_element(By.XPATH, "//h1[contains(@class,'pdp-title')]").text.strip() + " - " + driver.find_element(By.XPATH, "//h1[contains(@class,'pdp-name')]").text.strip()
        product_price = driver.find_element(By.XPATH, "//div[contains(@class,'pdp-price')]//span[@class='pdp-price']").text.strip()
        image_url = driver.find_element(By.XPATH, "//*[@id='mountRoot']/div/div[1]/main/div[2]/div[1]/div[1]/div/div[1]").get_attribute("style")
        image_url = image_url.split('url(\"')[1].split('\")')[0]

        print(f"Myntra - Product Name: {product_name}")
        print(f"Myntra - Price: {product_price}")
        print(f"Myntra - Image: {image_url}")

        return product_name, product_price, image_url

    except Exception as e:
        print(f"[Myntra Error]: {e}")
        return "Product not found", "Price not available", "Image not available"

    finally:
        if driver:
            driver.quit()


# TESTING CODE
if __name__ == "__main__":
    urls = [
        "https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY",
        "https://www.flipkart.com/realme-p3x-5g-lunar-silver-128-gb/p/itmab5a4b09b6ccc",
        "https://www.myntra.com/tshirts/roadster/roadster-women-lavender-printed-boxy-round-neck-pure-cotton-t-shirt/10968510/buy",
        "https://www.amazon.in/amazon-basics-Low-Latency-Water-Resistance-Assistance/dp/B0DG92TB1B/ref=pd_dp_d_dp_dealz_etdr_d_sccl_3_4/257-8873805-7872219?psc=1",
        "https://www.amazon.in/dp/B0DCGF4QKL/?_encoding=UTF8&ref_=sbx_be_s_sparkle_ssd_tt",
        "https://www.flipkart.com/boult-mustang-torq-60-hrs-battery-app-support-4-mic-enc-breathable-leds-5-4v-bluetooth/p/itmf34b701ed660d?pid=ACCH7KPDFXMWQ6XN&lid=LSTACCH7KPDFXMWQ6XNMWY8CR&marketplace=FLIPKART&fm=productRecommendation%2FcrossSelling&iid=R%3Ac%3Bp%3AMOBH8VGVHUHDG6FG%3Bl%3ALSTMOBH8VGVHUHDG6FGI9LMXH%3Bpt%3App%3Buid%3A62e09760-26b4-11f0-8d1f-e91452248415%3B.PWBH2Y8YJYGPZFET&ppt=pp&ppn=pp&ssid=6ybabxdq340000001746109689048&otracker=pp_reco_Bought%2BTogether_3_38.productCard.PMU_TAB_Boult%2BMustang%2BTorq%2Bwith%2B60%2BHrs%2BBattery%252C%2BApp%2BSupport%252C%2B4%2BMic%2BENC%252C%2BBreathable%2BLEDs%252C%2B5.4v%2BBluetooth_PWBH2Y8YJYGPZFET_productRecommendation%2FcrossSelling_2&otracker1=pp_reco_PINNED_productRecommendation%2FcrossSelling_Bought%2BTogether_GRID_productCard_cc_3_NA_view-all&cid=PWBH2Y8YJYGPZFET",
        "https://www.flipkart.com/gadgetsbulk-front-back-case-apple-airpods-pro-2nd-generation/p/itm898360f8610b3?pid=ACCH25N9DDVFCGH4&lid=LSTACCH25N9DDVFCGH4LHB2I4&marketplace=FLIPKART&fm=productRecommendation%2FcrossSelling&iid=R%3Ac%3Bp%3AACCH7KPDFXMWQ6XN%3Bl%3ALSTACCH7KPDFXMWQ6XNMWY8CR%3Bpt%3App%3Buid%3A73787ca7-26b4-11f0-a981-6b995eed83c3%3B.ACCHY8MGQZVG9EHB&ppt=pp&ppn=pp&ssid=6ybabxdq340000001746109689048&otracker=pp_reco_Bought%2BTogether_21_38.productCard.PMU_TAB_GADGETSBULK%2BFront%2B%2526%2BBack%2BCase%2Bfor%2BAPPLE%2BAirpods%2BPro%2B2nd%2BGeneration%2Bcase_ACCHY8MGQZVG9EHB_productRecommendation%2FcrossSelling_3&otracker1=pp_reco_PINNED_productRecommendation%2FcrossSelling_Bought%2BTogether_GRID_productCard_cc_21_NA_view-all&cid=ACCHY8MGQZVG9EHB",
        "https://www.myntra.com/tshirts/kook+n+keech/kook-n-keech-ribbed-t-shirt/26006964/buy",
        "https://www.myntra.com/tshirts/smartees/smartees-women-graphic-printed-round-neck-cotton-oversized-t-shirt/32502712/buy"
    ]

    results = []

    for url in urls:
        if "amazon.in" in url:
            results.append(scrape_amazon(url))
        elif "flipkart.com" in url:
            results.append(scrape_flipkart(url))
        elif "myntra.com" in url:
            results.append(scrape_myntra(url))

    print("\nResults:", results)
