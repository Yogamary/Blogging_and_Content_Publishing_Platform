/* =========================================
   EXPLORE PAGE
========================================= */


/* SEARCH BLOGS */

// ================= SEARCH BLOGS =================

function searchBlogs() {

    const searchInput = document.getElementById("blogSearch");
    const blogGrid = document.getElementById("blogGrid");
    const noResults = document.getElementById("noResults");

    if (!searchInput || !blogGrid) return;

    const searchText = searchInput.value.toLowerCase().trim();

    // IMPORTANT: your cards are .explore-card
    const cards = blogGrid.querySelectorAll(".explore-card");

    let found = 0;

    cards.forEach(function(card) {

        const text = card.textContent.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }

    });

    if (noResults) {
        noResults.style.display = found === 0 ? "block" : "none";
    }
}
/* SEARCH WHEN PRESSING ENTER */
document.addEventListener(
    "DOMContentLoaded",
    function() {

        const searchInput =
            document.getElementById("blogSearch");

        if (searchInput) {

            searchInput.addEventListener(
                "keypress",
                function(event) {

                    if (event.key === "Enter") {

                        searchBlogs();

                    }

                }
            );

        }

    }
);


/* =========================================
   FILTER BLOGS
========================================= */

function filterBlogs(category, button) {

    const cards =
        document.querySelectorAll(".explore-card");

    const buttons =
        document.querySelectorAll(".filter-btn");

    const noResults =
        document.getElementById("noResults");

    let found = false;


    /* Remove active */

    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    /* Add active */

    if (button) {

        button.classList.add("active");

    }


    /* Filter cards */

    cards.forEach(function(card) {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (noResults) {

        if (found) {

            noResults.style.display = "none";

        } else {

            noResults.style.display = "block";

        }

    }

}


/* =========================================
   LOGIN
========================================= */


async function loginUser() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();


    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;
    }

    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


        /* Read the response as text */

        const data =
            await response.text();

        /* Login failed */

        if (!response.ok) {

            alert(
                data ||
                "Invalid email or password."
            );

            return;
        }


        /* Convert successful JSON response */

        const user =
            JSON.parse(data);


        console.log(
            "Login successful:",
            user
        );


        /* Store logged-in user */

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        alert("Login successful! 🎉");


        /* Go to home page */

        window.location.href =
            "index.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        alert(
            "Unable to connect to the server. Make sure Spring Boot is running."
        );
    }

}




/* =========================================
   REGISTER USER
========================================= */


async function registerUser() {

    const name =
        document.getElementById("fullname").value.trim();

    const email =
        document.getElementById("register-email").value.trim();

    const password =
        document.getElementById("register-password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;


    /* Check name */

    if (name === "") {

        alert("Please enter your full name.");

        return;
    }


    /* Check email */

    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    /* Check password */

    if (password === "") {

        alert("Please create a password.");

        return;
    }


    /* Check password confirmation */

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    /* Send data to Spring Boot */

    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        role: "USER"
                    })
                }
            );


        /* Read backend response as text */

        const data =
            await response.text();


        /* Registration successful */

        if (response.ok) {

            alert(
                "Account created successfully! 🎉"
            );

            window.location.href =
                "login.html";

            return;
        }


        /* Registration failed */

        alert(
            data ||
            "Registration failed. Please try again."
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        alert(
            "Cannot connect to the BlogSphere server. Make sure Spring Boot is running."
        );
    }

}




/* =========================================
   BLOG POST
========================================= */


/* LIKE POST */

function likePost(button) {

    const count =
        button.querySelector("span");

    if (!count) {
        return;
    }

    let likes =
        parseInt(count.textContent);


    if (button.classList.contains("liked")) {

        likes--;

        button.classList.remove("liked");

        button.innerHTML =
            "♡ <span>" + likes + "</span>";

    } else {

        likes++;

        button.classList.add("liked");

        button.innerHTML =
            "♥ <span>" + likes + "</span>";

    }

}


/* SHARE POST */

function sharePost() {

    const url =
        window.location.href;

    if (navigator.share) {

        navigator.share({
            title: document.title,
            url: url
        });

    } else {

        navigator.clipboard.writeText(url);

        alert("Blog link copied!");

    }

}


/* =========================================
   CREATE POST
========================================= */


/* COVER IMAGE PREVIEW */

function previewCoverImage(event) {

    const file =
        event.target.files[0];

    const preview =
        document.getElementById("coverPreview");


    if (!file || !preview) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            preview.src =
                e.target.result;

            preview.style.display =
                "block";

        };


    reader.readAsDataURL(file);

}


/* =========================================
   WORD COUNT
========================================= */

const contentEditor =
    document.getElementById("postContent");

if (contentEditor) {

    contentEditor.addEventListener(
        "input",
        updateWordCount
    );

}


function updateWordCount() {

    const content =
        document.getElementById("postContent");


    if (!content) {
        return;
    }


    const text =
        content.innerText.trim();


    if (text === "") {

        updateCountDisplay(0);

        return;

    }


    const words =
        text
            .split(/\s+/)
            .filter(Boolean)
            .length;


    updateCountDisplay(words);

}


function updateCountDisplay(words) {

    const wordCount =
        document.getElementById("wordCount");

    const sidebarWordCount =
        document.getElementById("sidebarWordCount");

    const readingTime =
        document.getElementById("readingTime");


    if (wordCount) {

        wordCount.textContent =
            words +
            (words === 1 ? " word" : " words");

    }


    if (sidebarWordCount) {

        sidebarWordCount.textContent =
            words;

    }


    if (readingTime) {

        const minutes =
            Math.max(
                1,
                Math.ceil(words / 200)
            );

        readingTime.textContent =
            minutes + " min read";

    }

}


/* =========================================
   TEXT FORMATTING
========================================= */

function formatText(command) {

    document.execCommand(
        command,
        false,
        null
    );

}


/* =========================================
   SAVE DRAFT
========================================= */

