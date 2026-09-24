# Web Technology Lab - Assignment 5

## Student Records Management System

This project is developed as part of the **Web Technology Lab Assignment 5**.

The project demonstrates the use of:

- Node.js
- PHP
- MySQL
- AJAX
- HTML
- CSS
- JavaScript

The assignment contains multiple tasks covering server creation, database operations, AJAX-based communication, live search, statistics, editing, deletion and sorting.

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML | Structure of the web page |
| CSS | Styling and responsive design |
| JavaScript | Client-side logic and AJAX |
| PHP | Server-side processing |
| MySQL | Database management |
| AJAX / Fetch API | Communication without page reload |
| Node.js | Basic HTTP server for Q1 |

---

# Project Structure

```text
Assignment05_main/
│
├── db.php
├── fetch_records.php
├── insert_record.php
├── search_records.php
├── statistics.php
├── update_record.php
├── delete_record.php
├── sort_records.php
│
├── student_records.html
├── student_records.js
├── student_records.css
│
└── student_records.sql
```

### File Description

| File | Purpose |
|------|---------|
| `db.php` | Connects PHP with MySQL |
| `fetch_records.php` | Fetches all student records |
| `insert_record.php` | Inserts a new student |
| `search_records.php` | Searches student records |
| `statistics.php` | Calculates CGPA statistics |
| `update_record.php` | Updates an existing student |
| `delete_record.php` | Deletes a student |
| `sort_records.php` | Sorts records |
| `student_records.html` | Main user interface |
| `student_records.js` | AJAX and client-side functionality |
| `student_records.css` | Page styling |
| `student_records.sql` | Database and table setup |

---

# Database Setup

The project uses MySQL.

## Database

Create the database:

```sql
CREATE DATABASE 5thSemWebTechLab;
```

Then select it:

```sql
USE 5thSemWebTechLab;
```

The Assignment 5 table is named according to the student's roll number:

```text
2024CSB037
```

Since the table name starts with numbers, backticks are used in SQL:

```sql
`2024CSB037`
```

## Table Structure

```sql
CREATE TABLE `2024CSB037` (
    rollno VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50),
    gender VARCHAR(10),
    department VARCHAR(20),
    CGPA DECIMAL(3,2)
);
```

Five sample records are inserted directly using MySQL.

The complete database setup and sample data are available in:

```text
student_records.sql
```

---

# Q1 - Basic Node.js Server

The first task is to create a basic Node.js HTTP server using only the built-in `http` module.

No Express or other framework is required.

The server responds with:

```text
Hello Node
```

The server listens on a specified port.

### Basic Flow

```text
Browser
   ↓
Node.js HTTP Server
   ↓
"Hello Node"
```

This part is implemented separately from the PHP-based student record system.

---

# Q2 - Database and Student Records

For Q2, a MySQL database and table are created.

The table contains five columns:

```text
rollno
name
gender
department
CGPA
```

Five sample records are inserted directly through MySQL.

The `rollno` column is used as the primary key.

---

# Q3 - Fetch Records Using AJAX

The student records are displayed in an HTML table without reloading the page.

### Files Used

```text
student_records.html
student_records.js
fetch_records.php
db.php
```

### Working

1. User clicks **Load All Records**.
2. JavaScript sends a request using `fetch()`.
3. `fetch_records.php` connects to the database through `db.php`.
4. PHP retrieves the records.
5. PHP converts the records into JSON.
6. JavaScript receives the JSON response.
7. JavaScript creates and displays the HTML table.

### Flow

```text
User
 ↓
Load All Records
 ↓
JavaScript fetch()
 ↓
fetch_records.php
 ↓
MySQL Database
 ↓
JSON Response
 ↓
JavaScript
 ↓
HTML Table
```

No page reload is required.

---

# Q4 - Insert Student Using AJAX

A form is provided to enter a new student record.

The form contains:

- Roll Number textbox
- Name textbox
- Gender radio buttons
- Department list box
- CGPA input
- Hidden form action element

The hidden element is used to identify whether the form is currently being used for:

```text
insert
```

or

```text
update
```

### Working

1. User fills in the form.
2. JavaScript prevents the normal form submission.
3. `FormData` collects the form values.
4. JavaScript sends the data using AJAX.
5. `insert_record.php` inserts the record into MySQL.
6. PHP sends a result back.
7. JavaScript displays a success or failure message.
8. The table is refreshed without reloading the page.

### Flow

```text
HTML Form
 ↓
JavaScript
 ↓
FormData
 ↓
AJAX POST
 ↓
insert_record.php
 ↓
MySQL
 ↓
Response
 ↓
Message + Updated Table
```

Duplicate roll numbers are also handled.

---

# Q5 - Live Search

A search box is provided above the student table.

The search works while the user is typing.

There is no search button.

### Working

1. User enters text in the search box.
2. JavaScript detects the `input` event.
3. The search value is sent to `search_records.php`.
4. PHP searches the database.
5. Matching records are returned as JSON.
6. JavaScript updates the table.

The search can match:

- Roll number
- Name
- Gender
- Department

### Flow

```text
User types
 ↓
input event
 ↓
JavaScript fetch()
 ↓
search_records.php
 ↓
MySQL
 ↓
JSON
 ↓
Updated Table
```

The page does not reload.

---

