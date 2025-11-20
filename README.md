
# Topic Retrieval API

This project implements a lightweight Node.js and Express-based API that retrieves topic data stored inside a JSON file. It supports searching topics by name, validates incoming queries, handles file-related errors, and optionally sorts results alphabetically. The purpose of this API is to replicate behaviour similar to TOTLE's `/api/catalogue/` endpoint for a coding assessment.

---

## 📌 Project Overview

The API exposes a single endpoint:

```
GET /api/topics?search=<query>&sort=name (optional)
```

- You provide a search string, and the server returns all matching topics from a local JSON file.
- Search is case-insensitive, and results can be sorted in ascending order by name when `sort=name` is passed.

---

## 🗂️ Folder Structure

```
project-root/
├── data/
│   └── topics.json
├── src/
│   └── server.js
├── package.json
└── README.md
```

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- Nodemon (development only)
- JSON data source

---

## 📥 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Server

**Development mode (auto refresh):**

```bash
npm run dev
```

**Normal mode:**

```bash
npm start
```

The server will start by default on:

```
http://localhost:3000
```

---

## 🔍 API Endpoint Documentation

### ✅ GET /api/topics

#### Query Parameters

| Parameter | Required | Description                                                  |
|-----------|----------|--------------------------------------------------------------|
| `search`  | Yes      | Text to match against topic names (case-insensitive).        |
| `sort`    | No       | Use `name` to sort results alphabetically.                   |

#### 🔹 Example Request

```
GET /api/topics?search=react
```

#### 🔹 Example Response

```json
[
  {
    "id": 3,
    "name": "React Basics",
    "category": "Frontend"
  }
]
```

---

## ❗ Error Handling

| Status Code | When it Occurs                          | Response Example                                    |
|-------------|-----------------------------------------|-----------------------------------------------------|
| 400         | Missing or invalid search query         | `{ "error": "Missing 'search' query parameter" }`   |
| 500         | File read issues or unexpected errors   | `{ "error": "Internal server error" }`              |

---

## 📄 Data File

Your `topics.json` contains a list of topics in this format:

```json
[
  { "id": 1, "name": "Graph Theory", "category": "Algorithms" },
  { "id": 2, "name": "Dynamic Programming", "category": "Algorithms" }
]
```

You can modify or add more topics as needed.

---

## 🧪 Testing the Endpoint

### Using browser or Postman:

```
http://localhost:3000/api/topics?search=css
```

### Using cURL:

```bash
curl "http://localhost:3000/api/topics?search=css&sort=name"
```




