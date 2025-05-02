# Ruy's Portfolio

A modern, dynamic personal portfolio website for Ruy River, built with HTML5, SASS, and JavaScript, utilizing Gulp for the build process. It features AJAX-powered navigation, smooth transitions, and interactive components to showcase Ruy's skills and experience.

## Features

- **AJAX-Powered Navigation:** Seamless page transitions without full reloads.
- **Responsive Design:** Adapts to various screen sizes (desktops, tablets, mobiles).
- **Interactive Components:** Engaging elements like sliders, galleries, and custom cursors.
- **Gulp Build System:** Automates tasks like SASS compilation, JavaScript bundling, and minification.
- **Live Reloading:** BrowserSync integration for efficient development workflow.
- **Component-Based Structure:** Organized source code with reusable SASS and JS components.
- **Project Showcases:** Dedicated sections to display individual projects.
- **Custom Cursor Effects:** Unique cursor interactions.
- **Smooth Scrolling & Parallax:** Enhanced visual experience during navigation.
- *(Potential)* Contact Form: Includes `mail.php`, suggesting a PHP backend for form submissions (verify server setup).

## Technologies Used

- **Frontend:**
  - HTML5
  - SASS (compiled to CSS3)
  - JavaScript (ES6+)
  - jQuery
  - GSAP (GreenSock Animation Platform)
  
- **Build Tools:**
  - Node.js
  - npm
  - Gulp
- **Development:**
  - BrowserSync
- **Backend (for contact form):**
  - PHP (requires a PHP-enabled server environment for the contact form functionality in `HTML/mail.php`)

## Project Structure

```
portfolio/
├── .gitignore
├── HTML/                   # Compiled output directory (ready for deployment)
│   ├── css/                # Compiled CSS files (vendor.css, main.css)
│   ├── img/                # Image assets
│   ├── js/                 # Compiled JavaScript files (vendor.js, components.js)
│   ├── ...                 # Other HTML pages (index.html, project pages, etc.)
│   └── mail.php            # PHP script for contact form (requires server)
├── README.md               # This file: Overview, setup, and running instructions
└── SOURCE/                 # Source code directory
    ├── .gitignore
    ├── README.md           # Detailed build/development instructions
    ├── components/         # Reusable UI components (SASS & JS)
    ├── static/             # Static assets (base SASS/JS libraries, images, fonts)
    ├── gulpfile.js         # Gulp configuration file
    ├── package.json        # Project dependencies
    └── package-lock.json   # Dependency lock file
```

## Requirements

- **Node.js:** v20.3.0 or later (as specified in `SOURCE/README.md`)
- **npm:** v9.6.7 or later (comes with Node.js)
- **Gulp CLI:** Installed globally (`npm install --global gulp-cli`)

*Optional but recommended:*
- **NVM (Node Version Manager):** To easily switch Node.js versions (`brew install nvm` or see [NVM installation guide](https://github.com/nvm-sh/nvm#installing-and-updating)).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd portfolio/SOURCE
    ```
2.  **Set Node.js version (if using NVM):**
    ```bash
    nvm use
    # If the required version isn't installed, nvm might prompt you to install it.
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If you haven't installed Gulp CLI globally, run `npm install --global gulp-cli` first.*

## Running Locally

1.  **Navigate to the SOURCE directory:**
    ```bash
    cd /path/to/your/project/portfolio/SOURCE
    ```
2.  **Start the development server:**
    ```bash
    gulp default
    ```
    This command compiles the assets, starts a local server using BrowserSync, and watches for file changes.

3.  **Open in browser:**
    Your browser should automatically open to `http://localhost:3000` (or the port specified by BrowserSync).

## Build Process

The Gulp configuration (`SOURCE/gulpfile.js`) handles:

- Compiling SASS files from `SOURCE/static/sass` and `SOURCE/components` into `HTML/css/main.css`.
- Concatenating and optionally minifying vendor CSS into `HTML/css/vendor.css`.
- Concatenating and optionally minifying JavaScript files from `SOURCE/static/js` and `SOURCE/components` into `HTML/js/components.js`.
- Concatenating vendor JS into `HTML/js/vendor.js`.
- Running a BrowserSync server for live preview and reloading.

To clear the Gulp cache, you can run:
```bash
cd /path/to/your/project/portfolio/SOURCE
gulp clean
```
