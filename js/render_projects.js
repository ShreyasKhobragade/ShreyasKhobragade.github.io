/**
 * render_projects.js
 * 
 * Reads the `projectsData` array from `projects_data.js` and dynamically
 * generates the HTML for the Projects section to insert into the DOM.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer || typeof projectFolders === 'undefined') return;

    // SVG Icon map
    const iconMap = {
        paper: '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        video: '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
        github: '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
        link: '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>'
    };

    let projectsHTML = '';

    for (const folder of projectFolders) {
        try {
            const response = await fetch(`projects/${folder}/data.json`);
            if (!response.ok) {
                console.error(`Failed to load data for project: ${folder}`);
                continue;
            }
            const project = await response.json();

            // Construct image path: if it starts with http, use it directly, else prepend the folder path
            const imagePath = project.image.startsWith('http') ? project.image : `projects/${folder}/${project.image}`;

            // Generate Skills HTML
            let skillsHTML = '';
            if (project.skills) {
                project.skills.forEach(skill => {
                    skillsHTML += `<li>${skill}</li>`;
                });
            }

            // Generate Links HTML
            let linksHTML = '';
            if (project.links) {
                project.links.forEach(link => {
                    const svgIcon = iconMap[link.iconType] || iconMap['link'];
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="link-item hover-underline">
                            ${svgIcon}
                            ${link.label}
                        </a>
                    `;
                });
            }

            const statusElement = project.status ? `<div class="overlay-ui"><span class="status-indicator live">${project.status}</span></div>` : '';

            let extraImageHTML = '';
            if (project.extraImage) {
                const extraPath = project.extraImage.startsWith('http') ? project.extraImage : `projects/${folder}/${project.extraImage}`;
                extraImageHTML = `
                    <div style="margin-top: 1.5rem; margin-bottom: 2rem;">
                        <img src="${extraPath}" alt="${project.title} Extra Image" class="project-img" style="border-radius: 12px; max-height: 300px; width: auto; max-width: 100%; object-fit: cover;">
                    </div>
                `;
            }

            // Generate full card HTML
            projectsHTML += `
                <article class="project-card reveal-up" id="project-${folder}">
                    <div class="project-visual glass-panel">
                        <img src="${imagePath}" alt="${project.title} Cover Image" class="project-img">
                        ${statusElement}
                    </div>
                    
                    <div class="project-info">
                        <div class="project-meta">
                            <span class="year">${project.year || ''}</span>
                            <span class="tag">${project.tag || ''}</span>
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc large-text" style="margin-bottom: ${project.extraImage ? '0' : '2rem'};">
                            ${project.description}
                        </p>
                        ${extraImageHTML}
                        
                        <ul class="tech-stack">
                            ${skillsHTML}
                        </ul>
                        
                        <div class="project-links">
                            ${linksHTML}
                        </div>
                    </div>
                </article>
            `;
        } catch (error) {
            console.error(`Error loading project ${folder}:`, error);
        }
    }

    // Inject into container
    projectsContainer.innerHTML = projectsHTML;

    // The scroll observer from script.js will need to attach to these new elements.
    // If the elements are added after we parse script.js, we should re-trigger observation.
    if (typeof window.initScrollAnimations === 'function') {
        // give it a tiny delay to ensure DOM is updated
        setTimeout(window.initScrollAnimations, 100);
    }
});