function saveDraft() {

    const title =
        document.getElementById("postTitle").value.trim();

    const content =
        document.getElementById("postContent").innerText.trim();


    if (title === "" && content === "") {

        alert(
            "Write something before saving your draft."
        );

        return;

    }


    const saveStatus =
        document.getElementById("saveStatus");

    const draftStatus =
        document.getElementById("draftStatus");


    if (saveStatus) {

        saveStatus.textContent =
            "● Draft Saved";

        saveStatus.style.color =
            "#5d68e8";

    }


    if (draftStatus) {

        draftStatus.textContent =
            "Saved";

    }


    alert(
        "Your blog has been saved as a draft."
    );

}


/* =========================================
   PUBLISH POST
========================================= */

async function publishPost() {

    const title =
        document.getElementById("postTitle").value.trim();

    const category =
        document.getElementById("postCategory").value;

    const content =
        document.getElementById("postContent").innerText.trim();

    // Get selected image
    const imageInput =
        document.getElementById("coverImage");

    const imageFile =
        imageInput ? imageInput.files[0] : null;


    // Validate title
    if (title === "") {
        alert("Please enter a blog title.");
        return;
    }

    // Validate category
    if (category === "") {
        alert("Please select a category.");
        return;
    }

    // Validate content
    if (content === "") {
        alert("Please write some content.");
        return;
    }


    // Get logged-in user
    const storedUser =
        localStorage.getItem("loggedInUser");

    if (!storedUser) {

        alert(
            "Please login before publishing a blog."
        );

        window.location.href =
            "login.html";

        return;
    }


    const user =
        JSON.parse(storedUser);


    try {

        // =====================================
        // STEP 1: Upload image
        // =====================================

        let imageUrl = "";

        if (imageFile) {

            const formData =
                new FormData();

            formData.append(
                "file",
                imageFile
            );


            const uploadResponse =
                await fetch(
                    "https://blogsphere-backend-9raa.onrender.com/api/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!uploadResponse.ok) {

                throw new Error(
                    "Image upload failed"
                );

            }


            imageUrl =
                await uploadResponse.text();


            console.log(
                "Image uploaded:",
                imageUrl
            );
        }


        // =====================================
        // STEP 2: Create blog object
        // =====================================

        const blog = {

            title: title,

            content: content,

            imageUrl: imageUrl,

            category: category,

            author: user.name

        };


        // =====================================
        // STEP 3: Save blog in database
        // =====================================

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(blog)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to publish blog"
            );

        }


        const savedBlog =
            await response.json();


        console.log(
            "Blog published:",
            savedBlog
        );


        alert(
            "Blog published successfully! 🎉"
        );


        // =====================================
        // STEP 4: Clear form
        // =====================================

        document.getElementById(
            "postTitle"
        ).value = "";


        document.getElementById(
            "postCategory"
        ).value = "";


        document.getElementById(
            "postContent"
        ).innerText = "";


        const postTags =
            document.getElementById(
                "postTags"
            );

        if (postTags) {

            postTags.value = "";

        }


        // Clear image input
        if (imageInput) {

            imageInput.value = "";

        }


        // Clear image preview
        const coverPreview =
            document.getElementById(
                "coverPreview"
            );

        if (coverPreview) {

            coverPreview.src = "";

            coverPreview.style.display =
                "none";

        }


        // Update status
        const saveStatus =
            document.getElementById(
                "saveStatus"
            );

        const draftStatus =
            document.getElementById(
                "draftStatus"
            );


        if (saveStatus) {

            saveStatus.textContent =
                "● Published";

        }


        if (draftStatus) {

            draftStatus.textContent =
                "Published";

        }


        // Go to explore page
        window.location.href =
            "explore.html";


    } catch (error) {

        console.error(
            "Publish error:",
            error
        );


        alert(
            "Unable to upload image or publish blog. Make sure Spring Boot is running."
        );

    }

}


/* =========================================
   DASHBOARD
========================================= */


/* FILTER POSTS */

