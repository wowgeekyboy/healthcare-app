# Healthcare App - Modern Healthcare Appointment System 🌟

Welcome to **Healthcare App**, a modern healthcare appointment system designed to streamline the process of booking and managing healthcare appointments. This application provides a user-friendly interface for patients, doctors, and administrators to interact seamlessly.

## Table of Contents 📚
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Authentication](#authentication)
- [Email Notifications](#email-notifications)
- [Book Appointment Feature](#book-appointment-feature)
- [Sample Users](#sample-users)
- [Architectural Decisions](#architectural-decisions)
- [Contributing](#contributing)
- [License](#license)

## Features 🚀
- **User Registration & Login**: Secure authentication for users.
- **Appointment Booking**: Patients can book appointments with doctors.
- **Email Notifications**: Users receive email confirmations after booking appointments.
- **Dashboard**: Separate dashboards for patients, doctors, and admins.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used 🛠️
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Email Service**: Nodemailer
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started 🏁

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wowgeekyboy/healthcare-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd healthcare-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up your PostgreSQL database** and update your `.env` file with the connection string.

5. **Run the Prisma migration** to set up your database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Seed the database** with initial data:
   ```bash
   npx prisma db seed
   ```

7. **Run the application**:
   ```bash
   npm run dev
   ```

8. **Open your browser** and go to `http://localhost:3000`.

## User Roles 👥
- **Patient**: Can book appointments, view their appointment history, and manage their profile.
- **Doctor**: Can view their appointments, manage patient information, and start consultations.
- **Admin**: Can manage users, view all appointments, and oversee the system.

## Authentication 🔐
Healthcare App uses **NextAuth.js** for secure authentication. Users can register and log in using their email and password. The authentication flow includes:

- **Registration**: New users can create an account.
- **Login**: Existing users can log in to access their dashboards.

## Email Notifications 📧
After booking an appointment, users receive an email confirmation. This is implemented using **Nodemailer**. Here’s a snippet of the email sending logic:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: 'no-reply@healthcareapp.com',
  to: userEmail,
  subject: 'Appointment Confirmation',
  text: `Your appointment has been booked successfully!`,
};

await transporter.sendMail(mailOptions);
```

## Book Appointment Feature 📅
Patients can book appointments through a dedicated page. The booking process includes selecting a date and time, which is then saved to the database. Here’s a simplified version of the booking logic:

```typescript
const fetchAppointments = async () => {
  const response = await fetch('/api/appointments');
  const data = await response.json();
  setAppointments(data);
};

const handleBookAppointment = async () => {
  const response = await fetch('/api/book-appointment', {
    method: 'POST',
    body: JSON.stringify({ date, time, doctorId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  // Handle success or error
};
```

## Sample Users 👤
Here are some sample users created in the database:

- **Admin**:
  - **Email**: admin@example.com
  - **Password**: Admin@123

- **Doctors**:
  - **Doctor X**:
    - **Email**: doctorx@example.com
    - **Password**: Doctor@123!
  - **Doctor Y**:
    - **Email**: doctory@example.com
    - **Password**: Doctor@123!
  - **Doctor Z**:
    - **Email**: doctorz@example.com
    - **Password**: Doctor@123!


## Architectural Decisions 🏗️
The architecture of Healthcare App is designed to be modular and scalable. Here are some key decisions made during development:

- **Separation of Concerns**: The application is divided into distinct components for the frontend and backend, allowing for easier maintenance and scalability.
- **Use of Next.js**: Leveraging Next.js for server-side rendering improves performance and SEO.
- **PostgreSQL for Data Storage**: Chosen for its robustness and scalability, allowing for easy management of user data and appointments.
- **Responsive Design**: Tailwind CSS is used to ensure the application is mobile-friendly, providing a seamless experience across devices.

### Trade-offs
- **Complexity vs. Usability**: While implementing advanced features like email notifications adds complexity, it significantly enhances user experience.
- **Performance vs. Features**: Balancing performance with feature richness was crucial; hence, opted for server-side rendering to improve load times while maintaining a rich feature set.


## License 📄
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out Healthcare App! 😊
