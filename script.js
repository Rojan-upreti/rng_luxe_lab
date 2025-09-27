// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.freeze-item, .detection-item, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button click animations
document.querySelectorAll('.btn-primary, .btn-secondary, .get-windows-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .get-windows-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Add FAQ styles
const faqStyle = document.createElement('style');
faqStyle.textContent = `
    .faq-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-item.active {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        border-color: rgba(0, 0, 0, 0.1);
    }
    
    .faq-item.active .faq-question {
        background: rgba(255, 255, 255, 0.9);
    }
`;
document.head.appendChild(faqStyle);

// Form validation and submission
document.addEventListener('DOMContentLoaded', () => {

    // Hero scroll indicator functionality
    const heroScrollIndicator = document.querySelector('.hero .scroll-indicator');
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.freeze-section');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add click handlers for demo buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .get-windows-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Get for') || this.textContent.includes('Download')) {
                showNotification('Download started! Check your downloads folder.', 'success');
            } else if (this.textContent.includes('Started for Free')) {
                showNotification('Welcome to RNG Luxe! Your free trial has started.', 'success');
            }
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #10b981;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #64748b;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        notificationStyle.id = 'notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = 'none';
        }
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('RNG Luxe website loaded successfully!');
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Initialize any additional features
    initializeAnimations();
    
    // Initialize Mac Interface
    initializeMacInterface();
});

// Initialize animations
function initializeAnimations() {
    // Add staggered animation to cheat text
    const cheatTextSpans = document.querySelectorAll('.cheat-text span');
    cheatTextSpans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
        span.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Mac Interface Interactive Functionality
function initializeMacInterface() {
    // Window Controls
    const closeBtn = document.querySelector('.control-btn.close');
    const minimizeBtn = document.querySelector('.control-btn.minimize');
    const maximizeBtn = document.querySelector('.control-btn.maximize');
    const macWindow = document.querySelector('.mac-window');
    
    if (closeBtn && macWindow) {
        closeBtn.addEventListener('click', () => {
            macWindow.style.transform = 'scale(0.8)';
            macWindow.style.opacity = '0';
            setTimeout(() => {
                macWindow.style.display = 'none';
                showMacNotification('RNG Luxe ATS has been closed');
            }, 300);
        });
    }
    
    if (minimizeBtn && macWindow) {
        minimizeBtn.addEventListener('click', () => {
            macWindow.style.transform = 'scale(0.9) translateY(50px)';
            macWindow.style.opacity = '0.5';
            setTimeout(() => {
                macWindow.style.transform = 'scale(1) translateY(0)';
                macWindow.style.opacity = '1';
                showMacNotification('RNG Luxe ATS minimized');
            }, 300);
        });
    }
    
    if (maximizeBtn && macWindow) {
        let isMaximized = false;
        maximizeBtn.addEventListener('click', () => {
            if (!isMaximized) {
                macWindow.style.width = '100vw';
                macWindow.style.height = '100vh';
                macWindow.style.position = 'fixed';
                macWindow.style.top = '0';
                macWindow.style.left = '0';
                macWindow.style.transform = 'scale(1)';
                isMaximized = true;
                showMacNotification('RNG Luxe ATS maximized');
            } else {
                macWindow.style.width = '1200px';
                macWindow.style.height = 'auto';
                macWindow.style.position = 'relative';
                macWindow.style.top = 'auto';
                macWindow.style.left = 'auto';
                macWindow.style.transform = 'scale(1)';
                isMaximized = false;
                showMacNotification('RNG Luxe ATS restored');
            }
        });
    }
    
    // Navigation Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update main content based on selection
            const navText = item.querySelector('span').textContent;
            updateMainContent(navText);
        });
    });
    
    // Mac Cards Interactive
    const macCards = document.querySelectorAll('.mac-card');
    macCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add pulse animation
            card.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
            
            // Show detailed view
            const cardTitle = card.querySelector('h3').textContent;
            showCardDetails(cardTitle);
        });
    });
    
    // Mac Buttons Interactive
    const macBtns = document.querySelectorAll('.mac-btn');
    macBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            const btnText = btn.textContent.trim();
            handleButtonClick(btnText);
        });
    });
    
    // Menu Items Interactive
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuText = item.textContent;
            showMenuAction(menuText);
        });
    });
    
    // Status Dot Animation
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.opacity = statusDot.style.opacity === '0.5' ? '1' : '0.5';
        }, 2000);
    }
    
    // Live Metrics Update
    updateLiveMetrics();
    setInterval(updateLiveMetrics, 5000);
    
    // Applicant Cards Interactive
    const applicantCards = document.querySelectorAll('.applicant-card');
    applicantCards.forEach(card => {
        card.addEventListener('click', () => {
            const candidateId = card.getAttribute('data-candidate');
            openCandidateModal(candidateId);
        });
    });
    
}

