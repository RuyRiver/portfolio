# Ruy's Portfolio

A modern, dynamic portfolio website built with HTML5, SASS, and Gulp, featuring AJAX-powered navigation, smooth transitions, and interactive components.

## Features

- AJAX-powered page transitions
- Responsive mastheads and sliders
- Interactive project showcases
- Blog section with dynamic content loading
- Contact forms with validation
- Custom cursor effects
- Smooth scrolling and parallax effects
- Image galleries with lightbox support
- Google Maps integration
- Dark/Light theme support

## Requirements

- Node.js (v20.3.0 or later)
- npm (v9.6.7 or later)
- Gulp (v4.0.2 or later)

## Project Structure

```
├── HTML/           # Compiled and minified files
│   ├── css/       # Compiled CSS files
│   ├── js/        # Compiled JavaScript files
│   ├── img/       # Image assets
│   └── fonts/     # Web fonts
├── SOURCE/        # Source files
│   ├── components/# Reusable UI components
│   ├── static/    # Static assets
│   └── sass/      # SASS source files
```

## Installation

1. Clone the repository
2. Navigate to the SOURCE directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. If using a different Node version (optional):
   ```bash
   nvm use
   ```

## Development

Start the development server:

```bash
gulp
```

This will:
- Compile SASS to CSS
- Bundle and minify JavaScript
- Start a local development server
- Watch for file changes

## Building for Production

To create a production build:

```bash
gulp build
```

The compiled files will be available in the `HTML` directory.

## License

ISC License

## Author

Ruy River
