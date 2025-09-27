// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
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
            // Don't prevent default for links (Our Team)
            if (this.tagName === 'A') {
                return; // Let the link navigate naturally
            }
            
            e.preventDefault();
            
            if (this.textContent.includes('Join Waitlist')) {
                showNotification('🎉 You\'re on the waitlist! We\'ll notify you when RNG Luxe is ready.', 'success');
            } else if (this.textContent.includes('Get for') || this.textContent.includes('Download')) {
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
        case 'Jobs':
            contentHeader.textContent = 'Job Management';
            updateJobsContent();
            break;
        case 'Assessments':
            contentHeader.textContent = 'Assessment Center';
            updateAssessmentsContent();
            break;
        case 'Interviews':
            contentHeader.textContent = 'Interview Management';
            updateInterviewsContent();
            break;
        case 'Analytics':
            contentHeader.textContent = 'Analytics & Reports';
            updateReportsContent();
            break;
        case 'Settings':
            contentHeader.textContent = 'System Settings';
            updateSettingsContent();
            break;
    }
}

// Dummy Jobs Data
const jobsData = [
    {
        id: 1,
        jobId: "ENG-001",
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "San Francisco, CA",
        status: "Open",
        applicants: 47,
        postedDate: "2024-01-15",
        salary: "$120k - $160k",
        type: "Full-time"
    },
    {
        id: 2,
        jobId: "PM-002",
        title: "Product Manager",
        department: "Product",
        location: "New York, NY",
        status: "Open",
        applicants: 23,
        postedDate: "2024-01-20",
        salary: "$130k - $180k",
        type: "Full-time"
    },
    {
        id: 3,
        jobId: "UX-003",
        title: "UX Designer",
        department: "Design",
        location: "Remote",
        status: "Closed",
        applicants: 34,
        postedDate: "2024-01-10",
        salary: "$90k - $120k",
        type: "Full-time"
    },
    {
        id: 4,
        jobId: "DS-004",
        title: "Data Scientist",
        department: "Analytics",
        location: "Seattle, WA",
        status: "Open",
        applicants: 18,
        postedDate: "2024-01-25",
        salary: "$110k - $150k",
        type: "Full-time"
    },
    {
        id: 5,
        jobId: "MKT-005",
        title: "Marketing Manager",
        department: "Marketing",
        location: "Austin, TX",
        status: "Open",
        applicants: 29,
        postedDate: "2024-01-22",
        salary: "$80k - $110k",
        type: "Full-time"
    },
    {
        id: 6,
        jobId: "DEV-006",
        title: "Frontend Developer",
        department: "Engineering",
        location: "Los Angeles, CA",
        status: "Open",
        applicants: 31,
        postedDate: "2024-01-18",
        salary: "$90k - $130k",
        type: "Full-time"
    },
    {
        id: 7,
        jobId: "QA-007",
        title: "QA Engineer",
        department: "Engineering",
        location: "Chicago, IL",
        status: "Open",
        applicants: 15,
        postedDate: "2024-01-23",
        salary: "$85k - $120k",
        type: "Full-time"
    },
    {
        id: 8,
        jobId: "SALES-008",
        title: "Sales Manager",
        department: "Sales",
        location: "Miami, FL",
        status: "Open",
        applicants: 22,
        postedDate: "2024-01-21",
        salary: "$100k - $140k",
        type: "Full-time"
    },
    {
        id: 9,
        jobId: "HR-009",
        title: "HR Specialist",
        department: "Human Resources",
        location: "Denver, CO",
        status: "Open",
        applicants: 19,
        postedDate: "2024-01-19",
        salary: "$70k - $95k",
        type: "Full-time"
    },
    {
        id: 10,
        jobId: "OPS-010",
        title: "Operations Manager",
        department: "Operations",
        location: "Phoenix, AZ",
        status: "Open",
        applicants: 26,
        postedDate: "2024-01-17",
        salary: "$95k - $125k",
        type: "Full-time"
    }
];

