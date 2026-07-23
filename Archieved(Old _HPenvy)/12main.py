#phase1&2 
import pandas as pd
from playwright.sync_api import sync_playwright
import time
import os

# --- Using our persistent browser data to bypass Cloudflare ---
USER_DATA_DIR = os.path.join(os.getcwd(), "my_user_data")

def scrape_job_details(page, job_url):
    """Navigates to a job URL and extracts the full description text."""
    try:
        print(f"  -> Navigating to job details: {job_url}")
        page.goto(job_url, timeout=60000)
        # This selector targets the main job description container on Indeed.
        description_selector = "div#jobDescriptionText"
        page.wait_for_selector(description_selector, timeout=10000)
        job_description = page.inner_text(description_selector)
        return job_description
    except Exception as e:
        print(f"  -> Could not extract details for {job_url}. Error: {e}")
        return None

def is_fresher_friendly(job_description):
    """
    Analyzes the job description to filter out roles that explicitly require experience.
    Returns True if the job seems suitable for a fresher, False otherwise.
    """
    if not job_description:
        return False

    text = job_description.lower()

    # Keywords that indicate an experience requirement. This list can be improved over time.
    experience_keywords = [
        "years of experience", "minimum experience", "relevant experience",
        "sr.", "senior", "lead", "expert", "principal", "manager", "at least 2",
        "minimum 3 years", "5+ years", "3-5 years"
    ]

    # Check if any of the negative keywords are present.
    for keyword in experience_keywords:
        if keyword in text:
            print(f"  -> Filtering out: Found disqualifying keyword '{keyword}'.")
            return False

    # If no experience keywords are found, we approve the job.
    return True

def main():
    """Main function to launch the scraper, extract details, filter, and save."""
    search_query = "computer science fresher"
    location = "India"
    indeed_url = f"https://in.indeed.com/jobs?q={search_query.replace(' ', '+')}&l={location}"

    filtered_jobs = []

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            slow_mo=50
        )
        page = context.new_page()

        try:
            print(f"Navigating to: {indeed_url}")
            page.goto(indeed_url, timeout=90000)
            page.wait_for_selector('div.job_seen_beacon', timeout=30000)
            
            job_listings = page.locator('div.job_seen_beacon')
            job_count = job_listings.count()
            print(f"Found {job_count} initial job listings. Starting deep scrape and filtering...")

            # We can increase this limit later, but 5-10 is good for testing.
            for i in range(min(10, job_count)):
                job = job_listings.nth(i)
                title = job.locator('h2.jobTitle > a > span').inner_text()
                company = job.locator('span.companyName').inner_text()
                location_text = job.locator('div.companyLocation').inner_text()
                link_element = job.locator('h2.jobTitle > a')
                relative_link = link_element.get_attribute('href')
                absolute_link = f"https://in.indeed.com{relative_link}"

                print(f"\n[Processing Job {i+1}/{min(10, job_count)}]: {title} at {company}")

                # --- Phase 2 Core Logic ---
                job_description = scrape_job_details(page, absolute_link)

                if is_fresher_friendly(job_description):
                    print(f"  -> ✅ SUCCESS: Job is fresher-friendly. Adding to list.")
                    filtered_jobs.append({
                        "Title": title,
                        "Company": company,
                        "Location": location_text,
                        "Link": absolute_link,
                        "Description": job_description.strip() # Add the full description
                    })
                else:
                    print(f"  -> ❌ SKIPPED: Job does not meet fresher criteria.")
                
                # Small delay to avoid overwhelming the server
                time.sleep(1)

        except Exception as e:
            print(f"\nAn error occurred during the scraping process: {e}")
        finally:
            context.close()
            print("\nBrowser context closed.")

    if filtered_jobs:
        df = pd.DataFrame(filtered_jobs)
        df.to_csv("fresher_jobs.csv", index=False)
        print(f"🎉 Scraping complete. Found and saved {len(filtered_jobs)} fresher-friendly jobs to fresher_jobs.csv")
    else:
        print("Scraping complete. No fresher-friendly jobs were found in this run.")

if __name__ == "__main__":
    main()