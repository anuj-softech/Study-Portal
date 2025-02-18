# 📚 Study Portal  

A **minimalistic and efficient** web-based study resource portal designed for **college and school students**. It follows a **folder-based approach** for easy navigation and access to study materials. Built with **PHP** and **JavaScript (ES6)**, this portal is a simple, static solution for organizing and accessing educational resources.  

**Demo hosting for MANIT (NIT Bhopal) First year resources**

[![Demo](https://img.shields.io/badge/Demo-MANIT%20Study%20Portal-Blue)](https://firstyear-study.great-site.net)  

---

## ✨ Features  
✅ **Folder-Based Navigation** – Easily browse study materials in an organized structure.  
✅ **Lightweight & Fast** – Built with minimal dependencies for smooth performance.  
✅ **Fully Responsive** – Works seamlessly on **desktops and mobile devices**.  
✅ **Simple Setup** – No database required for basic functionality, just upload and use.  

---

## 🚀 Get Started  

### 🌐 Host with InfinityFree  
You can **deploy** the Study Resource Portal for **free** on InfinityFree. Click the button below:  

[![Deploy to InfinityFree](https://img.shields.io/badge/Host%20on-InfinityFree-blue?style=for-the-badge&logo=internetexplorer)](https://infinityfree.net/)  

### 🏠 Host Locally  

#### 📥 Prerequisites  
- PHP Installed (`>=7.0`)  
- A Web Server (Apache, Nginx, or built-in PHP server)  

#### 🛠 Installation  

1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/yourusername/study-resource-portal.git
cd study-resource-portal
```

2️⃣ Create a notes folder in the root directory and add subject subfolders.
```sh
mkdir notes
cd notes
mkdir Math Science History
```
Add notes and material in subfolders of subjects in pdf or jpg format
```sh
/study-resource-portal
│── index.html
│── style.css          # Stylesheet
|── script.js
│── fetch_files.php    # Handles file listing
│── dbcount.php        # Stats file (if needed) #Requires SQL Database Setup
│── notes/             # Study materials
│   ├── Math/
|        ├── Lesson1.pdf
|        ├── Lesson2.pdf
│   ├── Science/....
│   ├── History/....
```

3️⃣ Start the PHP server
```sh
php -S localhost:8000
```

4️⃣ Access the portal
Visit http://localhost:8000 in your browser.