// Update Jobs Content
function updateJobsContent() {
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Job Management</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Jobs</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search jobs...">
                </div>
                <div class="header-actions">
                    <button class="action-btn" onclick="createNewJob()">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <div class="jobs-grid">
                ${jobsData.map(job => `
                    <div class="job-card" data-job-id="${job.id}">
                        <div class="job-header">
                            <div class="job-title-section">
                                <div class="job-id-display">${job.jobId}</div>
                                <h3>${job.title}</h3>
                                <div class="job-meta">
                                    <span class="job-department">${job.department}</span>
                                    <span class="job-location">${job.location}</span>
                                </div>
                            </div>
                            <div class="job-status">
                                <span class="status-badge ${job.status.toLowerCase()}">${job.status}</span>
                            </div>
                        </div>
                        
                        <div class="job-details">
                            <div class="job-info">
                                <div class="info-item">
                                    <i class="fas fa-users"></i>
                                    <span>${job.applicants} applicants</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>Posted ${job.postedDate}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span>${job.salary}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${job.type}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="job-actions">
                            <button class="action-btn-small" onclick="viewApplicants(${job.id})">
                                <i class="fas fa-users"></i>
                                View Applicants
                            </button>
                            <button class="action-btn-small secondary" onclick="editJob(${job.id})">
                                <i class="fas fa-edit"></i>
                                Edit Job
                            </button>
                            <button class="action-btn-small danger" onclick="toggleJobStatus(${job.id})">
                                <i class="fas fa-${job.status === 'Open' ? 'pause' : 'play'}"></i>
                                ${job.status === 'Open' ? 'Close' : 'Open'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Job Management Functions
function viewApplicants(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    showMacNotification(`Redirecting to candidates for "${job.title}"...`);
    
    // Simulate navigation to candidates section
    setTimeout(() => {
        const candidatesNav = document.querySelector('[data-section="candidates"]');
        if (candidatesNav) {
            candidatesNav.click();
        }
    }, 1000);
}

function editJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    showMacNotification(`Opening job editor for "${job.title}"...`);
    
    // Simulate opening job editor modal
    setTimeout(() => {
        showMacNotification(`Job editor opened for "${job.title}"`);
    }, 500);
}

function toggleJobStatus(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    job.status = job.status === 'Open' ? 'Closed' : 'Open';
    
    showMacNotification(`Job "${job.title}" ${job.status.toLowerCase()}`);
    
    // Refresh the jobs content
    updateJobsContent();
}

function createNewJob() {
    showMacNotification('Opening job creation form...');
    
    // Simulate opening job creation modal
    setTimeout(() => {
        showMacNotification('Job creation form opened');
    }, 500);
}

// Update Interviews Content
function updateInterviewsContent() {
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Interview Management</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Interviews</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search interviews...">
                </div>
                <div class="header-actions">
                    <button class="action-btn" onclick="scheduleInterview()">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <div class="interviews-grid">
                <div class="interview-card">
                    <div class="interview-header">
                        <div class="candidate-info">
                            <div class="candidate-avatar">JD</div>
                            <div class="candidate-details">
                                <h4>John Doe</h4>
                                <p>Senior Software Engineer</p>
                            </div>
                        </div>
                        <div class="interview-status">
                            <span class="status-badge scheduled">Scheduled</span>
                        </div>
                    </div>
                    <div class="interview-details">
                        <div class="interview-info">
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span>Jan 30, 2024 at 2:00 PM</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-video"></i>
                                <span>Video Call</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-user"></i>
                                <span>Sarah Johnson (Interviewer)</span>
                            </div>
                        </div>
                    </div>
                    <div class="interview-actions">
                        <button class="action-btn-small" onclick="startInterview()">
                            <i class="fas fa-play"></i>
                            Start Interview
                        </button>
                        <button class="action-btn-small secondary" onclick="rescheduleInterview()">
                            <i class="fas fa-calendar-alt"></i>
                            Reschedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function scheduleInterview() {
    showMacNotification('Opening interview scheduler...');
}

function startInterview() {
    showMacNotification('Starting interview session...');
}

function rescheduleInterview() {
    showMacNotification('Opening reschedule dialog...');
}

// Candidate Management Functions
function inviteCandidates() {
    showMacNotification('Opening candidate invitation form...');
}

function exportCandidates() {
    showMacNotification('Exporting candidate data...');
}

function applyFilters() {
    showMacNotification('Applying filters...');
}

function toggleView(viewType) {
    const grid = document.getElementById('candidatesGrid');
    const buttons = document.querySelectorAll('.view-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (viewType === 'list') {
        grid.style.display = 'block';
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
    }
    
    showMacNotification(`Switched to ${viewType} view`);
}

function viewCandidateProfile(candidateId) {
    showMacNotification(`Opening candidate profile ${candidateId}...`);
}

function sendAssessment(candidateId) {
    showMacNotification(`Sending assessment to candidate ${candidateId}...`);
}

function rejectCandidate(candidateId) {
    if (confirm('Are you sure you want to reject this candidate?')) {
        showMacNotification(`Candidate ${candidateId} rejected`);
    }
}

function scheduleInterview(candidateId) {
    showMacNotification(`Scheduling interview for candidate ${candidateId}...`);
}

function viewAssessment(candidateId) {
    showMacNotification(`Opening assessment results for candidate ${candidateId}...`);
}

function makeOffer(candidateId) {
    showMacNotification(`Making offer to candidate ${candidateId}...`);
}

function viewInterview(candidateId) {
    showMacNotification(`Opening interview recording for candidate ${candidateId}...`);
}

// Assessment Functions
function createNewAssessment() {
    showMacNotification('Opening assessment creation wizard...');
}

function monitorSessions() {
    showMacNotification('Opening live monitoring dashboard...');
}

function manageAssessmentTypes() {
    showMacNotification('Opening assessment type management...');
}

function viewTechnicalTests() {
    showMacNotification('Loading technical tests...');
}

function createTechnicalTest() {
    showMacNotification('Creating new technical test...');
}

function viewBehavioralTests() {
    showMacNotification('Loading behavioral tests...');
}

function createBehavioralTest() {
    showMacNotification('Creating new behavioral test...');
}

function viewCommunicationTests() {
    showMacNotification('Loading communication tests...');
}

function createCommunicationTest() {
    showMacNotification('Creating new communication test...');
}

function viewAllAssessments() {
    showMacNotification('Loading all assessments...');
}

function monitorAssessment(assessmentId) {
    showMacNotification(`Opening live monitoring for assessment ${assessmentId}...`);
}

function pauseAssessment(assessmentId) {
    if (confirm('Are you sure you want to pause this assessment?')) {
        showMacNotification(`Assessment ${assessmentId} paused`);
    }
}

function terminateAssessment(assessmentId) {
    if (confirm('Are you sure you want to terminate this assessment? This action cannot be undone.')) {
        showMacNotification(`Assessment ${assessmentId} terminated`);
    }
}

function reviewCheating(assessmentId) {
    showMacNotification(`Opening cheating review for assessment ${assessmentId}...`);
}

// New Applications Functions
function exportApplications() {
    showMacNotification('Exporting applications data...');
}

function bulkActions() {
    showMacNotification('Opening bulk actions menu...');
}

function toggleSelectAll() {
    const selectAll = document.querySelector('.select-all');
    const selectRows = document.querySelectorAll('.select-row');
    
    selectRows.forEach(row => {
        row.checked = selectAll.checked;
    });
    
    showMacNotification(`${selectAll.checked ? 'All' : 'No'} applications selected`);
}

function viewApplication(appId) {
    showMacNotification(`Opening application details for application ${appId}...`);
    
    // Simulate opening application modal
    setTimeout(() => {
        showMacNotification(`Application ${appId} details loaded`);
    }, 500);
}

function rejectApplication(appId) {
    if (confirm('Are you sure you want to reject this application?')) {
        showMacNotification(`Application ${appId} rejected`);
        
        // Update the status in the table
        const row = document.querySelector(`[data-app-id="${appId}"]`);
        if (row) {
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.textContent = 'Rejected';
            statusBadge.className = 'status-badge rejected';
        }
    }
}

// Update Dashboard Content
function updateDashboardContent() {
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Dashboard Overview</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Dashboard</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search candidates, jobs...">
                </div>
                <div class="header-actions">
                    <button class="action-btn">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                    <button class="action-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <!-- Hero Metrics -->
            <div class="hero-metrics">
                <div class="hero-card primary">
                    <div class="hero-content">
                        <div class="hero-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="hero-info">
                            <h3>Total Candidates</h3>
                            <div class="hero-value">2,847</div>
                            <div class="hero-subtitle">+12% from last month</div>
                        </div>
                    </div>
                    <div class="hero-chart">
                        <div class="chart-bars">
                            <div class="chart-bar" style="height: 60%"></div>
                            <div class="chart-bar" style="height: 80%"></div>
                            <div class="chart-bar" style="height: 45%"></div>
                            <div class="chart-bar" style="height: 90%"></div>
                            <div class="chart-bar" style="height: 70%"></div>
                        </div>
                    </div>
                </div>

                <div class="hero-card secondary">
                    <div class="hero-content">
                        <div class="hero-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="hero-info">
                            <h3>AI Accuracy</h3>
                            <div class="hero-value">98.7%</div>
                            <div class="hero-subtitle">Screening precision</div>
                        </div>
                    </div>
                    <div class="hero-progress">
                        <div class="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                      fill="none" stroke="#e1e5e9" stroke-width="2"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                      fill="none" stroke="#34C759" stroke-width="2" stroke-dasharray="98.7, 100"/>
                            </svg>
                            <div class="progress-text">98.7%</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="quick-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">156</div>
                        <div class="stat-label">Active Assessments</div>
                        <div class="stat-trend positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+8%</span>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">23</div>
                        <div class="stat-label">Cheating Detected</div>
                        <div class="stat-trend negative">
                            <i class="fas fa-arrow-down"></i>
                            <span>-15%</span>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">94%</div>
                        <div class="stat-label">Success Rate</div>
                        <div class="stat-trend positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+5%</span>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">2.3h</div>
                        <div class="stat-label">Avg. Process Time</div>
                        <div class="stat-trend positive">
                            <i class="fas fa-arrow-down"></i>
                            <span>-12%</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="activity-section">
                <div class="section-header">
                    <h3>Recent Activity</h3>
                    <button class="view-all-btn">View All</button>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">New Application Received</div>
                            <div class="activity-desc">John Doe applied for Senior Software Engineer</div>
                            <div class="activity-time">2 minutes ago</div>
                        </div>
                        <div class="activity-status">
                            <span class="status-badge new">New</span>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">AI Screening Complete</div>
                            <div class="activity-desc">Sarah Miller scored 92% match</div>
                            <div class="activity-time">15 minutes ago</div>
                        </div>
                        <div class="activity-status">
                            <span class="status-badge success">Qualified</span>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Cheating Attempt Detected</div>
                            <div class="activity-desc">Mike Johnson - Screen sharing detected</div>
                            <div class="activity-time">1 hour ago</div>
                        </div>
                        <div class="activity-status">
                            <span class="status-badge danger">Flagged</span>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Assessment Completed</div>
                            <div class="activity-desc">Alex Lee finished Frontend Developer test</div>
                            <div class="activity-time">2 hours ago</div>
                        </div>
                        <div class="activity-status">
                            <span class="status-badge success">Completed</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Performance Chart -->
            <div class="chart-section">
                <div class="section-header">
                    <h3>Performance Overview</h3>
                    <div class="chart-controls">
                        <button class="chart-btn active">7 Days</button>
                        <button class="chart-btn">30 Days</button>
                        <button class="chart-btn">90 Days</button>
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-placeholder">
                        <div class="chart-line">
                            <div class="line-point" style="left: 10%; bottom: 20%"></div>
                            <div class="line-point" style="left: 25%; bottom: 40%"></div>
                            <div class="line-point" style="left: 40%; bottom: 30%"></div>
                            <div class="line-point" style="left: 55%; bottom: 60%"></div>
                            <div class="line-point" style="left: 70%; bottom: 80%"></div>
                            <div class="line-point" style="left: 85%; bottom: 90%"></div>
                        </div>
                        <div class="chart-labels">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Candidate Management</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Candidates</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search candidates...">
                </div>
                <div class="header-actions">
                    <button class="action-btn" onclick="inviteCandidates()">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button class="action-btn" onclick="exportCandidates()">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <!-- Candidate Metrics -->
            <div class="candidate-metrics">
                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="metric-info">
                            <h3>New Applications</h3>
                            <div class="metric-value">23</div>
                            <div class="metric-subtitle">This Week</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+12%</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="metric-info">
                            <h3>AI Screened</h3>
                            <div class="metric-value">168</div>
                            <div class="metric-subtitle">Qualified</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8%</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="metric-info">
                            <h3>In Assessment</h3>
                            <div class="metric-value">10</div>
                            <div class="metric-subtitle">Active</div>
                        </div>
                    </div>
                    <div class="metric-trend neutral">
                        <i class="fas fa-minus"></i>
                        <span>0%</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="metric-info">
                            <h3>Interviewed</h3>
                            <div class="metric-value">45</div>
                            <div class="metric-subtitle">Completed</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15%</span>
                    </div>
                </div>
            </div>

            <!-- Candidate Filters -->
            <div class="candidate-filters">
                <div class="filter-group">
                    <label>Status</label>
                    <select class="filter-select">
                        <option value="all">All Candidates</option>
                        <option value="new">New Applications</option>
                        <option value="screened">AI Screened</option>
                        <option value="assessment">In Assessment</option>
                        <option value="interview">Interviewed</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Job Position</label>
                    <select class="filter-select">
                        <option value="all">All Positions</option>
                        <option value="engineer">Software Engineer</option>
                        <option value="manager">Product Manager</option>
                        <option value="designer">UX Designer</option>
                        <option value="scientist">Data Scientist</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>AI Match</label>
                    <select class="filter-select">
                        <option value="all">All Scores</option>
                        <option value="90+">90%+ Match</option>
                        <option value="80+">80%+ Match</option>
                        <option value="70+">70%+ Match</option>
                    </select>
                </div>
                <button class="filter-btn" onclick="applyFilters()">
                    <i class="fas fa-filter"></i>
                    Apply Filters
                </button>
            </div>

            <!-- New Applications Table -->
            <div class="applications-section">
                <div class="section-header">
                    <h3>New Applications (23)</h3>
                    <div class="section-actions">
                        <button class="action-btn-small secondary" onclick="exportApplications()">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                        <button class="action-btn-small secondary" onclick="bulkActions()">
                            <i class="fas fa-tasks"></i>
                            Bulk Actions
                        </button>
                    </div>
                </div>

                <div class="applications-table-container">
                    <table class="applications-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" class="select-all" onchange="toggleSelectAll()">
                                </th>
                                <th>Job ID</th>
                                <th>Applicant Name</th>
                                <th>Position</th>
                                <th>AI Score</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="application-row" data-app-id="1">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#ENG-001</span>
                                    <div class="job-title">Senior Software Engineer</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">JD</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">John Doe</div>
                                            <div class="applicant-email">john.doe@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Engineering</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="9">92%</div>
                                        <div class="score-label">Excellent</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 28, 2024</div>
                                        <div class="time">2:30 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(1)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(1)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(1)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(1)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="2">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#PM-002</span>
                                    <div class="job-title">Product Manager</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">SM</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Sarah Miller</div>
                                            <div class="applicant-email">sarah.miller@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Product</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">87%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 27, 2024</div>
                                        <div class="time">4:15 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(2)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(2)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(2)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(2)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="3">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#UX-003</span>
                                    <div class="job-title">UX Designer</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">AL</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Alex Lee</div>
                                            <div class="applicant-email">alex.lee@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Design</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="9">94%</div>
                                        <div class="score-label">Excellent</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 26, 2024</div>
                                        <div class="time">11:45 AM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(3)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(3)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(3)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(3)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="4">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#DS-004</span>
                                    <div class="job-title">Data Scientist</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">MJ</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Mike Johnson</div>
                                            <div class="applicant-email">mike.johnson@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Analytics</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">89%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 25, 2024</div>
                                        <div class="time">3:20 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(4)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(4)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(4)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(4)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="5">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#MKT-005</span>
                                    <div class="job-title">Marketing Manager</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">EW</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Emma Wilson</div>
                                            <div class="applicant-email">emma.wilson@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Marketing</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">85%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 24, 2024</div>
                                        <div class="time">9:30 AM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(5)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(5)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(5)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(5)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="6">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#DEV-006</span>
                                    <div class="job-title">Frontend Developer</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">RB</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Ryan Brown</div>
                                            <div class="applicant-email">ryan.brown@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Engineering</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">88%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 23, 2024</div>
                                        <div class="time">1:45 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(6)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(6)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(6)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(6)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="7">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#QA-007</span>
                                    <div class="job-title">QA Engineer</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">LD</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Lisa Davis</div>
                                            <div class="applicant-email">lisa.davis@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Engineering</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">91%</div>
                                        <div class="score-label">Excellent</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 22, 2024</div>
                                        <div class="time">10:30 AM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(7)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(7)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(7)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(7)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="8">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#SALES-008</span>
                                    <div class="job-title">Sales Manager</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">TG</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Tom Garcia</div>
                                            <div class="applicant-email">tom.garcia@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Sales</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">86%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 21, 2024</div>
                                        <div class="time">3:15 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(8)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(8)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(8)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(8)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="9">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#HR-009</span>
                                    <div class="job-title">HR Specialist</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">AM</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Anna Martinez</div>
                                            <div class="applicant-email">anna.martinez@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Human Resources</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">83%</div>
                                        <div class="score-label">Good</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 20, 2024</div>
                                        <div class="time">2:00 PM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(9)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(9)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(9)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(9)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="application-row" data-app-id="10">
                                <td><input type="checkbox" class="select-row"></td>
                                <td>
                                    <span class="job-id">#OPS-010</span>
                                    <div class="job-title">Operations Manager</div>
                                </td>
                                <td>
                                    <div class="applicant-info">
                                        <div class="applicant-avatar-small">CW</div>
                                        <div class="applicant-details">
                                            <div class="applicant-name">Chris Wilson</div>
                                            <div class="applicant-email">chris.wilson@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="position-tag">Operations</span>
                                </td>
                                <td>
                                    <div class="ai-score">
                                        <div class="score-circle" data-score="8">90%</div>
                                        <div class="score-label">Excellent</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date">Jan 19, 2024</div>
                                        <div class="time">11:20 AM</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge new">New</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="viewApplication(10)" title="View Application">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="sendAssessment(10)" title="Send Assessment">
                                            <i class="fas fa-clipboard-check"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="scheduleInterview(10)" title="Schedule Interview">
                                            <i class="fas fa-video"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="rejectApplication(10)" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function updateAssessmentsContent() {
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Assessment Center</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Assessments</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search assessments...">
                </div>
                <div class="header-actions">
                    <button class="action-btn" onclick="createNewAssessment()">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="action-btn" onclick="monitorSessions()">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <!-- Assessment Metrics -->
            <div class="assessment-metrics">
                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="metric-info">
                            <h3>Active Assessments</h3>
                            <div class="metric-value">12</div>
                            <div class="metric-subtitle">In Progress</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+3</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="metric-info">
                            <h3>Completed Today</h3>
                            <div class="metric-value">23</div>
                            <div class="metric-subtitle">Finished</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="metric-info">
                            <h3>Cheating Detected</h3>
                            <div class="metric-value">2</div>
                            <div class="metric-subtitle">Flagged</div>
                        </div>
                    </div>
                    <div class="metric-trend negative">
                        <i class="fas fa-arrow-down"></i>
                        <span>-1</span>
                    </div>
                </div>

                <div class="metric-card compact">
                    <div class="metric-header">
                        <div class="metric-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="metric-info">
                            <h3>Avg. Duration</h3>
                            <div class="metric-value">45m</div>
                            <div class="metric-subtitle">Per Test</div>
                        </div>
                    </div>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-down"></i>
                        <span>-5m</span>
                    </div>
                </div>
            </div>

            <!-- Assessment Types -->
            <div class="assessment-types">
                <div class="section-header">
                    <h3>Assessment Types</h3>
                    <button class="view-all-btn" onclick="manageAssessmentTypes()">Manage</button>
                </div>
                <div class="types-grid">
                    <div class="type-card">
                        <div class="type-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="type-content">
                            <h4>Technical Tests</h4>
                            <p>8 Active • 23 Completed</p>
                            <div class="type-actions">
                                <button class="action-btn-small" onclick="viewTechnicalTests()">View</button>
                                <button class="action-btn-small secondary" onclick="createTechnicalTest()">Create</button>
                            </div>
                        </div>
                    </div>

                    <div class="type-card">
                        <div class="type-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="type-content">
                            <h4>Behavioral Tests</h4>
                            <p>4 Active • 15 Completed</p>
                            <div class="type-actions">
                                <button class="action-btn-small" onclick="viewBehavioralTests()">View</button>
                                <button class="action-btn-small secondary" onclick="createBehavioralTest()">Create</button>
                            </div>
                        </div>
                    </div>

                    <div class="type-card">
                        <div class="type-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="type-content">
                            <h4>Communication Tests</h4>
                            <p>2 Active • 12 Completed</p>
                            <div class="type-actions">
                                <button class="action-btn-small" onclick="viewCommunicationTests()">View</button>
                                <button class="action-btn-small secondary" onclick="createCommunicationTest()">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Assessments -->
            <div class="active-assessments">
                <div class="section-header">
                    <h3>Active Assessments</h3>
                    <button class="view-all-btn" onclick="viewAllAssessments()">View All</button>
                </div>
                <div class="assessments-table-container">
                    <table class="assessments-table">
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Assessment Type</th>
                                <th>Job Position</th>
                                <th>Progress</th>
                                <th>Time Elapsed</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="assessment-row" data-assessment-id="1">
                                <td>
                                    <div class="candidate-info">
                                        <div class="candidate-avatar-small">JD</div>
                                        <div class="candidate-details">
                                            <div class="candidate-name">John Doe</div>
                                            <div class="candidate-email">john.doe@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="assessment-type technical">Technical</span>
                                </td>
                                <td>
                                    <span class="job-position">Senior Software Engineer</span>
                                </td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 75%"></div>
                                        <span class="progress-text">75%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="time-info">
                                        <div class="time">34m</div>
                                        <div class="time-label">Elapsed</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge in-progress">In Progress</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="monitorAssessment(1)" title="Monitor">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="pauseAssessment(1)" title="Pause">
                                            <i class="fas fa-pause"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="terminateAssessment(1)" title="Terminate">
                                            <i class="fas fa-stop"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="assessment-row" data-assessment-id="2">
                                <td>
                                    <div class="candidate-info">
                                        <div class="candidate-avatar-small">SM</div>
                                        <div class="candidate-details">
                                            <div class="candidate-name">Sarah Miller</div>
                                            <div class="candidate-email">sarah.miller@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="assessment-type behavioral">Behavioral</span>
                                </td>
                                <td>
                                    <span class="job-position">Product Manager</span>
                                </td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 45%"></div>
                                        <span class="progress-text">45%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="time-info">
                                        <div class="time">22m</div>
                                        <div class="time-label">Elapsed</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge in-progress">In Progress</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="monitorAssessment(2)" title="Monitor">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="pauseAssessment(2)" title="Pause">
                                            <i class="fas fa-pause"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="terminateAssessment(2)" title="Terminate">
                                            <i class="fas fa-stop"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="assessment-row" data-assessment-id="3">
                                <td>
                                    <div class="candidate-info">
                                        <div class="candidate-avatar-small">AL</div>
                                        <div class="candidate-details">
                                            <div class="candidate-name">Alex Lee</div>
                                            <div class="candidate-email">alex.lee@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="assessment-type technical">Technical</span>
                                </td>
                                <td>
                                    <span class="job-position">UX Designer</span>
                                </td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 90%"></div>
                                        <span class="progress-text">90%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="time-info">
                                        <div class="time">41m</div>
                                        <div class="time-label">Elapsed</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge warning">Cheating Detected</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="monitorAssessment(3)" title="Monitor">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="reviewCheating(3)" title="Review">
                                            <i class="fas fa-exclamation-triangle"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="terminateAssessment(3)" title="Terminate">
                                            <i class="fas fa-stop"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="assessment-row" data-assessment-id="4">
                                <td>
                                    <div class="candidate-info">
                                        <div class="candidate-avatar-small">MJ</div>
                                        <div class="candidate-details">
                                            <div class="candidate-name">Mike Johnson</div>
                                            <div class="candidate-email">mike.johnson@email.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="assessment-type communication">Communication</span>
                                </td>
                                <td>
                                    <span class="job-position">Data Scientist</span>
                                </td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 60%"></div>
                                        <span class="progress-text">60%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="time-info">
                                        <div class="time">28m</div>
                                        <div class="time-label">Elapsed</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge in-progress">In Progress</span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn-icon" onclick="monitorAssessment(4)" title="Monitor">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="action-btn-icon" onclick="pauseAssessment(4)" title="Pause">
                                            <i class="fas fa-pause"></i>
                                        </button>
                                        <button class="action-btn-icon danger" onclick="terminateAssessment(4)" title="Terminate">
                                            <i class="fas fa-stop"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function updateReportsContent() {
    const mainContent = document.querySelector('.mac-main-content');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <div class="header-left">
                <h2>Analytics & Reports</h2>
                <div class="breadcrumb">
                    <span>Home</span>
                    <i class="fas fa-chevron-right"></i>
                    <span>Analytics</span>
                </div>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search reports...">
                </div>
                <div class="header-actions">
                    <button class="action-btn" onclick="refreshAnalytics()">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                    <button class="action-btn" onclick="openAnalyticsSettings()">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <!-- Analytics Overview -->
            <div class="analytics-overview">
                <div class="overview-header">
                    <h3>Performance Overview</h3>
                    <div class="time-filter">
                        <select class="filter-select">
                            <option value="7d">Last 7 days</option>
                            <option value="30d" selected>Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="1y">Last year</option>
                        </select>
                    </div>
                </div>
                
                <div class="analytics-metrics">
                    <div class="metric-card primary">
                        <div class="metric-header">
                            <div class="metric-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="metric-info">
                                <h3>Assessment Completion</h3>
                                <div class="metric-value">89%</div>
                                <div class="metric-subtitle">Success Rate</div>
                            </div>
                        </div>
                        <div class="metric-trend positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+5.2%</span>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-header">
                            <div class="metric-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="metric-info">
                                <h3>Cheating Detection</h3>
                                <div class="metric-value">3.2%</div>
                                <div class="metric-subtitle">Detection Rate</div>
                            </div>
                        </div>
                        <div class="metric-trend negative">
                            <i class="fas fa-arrow-down"></i>
                            <span>-0.8%</span>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-header">
                            <div class="metric-icon">
                                <i class="fas fa-brain"></i>
                            </div>
                            <div class="metric-info">
                                <h3>AI Accuracy</h3>
                                <div class="metric-value">94%</div>
                                <div class="metric-subtitle">Prediction Rate</div>
                            </div>
                        </div>
                        <div class="metric-trend positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+2.1%</span>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-header">
                            <div class="metric-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="metric-info">
                                <h3>Time Saved</h3>
                                <div class="metric-value">67%</div>
                                <div class="metric-subtitle">Efficiency Gain</div>
                            </div>
                        </div>
                        <div class="metric-trend positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+12%</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="analytics-actions">
                <div class="action-section">
                    <h3>Report Generation</h3>
                    <div class="action-buttons">
                        <button class="analytics-btn primary" onclick="generateReport()">
                            <div class="btn-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="btn-content">
                                <h4>Generate Report</h4>
                                <p>Create comprehensive assessment reports</p>
                            </div>
                        </button>
                        
                        <button class="analytics-btn secondary" onclick="exportData()">
                            <div class="btn-icon">
                                <i class="fas fa-download"></i>
                            </div>
                            <div class="btn-content">
                                <h4>Export Data</h4>
                                <p>Download raw data in CSV/Excel format</p>
                            </div>
                        </button>
                        
                        <button class="analytics-btn tertiary" onclick="openCustomAnalytics()">
                            <div class="btn-icon">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                            <div class="btn-content">
                                <h4>Custom Analytics</h4>
                                <p>Create custom dashboards and insights</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Recent Reports -->
            <div class="recent-reports">
                <div class="section-header">
                    <h3>Recent Reports</h3>
                    <button class="view-all-btn" onclick="viewAllReports()">View All</button>
                </div>
                <div class="reports-list">
                    <div class="report-item">
                        <div class="report-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div class="report-info">
                            <h4>Monthly Assessment Report</h4>
                            <p>Generated 2 hours ago • 1.2MB</p>
                        </div>
                        <div class="report-actions">
                            <button class="action-btn-icon" onclick="downloadReport('monthly')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="action-btn-icon" onclick="shareReport('monthly')">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="report-item">
                        <div class="report-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="report-info">
                            <h4>Cheating Analysis Report</h4>
                            <p>Generated 1 day ago • 856KB</p>
                        </div>
                        <div class="report-actions">
                            <button class="action-btn-icon" onclick="downloadReport('cheating')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="action-btn-icon" onclick="shareReport('cheating')">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="report-item">
                        <div class="report-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="report-info">
                            <h4>Candidate Performance Report</h4>
                            <p>Generated 3 days ago • 2.1MB</p>
                        </div>
                        <div class="report-actions">
                            <button class="action-btn-icon" onclick="downloadReport('candidates')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="action-btn-icon" onclick="shareReport('candidates')">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Analytics Functions
function generateReport() {
    showNotification('Generating comprehensive report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
        // In a real app, this would trigger the actual report generation
    }, 2000);
}

function exportData() {
    showNotification('Preparing data export...', 'info');
    
    // Simulate data export
    setTimeout(() => {
        showNotification('Data exported successfully! Check your downloads.', 'success');
        // In a real app, this would trigger the actual data export
    }, 1500);
}

function openCustomAnalytics() {
    showNotification('Opening custom analytics dashboard...', 'info');
    
    // Simulate opening custom analytics
    setTimeout(() => {
        showNotification('Custom analytics dashboard opened!', 'success');
        // In a real app, this would open the custom analytics interface
    }, 1000);
}

function refreshAnalytics() {
    showNotification('Refreshing analytics data...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        showNotification('Analytics data refreshed!', 'success');
        // In a real app, this would refresh the analytics data
    }, 1000);
}

function openAnalyticsSettings() {
    showNotification('Opening analytics settings...', 'info');
    
    // Simulate opening settings
    setTimeout(() => {
        showNotification('Analytics settings opened!', 'success');
        // In a real app, this would open the settings interface
    }, 500);
}

function downloadReport(reportType) {
    showNotification(`Downloading ${reportType} report...`, 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification(`${reportType} report downloaded!`, 'success');
        // In a real app, this would trigger the actual download
    }, 1000);
}

function shareReport(reportType) {
    showNotification(`Sharing ${reportType} report...`, 'info');
    
    // Simulate sharing
    setTimeout(() => {
        showNotification(`${reportType} report shared successfully!`, 'success');
        // In a real app, this would open the sharing interface
    }, 1000);
}

function viewAllReports() {
    showNotification('Loading all reports...', 'info');
    
    // Simulate loading all reports
    setTimeout(() => {
        showNotification('All reports loaded!', 'success');
        // In a real app, this would load all reports
    }, 1000);
}

// Settings Functions
function saveSettings() {
    showNotification('Saving settings...', 'info');
    
    // Simulate saving settings
    setTimeout(() => {
        showNotification('Settings saved successfully!', 'success');
        // In a real app, this would save all settings to the backend
    }, 1500);
}

function resetSettings() {
    showNotification('Resetting to default settings...', 'info');
    
    // Simulate resetting settings
    setTimeout(() => {
        showNotification('Settings reset to default values!', 'success');
        // In a real app, this would reset all settings to default values
    }, 2000);
}

function refreshSettings() {
    showNotification('Refreshing settings...', 'info');
    
    // Simulate refreshing settings
    setTimeout(() => {
        showNotification('Settings refreshed!', 'success');
        // In a real app, this would refresh the settings data
    }, 1000);
}

function exportSettings() {
    showNotification('Exporting settings...', 'info');
    
    // Simulate exporting settings
    setTimeout(() => {
        showNotification('Settings exported successfully!', 'success');
        // In a real app, this would export settings to a file
    }, 1000);
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
        
        <div class="settings-actions">
            <button class="settings-btn primary" onclick="saveSettings()">
                <div class="btn-icon">
                    <i class="fas fa-save"></i>
                </div>
                <span class="btn-text">Save Settings</span>
            </button>
            
            <button class="settings-btn secondary" onclick="resetSettings()">
                <div class="btn-icon">
                    <i class="fas fa-undo"></i>
                </div>
                <span class="btn-text">Reset to Default</span>
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