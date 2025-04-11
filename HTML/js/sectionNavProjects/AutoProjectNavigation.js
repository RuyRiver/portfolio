/**
 * Auto Project Navigation
 * Automatically links between project pages in sequence
 */

class AutoProjectNavigation {
  constructor(options = {}) {
    this.options = Object.assign({
      // Default options
      selectorLink: '.section-nav-projects__link',
      selectorHeading: '.section-nav-projects__heading',
      selectorImage: '.section-nav-projects__wrapper-image img',
      imagePathPattern: 'img/assets/Projects/{projectname}-cover.webp',
      projectPrefix: 'project-',
      knownProjects: [
        'project-vibra.html',
        'project-zurf.html'
        // Add more project files as they're created
      ]
    }, options);

    this.projectFiles = [...this.options.knownProjects]; // Initialize with known projects
    this.init();
  }

  init() {
    // Initialize on DOM ready and various page transition events
    document.addEventListener('DOMContentLoaded', () => {
      this.discoverProjectFiles().then(() => {
        this.updateNavigation();
      });
    });
    
    window.addEventListener('load', this.updateNavigation.bind(this));
    
    // Support for various page transition libraries
    if (typeof Barba !== 'undefined') {
      document.addEventListener('barba:after-enter', this.updateNavigation.bind(this));
    }

    document.addEventListener('pjax:complete', this.updateNavigation.bind(this));
    document.addEventListener('transitionComplete', this.updateNavigation.bind(this));
  }

  /**
   * Try to discover project files from the HTML directory
   * Falls back to the known projects list if directory listing is disabled
   */
  discoverProjectFiles() {
    return fetch('../HTML/')
      .then(response => response.text())
      .then(html => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Extract project HTML files from directory listing
          const discoveredProjects = [];
          const links = doc.querySelectorAll('a');
          
          for (let link of links) {
            const href = link.getAttribute('href');
            if (href && href.startsWith(this.options.projectPrefix) && href.endsWith('.html')) {
              discoveredProjects.push(href);
            }
          }
          
          // If we found any project files, update our list
          if (discoveredProjects.length > 0) {
            console.log('Discovered project files:', discoveredProjects);
            this.projectFiles = discoveredProjects;
          }
        } catch (error) {
          console.warn('Could not parse directory listing:', error);
        }
        return this.projectFiles;
      })
      .catch(error => {
        console.warn('Could not fetch directory listing:', error);
        return this.projectFiles;
      });
  }

  updateNavigation() {
    // Current project filename
    const currentPath = window.location.pathname;
    const currentFilename = currentPath.split('/').pop();
    
    // Only proceed if we're on a project page
    if (currentFilename.startsWith(this.options.projectPrefix)) {
      const nextProject = this.findNextProject(this.projectFiles, currentFilename);
      if (nextProject) {
        console.log('Next project:', nextProject);
        this.updateNextProjectNav(nextProject);
      }
    }
  }

  findNextProject(projectFiles, currentFile) {
    const currentIndex = projectFiles.indexOf(currentFile);
    if (currentIndex !== -1 && currentIndex < projectFiles.length - 1) {
      return projectFiles[currentIndex + 1];
    } else if (projectFiles.length > 0) {
      // If current is last or not found, loop back to first
      return projectFiles[0];
    }
    return null;
  }

  updateNextProjectNav(nextProjectFile) {
    if (!nextProjectFile) return;
    
    // Update the link href
    const navLink = document.querySelector(this.options.selectorLink);
    if (navLink) {
      navLink.setAttribute('href', nextProjectFile);
      
      // Extract project name for the heading
      let projectName = nextProjectFile.replace(this.options.projectPrefix, '').replace('.html', '');
      // Capitalize and format project name (e.g., "zurf" -> "Zurf")
      projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
      
      // Update the heading text
      const heading = navLink.querySelector(this.options.selectorHeading);
      if (heading) {
        heading.textContent = projectName;
      }
      
      // Find and update the image source
      const imgElement = document.querySelector(this.options.selectorImage);
      if (imgElement) {
        // Generate image URL based on pattern
        const imageUrl = this.options.imagePathPattern.replace('{projectname}', projectName.toLowerCase());
        
        // Set the image sources
        imgElement.setAttribute('src', ''); // Clear source to ensure the data-src is used
        imgElement.setAttribute('data-src', imageUrl);
        imgElement.setAttribute('alt', `${projectName} Project Preview`);
        
        // Trigger lazy loading
        this.triggerLazyLoading(imgElement);
      }
    }
  }

  triggerLazyLoading(imgElement) {
    // Add lazyload class if lazySizes is available
    if (window.lazySizes) {
      imgElement.classList.add('lazyload');
      setTimeout(() => {
        if (lazySizes && lazySizes.loader) {
          lazySizes.loader.checkElems();
        }
      }, 100);
    }
    
    // Fall back to other lazy loading implementations
    if (typeof window.lazyLoadInstance !== 'undefined') {
      setTimeout(() => window.lazyLoadInstance.update(), 100);
    }
  }
}

// Initialize the auto project navigation when the script loads
document.addEventListener('DOMContentLoaded', () => {
  window.autoProjectNav = new AutoProjectNavigation();
}); 