document.addEventListener('DOMContentLoaded', () => {
    // === Sidebar Nav: cd ~/ with tab-completion highlight ===
    const sidebarPrompt = document.querySelector('.sidebar-nav-prompt');
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (sidebarPrompt && sidebarNav) {
        const command = sidebarPrompt.getAttribute('data-command') || 'cd ~/';

        // Determine current page from URL
        const currentPath = window.location.pathname;
        let currentPage = 'index';
        let promptPath = '~';
        if (currentPath.includes('projects')) {
            currentPage = 'projects';
            promptPath = '~/projects';
        } else if (currentPath.includes('links')) {
            currentPage = 'links';
            promptPath = '~/links';
        }

        const promptText = `asherif.xyz ${promptPath} > `;

        // Clear and build prompt
        sidebarPrompt.textContent = '';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt-user';
        promptSpan.textContent = promptText;
        sidebarPrompt.appendChild(promptSpan);

        const commandSpan = document.createElement('span');
        commandSpan.className = 'prompt-command';
        sidebarPrompt.appendChild(commandSpan);

        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.textContent = '\u2588';
        sidebarPrompt.appendChild(cursor);

        // Initially hide nav
        sidebarNav.style.display = 'none';

        // Type the command, then show nav with current page highlighted
        let i = 0;
        const typeChar = () => {
            if (i < command.length) {
                commandSpan.textContent += command.charAt(i);
                i++;
                setTimeout(typeChar, Math.random() * 50 + 50);
            } else {
                // Done typing - show nav, highlight current page
                sidebarNav.style.display = '';

                // Highlight the current page link (tab-completion style)
                const navLinks = sidebarNav.querySelectorAll('a');
                navLinks.forEach(link => {
                    if (link.dataset.page === currentPage) {
                        link.classList.add('nav-highlighted');
                    }
                });

                // On hover, move the highlight to the hovered link
                navLinks.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        navLinks.forEach(l => l.classList.remove('nav-highlighted'));
                        link.classList.add('nav-highlighted');
                    });

                    link.addEventListener('mouseleave', () => {
                        // Restore highlight to current page
                        navLinks.forEach(l => l.classList.remove('nav-highlighted'));
                        navLinks.forEach(l => {
                            if (l.dataset.page === currentPage) {
                                l.classList.add('nav-highlighted');
                            }
                        });
                    });
                });
            }
        };

        setTimeout(typeChar, Math.random() * 300 + 200);
    }

    // === Main content terminal prompts (unchanged behavior) ===
    const terminals = document.querySelectorAll('.main-content .terminal-prompt');

    terminals.forEach(term => {
        const command = term.getAttribute('data-command');
        const path = term.getAttribute('data-path') || '~';
        const promptText = `asherif.xyz ${path} > `;

        if (!command) return;

        const outputElement = term.nextElementSibling;

        term.textContent = '';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt-user';
        promptSpan.textContent = promptText;
        term.appendChild(promptSpan);

        const commandSpan = document.createElement('span');
        commandSpan.className = 'prompt-command';
        term.appendChild(commandSpan);

        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.textContent = '\u2588';
        term.appendChild(cursor);

        let i = 0;
        const typeChar = () => {
            if (i < command.length) {
                commandSpan.textContent += command.charAt(i);
                i++;
                setTimeout(typeChar, Math.random() * 50 + 50);
            } else {
                if (outputElement) {
                    outputElement.classList.add('visible');

                    if (term.contains(cursor)) {
                        term.removeChild(cursor);
                    }

                    // Create new prompt after output
                    const newPromptContainer = document.createElement('div');
                    newPromptContainer.className = 'terminal-prompt';

                    const newPromptSpan = document.createElement('span');
                    newPromptSpan.className = 'prompt-user';
                    newPromptSpan.textContent = promptText;
                    newPromptContainer.appendChild(newPromptSpan);

                    const newCursor = document.createElement('span');
                    newCursor.className = 'terminal-cursor';
                    newCursor.textContent = '\u2588';
                    newPromptContainer.appendChild(newCursor);

                    outputElement.parentNode.insertBefore(newPromptContainer, outputElement.nextSibling);
                }
            }
        };

        setTimeout(typeChar, Math.random() * 500 + 200);
    });
});
