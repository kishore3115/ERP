ERP Frontend Prototype

What this is
- A small static single-page frontend prototype for an Education ERP system.
- No build tools required: open `index.html` in your browser.

Included modules (placeholders)
- Home, Academic, Registration, Attendance register, Career Choice, Courses, Counselling, Diary, Clubs/Activities, Exam Section, Feedback, Fee Payments, Hostel Management, Hallticket, Infrastructure Related, Library, My CGPA, Nodue, Profile, Psychometric Tests, Quizzes, Registrar Office, My Transportation, Ticketing, Support, Time Tables

How to run
1. Open `C:/Users/DELL/Downloads/ERP/index.html` in your browser (double-click or use "Open File").

Login
- The prototype includes a mock login page. Enter any non-empty username and password to sign in. This demo stores a small session token in your browser's localStorage only.

Logo
- I added support for an external logo file named `logo.png`. To use the image you attached, save the attached image into the project root at `C:/Users/DELL/Downloads/ERP/logo.png`.
- The login screen will automatically use `logo.png` when present. If the file is missing the page falls back to an inline SVG placeholder.

Next steps (suggested)
- Integrate with a backend API (REST/GraphQL) and replace placeholders with real data.
- Add a router library and authentication flows for user roles (student, faculty, admin).
- Convert to a framework (React/Vue/Angular) if you want component-driven UI and stronger state management.

Notes
- This is intentionally minimal so you can review structure and extend module UIs.
- I can convert this to a React + Vite starter or add sample backend mocks if you want — tell me which.
- I added a simple login flow that gates the app; tell me if you want real authentication, role-based access, or a server-backed session.