// Update Main Content Function
function updateMainContent(section) {
    const contentHeader = document.querySelector('.content-header h2');
    const mainContent = document.querySelector('.mac-main-content');
    
    if (!contentHeader || !mainContent) return;
    
    switch(section) {
        case 'Dashboard':
            contentHeader.textContent = 'Dashboard Overview';
            updateDashboardContent();
            break;
        case 'Candidates':
            contentHeader.textContent = 'Candidate Management';
            updateCandidatesContent();
            break;
        case 'Assessments':
            contentHeader.textContent = 'Assessment Center';
            updateAssessmentsContent();
            break;
        case 'Reports':
            contentHeader.textContent = 'Analytics & Reports';
            updateReportsContent();
            break;
        case 'Settings':
            contentHeader.textContent = 'System Settings';
            updateSettingsContent();
            break;
    }
}

// Update Dashboard Content
function updateDashboardContent() {
    const cardsGrid = document.querySelector('.mac-cards-grid');
    if (!cardsGrid) return;
    
    cardsGrid.innerHTML = `
        <div class="mac-card">
            <div class="card-header">
                <h3>Active Assessments</h3>
                <div class="card-icon assessment"></div>
            </div>
            <div class="card-content">
                <div class="metric">12</div>
                <div class="metric-label">In Progress</div>
            </div>
        </div>
        <div class="mac-card">
            <div class="card-header">
                <h3>AI Screening</h3>
                <div class="card-icon ai"></div>
            </div>
            <div class="card-content">
                <div class="metric">98%</div>
                <div class="metric-label">Accuracy</div>
            </div>
        </div>
        <div class="mac-card">
            <div class="card-header">
                <h3>Anti-Cheating</h3>
                <div class="card-icon security"></div>
            </div>
            <div class="card-content">
                <div class="metric">Active</div>
                <div class="metric-label">Real-time</div>
            </div>
        </div>
    `;
    
    // Re-attach event listeners to new cards
    const newCards = document.querySelectorAll('.mac-card');
    newCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3').textContent;
            showCardDetails(cardTitle);
        });
    });
}

// Update Live Metrics
function updateLiveMetrics() {
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach(metric => {
        if (metric.textContent.includes('%')) {
            // Simulate AI accuracy fluctuation
            const newValue = Math.floor(Math.random() * 5) + 95;
            metric.textContent = newValue + '%';
        } else if (metric.textContent.includes('12')) {
            // Simulate assessment count changes
            const newValue = Math.floor(Math.random() * 3) + 10;
            metric.textContent = newValue;
        }
    });
}

// Handle Button Clicks
function handleButtonClick(buttonText) {
    switch(buttonText) {
        case 'Start New Assessment':
            showMacNotification('Starting new assessment session...');
            simulateAssessmentStart();
            break;
        case 'Monitor Live Session':
            showMacNotification('Opening live monitoring dashboard...');
            openLiveMonitor();
            break;
        case 'Configure Settings':
            showMacNotification('Opening settings panel...');
            openSettings();
            break;
    }
}

