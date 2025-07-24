# 💼 Job Openings App – Teknorix Careers

A responsive ReactJS application to display active job openings at Teknorix using the Jobsoid API. Users can search, filter, and view detailed job descriptions with the ability to apply and share jobs on social platforms.

---

## 🚀 Features

- 📋 **Job Listing** – Fetches job openings from Jobsoid API.
- 🔎 **Search & Filter** – By department, location, and functional area.
- 📄 **Job Detail Page** – Displays full job description.
- 🔗 **Social Share Buttons** – Share job via LinkedIn, Facebook, and Twitter.
- 🔁 **State Preservation** – Filters are preserved on page refresh or back navigation.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop using Tailwind CSS.
- 🌀 **Random Other Jobs** – Sidebar with suggested jobs on detail page.

---

## 📂 Folder Structure

src/
│
├── components/ # UI components (Select, JobCard, OtherJobs, etc.)
├── hooks/ # Custom hooks (useJobDetails, useFilteredJobs, etc.)
├── pages/ # Page components (JobList, JobDetails)
├── styles/ # CSS modules (select.module.css)
├── App.jsx # Main app with routes
└── main.jsx # Entry point