function showDashboardPosts(type, button) {

    const posts =
        document.querySelectorAll(".dashboard-post");

    const tabs =
        document.querySelectorAll(".dashboard-tab");


    tabs.forEach(function(tab) {

        tab.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    posts.forEach(function(post) {

        const status =
            post.getAttribute("data-status");


        if (type === "all") {

            post.style.display =
                "grid";

        }

        else if (status === type) {

            post.style.display =
                "grid";

        }

        else {

            post.style.display =
                "none";

        }

    });

}


/* DELETE POST */

function deleteDashboardPost(button) {

    const post =
        button.closest(".dashboard-post");


    const confirmed =
        confirm(
            "Are you sure you want to delete this post?"
        );


    if (confirmed && post) {

        post.remove();

        alert(
            "Post deleted successfully."
        );

    }

}


/* EDIT PROFILE */

function editProfile() {

    alert(
        "Profile editing will be connected to the backend later."
    );

}


/* =========================================
   PROFILE PAGE
========================================= */


/* PROFILE TABS */

function showProfileTab(type, button) {

    const tabs =
        document.querySelectorAll(".profile-tab");

    const posts =
        document.getElementById("profilePosts");

    const about =
        document.getElementById("profileAbout");


    tabs.forEach(function(tab) {

        tab.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    if (!posts || !about) {
        return;
    }


    if (type === "posts") {

        posts.style.display =
            "grid";

        about.style.display =
            "none";

    }

    else {

        posts.style.display =
            "none";

        about.style.display =
            "block";

    }

}


/* OPEN PROFILE EDITOR */

function openProfileEditor() {

    const modal =
        document.getElementById("profileModal");


    if (modal) {

        modal.style.display =
            "flex";

    }

}


/* CLOSE PROFILE EDITOR */

function closeProfileEditor() {

    const modal =
        document.getElementById("profileModal");


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* SAVE PROFILE */

function saveProfile() {

    const name =
        document.getElementById("editName").value.trim();

    const username =
        document.getElementById("editUsername").value.trim();

    const bio =
        document.getElementById("editBio").value.trim();


    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }


    const profileName =
        document.querySelector(
            ".profile-details h1"
        );

    const profileUsername =
        document.querySelector(
            ".profile-username"
        );

    const profileBio =
        document.querySelector(
            ".profile-bio"
        );

    const profilePicture =
        document.querySelector(
            ".profile-picture"
        );


    if (profileName) {

        profileName.textContent =
            name;

    }


    if (profileUsername) {

        profileUsername.textContent =
            username;

    }


    if (profileBio) {

        profileBio.textContent =
            bio;

    }


    if (profilePicture) {

        profilePicture.textContent =
            name.charAt(0).toUpperCase();

    }


    closeProfileEditor();


    alert(
        "Profile updated successfully."
    );

}


/* LOGOUT */

function logoutUser() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmed) {

        localStorage.removeItem(
            "loggedInUser"
        );

        window.location.href =
            "login.html";

    }

}


/* =========================================
   CATEGORIES PAGE
========================================= */


/* SEARCH CATEGORIES */

function searchCategories() {

    const searchElement =
        document.getElementById("categorySearch");

    if (!searchElement) {
        return;
    }


    const input =
        searchElement.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".category-card");

    const noResult =
        document.getElementById("categoryNoResult");

    const count =
        document.getElementById("categoryCount");

    let visibleCount = 0;


    cards.forEach(function(card) {

        const category =
            card
                .getAttribute("data-category")
                .toLowerCase();

        const title =
            card
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (
            category.includes(input) ||
            title.includes(input)
        ) {

            card.style.display =
                "block";

            visibleCount++;

        }

        else {

            card.style.display =
                "none";

        }

    });


    if (noResult) {

        if (visibleCount === 0) {

            noResult.style.display =
                "block";

        }

        else {

            noResult.style.display =
                "none";

        }

    }


    if (count) {

        count.textContent =
            visibleCount + " Categories";

    }

}


/* TOPIC FILTER */

function filterCategory(category) {

    const input =
        document.getElementById("categorySearch");


    if (!input) {
        return;
    }


    input.value =
        category;


    searchCategories();


    const grid =
        document.getElementById("categoryGrid");


    if (grid) {

        grid.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   ACCOUNT SETTINGS
========================================= */

function showSettings(panelId, button) {

    const panels =
        document.querySelectorAll(".settings-panel");

    const tabs =
        document.querySelectorAll(".settings-tab");


    panels.forEach(function(panel) {

        panel.classList.remove("active");

    });


    tabs.forEach(function(tab) {

        tab.classList.remove("active");

    });


    const selectedPanel =
        document.getElementById(panelId);


    if (selectedPanel) {

        selectedPanel.classList.add("active");

    }


    if (button) {

        button.classList.add("active");

    }

}


/* SAVE SETTINGS */

function saveSettings() {

    alert(
        "Your settings have been saved successfully!"
    );

}


/* DELETE ACCOUNT */

function confirmDeleteAccount() {

    const confirmed =
        confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );


    if (confirmed) {

        alert(
            "Account deletion will be connected to the backend later."
        );

    }

}


/* =========================================
   FORGOT PASSWORD
========================================= */

const forgotForm =
    document.getElementById("forgotPasswordForm");


if (forgotForm) {

    forgotForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("forgotEmail")
                    .value
                    .trim();


            if (email === "") {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            alert(
                "Password reset link will be sent to your email."
            );

        }
    );

}


/* =========================================
   LOAD BLOGS FROM SPRING BOOT
========================================= */

async function loadBlogs() {

    const blogGrid =
        document.getElementById("blogGrid");

    const noResults =
        document.getElementById("noResults");


    if (!blogGrid) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load blogs"
            );

        }


        const blogs =
            await response.json();


        blogGrid.innerHTML =
            "";


        if (blogs.length === 0) {

            if (noResults) {

                noResults.style.display =
                    "block";

            }

            return;

        }


        if (noResults) {

            noResults.style.display =
                "none";

        }


        // Get logged-in user

        const storedUser =
            localStorage.getItem(
                "loggedInUser"
            );


        let loggedInUser =
            null;


        if (storedUser) {

            loggedInUser =
                JSON.parse(storedUser);

        }


        // Create blog cards

        blogs.forEach(function(blog) {

            const card =
                document.createElement("article");


            card.className =
                "explore-card";


            card.dataset.category =
                blog.category
                    ? blog.category.toLowerCase()
                    : "";


            // Check if this blog belongs to logged-in user

            const isMyBlog =
                loggedInUser &&
                blog.author === loggedInUser.name;


            let menuHTML =
                "";


            if (isMyBlog) {

                menuHTML = `

                    <div class="blog-menu">

                        <button
                            class="menu-btn"
                            onclick="event.stopPropagation(); toggleBlogMenu(this)">

                            ⋮

                        </button>

                        <div class="blog-menu-options">

                            <button
                                onclick="event.stopPropagation(); editBlog(${blog.id})">

                                Edit

                            </button>

                            <button
                                onclick="event.stopPropagation(); deleteBlog(${blog.id})">

                                Delete

                            </button>

                        </div>

                    </div>

                `;

            }


            card.innerHTML = `

                <div class="explore-card-image">

                    <img
                        src="${blog.imageUrl || 'https://via.placeholder.com/600x400'}"
                        alt="${blog.title}"
                    >

                    <span>
                        ${blog.category || "General"}
                    </span>

                    ${menuHTML}

                </div>


                <div class="explore-card-content">

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${blog.content}
                    </p>


                    <div class="explore-card-footer">

                        <div class="author">

                            <div class="author-avatar">

                                ${
                                    blog.author
                                        ? blog.author
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"
                                }

                            </div>


                            <div>

                                <strong>
                                    ${blog.author || "Unknown"}
                                </strong>

                                <small>
                                    BlogSphere
                                </small>

                            </div>

                        </div>


                        <span class="read-time">
                            ◷ Read
                        </span>

                    </div>

                </div>

            `;


            // Open blog when card is clicked

            card.addEventListener(
                "click",
                function() {

                    window.location.href =
                        "post.html?id=" + blog.id;

                }
            );


            blogGrid.appendChild(card);

        });


    } catch (error) {

        console.error(error);


        if (noResults) {

            noResults.style.display =
                "block";

        }

    }

}


