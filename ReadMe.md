# 🍽️ Restaurant Table Booking Backend (ChhotuTableWala)

> 📘 **Note:** This project was created as part of an assignment to develop a fully functional backend system for a restaurant table reservation platform.

A backend application built to support a restaurant table reservation platform. It enables users to discover restaurants, book tables based on availability, and manage their reservations and receive email confirmations.



## 📁 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Postman (for API testing)
- Resend (email notification)



## ✨ Features Implemented

| Feature                                   | Status        | Notes                                                                 |
|------------------------------------------|---------------|-----------------------------------------------------------------------|
| 👤 User Registration & Login             | ✅ Done        | Password encryption, token auth with cookies                         |
| 🔐 JWT Token Handling                    | ✅ Done        | Login, logout, protected routes                                      |
| 🍽️ Restaurant Booking                   | ✅ Done        | Users can select restaurant, date, time, guests                      |
| 📧 Email Notification on Booking         | ✅ Done        | Sends confirmation email post reservation                            |
| 🏗️ MVC Folder Structure                  | ✅ Done        | Modularized structure with controllers, models, routes               |
| 🧠 Centralized Error Handling            | ✅ Done        | `GlobalErrorHandler` middleware                                      |
| 📏 Capacity Validation Logic             | ✅ Done        | Prevents overbooking based on restaurant capacity                    |
| 🔁 Duplicate Reservation Check           | ✅ Done        | Prevents user from booking same restaurant, date & time twice        |


## 📮 API Endpoints

### ✅ Public Routes
- `POST /api/v1/users/register` – Register user
- `POST /api/v1/users/login` – Login user
- `GET /api/v1/restaurants` – Get all restaurants

### 🔐 Authenticated Routes
- `POST /api/v1/reserve` – Create a booking
- `GET /api/v1/reservations` – Get user reservation history
- `DELETE /api/v1/reservations/:id` – Cancel reservation
- `GET /api/v1/users/logout` – Logout



## 🔐 Security Middleware Used
## 🔐 Security Middleware Used

To make the app more secure, these extra tools (called middleware) have been added:

| Package Name              | Why It's Used                                                              |
|---------------------------|----------------------------------------------------------------------------|
| `helmet`                  | Adds security-related headers to protect the app                          |
| `express-rate-limit`      | Stops too many requests from the same user (helps prevent abuse)          |
| `express-xss-sanitizer`   | Cleans input to avoid cross-site scripting (XSS) attacks                   |
| `hpp`                     | Stops users from messing with repeated query parameters                    |
| `cors`                    | Handles cross-origin requests                                              |



---

## 📬 Postman Collection

> 🧪 Import this in Postman to test APIs:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/vikasvarma369/reastaurant-booking/collection/4edlsty/restaurant-booking-apis?action=share&creator=31685048)

---

## 📣 Author

Made with ♥️ by Vikas 