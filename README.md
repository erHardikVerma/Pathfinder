# JobPilot 🚀

**Your personal AI-powered copilot for automating the job search process.**

JobPilot is a Python-based automation tool designed to streamline the job hunt for freshers and professionals. It intelligently scrapes opportunities from major job platforms, filters them based on your unique profile and eligibility, and organizes them into a daily, actionable report.

---

## ✨ Core Features

* **Multi-Platform Scraping:** Gathers job listings from various platforms like LinkedIn, Naukri, Indeed, and more.
* **AI-Powered Filtering:** Leverages AI to analyze job descriptions for:
    * **Experience Requirements:** Automatically filters out roles that are not suitable for freshers.
    * **Resume Matching:** Scores jobs based on how well they match the skills listed on your resume.
    * **Scam Detection:** Flags and discards suspicious listings (MLM, training fees, etc.).
* **Automated Daily Reports:** Generates a daily Excel report with three distinct sheets:
    1.  **Applied Jobs:** (Future Feature) A log of all positions automatically applied to.
    2.  **Ready to Apply:** A clean list of vetted jobs that are a perfect fit for manual application.
    3.  **Manual Review:** A list of potential opportunities that require a human eye to verify eligibility.
* **Email Notifications:** Automatically sends the daily report to your inbox so you never miss an opportunity.

---

## 🛠️ Technology Stack

This project is built with a focus on free, open-source, and powerful tools.

* **Core Language:** **Python**
* **Web Scraping & Automation:** **Playwright**
* **Data Analysis & Manipulation:** **Pandas**
* **AI & Intelligence:** **Google Gemini API**
* **Excel Reporting:** **Openpyxl**
* **Scheduling:** **Cron (Linux/macOS) / Task Scheduler (Windows)**



---

## 🏁 Getting Started

Follow these steps to get JobPilot up and running on your local machine.

### Prerequisites

* Python 3.8+ installed
* An active Google Gemini API key
* A Gmail account with an "App Password" enabled for sending email notifications

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/JobPilot.git](https://github.com/YOUR_USERNAME/JobPilot.git)
    cd JobPilot
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Install Playwright browsers:**
    ```bash
    playwright install
    ```

5.  **Configure your credentials:**
    * Create a `.env` file in the root directory.
    * Add your credentials to the `.env` file like this:
        ```env
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        SENDER_EMAIL="your_email@gmail.com"
        SENDER_PASSWORD="your_gmail_app_password"
        RECIPIENT_EMAIL="your_email@gmail.com"
        ```

### Running the Script

To run the job scraping and reporting process manually, execute the main script:

```bash
python main.py