// ================= SEARCH BLOGS =================

/* =========================================
   EDIT BLOG
========================================= */

function editBlog(blogId) {

    window.location.href =
        "edit-blog.html?id=" + blogId;

}


/* =========================================
   DELETE BLOG
========================================= */

async function deleteBlog(blogId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs/" +
                blogId,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete blog"
            );

        }


        alert(
            "Blog deleted successfully!"
        );


        // Reload blogs

        loadBlogs();


    } catch (error) {

        console.error(error);


        alert(
            "Failed to delete blog"
        );

    }

}


/* =========================================
   BLOG MENU
========================================= */

function toggleBlogMenu(button) {

    const menu =
        button.nextElementSibling;


    // Close other open menus

    document
        .querySelectorAll(".blog-menu-options")
        .forEach(function(otherMenu) {

            if (otherMenu !== menu) {

                otherMenu.style.display =
                    "none";

            }

        });


    // Toggle current menu

    if (menu.style.display === "block") {

        menu.style.display =
            "none";

    } else {

        menu.style.display =
            "block";

    }

}


/* =========================================
   LOAD SINGLE BLOG POST
========================================= */

async function loadBlogPost() {

    const articleContent =
        document.getElementById(
            "articleContent"
        );


    // Make sure we are on post page

    if (!articleContent) {
        return;
    }


    // Get blog ID from URL

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const blogId =
        urlParams.get("id");


    // No ID

    if (!blogId) {

        const titleElement =
            document.getElementById(
                "postTitle"
            );

        const introElement =
            document.getElementById(
                "postIntro"
            );


        if (titleElement) {

            titleElement.textContent =
                "Blog not found";

        }


        if (introElement) {

            introElement.textContent =
                "No blog ID was provided.";

        }


        articleContent.innerHTML =
            "<p>Please open a blog from the Explore page.</p>";


        return;

    }


    try {

        // Get blog from Spring Boot

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs/" +
                blogId
            );


        if (!response.ok) {

            throw new Error(
                "Blog not found"
            );

        }


        const blog =
            await response.json();


        console.log(
            "Blog loaded:",
            blog
        );


        /* =========================
           TITLE
        ========================= */

        const titleElement =
            document.getElementById(
                "postTitle"
            );


        if (titleElement) {

            titleElement.textContent =
                blog.title ||
                "Untitled Blog";

        }


        /* =========================
           CATEGORY
        ========================= */

        const categoryElement =
            document.getElementById(
                "postCategory"
            );


        if (categoryElement) {

            categoryElement.textContent =
                blog.category
                    ? blog.category.toUpperCase()
                    : "GENERAL";

        }


        /* =========================
           INTRO
        ========================= */

        const introElement =
            document.getElementById(
                "postIntro"
            );


        if (introElement) {

            const content =
                blog.content || "";


            introElement.textContent =
                content.length > 150
                    ? content.substring(0, 150) + "..."
                    : content;

        }


        /* =========================
           AUTHOR
        ========================= */

        const authorElement =
            document.getElementById(
                "postAuthor"
            );


        const authorAvatarElement =
            document.getElementById(
                "postAuthorAvatar"
            );


        const author =
            blog.author ||
            "Unknown Author";


        if (authorElement) {

            authorElement.textContent =
                author;

        }


        if (authorAvatarElement) {

            authorAvatarElement.textContent =
                author
                    .charAt(0)
                    .toUpperCase();

        }


        /* =========================
           META
        ========================= */

        const metaElement =
            document.getElementById(
                "postMeta"
            );


        if (metaElement) {

            metaElement.textContent =
                "Published on BlogSphere";

        }


        /* =========================
           IMAGE
        ========================= */

        const imageElement =
            document.getElementById(
                "postImage"
            );


        if (imageElement) {

            if (
                blog.imageUrl &&
                blog.imageUrl.trim() !== ""
            ) {

                imageElement.src =
                    blog.imageUrl;

                imageElement.style.display =
                    "block";

            } else {

                imageElement.style.display =
                    "none";

            }

        }


        /* =========================
           BLOG CONTENT
        ========================= */

        if (articleContent) {

            const content =
                blog.content ||
                "No content available.";


            articleContent.innerHTML = `
                <p>${content}</p>
            `;

        }


        /* =========================
           PAGE TITLE
        ========================= */

        document.title =
            "BlogSphere | " +
            (blog.title ||
            "Blog Post");


    } catch (error) {

        console.error(
            "Error loading blog:",
            error
        );


        const titleElement =
            document.getElementById(
                "postTitle"
            );


        const introElement =
            document.getElementById(
                "postIntro"
            );


        if (titleElement) {

            titleElement.textContent =
                "Unable to load blog";

        }


        if (introElement) {

            introElement.textContent =
                "Something went wrong while loading this blog.";

        }


        if (articleContent) {

            articleContent.innerHTML = `
                <p>
                    Unable to load this blog.
                    Please make sure Spring Boot is running
                    and the blog ID is correct.
                </p>
            `;

        }

    }

}


/* =========================================
   EDIT BLOG - LOAD
========================================= */

