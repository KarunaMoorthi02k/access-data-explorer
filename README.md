# Access Data Explorer

An open-source starter project to search, filter, and export access-control device data from CSV files.

## Features
- Upload a CSV file from your computer
- Search across all columns
- Filter by device category: IN, OUT, EML, MC, ERS, EGRESS SWITCH
- Load the included sample CSV
- Export filtered results to CSV
- Optional server-side Claude API example (API key stays on the server)

## Privacy and safety
- Use dummy/sample data only when sharing the project publicly.
- Do not upload employee information, access credentials, security-sensitive door mappings, or confidential company data.
- The browser-only CSV feature processes files locally in your browser.
- Never put an Anthropic API key in `public/index.html` or any frontend JavaScript.

## Run the app
No build tools are needed for the browser-only app:
1. Open `public/index.html` in a browser, or serve the folder with any static web host.
2. Select a CSV file or click **Load sample data**.
3. Search/filter and click **Export filtered CSV**.

## Expected CSV shape
The app works with arbitrary CSV column names. Example columns:
`Building,Controller,Door,Device Type,Device Name,Status`

The included sample rows are fictional.

## Optional Claude API demo (Node.js)
Requires Node.js 18+ and an Anthropic API key with available billing/credits.

1. In a terminal, open the project folder.
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
3. Copy `.env.example` to `.env` and add your API key to `.env`.
4. Start the API server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` and use the **Ask Claude to summarize filtered data** feature.

The API demo sends only the currently displayed table rows to Claude. Do not use confidential operational data. Usage may incur charges depending on your account and credits.

## GitHub publishing checklist
- Review all sample content and keep it fictional.
- Confirm no `.env` file or API key is committed.
- Create a new GitHub repository named `access-data-explorer`.
- Upload the project files or push using Git.
- Add screenshots and a short demo only after testing the app.
- Be accurate about what is implemented; do not claim users or hosting that do not exist.

## Claude for Startups
This project is a portfolio/open-source project, not proof of startup eligibility. Review current requirements and offer availability directly at:
https://claude.com/programs/startups