// Simulate Assessment Start
function simulateAssessmentStart() {
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        statusDot.style.background = '#FF9500';
        statusDot.style.animation = 'pulse 1s infinite';
    }
    
    setTimeout(() => {
        if (statusDot) {
            statusDot.style.background = '#34C759';
        }
        showMacNotification('Assessment session started successfully!');
    }, 2000);
}

// Show Card Details
function showCardDetails(cardTitle) {
    const details = {
        'Active Assessments': '12 candidates currently taking assessments. 3 technical, 5 behavioral, 4 coding challenges.',
        'AI Screening': 'AI is analyzing 8 candidates with 98% accuracy. Processing facial expressions, voice patterns, and response quality.',
        'Anti-Cheating': 'Real-time monitoring active. Screen recording, eye tracking, and background app detection enabled.'
    };
    
    showMacNotification(details[cardTitle] || 'Card details not available');
}

// Show Menu Actions
function showMenuAction(menuItem) {
    const actions = {
        'File': 'File menu: New Assessment, Open Session, Save Report, Export Data',
        'Edit': 'Edit menu: Copy Results, Paste Candidate Data, Undo Action',
        'View': 'View menu: Toggle Sidebar, Full Screen, Refresh Data',
        'Window': 'Window menu: Minimize All, Bring All to Front, New Window',
        'Help': 'Help menu: Documentation, Keyboard Shortcuts, Contact Support'
    };
    
    showMacNotification(actions[menuItem] || 'Menu action not available');
}

// Mac-specific notification system
function showMacNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.mac-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'mac-notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideIn 0.3s ease-out;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add Mac-specific CSS animations
const macStyle = document.createElement('style');
macStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .mac-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: #007AFF;
    }
    
    .nav-item:hover {
        background: rgba(0, 122, 255, 0.1);
        color: #007AFF;
    }
    
    .mac-btn:hover {
        transform: translateY(-2px);
    }
    
    .mac-btn.primary:hover {
        box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
    }