async function loadEditBlog() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const blogId =
        params.get("id");

    if (!blogId) {

        alert("Blog ID not found");

        window.location.href =
            "explore.html";

        return;
    }


    try {

        // Get blog from backend

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs/" +
                blogId
            );


        if (!response.ok) {

            throw new Error(
                "Blog not found"
            );

        }


        const blog =
            await response.json();


        // Get logged-in user

        const storedUser =
            localStorage.getItem(
                "loggedInUser"
            );


        if (!storedUser) {

            alert(
                "Please login first"
            );

            window.location.href =
                "login.html";

            return;

        }


        const user =
            JSON.parse(storedUser);


        // Check blog owner

        if (blog.author !== user.name) {

            alert(
                "You can only edit your own blogs"
            );

            window.location.href =
                "explore.html";

            return;

        }


        // =========================
        // LOAD EXISTING BLOG DATA
        // =========================

        document.getElementById(
            "postTitle"
        ).value =
            blog.title || "";


        document.getElementById(
            "postCategory"
        ).value =
            blog.category || "";


        document.getElementById(
            "postContent"
        ).value =
            blog.content || "";


        // =========================
        // SHOW EXISTING IMAGE
        // =========================

        const coverPreview =
            document.getElementById(
                "coverPreview"
            );


        if (
            coverPreview &&
            blog.imageUrl
        ) {

            coverPreview.src =
                blog.imageUrl;

            coverPreview.style.display =
                "block";

        }


    } catch (error) {

        console.error(
            "Error loading edit blog:",
            error
        );


        alert(
            "Unable to load blog"
        );


        window.location.href =
            "explore.html";

    }

}


/* =========================================
   UPDATE BLOG
========================================= */
async function updateBlog() {

    const params =
        new URLSearchParams(window.location.search);

    const blogId =
        params.get("id");

    if (!blogId) {
        alert("Blog ID not found");
        return;
    }

    const title =
        document.getElementById("postTitle").value.trim();

    const category =
        document.getElementById("postCategory").value;

    const content =
        document.getElementById("postContent").value.trim();

    const imageInput =
        document.getElementById("coverImage");

    const imageFile =
        imageInput ? imageInput.files[0] : null;


    // =========================
    // VALIDATION
    // =========================

    if (!title || !category || !content) {

        alert("Please fill in all required fields");
        return;

    }


    // =========================
    // CHECK LOGIN
    // =========================

    const storedUser =
        localStorage.getItem("loggedInUser");

    if (!storedUser) {

        alert("Please login first");

        window.location.href =
            "login.html";

        return;
    }

    const user =
        JSON.parse(storedUser);


    try {

        // =========================
        // GET CURRENT BLOG
        // =========================

        const currentResponse =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs/" + blogId
            );

        if (!currentResponse.ok) {

            throw new Error(
                "Could not load current blog"
            );
        }

        const currentBlog =
            await currentResponse.json();


        // Keep old image if no new image selected

        let imageUrl =
            currentBlog.imageUrl || "";


        // =========================
        // UPLOAD NEW IMAGE
        // =========================

        if (imageFile) {

            const formData =
                new FormData();

            formData.append(
                "file",
                imageFile
            );


            const uploadResponse =
                await fetch(
                    "https://blogsphere-backend-9raa.onrender.com/api/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!uploadResponse.ok) {

                throw new Error(
                    "Image upload failed"
                );
            }


            imageUrl =
                await uploadResponse.text();


            console.log(
                "New image URL:",
                imageUrl
            );
        }


        // =========================
        // UPDATE BLOG
        // =========================

        const updatedBlog = {

            title: title,

            content: content,

            imageUrl: imageUrl,

            category: category,

            author: user.name

        };


        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/blogs/" + blogId,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedBlog
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update blog"
            );
        }


        const updated =
            await response.json();


        console.log(
            "Updated blog:",
            updated
        );


        alert(
            "Blog updated successfully!"
        );


        window.location.href =
            "post.html?id=" + blogId;


    } catch (error) {

        console.error(
            "Update error:",
            error
        );


        alert(
            "Update failed because: " +
            error.message
        );
    }
}


/* =========================================
   COMMENTS
========================================= */


/* LOAD COMMENTS */

async function loadComments() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const blogId =
        params.get("id");

    if (!blogId) {
        return;
    }

    const commentsList =
        document.getElementById(
            "commentsList"
        );

    const commentCount =
        document.getElementById(
            "commentCount"
        );

    if (!commentsList) {
        return;
    }

    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/comments/blog/" +
                blogId
            );

        if (!response.ok) {

            throw new Error(
                "Failed to load comments"
            );

        }

        const comments =
            await response.json();

        commentsList.innerHTML =
            "";

        /* UPDATE COMMENT COUNT */

        if (commentCount) {

            commentCount.textContent =
                comments.length +
                (
                    comments.length === 1
                        ? " comment"
                        : " comments"
                );

        }

        /* NO COMMENTS */

        if (comments.length === 0) {

            commentsList.innerHTML = `

                <p class="no-comments">

                    No comments yet.
                    Be the first to comment!

                </p>

            `;

            return;
        }

        /* DISPLAY COMMENTS */

        comments.forEach(
            function(comment) {

                const commentDiv =
                    document.createElement(
                        "div"
                    );

                commentDiv.className =
                    "comment";

                commentDiv.innerHTML = `

                    <div class="comment-avatar">

                        ${
                            comment.author
                                ? comment.author
                                    .charAt(0)
                                    .toUpperCase()
                                : "U"
                        }

                    </div>


                    <div class="comment-body">

                        <div class="comment-header">

                            <strong>

                                ${
                                    comment.author ||
                                    "Unknown"
                                }

                            </strong>


                            <span>

                                Just now

                            </span>

                        </div>


                        <p>

                            ${
                                comment.content ||
                                ""
                            }

                        </p>


                        <button
                            class="comment-report-btn"
                            onclick="reportComment(${comment.id})"
                        >

                            🚩 Report

                        </button>

                    </div>

                `;

                commentsList.appendChild(
                    commentDiv
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading comments:",
            error
        );

        commentsList.innerHTML = `

            <p class="no-comments">

                Unable to load comments.

            </p>

        `;

    }

}

