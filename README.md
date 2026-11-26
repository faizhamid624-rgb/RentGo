# RentGo - Car Rental Management System

## A. Project Title and Description

**Project Title:** RentGo - Car Rental Management System

RentGo is a web-based car rental system that allows customers to browse cars, make bookings and view their booking history. The admin can manage cars, customers, bookings, payments and vehicle maintenance. The system also provides a dashboard and reports to help the admin monitor rental activities.

This project is a prototype that uses sample data and browser localStorage. It does not require an external database.

## B. Features Included

### Customer
- Register a new account, sign in and sign out.
- Browse and search for available cars.
- View car details and rental prices.
- Select rental dates and make a booking.
- View booking history and booking status.
- Reset password (demo function).

### Admin
- View the dashboard and rental statistics.
- Manage vehicle and customer records.
- Manage bookings and update booking status.
- Record payments and check payment status.
- Manage vehicle maintenance records.
- View reports and charts for revenue, bookings, vehicle status and maintenance costs.

## C. Instructions to Test Login

### How to open the website
1. Extract the project ZIP file.
2. Open the RentGo folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension, or visit the deployed GitHub Pages website.
4. Click **Sign In** on the homepage.

### Demo accounts

| Account | Email | Password |
| --- | --- | --- |
| Admin | admin@rentgo.com | `Admin123!` |
| Customer | customer@rentgo.com | `Customer123` |

### Test admin login
1. Enter the admin email and password above.
2. Click **Sign In**.
3. The system will open the admin dashboard.
4. Test the available admin modules, then sign out.

### Test customer login and registration
1. Enter the demo customer email and password on the same login page.
2. Click **Sign In** to access the customer homepage.
3. Browse cars, make a booking and check **My Bookings**.
4. Sign out and click **Register** or **Create Account** to create a new customer account.
5. Fill in the registration form and submit it.
6. Sign out and sign in again using the newly registered email and password.

The system automatically identifies the account role. Admin and customer accounts use the same login page.

## D. Frameworks and Libraries Used

| Technology | Purpose |
| --- | --- |
| HTML5 | Website structure and content |
| CSS3 | Custom styling, layout and animations |
| Tailwind CSS | Responsive design and user interface styling |
| JavaScript | Login, registration, booking and other system functions |
| Chart.js | Charts on the admin dashboard and reports |
| Font Awesome | Website icons |
| localStorage | Stores demo data, accounts and records in the browser |

## Additional Notes

- Sample cars, customers, bookings, payments and maintenance records are already included for testing.
- Data changes are saved in the same browser. Clearing the site's localStorage will remove added records and restore the original sample data on the next load.
- An internet connection is recommended because Tailwind CSS, Chart.js and Font Awesome are loaded through CDN links.
- The login and password reset functions are for demonstration purposes only. This system is not intended for real customer data or production use.
