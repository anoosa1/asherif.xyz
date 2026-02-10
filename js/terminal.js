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

    // === Main content terminal prompts (sequential execution) ===
    const terminals = document.querySelectorAll('.main-content .terminal-prompt');

    const typeCommand = (term) => {
        return new Promise((resolve) => {
            const command = term.getAttribute('data-command');
            const path = term.getAttribute('data-path') || '~';
            const promptText = `asherif.xyz ${path} > `;

            if (!command) {
                resolve();
                return;
            }

            const outputElement = term.nextElementSibling;

            // Clear and set up prompt structure
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
                    // Command finished
                    if (outputElement) {
                        outputElement.classList.add('visible');

                        // Remove cursor from this prompt
                        if (term.contains(cursor)) {
                            term.removeChild(cursor);
                        }

                        // Check if we need to add a new empty prompt
                        // We only add a new prompt if there isn't another terminal prompt strictly following this output
                        const nextElement = outputElement.nextElementSibling;
                        if (!nextElement || !nextElement.classList.contains('terminal-prompt')) {
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

                            if (outputElement.parentNode) {
                                outputElement.parentNode.insertBefore(newPromptContainer, outputElement.nextSibling);
                            }
                        }
                    }
                    resolve();
                }
            };

            // Start typing after a random delay
            setTimeout(typeChar, Math.random() * 500 + 200);
        });
    };

    const runTerminals = async () => {
        for (const term of terminals) {
            await typeCommand(term);
        }
    };

    runTerminals();
});
