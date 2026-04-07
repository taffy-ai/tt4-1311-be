# Task API (Node.js, Express, Mongoose)

## Description

This project is a REST API built with **Node.js**, **Express**, and **Mongoose** to manage tasks

The API allows:

* Creating a task
* Retrieving tasks for the authenticated user

---

## Technologies Used

* Node.js
* Express
* MongoDB Atlas
* Mongoose

---



## Installation

```bash
npm install
```

---

## Run the Server

```bash
npm start
```

---

## Environment Variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

## API Endpoints

### Create Task

```
POST /api/tasks
```

**Body:**

```json
{
  "title": "My task",
  "description": "Optional",
  "priority": "high"
}
```

**Responses:**

* 201 → Task created
* 400 → Missing title / invalid data
* 401 → Unauthorized
* 500 → Server error

---

### Get Tasks

```
GET /api/tasks
```
