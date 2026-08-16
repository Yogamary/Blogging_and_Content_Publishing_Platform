# Problem Statement

## 1. Title

**Blogging & Content Publishing Platform**

## 2. Domain

**Web Application / Content Management and Publishing**

## 3. Who is the user?

### 1. User / Blogger

A registered user who can create, edit, delete, and publish their own blog posts. The user can also read other published blogs, comment on them, and like blog posts.

### 2. Administrator

The administrator manages users, blog posts, categories, and comments, and monitors the overall platform to maintain appropriate content.

## 4. What problem are we solving? 

People often want to share their knowledge, ideas, experiences, and opinions through blog posts, but managing and publishing content in an organized way can be difficult without a centralized platform. Users need a simple system where they can create and manage their own blog posts, while other users need an easy way to discover and read published content. Administrators also need a way to manage users and inappropriate content. For example, a student who wants to share a blog about Java programming should be able to create and publish the blog easily so that other students can read, comment, and like it.

## 5. Proposed Solution 

The application will provide a simple centralized platform for creating, publishing, reading, and managing blog content.

The main features will include:

* User registration and login.
* User profile management.
* Role-based access for users and administrators.
* Creating blog posts.
* Editing own blog posts.
* Deleting own blog posts.
* Publishing blog posts.
* Viewing published blogs.
* Organizing blogs into categories.
* Adding comments to blog posts.
* Viewing comments.
* Liking blog posts.
* Admin management of users, blogs, comments, and categories.

## 6. Core Entities / Database Tables 

The main database tables will be:

1. **USERS**
2. **BLOGS**
3. **CATEGORIES**
4. **COMMENTS**
5. **BLOG_LIKES**

The tables will be connected using primary keys and foreign keys to maintain relationships between users, blogs, categories, comments, and likes.

### Main Relationships

* A user can create multiple blogs.
* A blog belongs to a category.
* A user can add comments to blogs.
* A user can like multiple blogs.
* A blog can have multiple comments and likes.

## 7. User Roles & Permissions

### User / Blogger

**Permissions:**

* Register and log in.
* Manage personal profile.
* Create blog posts.
* Edit own blog posts.
* Delete own blog posts.
* Publish blog posts.
* View published blogs.
* Add comments.
* View comments.
* Like blog posts.

### Administrator

**Permissions:**

* Log in.
* Manage user accounts.
* View all blog posts.
* Delete inappropriate blog posts.
* Manage comments.
* Manage blog categories.
* Monitor the platform.

The `role` field in the **USERS** table will be used to identify whether an account is a normal user or an administrator.

## 8. Success Criteria

The project will be considered successful if:

* A new user can register and log in successfully.
* A user can create a blog post.
* A user can edit and delete their own blog posts.
* A user can publish a blog post successfully.
* Users can view published blogs.
* Users can view blogs by category.
* Users can add and view comments.
* Users can like blog posts.
* An administrator can manage users, blogs, comments, and categories.
* All user, blog, category, comment, and like information is stored and retrieved correctly from the database.
* Users can access only the features permitted by their assigned role.

## 9. Out of Scope 

The following features will not be included in the initial version:

* Online payment systems.
* Paid or premium blog subscriptions.
* AI-generated blog content.
* Advanced plagiarism detection.
* Real-time chat.
* Advanced recommendation systems.
* Mobile application.
* Complex advertising systems.
* Advanced analytics.
* Email and SMS notification systems.

These features may be considered as future enhancements after completing the basic system.

## 10. Chosen Track: Java (Spring Boot)

**Chosen Track: Java – Spring Boot**

### Technology Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Java 17 with Spring Boot
* **ORM / Data Access:** Spring Data JPA with Hibernate
* **Database:** MySQL 8
* **Database Management:** MySQL Workbench
* **Build Tool:** Maven
* **Development Environment:** VS Code
* **Version Control:** Git and GitHub
* **API Testing:** Postman

## Project Scope Summary

The **Blogging & Content Publishing Platform** will provide a simple and user-friendly web application for users to create, publish, read, and interact with blog content. Users will be able to manage their own blog posts, add comments, and like published blogs, while administrators will manage users, categories, blogs, and comments. The system will use **Java Spring Boot, HTML, CSS, JavaScript, and MySQL** to provide a structured and database-driven application. The project is designed to be achievable within the initial capstone implementation period while providing opportunities for future enhancements.
