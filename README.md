# 🚀 Task Management App - Backend

A **Node.js + Express** backend for the Task Management App, connected to **MongoDB** for storing tasks and users. It includes **user management**, **task CRUD operations**, and **drag-and-drop task updates**.

---

## 🌍 Live API  
[🔗 Live API Link](https://task-management-wheat-three.vercel.app/) 

---

## 📌 Features  
✅ **User Registration** (Prevents duplicate emails)  
✅ **Task Management** (Create, Read, Update, Delete)  
✅ **Categorized Task Storage** (To-Do, In-Progress, Done)  
✅ **Drag & Drop Task Updates**  
✅ **MongoDB Database Integration**  
✅ **Environment Variable Support (`dotenv`)**  
✅ **CORS Enabled for Frontend Communication**  

---

## 🛠️ Technologies Used  
- **Backend Framework:** Express.js  
- **Database:** MongoDB  
- **Environment Variables:** dotenv  
- **CORS Handling:** cors  

---

## 📦 Dependencies  

| Package    | Version  |
|------------|---------|
| `cors`     | ^2.8.5  |
| `dotenv`   | ^16.4.7 |
| `express`  | ^4.21.2 |
| `mongodb`  | ^6.13.1 |

---

## ⚙️ Installation & Setup  

1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Set Up Environment Variables**  
Create a `.env` file in the root and add your MongoDB credentials:  
```env
PORT=3000
DB_USER=your_db_user
DB_PASS=your_db_password
```

4️⃣ **Run the Server**  
```sh
npm start
```
or (for development with auto-restart)  
```sh
npm install -g nodemon
nodemon index.js
```

---

## 📂 API Endpoints  

### 🔹 **User Management**  
#### **POST /users** - Add a new user  

### 🔹 **Task Management**  
#### **POST /tasks** - Create a new task  

#### **GET /tasks/:email** - Get all tasks for a user  

#### **PATCH /tasks/:id** - Update a task  

#### **DELETE /tasks/:id** - Delete a task  