`;
document.head.appendChild(macStyle);

// ATS Workflow Functions
const candidateData = {
    'john-doe': {
        name: 'John Doe',
        position: 'Senior Software Engineer',
        experience: '5+ years',
        location: 'San Francisco, CA',
        applied: '2 days ago',
        analysis: 'Strong technical background with excellent problem-solving skills. Previous experience in full-stack development and team leadership. High cultural fit score based on communication patterns and work style preferences.',
        matchScore: '92%'
    },
    'sarah-smith': {
        name: 'Sarah Smith',
        position: 'Frontend Developer',
        experience: '3+ years',
        location: 'New York, NY',
        applied: '1 day ago',
        analysis: 'Excellent UI/UX skills with modern framework experience. Strong portfolio showcasing responsive design and user experience optimization. Good communication skills and collaborative mindset.',
        matchScore: '87%'
    },
    'mike-johnson': {
        name: 'Mike Johnson',
        position: 'Full Stack Developer',
        experience: '4+ years',
        location: 'Austin, TX',
        applied: '3 days ago',
        analysis: 'Comprehensive development experience. Strong backend skills with database optimization experience. Good understanding of DevOps practices and cloud technologies.',
        matchScore: '95%'
    }
};

function openCandidateModal(candidateId) {
    const modal = document.getElementById('candidateModal');
    const candidate = candidateData[candidateId];
    
    if (candidate) {
        document.getElementById('candidateName').textContent = candidate.name;
        document.getElementById('candidateFullName').textContent = candidate.name;
        document.getElementById('candidatePosition').textContent = candidate.position;
        document.getElementById('candidateExperience').textContent = candidate.experience;
        document.getElementById('candidateLocation').textContent = candidate.location;
        document.getElementById('candidateApplied').textContent = candidate.applied;
        document.getElementById('candidateAnalysis').textContent = candidate.analysis;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCandidateModal() {
    const modal = document.getElementById('candidateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function sendAssessment() {
    showMacNotification('Assessment sent to candidate! They will receive an email with instructions.');
    closeCandidateModal();
    
    // Update candidate status
    const candidateName = document.getElementById('candidateFullName').textContent;
    updateCandidateStatus(candidateName, 'assessment');
}

function scheduleInterview() {
    showMacNotification('Interview scheduling link sent to candidate!');
    closeCandidateModal();
    
    // Update candidate status
    const candidateName = document.getElementById('candidateFullName').textContent;
    updateCandidateStatus(candidateName, 'interview');
}

function rejectCandidate() {
    if (confirm('Are you sure you want to reject this candidate?')) {
        showMacNotification('Candidate has been rejected and notified.');
        closeCandidateModal();
        
        // Update candidate status
        const candidateName = document.getElementById('candidateFullName').textContent;
        updateCandidateStatus(candidateName, 'rejected');
    }
}

function updateCandidateStatus(candidateName, status) {
    // Find the candidate card and update status
    const cards = document.querySelectorAll('.applicant-card');
    cards.forEach(card => {
        const nameElement = card.querySelector('h4');
        if (nameElement && nameElement.textContent === candidateName) {
            const statusBadge = card.querySelector('.status-badge');
            statusBadge.textContent = getStatusText(status);
            statusBadge.className = `status-badge ${status}`;
        }
    });
}

function getStatusText(status) {
    const statusTexts = {
        'assessment': 'In Assessment',
        'interview': 'Interview Scheduled',
        'rejected': 'Rejected',
        'completed': 'Completed'
    };
    return statusTexts[status] || 'Pending Review';
}

// Update navigation content based on section
function updateCandidatesContent() {
    const contentHeader = document.querySelector('.content-header h2');
    const mainContent = document.querySelector('.mac-main-content');
    
    contentHeader.textContent = 'Candidate Management';
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h2>Candidate Management</h2>
            <div class="status-indicators">
                <div class="status-dot active"></div>
                <span>247 Total Candidates</span>
            </div>
        </div>
        
        <div class="mac-cards-grid">
            <div class="mac-card">
                <div class="card-header">
                    <h3>New Applications</h3>
                    <div class="card-icon candidates"></div>
                </div>
                <div class="card-content">
                    <div class="metric">23</div>
                    <div class="metric-label">This Week</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>AI Screened</h3>
                    <div class="card-icon ai"></div>
                </div>
                <div class="card-content">
                    <div class="metric">168</div>
                    <div class="metric-label">Qualified</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>In Assessment</h3>
                    <div class="card-icon assessment"></div>
                </div>
                <div class="card-content">
                    <div class="metric">12</div>
                    <div class="metric-label">Active</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Interviewed</h3>
                    <div class="card-icon reports"></div>
                </div>
                <div class="card-content">
                    <div class="metric">45</div>
                    <div class="metric-label">Completed</div>
                </div>
            </div>
        </div>
        
        <div class="applicants-section">
            <h3>All Candidates</h3>
            <div class="applicants-list">
                <div class="applicant-card" data-candidate="john-doe">
                    <div class="applicant-avatar">
                        <div class="avatar-circle">JD</div>
                    </div>
                    <div class="applicant-info">
                        <h4>John Doe</h4>
                        <p class="applicant-role">Senior Software Engineer</p>
                        <div class="ai-match">
                            <span class="match-score">92%</span>
                            <span class="match-label">AI Match</span>
                        </div>
                    </div>
                    <div class="applicant-status">
                        <span class="status-badge pending">Pending Review</span>
                    </div>
                </div>
                <div class="applicant-card" data-candidate="sarah-smith">
                    <div class="applicant-avatar">
                        <div class="avatar-circle">SS</div>
                    </div>
                    <div class="applicant-info">
                        <h4>Sarah Smith</h4>
                        <p class="applicant-role">Frontend Developer</p>
                        <div class="ai-match">
                            <span class="match-score">87%</span>
                            <span class="match-label">AI Match</span>
                        </div>
                    </div>
                    <div class="applicant-status">
                        <span class="status-badge assessment">In Assessment</span>
                    </div>
                </div>
                <div class="applicant-card" data-candidate="mike-johnson">
                    <div class="applicant-avatar">
                        <div class="avatar-circle">MJ</div>
                    </div>
                    <div class="applicant-info">
                        <h4>Mike Johnson</h4>
                        <p class="applicant-role">Full Stack Developer</p>
                        <div class="ai-match">
                            <span class="match-score">95%</span>
                            <span class="match-label">AI Match</span>
                        </div>
                    </div>
                    <div class="applicant-status">
                        <span class="status-badge completed">Completed</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Re-attach event listeners
    const newCards = document.querySelectorAll('.applicant-card');
    newCards.forEach(card => {
        card.addEventListener('click', () => {
            const candidateId = card.getAttribute('data-candidate');
            openCandidateModal(candidateId);
        });
    });
}

function updateAssessmentsContent() {
    const contentHeader = document.querySelector('.content-header h2');
    const mainContent = document.querySelector('.mac-main-content');
    
    contentHeader.textContent = 'Assessment Center';
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h2>Assessment Center</h2>
            <div class="status-indicators">
                <div class="status-dot active"></div>
                <span>12 Active Assessments</span>
            </div>
        </div>
        
        <div class="mac-cards-grid">
            <div class="mac-card">
                <div class="card-header">
                    <h3>Technical Tests</h3>
                    <div class="card-icon assessment"></div>
                </div>
                <div class="card-content">
                    <div class="metric">8</div>
                    <div class="metric-label">In Progress</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Behavioral Tests</h3>
                    <div class="card-icon ai"></div>
                </div>
                <div class="card-content">
                    <div class="metric">4</div>
                    <div class="metric-label">In Progress</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Completed Today</h3>
                    <div class="card-icon reports"></div>
                </div>
                <div class="card-content">
                    <div class="metric">23</div>
                    <div class="metric-label">Assessments</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Cheating Detected</h3>
                    <div class="card-icon security"></div>
                </div>
                <div class="card-content">
                    <div class="metric">2</div>
                    <div class="metric-label">Today</div>
                </div>
            </div>
        </div>
        
        <div class="mac-controls">
            <button class="mac-btn primary">
                <div class="btn-icon start"></div>
                Create New Assessment
            </button>
            <button class="mac-btn secondary">
                <div class="btn-icon monitor"></div>
                Monitor Live Sessions
            </button>
            <button class="mac-btn tertiary">
                <div class="btn-icon settings"></div>
                Assessment Settings
            </button>
        </div>
    `;
}

