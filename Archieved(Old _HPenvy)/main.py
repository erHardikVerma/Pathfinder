import pandas as pd
from playwright.sync_api import sync_playwright
import time
import os

# --- NEW: Define a path for our persistent browser data ---
# This folder will store cookies and session data to bypass Cloudflare.
USER_DATA_DIR = os.path.join(os.getcwd(), "my_user_data")


def main():
    """Main function to run the job scraper, now with persistence."""
    search_query = "computer science fresher"
    location = "India"
    indeed_url = f"https://in.indeed.com/jobs?q={search_query.replace(' ', '+')}&l={location}"

    scraped_data = []

    with sync_playwright() as p:
        # --- MODIFIED: Launch a persistent context ---
        # Instead of p.chromium.launch(), we use this method.
        # It tells Playwright to save all data (cookies, cache) to the USER_DATA_DIR.
        context = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,  # Must be False, especially for the first run!
            slow_mo=50  # Slows down actions slightly to appear more human
        )
        page = context.new_page()
        
        try:
            print(f"Navigating to: {indeed_url}")
            page.goto(indeed_url, timeout=90000) # Increased timeout for manual intervention

            # --- IMPORTANT FIRST-RUN STEP ---
            # On the very first run, Cloudflare might still challenge you.
            # You will have a minute or so to solve the "I am human" checkbox manually.
            # Once you solve it, the session is saved. You won't have to do it again.
            print("Page loaded. Waiting for 10 seconds to ensure all scripts/checks are done...")
            time.sleep(10)

            print("Looking for job listings...")
            page.wait_for_selector('div.job_seen_beacon', timeout=30000)
            job_listings = page.locator('div.job_seen_beacon')
            
            job_count = job_listings.count()
            print(f"Successfully bypassed security. Found {job_count} job listings.")

            for i in range(job_count):
                job = job_listings.nth(i)
                try:
                    title = job.locator('h2.jobTitle > a > span').inner_text()
                    company = job.locator('span.companyName').inner_text()
                    location_text = job.locator('div.companyLocation').inner_text()
                    link_element = job.locator('h2.jobTitle > a')
                    relative_link = link_element.get_attribute('href')
                    absolute_link = f"https://in.indeed.com{relative_link}"

                    scraped_data.append({
                        "Title": title,
                        "Company": company,
                        "Location": location_text,
                        "Link": absolute_link
                    })
                except Exception as e:
                    print(f"Could not extract data for one listing. Error: {e}")

        except Exception as e:
            print(f"An error occurred: {e}")
            print("Please try running the script again. If this is the first run, you may need to manually solve the Cloudflare CAPTCHA in the browser window that opens.")

        finally:
            context.close()
            print("Browser context closed.")

    if scraped_data:
        df = pd.DataFrame(scraped_data)
        df.to_csv("jobs.csv", index=False)
        print(f"\nPhase 1 complete. {len(scraped_data)} jobs saved to jobs.csv")
    else:
        print("\nPhase 1 failed. No data was scraped.")


if __name__ == "__main__":
    main()