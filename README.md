# Project Arjuna

Project Arjuna is an OSINT (Open Source Intelligence) toolkit designed to help users gather and manage public information from diverse sources, all in one place.

## Features

- **Profile Management:**  
  - Generate random user profiles (with customizable gender) using external APIs.
  - Save generated or manually entered profiles to a local database.
  - View a list of all saved profiles.

- **Search and Lookups:**  
  - Perform Google searches and fetch summarized results.
  - Retrieve WHOIS and registration information about domains.
  - Validate phone numbers and obtain country, location, and timezone data.
  - Lookup IP address details including organization, city, region, and country.

## Architecture

- **Frontend:**  
  - Built with React, leveraging functional components and hooks.
  - Communicates with the backend via RESTful API calls.
  - Provides forms and lists for inputting and displaying OSINT data.

- **Backend:**  
  - Node.js with Express for the HTTP server.
  - Uses SQLite for local storage of profiles (via a `db` module).
  - Integrates with third-party APIs for Google Search, WHOIS/domain info, phone validation, and IP lookups.
  - Exposes routes for:
    - `/api/google` — Google Custom Search results
    - `/api/profile/random` — Get a random user profile
    - `/api/profile` — Save a profile
    - `/api/profiles` — List saved profiles
    - `/api/domain` — WHOIS/domain lookup
    - `/api/phone` — Phone validation
    - `/api/ip` — IP address lookup

## API Keys & Configuration

This project relies on external APIs. Set the following environment variables in a `.env` file in the backend directory:

- `GOOGLE_API_KEY` — Google Custom Search API key
- `GOOGLE_CSE_ID` — Google Custom Search Engine ID
- `API_NINJAS_KEY` — API Ninjas key for domain and phone lookups
- (Optional) `PORT` — Port for the backend server (defaults to 5000)

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   - `cd backend && npm install`
   - `cd ../frontend && npm install`

3. **Configure environment variables**
   - Create `.env` in `backend/` with the required API keys.

4. **Run the backend**
   - `cd backend && node server.js`

5. **Run the frontend**
   - `cd frontend && npm start`

## License

MIT License

---

**Note:** This tool is for educational and research purposes only. Always comply with laws and terms of service when using OSINT resources.
