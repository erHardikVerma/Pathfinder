import asyncio
import pandas as pd
from playwright.async_api import async_playwright

async def main():
    print("Starting the Pathfinder job scraper...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # Set to True for background execution
        page = await browser.new_page()
        
        # Go to the Indeed India page for a specific search
        print("Navigating to Indeed...")
        await page.goto("https://in.indeed.com/jobs?q=Software+Engineer&l=India", timeout=60000)
        
        # Wait for the job listings to appear
        print("Waiting for job listings to load...")
        await page.wait_for_selector('div.job_seen_beacon')
        
        # Find all the job card elements on the page
        job_listings = await page.locator('div.job_seen_beacon').all()
        print(f"Found {len(job_listings)} job listings.")
        
        jobs_data = []
        print("Extracting data from each listing...")
        
        for listing in job_listings:
            try:
                title = await listing.locator('h2.jobTitle > a > span').inner_text()
                company = await listing.locator('span.companyName').inner_text()
                location = await listing.locator('div.companyLocation').inner_text()
                link = await listing.locator('h2.jobTitle > a').get_attribute('href')
                
                # Create a dictionary for the current job
                job_info = {
                    "title": title,
                    "company": company,
                    "location": location,
                    "link": f"https://in.indeed.com{link}" if link else "N/A"
                }
                jobs_data.append(job_info)
                
            except Exception as e:
                print(f"Could not extract data from a listing. Skipping. Error: {e}")
        
        print(f"Successfully scraped {len(jobs_data)} jobs.")
        
        # Convert the list of dictionaries to a Pandas DataFrame
        df = pd.DataFrame(jobs_data)
        
        # Save the DataFrame to a CSV file
        df.to_csv("indeed_jobs.csv", index=False)
        print("Data saved to indeed_jobs.csv")
        
        await browser.close()
    print("Scraping complete. Pathfinder has finished its run.")

if __name__ == '__main__':
    asyncio.run(main())