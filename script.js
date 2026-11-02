// Function to load a specific step dynamically
function loadStep(stepId) {
    // Default to step-0 if no step specified
    if (!stepId || stepId === '') {
        stepId = 'step-0';
    }

    // Path relative to index.html location
    const filePath = `./steps/${stepId}.md`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdownText => {
            // Render the Markdown into the target container
            document.getElementById('step-content').innerHTML = marked.parse(markdownText);
            
            // Highlight the correct sidebar link
            updateActiveLink(stepId);
            
            // Scroll back up to the top of the content area
            window.scrollTo(0, 0);
        })
        .catch(err => {
            document.getElementById('step-content').innerHTML = `
                <h2>Error Loading Page</h2>
                <p>Could not fetch <code>${filePath}</code>.</p>
                <p>Details: ${err.message}</p>
                <p><strong>Note:</strong> Check your GitHub repository to make sure the file <code>steps/${stepId}.md</code> exists and is completely lowercase.</p>
            `;
            console.error('Fetch error:', err);
        });
}

// Update the active button class in the sidebar
function updateActiveLink(stepId) {
    const links = document.querySelectorAll('#nav-list a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${stepId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Triggered when clicking links or using Browser Back/Forward buttons
window.addEventListener('hashchange', () => {
    const stepId = window.location.hash.replace('#', '');
    loadStep(stepId);
});

// Triggered on page refresh / first visit
window.addEventListener('DOMContentLoaded', () => {
    const initialStep = window.location.hash.replace('#', '');
    loadStep(initialStep);
});