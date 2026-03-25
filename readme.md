# 44Net Demo Dashboard

## Overview

This is a demo dashboard for the **ARDC 44Net** program, showcasing:

- Real-time node status monitoring  
- Simulate update button to randomly change node statuses  
- Auto-refresh of node data every 5 seconds  
- Online/offline status displayed with color coding  
- Built with **Next.js + TypeScript + Tailwind** for the frontend  
- Backend powered by **PHP** and a JSON file storing node data  

This project demonstrates the ability to integrate a **modern frontend with a classic backend**, a key skill for ARDC 44Net development.

---
```
## Project Structure
44net-demo/
├─ 44net-frontend/ # Next.js + TypeScript frontend
│ └─ app/page.tsx
├─ 44net-php-backend/ # PHP backend
│ └─ api/
│ ├─ get_nodes.php
│ ├─ update_nodes.php
│ └─ nodes.json
└─ README.md
```

---

## Installation & Run Locally

### Backend (PHP)

1. Open terminal and go to backend folder:
cd 44net-php-backend

2. Start PHP dev server:
php -S 0.0.0.0:8000
API endpoints:
http://127.0.0.1:8000/api/get_nodes.php
http://127.0.0.1:8000/api/update_nodes.php


### Frontend (Next.js + Tailwind)

1. Go to frontend folder:
cd 44net-frontend
npm install
2. Start the development server:
npm run dev
3. Open browser: http://localhost:3000
Click Simulate Update to randomly change node statuses.

Features
1. Real-time updates: Nodes auto-refresh every 5 seconds
2. Simulate updates: Randomly switch node status between online and offline
3. Color-coded status: Green = online, Red = offline
4. Full-stack demo: Shows integration between PHP backend and Next.js frontend
5. Lightweight: JSON file backend, no database required

Notes:
- This is a demo project for ARDC applications
- Designed to showcase full-stack skills with minimal setup
- Fully open source and can be cloned or extended for testing

License
- This project is provided for demonstration purposes only.