async function reportComment(commentId) {

    const reason = prompt(
        "Why are you reporting this comment?\n\n" +
        "Examples: Spam, Inappropriate Content, Harassment, Other"
    );

    if (!reason) {
        return;
    }

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    if (!loggedInUser) {

        alert(
            "Please login before reporting."
        );

        return;
    }

    const report = {

        reporter: loggedInUser.name,

        type: "COMMENT",

        contentId: Number(commentId),

        reason: reason

    };

    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/reports",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(report)
                }
            );

        if (!response.ok) {

            throw new Error(
                "Failed to report comment"
            );

        }

        alert(
            "Comment reported successfully."
        );

    } catch (error) {

        console.error(
            "Error reporting comment:",
            error
        );

        alert(
            "Failed to report comment."
        );

    }

}

/* ADD COMMENT */

async function addComment() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const blogId =
        params.get("id");


    const commentInput =
        document.getElementById(
            "commentInput"
        );


    if (
        !blogId ||
        !commentInput
    ) {

        return;

    }


    const content =
        commentInput.value.trim();


    /* CHECK EMPTY COMMENT */

    if (!content) {

        alert(
            "Please write a comment"
        );

        return;

    }


    /* CHECK LOGIN */

    const storedUser =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!storedUser) {

        alert(
            "Please login to comment"
        );


        window.location.href =
            "login.html";


        return;

    }


    const user =
        JSON.parse(storedUser);


    /* CREATE COMMENT */

    const comment = {

        content: content,

        author: user.name,

        blogId: Number(blogId)

    };


    try {

        const response =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/comments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            comment
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to add comment"
            );

        }


        /* CLEAR INPUT */

        commentInput.value =
            "";


        /* RELOAD COMMENTS */

        loadComments();


    } catch (error) {

        console.error(
            "Error adding comment:",
            error
        );


        alert(
            "Failed to post comment"
        );

    }

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Explore page */

        loadBlogs();


        /* Post page */

        if (
            document.body.classList.contains(
                "post-page"
            )
        ) {

            loadBlogPost();

            loadComments();

            loadLikes();

            loadBookmark();

        }


        /* Edit blog page */

        if (
            window.location.pathname.includes(
                "edit-blog.html"
            )
        ) {

            loadEditBlog();

        }
        if (document.body.classList.contains("my-blogs-page")) {
            loadMyBlogs();
        }
        if (document.body.classList.contains("admin-page")) {
            loadAdminDashboard();
        }

    }
);
// ================= LIKES =================

async function loadLikes() {

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        return;
    }

    const likeCount = document.getElementById("likeCount");
    const likeButton = document.getElementById("likeButton");

    try {

        // Get like count
        const countResponse = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/likes/blog/${blogId}/count`
        );

        const count = await countResponse.json();

        if (likeCount) {
            likeCount.textContent = count;
        }

        // Check whether current user has liked the blog
        const userData = localStorage.getItem("loggedInUser");

        if (userData) {

            const user = JSON.parse(userData);

            const likedResponse = await fetch(
                `https://blogsphere-backend-9raa.onrender.com/api/likes/blog/${blogId}/user/${encodeURIComponent(user.name)}`
            );

            const hasLiked = await likedResponse.json();

            updateLikeButton(hasLiked);
        }

    } catch (error) {

        console.error("Error loading likes:", error);

    }
}


// ================= LIKE / UNLIKE =================

async function likePost() {

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        return;
    }

    const userData = localStorage.getItem("loggedInUser");

    if (!userData) {

        alert("Please login to like this blog.");

        return;
    }

    const user = JSON.parse(userData);

    const likeButton = document.getElementById("likeButton");

    try {

        const likedResponse = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/likes/blog/${blogId}/user/${encodeURIComponent(user.name)}`
        );

        const hasLiked = await likedResponse.json();

        if (hasLiked) {

            // Unlike
            const deleteResponse = await fetch(
                `https://blogsphere-backend-9raa.onrender.com/api/likes/blog/${blogId}/user/${encodeURIComponent(user.name)}`,
                {
                    method: "DELETE"
                }
            );

            if (!deleteResponse.ok) {
                throw new Error("Failed to remove like");
            }

            updateLikeButton(false);

        } else {

            // Like
            const response = await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/likes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        author: user.name,
                        blogId: Number(blogId)
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add like");
            }

            updateLikeButton(true);
        }

        // Update count
        const countResponse = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/likes/blog/${blogId}/count`
        );

        const count = await countResponse.json();

        const likeCount = document.getElementById("likeCount");

        if (likeCount) {
            likeCount.textContent = count;
        }

    } catch (error) {

        console.error("Error updating like:", error);

        alert("Something went wrong. Please try again.");

    }
}


// ================= UPDATE LIKE BUTTON =================

function updateLikeButton(hasLiked) {

    const likeButton = document.getElementById("likeButton");

    if (!likeButton) {
        return;
    }

    if (hasLiked) {

        likeButton.classList.add("liked");

        likeButton.firstChild.textContent = "♥ ";

    } else {

        likeButton.classList.remove("liked");

        likeButton.firstChild.textContent = "♡ ";

    }
}
// ================= BOOKMARKS =================

async function loadBookmark() {

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        return;
    }

    const userData = localStorage.getItem("loggedInUser");

    if (!userData) {
        return;
    }

    const user = JSON.parse(userData);

    try {

        const response = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/bookmarks/blog/${blogId}/user/${encodeURIComponent(user.name)}`
        );

        const hasBookmarked = await response.json();

        updateBookmarkButton(hasBookmarked);

    } catch (error) {

        console.error(
            "Error loading bookmark:",
            error
        );

    }
}


// ================= TOGGLE BOOKMARK =================

