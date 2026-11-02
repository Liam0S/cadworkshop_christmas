// Function to load a specific step dynamically
function loadStep(stepId) {
    // Default to step-0 if no valid hash is supplied
    if (!stepId) {
        stepId = 'step-0';
    }

    const filePath = `steps/${stepId}.md`;

    // Fetch the target step file
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        })
        .then(markdownText => {
            // Convert Markdown to HTML
            document.getElementById('step-content').innerHTML = marked.parse(markdownText);

            // Update active state in sidebar menu
            updateActiveLink(stepId);

            // Scroll main content area back to top
            window.scrollTo(0, 0);
        })
        .catch(err => {
            document.getElementById('step-content').innerHTML = `
                <h2>Error Loading Page</h2>
                <p>Could not find file: <code>${filePath}</code></p>
            `;
            console.error(err);
        });
}

// Function to handle link highlights
function updateActiveLink(stepId) {
    const links = document.querySelectorAll('#nav-list a');
    links.forEach(link => {
        if (link.getAttribute('href') === `#${stepId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Event listener for hash changes (e.g. user clicks a sidebar item or uses Back/Forward buttons)
window.addEventListener('hashchange', () => {
    const stepId = window.location.hash.replace('#', '');
    loadStep(stepId);
});

// Initial page load
window.addEventListener('DOMContentLoaded', () => {
    const initialStep = window.location.hash.replace('#', '');
    loadStep(initialStep);
});