# Q6 - CGPA Statistics

The CGPA column is used for calculating statistics.

The PHP file `statistics.php` contains a function that processes the records using an array.

The following values are calculated:

- Total CGPA
- Average CGPA
- Category for each student

### CGPA Categories

| CGPA | Category |
|------|----------|
| 8.5 or above | A |
| 7.0 - 8.49 | B |
| 5.0 - 6.99 | C |
| Below 5.0 | F |

The statistics are requested using AJAX and displayed without reloading the page.

---

# Q7 - Edit and Delete Records

This is the bonus part of the assignment.

Each student record contains:

```text
Edit
Delete
```

buttons.

## Edit

When the user clicks **Edit**:

1. The selected student's data is fetched.
2. The form is filled with the existing data.
3. The form changes from Insert mode to Update mode.
4. The Roll No becomes read-only.
5. User modifies the required fields.
6. JavaScript sends the updated data using AJAX.
7. `update_record.php` updates the database.
8. The table is refreshed.

The Roll No is kept unchanged because it is the primary key.

## Delete

When the user clicks **Delete**:

1. A confirmation message is displayed.
2. If confirmed, JavaScript sends the Roll No using AJAX.
3. `delete_record.php` deletes the record.
4. The table is refreshed.

No page reload is required for either operation.

---

# Q8 - Sorting Records

The table headers are clickable for sorting.

The sortable columns are:

- Roll No
- Name
- Gender
- Department
- CGPA

The **Actions** column is not sortable.

### Sorting Behavior

Clicking a column for the first time:

```text
Ascending ↑
```

Clicking the same column again:

```text
Descending ↓
```

Clicking it again:

```text
Ascending ↑
```

This cycle continues.

When a different column is selected, sorting starts again from ascending order.

### Example

```text
CGPA ↑
   ↓
CGPA ↓
   ↓
CGPA ↑
```

The sorting request is sent to:

```text
sort_records.php
```

using URL parameters:

```text
column
direction
```

Example:

```text
sort_records.php?column=CGPA&direction=ASC
```

The page does not reload.

---

# AJAX Communication

The project uses JavaScript's `fetch()` API for AJAX communication.

## GET Requests

GET is used when retrieving data.

Examples:

```text
fetch_records.php
search_records.php
sort_records.php
statistics.php
```

Parameters for search and sorting are passed through the URL.

Example:

```text
sort_records.php?column=CGPA&direction=ASC
```

## POST Requests

POST is used when sending data for database operations.

Examples:

```text
insert_record.php
update_record.php
delete_record.php
```

Form data is sent using `FormData`.

---

# Running the Project

## Requirements

Install/configure:

- XAMPP for Apache and PHP
- MySQL Server
- Node.js

MySQL can be used as a standalone installation.

---

## Step 1 - Start Apache

Open XAMPP Control Panel.

Start:

```text
Apache
```

MySQL does not need to be started from XAMPP if standalone MySQL Server is being used.

---

## Step 2 - Place the Project

Copy the project folder into the XAMPP `htdocs` directory:

```text
C:\xampp\htdocs\Btech_5thSem_WebTech_LabAssignments\Assignment05_main
```

---

## Step 3 - Configure Database Connection

Open:

```text
db.php
```

The database connection contains:

```php
$host = "localhost";
$username = "root";
$password = "";
$database = "5thSemWebTechLab";
```

Change the username/password if your MySQL installation uses different credentials.

---

## Step 4 - Create Database and Table

Open MySQL or phpMyAdmin and execute:

```text
student_records.sql
```

This creates the required table and inserts sample records.

---

## Step 5 - Run the PHP Project

Open the following URL in a browser:

```text
http://localhost/Btech_5thSem_WebTech_LabAssignments/Assignment05_main/student_records.html
```

The Student Records page will open.

---

# Running Q1 Node.js Server

Q1 is a separate Node.js program.

Open the folder containing the Node.js server.

Run:

```bash
node server.js
```

The server starts on the configured port.

Open the corresponding localhost URL in a browser.

The response should be:

```text
Hello Node
```

---

# Complete Project Workflow

The overall workflow of Q2-Q8 is:

```text
                    Browser
                       |
                       v
              student_records.html
                       |
                       v
               student_records.js
                       |
              JavaScript fetch()
                       |
          +------------+------------+
          |            |            |
          v            v            v
       Fetch         Insert       Search
       Records       Record       Records
          |            |            |
          v            v            v
       PHP Files     PHP File     PHP File
          |            |            |
          +------------+------------+
                       |
                       v
                  MySQL Database
                       |
                       v
                    Response
                       |
                       v
                 JavaScript
                       |
                       v
                 Update UI
```

---

# Features Implemented

- Basic Node.js HTTP server
- MySQL database integration
- Student record management
- AJAX-based data retrieval
- AJAX-based insertion
- Live search
- CGPA total and average
- CGPA categorization
- AJAX-based editing
- AJAX-based deletion
- Column sorting
- Ascending/descending sorting
- Responsive user interface
- No page reload for database operations

---

# Conclusion

This project demonstrates how HTML, CSS, JavaScript, PHP, MySQL, AJAX and Node.js can be combined to create a dynamic web application.

The Student Records system performs database operations asynchronously using the Fetch API, allowing the user interface to update without reloading the page.
