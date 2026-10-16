# PersonaDB - User Management System

A simple user management web application built using **Node.js, Express.js, EJS, and MySQL**. The application allows users to be created, viewed, updated, and deleted through a web interface.

## Features

- View all users stored in the MySQL database.
- Display the total number of users.
- Add new users with unique usernames and email addresses.
- Update usernames after password verification.
- Delete users after verifying their username and password.
- Render dynamic pages using EJS templates.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Templating Engine:** EJS
- **Libraries:** mysql2, method-override, uuid, @faker-js/faker

## Project Structure

```text
sqlclass/
├── views/
│   ├── create.ejs
│   ├── delete.ejs
│   ├── edit.ejs
│   ├── home.ejs
│   └── user.ejs
├── index.js
├── schema.sql
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL Server

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd sqlclass
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the MySQL database and tables using `schema.sql`.

4. Configure your MySQL connection details in `index.js` to match your local database.

5. Start the application:

   ```bash
   node index.js
   ```

   Alternatively, run it using Nodemon:

   ```bash
   nodemon index.js
   ```

6. Open `http://localhost:8080` in your browser.

## Contributor

**Likith G**

## License

This project is intended for learning and educational purposes.