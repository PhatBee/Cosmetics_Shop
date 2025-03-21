# Cosmetics Shop 💄

Cosmetics Shop is a modern e-commerce platform built with cutting-edge technologies like Java 21, Spring Boot 3, and Thymeleaf for Java template engine. It leverages JPA for ORM, employs Spring Security 6.1 for robust authentication and authorization, integrates Google login for user convenience, and utilizes reCAPTCHA for enhanced security. The platform relies on MySQL for reliable data storage and Redis for efficient OTP management.Supporting flexible payments via PayPal and VNPay, the platform also utilizes AJAX for a smooth user experience with real-time interactions, and Cloudinary for fast, scalable cloud-based image storage and optimization.


## Installation and Setup 🚀

To set up the **Cosmetics Shop** locally, follow these steps:
### 🏆 Visiting online:
Go to http://20.2.154.12:8081/


### 🏆 Running from JAR File (GitHub Release)

#### 1️⃣ Download the Latest JAR File
Download the JAR file from GitHub Releases:
👉 [Download JAR](https://github.com/PhatBee/Cosmetics_Shop/releases/download/2024/CosmeticSellingWebsite-0.0.1-SNAPSHOT.jar)

---

#### 2️⃣ Prepare the Database

##### 🔹 **Create Database**
Open MySQL and create a new database using the following command:
```sql
CREATE DATABASE cosmeticsshop;
```

##### 🔹 **Import Sample Data**
https://github.com/PhatBee/Cosmetics_Shop/blob/master/dump-cosmeticsshop-202503021651.sql

#### 3️⃣ Run the JAR File with Database Configuration

##### 🔹 **On Linux/MacOS**
```bash
export DB_URL="jdbc:mysql://localhost:3306/cosmeticsshop"
export DB_USER="root"
export DB_PASS="88648468"
java -jar CosmeticSellingWebsite-0.0.1-SNAPSHOT.jar
```

##### 🔹 **On Windows (CMD)**
```cmd
set DB_URL=jdbc:mysql://localhost:3306/cosmeticsshop
set DB_USER=root
set DB_PASS=88648468
java -jar CosmeticSellingWebsite-0.0.1-SNAPSHOT.jar
```

---

#### 4️⃣ Verify the Application
After running the application, open your browser and visit:
- **Home Page:** [http://localhost:8081](http://localhost:8081)

---
### 🚀 Running the Project with Docker (not recommended)

#### 1️⃣ Install Docker and Docker Compose
Make sure you have **Docker** and **Docker Compose** installed.
- [Download Docker](https://www.docker.com/get-started)

Verify installation:
```sh
docker -v
```
```sh
docker-compose -v
```

---

#### 2️⃣ Prepare the `docker-compose.yml` File
Create a `docker-compose.yml` file in any directory

```yaml
version: '3.8'

services:
  app:
    image: tuoitho/cosmetics-shop-bmw:latest
    ports:
      - "8081:8081"
    environment:
      - DB_URL=jdbc:mysql://db:3306/cosmeticsshop
      - DB_USER=root
      - DB_PASS=123456
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: cosmeticsshop
    ports:
      - "3399:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5
```

---

#### 3️⃣ Run the Project
Navigate to the directory containing `docker-compose.yml` and execute:
```sh
docker-compose up -d
```

This will:
- Pull the latest MySQL and application images
- Start both containers in detached mode (`-d` means detached)

To check running containers:
```sh
docker ps
```

---

#### 4️⃣ Verify the Application
After running the containers, open your browser and visit:
- **Home Page:** [http://localhost:8081](http://localhost:8081)

If you want to check the database:
```sh
docker exec -it <mysql_container_id> mysql -u root -p123456
```
Replace `<mysql_container_id>` with the actual container ID of MySQL (`docker ps` to get it).

---

#### 5️⃣ Stop and Remove Containers
To stop the project:
```sh
docker-compose down
```
To remove all containers and volumes (reset data):
```sh
docker-compose down -v
```

---

✅ Now your project is running successfully with Docker! 🚀


#### 🎯 Contact & Contribution
If you encounter any issues or want to contribute, feel free to open an **Issue** or submit a **Pull Request** at:
🔗 [GitHub Issues](https://github.com/PhatBee/Cosmetics_Shop/issues)

🚀 **Happy coding!** 🎉


