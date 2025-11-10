/* ♥ NXComs - Main Application Logic ♥ */

// State
let currentFilters = {
    protocol: 'all',
    category: 'all',
    search: ''
};

let filteredCommands = [...commands];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const commandsGrid = document.getElementById('commandsGrid');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const protocolFilters = document.querySelectorAll('#protocolFilters .pill');
const categoryFilters = document.querySelectorAll('#categoryFilters .pill');
const toast = document.getElementById('toast');

// Variables Section Elements
const variablesToggle = document.getElementById('variablesToggle');
const variablesInputs = document.getElementById('variablesInputs');
const variablesChevron = document.getElementById('variablesChevron');
const clearVariablesBtn = document.getElementById('clearVariables');

// Modal Elements
const commandModal = document.getElementById('commandModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCommand = document.getElementById('modalCommand');
const modalTags = document.getElementById('modalTags');
const modalFlags = document.getElementById('modalFlags');
const modalCopyBtn = document.getElementById('modalCopyBtn');
const modalFlagsSection = document.getElementById('modalFlagsSection');

// Current modal command data
let currentModalCommand = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCommands();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
        filterCommands();
    });

    // Clear search
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentFilters.search = '';
        clearSearchBtn.style.display = 'none';
        filterCommands();
    });

    // Protocol filters
    protocolFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            protocolFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.protocol = btn.dataset.filter;
            filterCommands();
        });
    });

    // Category filters
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.category = btn.dataset.filter;
            filterCommands();
        });
    });

    // Variables toggle
    variablesToggle.addEventListener('click', () => {
        variablesInputs.classList.toggle('show');
        variablesToggle.classList.toggle('expanded');
    });

    // Clear variables
    clearVariablesBtn.addEventListener('click', () => {
        document.getElementById('varTarget').value = '';
        document.getElementById('varUsername').value = '';
        document.getElementById('varPassword').value = '';
        document.getElementById('varDomain').value = '';
        document.getElementById('varHash').value = '';
        document.getElementById('varCommand').value = '';
        showToast('Variables cleared', 'success');
    });

    // Modal close
    modalClose.addEventListener('click', closeModal);

    // Close modal on background click
    commandModal.addEventListener('click', (e) => {
        if (e.target === commandModal) {
            closeModal();
        }
    });

    // Modal copy button
    modalCopyBtn.addEventListener('click', () => {
        if (currentModalCommand) {
            copyCommandWithVariables(currentModalCommand);
        }
    });
}

// Filter Commands
function filterCommands() {
    filteredCommands = commands.filter(cmd => {
        // Protocol filter
        if (currentFilters.protocol !== 'all' && cmd.protocol !== currentFilters.protocol) {
            return false;
        }

        // Category filter
        if (currentFilters.category !== 'all' && cmd.category !== currentFilters.category) {
            return false;
        }

        // Search filter
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            return (
                cmd.title.toLowerCase().includes(searchLower) ||
                cmd.description.toLowerCase().includes(searchLower) ||
                cmd.command.toLowerCase().includes(searchLower) ||
                cmd.flags.some(flag => flag.includes(searchLower))
            );
        }

        return true;
    });

    renderCommands();
}