function updateReportsContent() {
    const contentHeader = document.querySelector('.content-header h2');
    const mainContent = document.querySelector('.mac-main-content');
    
    contentHeader.textContent = 'Analytics & Reports';
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h2>Analytics & Reports</h2>
            <div class="status-indicators">
                <div class="status-dot active"></div>
                <span>Real-time Analytics</span>
            </div>
        </div>
        
        <div class="mac-cards-grid">
            <div class="mac-card">
                <div class="card-header">
                    <h3>Assessment Completion</h3>
                    <div class="card-icon reports"></div>
                </div>
                <div class="card-content">
                    <div class="metric">89%</div>
                    <div class="metric-label">Success Rate</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Cheating Attempts</h3>
                    <div class="card-icon security"></div>
                </div>
                <div class="card-content">
                    <div class="metric">3.2%</div>
                    <div class="metric-label">Detection Rate</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>AI Accuracy</h3>
                    <div class="card-icon ai"></div>
                </div>
                <div class="card-content">
                    <div class="metric">94%</div>
                    <div class="metric-label">Prediction Rate</div>
                </div>
            </div>
            <div class="mac-card">
                <div class="card-header">
                    <h3>Time Saved</h3>
                    <div class="card-icon assessment"></div>
                </div>
                <div class="card-content">
                    <div class="metric">67%</div>
                    <div class="metric-label">Efficiency Gain</div>
                </div>
            </div>
        </div>
        
        <div class="mac-controls">
            <button class="mac-btn primary">
                <div class="btn-icon start"></div>
                Generate Report
            </button>
            <button class="mac-btn secondary">
                <div class="btn-icon monitor"></div>
                Export Data
            </button>
            <button class="mac-btn tertiary">
                <div class="btn-icon settings"></div>
                Custom Analytics
            </button>
        </div>
    `;
}

function updateSettingsContent() {
    const contentHeader = document.querySelector('.content-header h2');
    const mainContent = document.querySelector('.mac-main-content');
    
    contentHeader.textContent = 'System Settings';
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h2>System Settings</h2>
            <div class="status-indicators">
                <div class="status-dot active"></div>
                <span>All Systems Operational</span>
            </div>
        </div>
        
        <div class="settings-grid">
            <div class="settings-section">
                <h3>Assessment Settings</h3>
                <div class="setting-item">
                    <label>Default Assessment Duration</label>
                    <select>
                        <option>30 minutes</option>
                        <option selected>60 minutes</option>
                        <option>90 minutes</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Anti-Cheating Level</label>
                    <select>
                        <option>Basic</option>
                        <option selected>Standard</option>
                        <option>High Security</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Screen Recording</label>
                    <input type="checkbox" checked>
                    <span>Enable screen recording during assessments</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>AI Configuration</h3>
                <div class="setting-item">
                    <label>AI Match Threshold: <span id="thresholdValue">80%</span></label>
                    <input type="range" id="thresholdSlider" min="70" max="95" value="80">
                </div>
                <div class="setting-item">
                    <label>Auto-screening</label>
                    <input type="checkbox" checked>
                    <span>Automatically screen candidates with AI</span>
                </div>
                <div class="setting-item">
                    <label>Facial Recognition</label>
                    <input type="checkbox" checked>
                    <span>Enable facial recognition for identity verification</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>Notification Settings</h3>
                <div class="setting-item">
                    <label>Email Notifications</label>
                    <input type="checkbox" checked>
                    <span>Receive email alerts for new applications</span>
                </div>
                <div class="setting-item">
                    <label>Assessment Reminders</label>
                    <input type="checkbox" checked>
                    <span>Send reminders to candidates</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>Security Settings</h3>
                <div class="setting-item">
                    <label>Two-Factor Authentication</label>
                    <input type="checkbox" checked>
                    <span>Require 2FA for admin access</span>
                </div>
                <div class="setting-item">
                    <label>Session Timeout</label>
                    <select>
                        <option>15 minutes</option>
                        <option selected>30 minutes</option>
                        <option>60 minutes</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="mac-controls">
            <button class="mac-btn primary" onclick="saveSettings()">
                <div class="btn-icon settings"></div>
                Save Settings
            </button>
            <button class="mac-btn secondary" onclick="resetSettings()">
                <div class="btn-icon monitor"></div>
                Reset to Default
            </button>
        </div>
    `;
    
    // Add event listener for threshold slider
    const thresholdSlider = document.getElementById('thresholdSlider');
    const thresholdValue = document.getElementById('thresholdValue');
    if (thresholdSlider && thresholdValue) {
        thresholdSlider.addEventListener('input', function() {
            thresholdValue.textContent = this.value + '%';
        });
    }
}

// Settings Functions
function saveSettings() {
    showMacNotification('Settings saved successfully!');
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        showMacNotification('Settings reset to default values.');
    }
}