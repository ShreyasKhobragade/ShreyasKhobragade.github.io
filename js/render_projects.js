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
            const cacheBuster = new Date().getTime();
            const response = await fetch(`projects/${folder}/data.json?t=${cacheBuster}`);
            if (!response.ok) {
                console.error(`Failed to load data for project: ${folder}`);
                continue;
            }
            const project = await response.json();

            // Construct visual element
            let visualHTML = '';
            if (project.videoGrid && Array.isArray(project.videoGrid)) {
                let gridVideosHTML = '';
                project.videoGrid.forEach(vid => {
                    const vidPath = vid.startsWith('http') ? vid : `projects/${folder}/${vid}`;
                    gridVideosHTML += `
                        <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s ease; cursor: zoom-in;" class="zoomable-video">
                            <source src="${vidPath}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                });
                const gridStyle = project.videoGrid.length === 2 
                    ? "display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; height: 100%; overflow: hidden; border-radius: 20px;" 
                    : "display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 4px; width: 100%; height: 100%; overflow: hidden; border-radius: 20px;";
                visualHTML = `
                    <div class="project-img-grid project-video-grid" style="${gridStyle}">
                        ${gridVideosHTML}
                    </div>
                `;
            } else if (project.imageGrid && Array.isArray(project.imageGrid)) {
                let gridImagesHTML = '';
                project.imageGrid.forEach(img => {
                    const imgPath = img.startsWith('http') ? img : `projects/${folder}/${img}`;
                    gridImagesHTML += `<img src="${imgPath}" alt="${project.title} Grid Image" class="project-img" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease;">`;
                });
                const gridStyle = project.imageGrid.length === 2 
                    ? "display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; height: 100%; overflow: hidden; border-radius: 20px;" 
                    : "display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 4px; width: 100%; height: 100%; overflow: hidden; border-radius: 20px;";
                visualHTML = `
                    <div class="project-img-grid" style="${gridStyle}">
                        ${gridImagesHTML}
                    </div>
                `;
            } else if (project.image) {
                const imagePath = project.image.startsWith('http') ? project.image : `projects/${folder}/${project.image}`;
                visualHTML = `<img src="${imagePath}" alt="${project.title} Cover Image" class="project-img">`;
            }

            // Construct link wrapping if projectPage exists
            let visualContainerHTML = '';
            if (project.projectPage) {
                const pagePath = project.projectPage.startsWith('http') ? project.projectPage : `projects/${folder}/${project.projectPage}`;
                visualContainerHTML = `
                    <a href="${pagePath}" class="project-link-wrapper" style="display: block; width: 100%; height: 100%; text-decoration: none; border-radius: 20px; overflow: hidden;">
                        ${visualHTML}
                    </a>
                `;
            } else {
                visualContainerHTML = visualHTML;
            }

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

            // Generate custom video HTML if defined
            let videoHTML = '';
            if (project.video) {
                const videoPath = project.video.startsWith('http') ? project.video : `projects/${folder}/${project.video}`;
                const playbackRateAttr = project.playbackRate ? `data-playback-rate="${project.playbackRate}"` : '';
                videoHTML = `
                    <div class="project-video-container glass-panel" style="position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 16/10; width: 100%; border: 1px solid var(--glass-border); background: var(--glass-bg); cursor: zoom-in; margin-top: 2rem;">
                        <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;" class="zoomable-video" ${playbackRateAttr}>
                            <source src="${videoPath}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            }

            // Generate stats HTML if defined
            let statsHTML = '';
            if (project.stats) {
                statsHTML = `
                    <div class="stat-callout glass-panel" style="padding: 1.5rem; border-radius: 16px; border: 1px solid var(--glass-border); background: rgba(0, 122, 255, 0.03); border-left: 4px solid var(--accent-blue); text-align: left; width: 100%;">
                        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-family: var(--font-heading); font-size: 2.5rem; font-weight: 800; color: #00f2fe; line-height: 1; text-shadow: 0 0 10px rgba(0, 242, 254, 0.3);">${project.stats.value}</span>
                            <span style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">${project.stats.label}</span>
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                            ${project.stats.detail}
                        </div>
                    </div>
                `;
            }

            // Generate custom extra text/stats HTML if defined
            let extraTextHTML = '';
            if (project.extraText && Array.isArray(project.extraText)) {
                let pointsHTML = '';
                project.extraText.forEach(point => {
                    pointsHTML += `
                        <div class="extra-point" style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div style="color: var(--accent-blue); font-size: 1.25rem; line-height: 1.4;">•</div>
                            <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; margin: 0; text-align: left;">
                                ${point}
                            </p>
                        </div>
                    `;
                });

                extraTextHTML = `
                    <div class="project-extra-text" style="margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
                        ${statsHTML}
                        <div style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%;">
                            ${pointsHTML}
                        </div>
                    </div>
                `;
            }

            if (project.layout === "breakout") {
                // Determine layout styles
                let breakoutMediaHTML = '';
                if (project.videoGrid && Array.isArray(project.videoGrid)) {
                    let gridVideosHTML = '';
                    project.videoGrid.forEach(vid => {
                        const vidPath = vid.startsWith('http') ? vid : `projects/${folder}/${vid}`;
                        gridVideosHTML += `
                            <video autoplay loop muted playsinline class="zoomable-video" style="cursor: zoom-in;">
                                <source src="${vidPath}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        `;
                    });
                    const gridStyle = project.videoGrid.length === 2 
                        ? "display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%; height: 100%;" 
                        : "display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; width: 100%; height: 100%;";
                    breakoutMediaHTML = `
                        <div class="project-media-breakout glass-panel">
                            <div class="project-video-grid" style="${gridStyle}">
                                ${gridVideosHTML}
                            </div>
                            ${statusElement}
                        </div>
                    `;
                } else if (project.video) {
                    const vidPath = project.video.startsWith('http') ? project.video : `projects/${folder}/${project.video}`;
                    breakoutMediaHTML = `
                        <div class="project-media-breakout glass-panel" style="cursor: zoom-in;">
                            <video autoplay loop muted playsinline class="zoomable-video">
                                <source src="${vidPath}" type="video/mp4">
                            </video>
                            ${statusElement}
                        </div>
                    `;
                }

                // Stats element is inherited from outer scope statsHTML

                // Side Video element
                let sideVideoHTML = '';
                if (project.sideVideo) {
                    const sideVidPath = project.sideVideo.startsWith('http') ? project.sideVideo : `projects/${folder}/${project.sideVideo}`;
                    sideVideoHTML = `
                        <div style="width: 100%; border-radius: 20px; overflow: hidden; border: 1px solid var(--glass-border); background: var(--glass-bg); aspect-ratio: 16/10; position: relative;">
                            <video autoplay loop muted playsinline class="zoomable-video" style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;">
                                <source src="${sideVidPath}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    `;
                }

                // Highlights
                let highlightsHTML = '';
                if (project.extraText && Array.isArray(project.extraText)) {
                    project.extraText.forEach(point => {
                        highlightsHTML += `
                            <div class="extra-point" style="display: flex; gap: 1rem; align-items: flex-start;">
                                <div style="color: var(--accent-blue); font-size: 1.25rem; line-height: 1.4;">•</div>
                                <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; margin: 0; text-align: left;">
                                    ${point}
                                </p>
                            </div>
                        `;
                    });
                }

                projectsHTML += `
                    <article class="project-card reveal-up" id="project-${folder}" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0; width: 100%;">
                        <!-- Header Area -->
                        <div class="project-header" style="width: 100%; text-align: left; margin-bottom: 1rem;">
                            <div class="project-meta" style="margin-bottom: 0.75rem;">
                                <span class="year">${project.year || ''}</span>
                                <span class="tag">${project.tag || ''}</span>
                            </div>
                            <h3 class="project-title" style="font-size: 2.5rem; margin: 0 0 1rem 0;">${project.title}</h3>
                            <p class="project-desc large-text" style="max-width: 800px; margin: 0; text-align: left;">
                                ${project.description}
                            </p>
                        </div>

                        <!-- Breakout Media Section -->
                        ${breakoutMediaHTML}

                        <!-- Details Grid -->
                        <div class="project-details-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; width: 100%; margin-top: 1rem; align-items: start;">
                            <!-- Left Column: Highlights -->
                            <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
                                <h4 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text-primary); text-align: left; margin: 0 0 0.5rem 0;">Key Methodologies & Features</h4>
                                <div style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%;">
                                    ${highlightsHTML}
                                </div>
                            </div>

                            <!-- Right Column: Tech stack, Stats, Links, Side Video -->
                            <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%;">
                                <div>
                                    <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; text-align: left; margin: 0 0 1rem 0;">Technology Stack</h4>
                                    <ul class="tech-stack" style="justify-content: flex-start; margin: 0;">
                                        ${skillsHTML}
                                    </ul>
                                </div>

                                <div class="project-links" style="margin: 0;">
                                    ${linksHTML}
                                </div>

                                ${statsHTML}

                                ${sideVideoHTML}
                            </div>
                        </div>
                    </article>
                `;
            } else {
                // Construct visual column HTML based on extra text presence
                let finalVisualColumnHTML = '';
                if (extraTextHTML) {
                    finalVisualColumnHTML = `
                        <div class="project-visual" style="aspect-ratio: auto;">
                            <div class="project-media-container glass-panel" style="aspect-ratio: 16/10; position: relative; border-radius: 20px; overflow: hidden; width: 100%;">
                                ${visualContainerHTML}
                                ${statusElement}
                            </div>
                            ${extraTextHTML}
                        </div>
                    `;
                } else {
                    finalVisualColumnHTML = `
                        <div class="project-visual glass-panel">
                            ${visualContainerHTML}
                            ${statusElement}
                        </div>
                    `;
                }

                // Generate full card HTML
                projectsHTML += `
                    <article class="project-card reveal-up" id="project-${folder}">
                        ${finalVisualColumnHTML}
                        
                        <div class="project-info">
                            <div class="project-meta">
                                <span class="year">${project.year || ''}</span>
                                <span class="tag">${project.tag || ''}</span>
                            </div>
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-desc large-text" style="margin-bottom: 2rem;">
                                ${project.description}
                            </p>
                            ${extraImageHTML}
                            
                            <ul class="tech-stack">
                                ${skillsHTML}
                            </ul>
                            
                            <div class="project-links" style="margin-bottom: ${videoHTML ? '2rem' : '0'};">
                                ${linksHTML}
                            </div>
                            
                            ${videoHTML}
                        </div>
                    </article>
                `;
            }
        } catch (error) {
            console.error(`Error loading project ${folder}:`, error);
        }
    }

    // Inject into container
    projectsContainer.innerHTML = projectsHTML;

    // Apply custom playback rates to video elements
    projectsContainer.querySelectorAll('video[data-playback-rate]').forEach(video => {
        const rate = parseFloat(video.getAttribute('data-playback-rate'));
        if (!isNaN(rate)) {
            video.playbackRate = rate;
            video.addEventListener('play', () => {
                video.playbackRate = rate;
            });
            video.addEventListener('canplay', () => {
                video.playbackRate = rate;
            });
        }
    });

    // The scroll observer from script.js will need to attach to these new elements.
    // If the elements are added after we parse script.js, we should re-trigger observation.
    if (typeof window.initScrollAnimations === 'function') {
        // give it a tiny delay to ensure DOM is updated
        setTimeout(window.initScrollAnimations, 100);
    }
});