// Render Commands
function renderCommands() {
    commandsGrid.innerHTML = '';
    resultsCount.textContent = filteredCommands.length;

    if (filteredCommands.length === 0) {
        noResults.style.display = 'block';
        commandsGrid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    commandsGrid.style.display = 'grid';

    filteredCommands.forEach((cmd, index) => {
        const card = createCommandCard(cmd, index);
        commandsGrid.appendChild(card);
    });
}

// Create Command Card
function createCommandCard(cmd, index) {
    const card = document.createElement('div');
    card.className = 'command-card';
    card.style.animationDelay = `${index * 0.05}s`;

    // Tags
    const tagsHTML = `
        <div class="tags">
            <span class="tag protocol">${cmd.protocol.toUpperCase()}</span>
            <span class="tag category">${formatCategory(cmd.category)}</span>
        </div>
    `;

    // Flags
    const flagsHTML = cmd.flags.map(flag =>
        `<span class="flag"><i class="fas fa-tag"></i>${flag}</span>`
    ).join('');

    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="command-title">${cmd.title}</h3>
                ${tagsHTML}
            </div>
        </div>

        <p class="command-description">${cmd.description}</p>

        <div class="command-code">
            <button class="copy-btn">
                <i class="fas fa-copy"></i> Copy
            </button>
            <code>${formatCommand(cmd.command)}</code>
        </div>

        ${flagsHTML ? `<div class="card-footer">${flagsHTML}</div>` : ''}
    `;

    // Add click event to open modal
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking the copy button
        if (e.target.closest('.copy-btn')) {
            return;
        }
        openModal(cmd);
    });

    // Add copy button event
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyCommandWithVariables(cmd.command);
    });

    return card;
}

// Format Category Name
function formatCategory(category) {
    const categoryNames = {
        'enumeration': 'Enumeration',
        'authentication': 'Authentication',
        'credentials': 'Credentials',
        'execution': 'Execution',
        'exploitation': 'Exploitation',
        'persistence': 'Persistence',
        'lateral': 'Lateral Movement'
    };
    return categoryNames[category] || category;
}

// Format Command (syntax highlighting)
function formatCommand(cmd) {
    let formatted = escapeHtml(cmd);

    // Highlight placeholders
    formatted = formatted.replace(/&lt;([^&]+)&gt;/g, '<span style="color: var(--pink);">&lt;$1&gt;</span>');

    // Highlight flags
    formatted = formatted.replace(/( --?[a-zA-Z0-9-]+)/g, '<span style="color: var(--purple);">$1</span>');

    // Highlight nxc command
    formatted = formatted.replace(/(nxc)/g, '<span style="color: var(--success); font-weight: bold;">$1</span>');

    return formatted;
}

// Replace Variables in Command
function replaceVariables(command) {
    const varTarget = document.getElementById('varTarget').value.trim();
    const varUsername = document.getElementById('varUsername').value.trim();
    const varPassword = document.getElementById('varPassword').value.trim();
    const varDomain = document.getElementById('varDomain').value.trim();
    const varHash = document.getElementById('varHash').value.trim();
    const varCommand = document.getElementById('varCommand').value.trim();

    let result = command;

    // Replace common placeholders
    if (varTarget) {
        result = result.replace(/<target>/g, varTarget)
                       .replace(/<ip>/g, varTarget)
                       .replace(/<host>/g, varTarget)
                       .replace(/<IP>/g, varTarget);
    }
    if (varUsername) {
        result = result.replace(/<username>/g, varUsername)
                       .replace(/<user>/g, varUsername)
                       .replace(/<USER>/g, varUsername);
    }
    if (varPassword) {
        result = result.replace(/<password>/g, varPassword)
                       .replace(/<pass>/g, varPassword)
                       .replace(/<PASSWORD>/g, varPassword);
    }
    if (varDomain) {
        result = result.replace(/<domain>/g, varDomain)
                       .replace(/<DOMAIN>/g, varDomain);
    }
    if (varHash) {
        result = result.replace(/<hash>/g, varHash)
                       .replace(/<HASH>/g, varHash)
                       .replace(/<NTLM>/g, varHash)
                       .replace(/<ntlm>/g, varHash);
    }
    if (varCommand) {
        result = result.replace(/<command>/g, varCommand)
                       .replace(/<cmd>/g, varCommand);
    }

    return result;
}

// Copy Command with Variables
function copyCommandWithVariables(command) {
    // Unescape HTML entities if command is HTML-encoded
    const textarea = document.createElement('textarea');
    textarea.innerHTML = command;
    let cleanCommand = textarea.value;

    // Replace variables
    cleanCommand = replaceVariables(cleanCommand);

    // Copy to clipboard
    navigator.clipboard.writeText(cleanCommand).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy', 'error');
    });
}

// Open Modal
function openModal(cmd) {
    currentModalCommand = cmd.command;

    // Set title
    modalTitle.textContent = cmd.title;

    // Set tags
    modalTags.innerHTML = `
        <span class="tag protocol">${cmd.protocol.toUpperCase()}</span>
        <span class="tag category">${formatCategory(cmd.category)}</span>
    `;

    // Set description
    modalDescription.textContent = cmd.description;

    // Set command with highlighting
    modalCommand.innerHTML = formatCommand(cmd.command);

    // Set flags
    if (cmd.flags && cmd.flags.length > 0) {
        modalFlags.innerHTML = cmd.flags.map(flag =>
            `<span class="flag"><i class="fas fa-tag"></i>${flag}</span>`
        ).join('');
        modalFlagsSection.style.display = 'block';
    } else {
        modalFlagsSection.style.display = 'none';
    }

    // Show modal
    commandModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    commandModal.classList.remove('show');
    document.body.style.overflow = '';
    currentModalCommand = null;
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toastElement = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toastElement.classList.add('show');

    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Close modal on Escape (priority)
    if (e.key === 'Escape' && commandModal.classList.contains('show')) {
        closeModal();
        return;
    }

    // Clear search on 'Escape'
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        currentFilters.search = '';
        clearSearchBtn.style.display = 'none';
        searchInput.blur();
        filterCommands();
        return;
    }

    // Focus search on '/' key (unless modal is open or typing in input)
    if (e.key === '/' && document.activeElement !== searchInput && !commandModal.classList.contains('show')) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

// Console Easter Egg
console.log('%c♥ NXComs - NetExec Interactive Cheatsheet ♥', 'color: #e942f5; font-size: 20px; font-weight: bold;');
console.log('%cMade with love for the offensive security community', 'color: #cb16ff; font-size: 14px;');
console.log('%c\nTotal commands loaded: ' + commands.length, 'color: #44ff44; font-weight: bold;');
console.log('%c\nKeyboard shortcuts:', 'color: #e942f5; font-weight: bold;');
console.log('  / - Focus search');
console.log('  Esc - Clear search\n');