async function toggleBookmark() {

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        return;
    }

    const userData = localStorage.getItem("loggedInUser");

    if (!userData) {

        alert("Please login to bookmark this blog.");

        return;
    }

    const user = JSON.parse(userData);

    try {

        // Check current bookmark status

        const checkResponse = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/bookmarks/blog/${blogId}/user/${encodeURIComponent(user.name)}`
        );

        const hasBookmarked = await checkResponse.json();


        if (hasBookmarked) {

            // Remove bookmark

            const deleteResponse = await fetch(
                `https://blogsphere-backend-9raa.onrender.com/api/bookmarks/blog/${blogId}/user/${encodeURIComponent(user.name)}`,
                {
                    method: "DELETE"
                }
            );

            if (!deleteResponse.ok) {
                throw new Error(
                    "Failed to remove bookmark"
                );
            }

            updateBookmarkButton(false);

        } else {

            // Add bookmark

            const response = await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/bookmarks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        author: user.name,
                        blogId: Number(blogId)
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to add bookmark"
                );
            }

            updateBookmarkButton(true);
        }

    } catch (error) {

        console.error(
            "Error updating bookmark:",
            error
        );

        alert(
            "Something went wrong. Please try again."
        );
    }
}


// ================= UPDATE BOOKMARK BUTTON =================

function updateBookmarkButton(hasBookmarked) {

    const bookmarkButton =
        document.getElementById("bookmarkButton");

    if (!bookmarkButton) {
        return;
    }

    const text =
        bookmarkButton.querySelector("span");

    if (hasBookmarked) {

        bookmarkButton.classList.add("bookmarked");

        if (text) {
            text.textContent = "Saved";
        }

    } else {

        bookmarkButton.classList.remove("bookmarked");

        if (text) {
            text.textContent = "Save";
        }
    }
}
// ================= MY BOOKMARKS =================

async function loadMyBookmarks() {

    const bookmarksList =
        document.getElementById("bookmarksList");

    if (!bookmarksList) {
        return;
    }

    const userData =
        localStorage.getItem("loggedInUser");

    if (!userData) {

        bookmarksList.innerHTML = `
            <div class="no-bookmarks">
                <h3>Please login first</h3>

                <p>
                    Login to view your saved blogs.
                </p>

                <a href="login.html">
                    Login
                </a>
            </div>
        `;

        return;
    }

    const user = JSON.parse(userData);

    try {

        // Get user's bookmarks

        const response = await fetch(
            `https://blogsphere-backend-9raa.onrender.com/api/bookmarks/user/${encodeURIComponent(user.name)}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load bookmarks"
            );
        }

        const bookmarks =
            await response.json();


        if (bookmarks.length === 0) {

            bookmarksList.innerHTML = `
                <div class="no-bookmarks">

                    <h3>
                        No bookmarks yet 🔖
                    </h3>

                    <p>
                        Save blogs you want to read later.
                    </p>

                    <a href="explore.html">
                        Explore Blogs →
                    </a>

                </div>
            `;

            return;
        }


        bookmarksList.innerHTML = "";


        // Get each bookmarked blog

        for (const bookmark of bookmarks) {

            try {

                const blogResponse =
                    await fetch(
                        `https://blogsphere-backend-9raa.onrender.com/api/blogs/${bookmark.blogId}`
                    );

                if (!blogResponse.ok) {
                    continue;
                }

                const blog =
                    await blogResponse.json();


                const card =
                    document.createElement("article");

                card.className =
                    "bookmark-card";


                card.innerHTML = `

                    <div class="bookmark-image">

                        ${
                            blog.imageUrl
                            ?
                            `<img
                                src="${blog.imageUrl}"
                                alt="${blog.title}">`
                            :
                            `<div class="bookmark-no-image">
                                📝
                            </div>`
                        }

                    </div>


                    <div class="bookmark-content">

                        <span class="bookmark-category">
                            ${blog.category || "General"}
                        </span>


                        <h3>
                            ${blog.title}
                        </h3>


                        <p>
                            ${
                                blog.content
                                ?
                                blog.content.substring(0, 120)
                                :
                                "No description available."
                            }...
                        </p>


                        <div class="bookmark-footer">

                            <span>
                                By ${blog.author || "Unknown"}
                            </span>


                            <a
                                href="post.html?id=${blog.id}">

                                Read Article →

                            </a>

                        </div>

                    </div>

                `;

                bookmarksList.appendChild(card);

            } catch (error) {

                console.error(
                    "Error loading bookmarked blog:",
                    error
                );

            }
        }


    } catch (error) {

        console.error(
            "Error loading bookmarks:",
            error
        );

        bookmarksList.innerHTML = `
            <p class="no-bookmarks">
                Unable to load bookmarks.
            </p>
        `;
    }
}
async function loadMyBlogs() {

    const myBlogsList = document.getElementById("myBlogsList");

    if (!myBlogsList) return;

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {

        myBlogsList.innerHTML = `
            <p class="no-my-blogs">
                Please login to view your blogs.
            </p>
        `;

        return;
    }

    const loggedInUser = JSON.parse(storedUser);

    try {

        const response = await fetch(
            "https://blogsphere-backend-9raa.onrender.com/api/blogs/my/" +
            encodeURIComponent(loggedInUser.name)
        );

        if (!response.ok) {
            throw new Error("Failed to load my blogs");
        }

        const blogs = await response.json();

        myBlogsList.innerHTML = "";

        if (blogs.length === 0) {

            myBlogsList.innerHTML = `
                <p class="no-my-blogs">
                    You haven't created any blogs yet.
                </p>
            `;

            return;
        }

        blogs.forEach(function(blog) {

            const card = document.createElement("article");

            card.className = "my-blog-card";

            card.innerHTML = `

                <div class="my-blog-image">

                    <img
                        src="${blog.imageUrl || 'https://via.placeholder.com/600x400'}"
                        alt="${blog.title}"
                    >

                </div>

                <div class="my-blog-content">

                    <span class="my-blog-category">
                        ${blog.category || "General"}
                    </span>

                    <h3>${blog.title}</h3>

                    <p>${blog.content}</p>

                    <div class="my-blog-actions">

                        <button
                            class="my-blog-edit"
                            onclick="editBlog(${blog.id})">
                            Edit
                        </button>

                        <button
                            class="my-blog-delete"
                            onclick="deleteBlog(${blog.id})">
                            Delete
                        </button>

                    </div>

                </div>

            `;

            myBlogsList.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        myBlogsList.innerHTML = `
            <p class="no-my-blogs">
                Failed to load your blogs.
            </p>
        `;
    }
}


async function loadAdminDashboard() {

    const usersContainer =
        document.getElementById("adminUsers");

    const blogsContainer =
        document.getElementById("adminBlogs");

    const commentsContainer =
        document.getElementById("adminComments");

    const reportsContainer =
        document.getElementById("adminReports");


    if (!usersContainer ||
        !blogsContainer ||
        !commentsContainer ||
        !reportsContainer) {

        return;
    }


    try {

        // =========================
        // USERS
        // =========================

        const usersResponse =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/admin/users"
            );

        const users =
            await usersResponse.json();


        // =========================
        // BLOGS
        // =========================

        const blogsResponse =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/admin/blogs"
            );

        const blogs =
            await blogsResponse.json();


        // =========================
        // COMMENTS
        // =========================

        const commentsResponse =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/admin/comments"
            );

        const comments =
            await commentsResponse.json();


        // =========================
        // REPORTS
        // =========================

        const reportsResponse =
            await fetch(
                "https://blogsphere-backend-9raa.onrender.com/api/admin/reports"
            );

        const reports =
            await reportsResponse.json();


        // =========================
        // STATISTICS
        // =========================

        document.getElementById("totalUsers")
            .textContent = users.length;

        document.getElementById("totalBlogs")
            .textContent = blogs.length;

        document.getElementById("totalComments")
            .textContent = comments.length;


        // =========================
        // USERS TABLE
        // =========================

        usersContainer.innerHTML = `

            <table class="admin-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${users.map(user => `

                        <tr>

                            <td>${user.id}</td>

                            <td>${user.name}</td>

                            <td>${user.email}</td>

                            <td>
                                ${user.role || "USER"}
                            </td>

                            <td>

                                <button
                                    class="admin-delete-btn"
                                    onclick="deleteUser(${user.id})">

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;


        // =========================
        // BLOGS TABLE
        // =========================

        blogsContainer.innerHTML = `

            <table class="admin-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${blogs.map(blog => `

                        <tr>

                            <td>${blog.id}</td>

                            <td>${blog.title}</td>

                            <td>${blog.category}</td>

                            <td>${blog.author}</td>

                            <td>

                                <button
                                    class="admin-delete-btn"
                                    onclick="deleteAdminBlog(${blog.id})">

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;


        // =========================
        // COMMENTS TABLE
        // =========================

        commentsContainer.innerHTML = `

            <table class="admin-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Comment</th>
                        <th>Author</th>
                        <th>Blog ID</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${comments.map(comment => `

                        <tr>

                            <td>${comment.id}</td>

                            <td>${comment.content}</td>

                            <td>${comment.author}</td>

                            <td>${comment.blogId}</td>

                            <td>

                                <button
                                    class="admin-delete-btn"
                                    onclick="deleteAdminComment(${comment.id})">

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;


        // =========================
        // REPORTS TABLE
        // =========================

        reportsContainer.innerHTML = `

            <table class="admin-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Reporter</th>
                        <th>Type</th>
                        <th>Content ID</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${reports.map(report => `

                        <tr>

                            <td>${report.id}</td>

                            <td>${report.reporter}</td>

                            <td>${report.type}</td>

                            <td>${report.contentId}</td>

                            <td>${report.reason}</td>

                            <td>

                                <button
                                    class="admin-delete-btn"
                                    onclick="deleteReport(${report.id})">

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;


    } catch (error) {

        console.error(
            "Error loading admin dashboard:",
            error
        );

    }

}
async function deleteUser(userId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "https://blogsphere-backend-9raa.onrender.com/api/users/" + userId,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        alert("User deleted successfully.");

        // Reload admin dashboard
        loadAdminDashboard();

    } catch (error) {

        console.error("Delete user error:", error);

        alert("Failed to delete user.");

    }
}
async function deleteAdminBlog(blogId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "https://blogsphere-backend-9raa.onrender.com/api/blogs/" + blogId,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete blog");
        }

        alert("Blog deleted successfully.");

        // Refresh dashboard
        loadAdminDashboard();

    } catch (error) {

        console.error(
            "Delete blog error:",
            error
        );

        alert("Failed to delete blog.");
    }
}
async function deleteAdminComment(commentId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "https://blogsphere-backend-9raa.onrender.com/api/comments/" + commentId,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete comment");
        }

        alert("Comment deleted successfully.");

        // Refresh dashboard
        loadAdminDashboard();

    } catch (error) {

        console.error(
            "Delete comment error:",
            error
        );

        alert("Failed to delete comment.");

    }
}
async function deleteReport(reportId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            "https://blogsphere-backend-9raa.onrender.com/api/reports/" + reportId,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete report");
        }

        alert("Report deleted successfully.");

        // Refresh admin dashboard
        loadAdminDashboard();

    } catch (error) {

        console.error(
            "Delete report error:",
            error
        );

        alert("Failed to delete report.");

    }
}
async function reportBlog() {

    const reason = prompt(
        "Why are you reporting this blog?\n\n" +
        "Examples: Spam, Inappropriate Content, False Information, Other"
    );

    if (!reason) {
        return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Please login before reporting.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        alert("Blog ID not found.");
        return;
    }

    const report = {
        reporter: loggedInUser.name,
        type: "BLOG",
        contentId: Number(blogId),
        reason: reason
    };

    try {

        const response = await fetch("https://blogsphere-backend-9raa.onrender.com/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(report)
        });

        if (!response.ok) {
            throw new Error("Failed to report blog");
        }

        alert("Blog reported successfully.");

    } catch (error) {

        console.error(error);
        alert("Failed to report blog.");

    }
}
document.addEventListener("DOMContentLoaded", function () {

    loadMyBookmarks();

});