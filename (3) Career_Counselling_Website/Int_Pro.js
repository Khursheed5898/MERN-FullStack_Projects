// Interest Profiler JavaScript

// Global variables
let currentQuestion = 0;
let answers = {};
let questions = [];
let assessmentStarted = false;

// Interest categories
const interestCategories = {
    realistic: { name: 'Realistic', description: 'Hands-on, practical work' },
    investigative: { name: 'Investigative', description: 'Research and analysis' },
    artistic: { name: 'Artistic', description: 'Creative expression' },
    social: { name: 'Social', description: 'Helping and teaching others' },
    enterprising: { name: 'Enterprising', description: 'Leading and persuading' },
    conventional: { name: 'Conventional', description: 'Organizing and detail work' }
};

// Career database
const careers = {
    realistic: [
        { name: 'Software Engineer', description: 'Design and develop software applications', match: 95 },
        { name: 'Mechanical Engineer', description: 'Design and build mechanical systems', match: 90 },
        { name: 'Construction Manager', description: 'Oversee construction projects', match: 85 },
        { name: 'Electrician', description: 'Install and repair electrical systems', match: 80 }
    ],
    investigative: [
        { name: 'Data Scientist', description: 'Analyze complex data to find insights', match: 95 },
        { name: 'Research Scientist', description: 'Conduct scientific research', match: 92 },
        { name: 'Medical Doctor', description: 'Diagnose and treat patients', match: 88 },
        { name: 'Forensic Analyst', description: 'Analyze evidence for legal cases', match: 85 }
    ],
    artistic: [
        { name: 'Graphic Designer', description: 'Create visual content and designs', match: 95 },
        { name: 'Writer/Author', description: 'Create written content and stories', match: 90 },
        { name: 'Interior Designer', description: 'Design interior spaces', match: 87 },
        { name: 'Photographer', description: 'Capture and edit photographs', match: 85 }
    ],
    social: [
        { name: 'Teacher', description: 'Educate and inspire students', match: 95 },
        { name: 'Social Worker', description: 'Help individuals and families', match: 92 },
        { name: 'Counselor', description: 'Provide guidance and support', match: 90 },
        { name: 'Nurse', description: 'Provide patient care and support', match: 88 }
    ],
    enterprising: [
        { name: 'Business Manager', description: 'Lead and manage business operations', match: 95 },
        { name: 'Sales Director', description: 'Lead sales teams and strategies', match: 90 },
        { name: 'Entrepreneur', description: 'Start and run your own business', match: 88 },
        { name: 'Marketing Manager', description: 'Develop marketing strategies', match: 85 }
    ],
    conventional: [
        { name: 'Accountant', description: 'Manage financial records and taxes', match: 95 },
        { name: 'Administrative Assistant', description: 'Provide office support and organization', match: 90 },
        { name: 'Database Administrator', description: 'Manage and organize data systems', match: 87 },
        { name: 'Financial Analyst', description: 'Analyze financial data and trends', match: 85 }
    ]
};

// Initialize questions
function initializeQuestions() {
    questions = [
        // Realistic questions
        { text: "I enjoy working with my hands to build or repair things.", category: "realistic", type: "likert" },
        { text: "I prefer practical, hands-on activities over theoretical discussions.", category: "realistic", type: "likert" },
        { text: "I like working with tools, machines, or equipment.", category: "realistic", type: "likert" },
        
        // Investigative questions
        { text: "I enjoy solving complex problems and puzzles.", category: "investigative", type: "likert" },
        { text: "I like to analyze data and look for patterns.", category: "investigative", type: "likert" },
        { text: "I enjoy conducting research and learning new facts.", category: "investigative", type: "likert" },
        
        // Artistic questions
        { text: "I enjoy expressing myself through creative activities.", category: "artistic", type: "likert" },
        { text: "I like to design, create, or make things that are beautiful.", category: "artistic", type: "likert" },
        { text: "I prefer work that allows for creativity and imagination.", category: "artistic", type: "likert" },
        
        // Social questions
        { text: "I enjoy helping others solve their problems.", category: "social", type: "likert" },
        { text: "I like to teach or train others.", category: "social", type: "likert" },
        { text: "I prefer working as part of a team rather than alone.", category: "social", type: "likert" },
        
        // Enterprising questions
        { text: "I enjoy leading and managing others.", category: "enterprising", type: "likert" },
        { text: "I like to persuade people to see things my way.", category: "enterprising", type: "likert" },
        { text: "I enjoy taking risks to achieve success.", category: "enterprising", type: "likert" },
        
        // Conventional questions
        { text: "I like to organize and keep track of details.", category: "conventional", type: "likert" },
        { text: "I prefer to follow established procedures and guidelines.", category: "conventional", type: "likert" },
        { text: "I enjoy working with numbers and data entry.", category: "conventional", type: "likert" },
        
        // Additional mixed questions
        { text: "I would rather work outdoors than in an office.", category: "realistic", type: "likert" },
        { text: "I enjoy writing reports or articles.", category: "investigative", type: "likert" }
    ];
    
    // Shuffle questions for variety
    questions = shuffleArray(questions);
}

// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start the assessment
function startAssessment() {
    initializeQuestions();
    currentQuestion = 0;
    answers = {};
    assessmentStarted = true;
    
    // Hide hero section and show assessment
    document.getElementById('home').style.display = 'none';
    document.getElementById('assessment').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    
    // Initialize UI
    document.getElementById('totalQuestions').textContent = questions.length;
    displayQuestion();
    updateProgress();
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const questionNumber = document.getElementById('questionNumber');
    
    questionText.textContent = question.text;
    questionNumber.textContent = currentQuestion + 1;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create Likert scale options
    const options = [
        { value: 1, text: 'Strongly Disagree' },
        { value: 2, text: 'Disagree' },
        { value: 3, text: 'Neutral' },
        { value: 4, text: 'Agree' },
        { value: 5, text: 'Strongly Agree' }
    ];
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.onclick = () => selectOption(option.value, button);
        optionsContainer.appendChild(button);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Handle option selection
function selectOption(value, buttonElement) {
    // Remove previous selection
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked button
    buttonElement.classList.add('selected');
    
    // Store answer
    answers[currentQuestion] = {
        value: value,
        category: questions[currentQuestion].category
    };
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = !answers[currentQuestion];
    
    // Update next button text for last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Go to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    } else {
        // Assessment complete
        calculateResults();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
        
        // Restore previous selection if exists
        if (answers[currentQuestion]) {
            const buttons = document.querySelectorAll('.option-button');
            const selectedValue = answers[currentQuestion].value;
            buttons[selectedValue - 1].classList.add('selected');
        }
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Calculate and display results
function calculateResults() {
    const scores = {
        realistic: 0,
        investigative: 0,
        artistic: 0,
        social: 0,
        enterprising: 0,
        conventional: 0
    };
    
    // Calculate category scores
    Object.values(answers).forEach(answer => {
        scores[answer.category] += answer.value;
    });
    
    // Find highest scoring categories
    const sortedCategories = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
    
    const topCategory = sortedCategories[0][0];
    const topScore = sortedCategories[0][1];
    
    // Display results
    displayResults(scores, topCategory, sortedCategories);
    
    // Hide assessment and show results
    document.getElementById('assessment').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

// Display results section
function displayResults(scores, topCategory, sortedCategories) {
    // Set profile type
    const profileType = document.getElementById('profileType');
    const profileDescription = document.getElementById('profileDescription');
    
    profileType.textContent = interestCategories[topCategory].name;
    profileDescription.textContent = `You have strong interests in ${interestCategories[topCategory].description.toLowerCase()}. This suggests you would thrive in careers that involve ${interestCategories[topCategory].description.toLowerCase()}.`;
    
    // Display career matches
    displayCareerMatches(topCategory, sortedCategories);
    
    // Display interest breakdown
    displayInterestBreakdown(scores);
}

// Display career matches
function displayCareerMatches(topCategory, sortedCategories) {
    const careerGrid = document.getElementById('careerGrid');
    careerGrid.innerHTML = '';
    
    // Get careers from top 2 categories
    const relevantCareers = [];
    
    sortedCategories.slice(0, 2).forEach(([category, score]) => {
        const categoryCareers = careers[category] || [];
        categoryCareers.forEach(career => {
            relevantCareers.push({
                ...career,
                category: category,
                adjustedMatch: Math.round(career.match * (score / 25)) // Adjust match based on user score
            });
        });
    });
    
    // Sort by adjusted match and take top 6
    relevantCareers.sort((a, b) => b.adjustedMatch - a.adjustedMatch);
    const topCareers = relevantCareers.slice(0, 6);
    
    topCareers.forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.innerHTML = `
            <h4>${career.name}</h4>
            <p>${career.description}</p>
            <span class="match-percentage">${career.adjustedMatch}% Match</span>
        `;
        careerGrid.appendChild(careerCard);
    });
}

// Display interest breakdown
function displayInterestBreakdown(scores) {
    const interestBars = document.getElementById('interestBars');
    interestBars.innerHTML = '';
    
    // Calculate percentages
    const maxScore = Math.max(...Object.values(scores));
    const minScore = Math.min(...Object.values(scores));
    const range = maxScore - minScore || 1;
    
    Object.entries(scores).forEach(([category, score]) => {
        const percentage = Math.round(((score - minScore) / range) * 100);
        const normalizedScore = Math.round((score / 25) * 100); // Normalize to 0-100 scale
        
        const interestBar = document.createElement('div');
        interestBar.className = 'interest-bar';
        interestBar.innerHTML = `
            <div class="interest-label">
                <span class="interest-name">${interestCategories[category].name}</span>
                <span class="interest-score">${normalizedScore}%</span>
            </div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        interestBars.appendChild(interestBar);
    });
}

// Restart assessment
function restartAssessment() {
    currentQuestion = 0;
    answers = {};
    assessmentStarted = false;
    
    // Show hero section and hide others
    document.getElementById('home').style.display = 'block';
    document.getElementById('assessment').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Download results (simplified version)
function downloadResults() {
    const profileType = document.getElementById('profileType').textContent;
    const profileDescription = document.getElementById('profileDescription').textContent;
    
    // Create downloadable content
    let content = `INTEREST PROFILER RESULTS\n\n`;
    content += `Profile Type: ${profileType}\n`;
    content += `Description: ${profileDescription}\n\n`;
    content += `CAREER MATCHES:\n`;
    
    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach(card => {
        const name = card.querySelector('h4').textContent;
        const description = card.querySelector('p').textContent;
        const match = card.querySelector('.match-percentage').textContent;
        content += `- ${name} (${match}): ${description}\n`;
    });
    
    content += `\nINTEREST BREAKDOWN:\n`;
    const interestBars = document.querySelectorAll('.interest-bar');
    interestBars.forEach(bar => {
        const name = bar.querySelector('.interest-name').textContent;
        const score = bar.querySelector('.interest-score').textContent;
        content += `- ${name}: ${score}\n`;
    });
    
    content += `\nGenerated on: ${new Date().toLocaleDateString()}\n`;
    content += `Interest Profiler - Career Discovery Tool`;
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interest-profiler-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize the page
    initializeQuestions();
    
    // Add animation to interest bars when results are shown
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width; // Trigger animation
                    }, index * 200);
                });
            }
        });
    });
    
    // Observe results section
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        observer.observe(resultsSection);
    }
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        const rect = floatingCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = y / 10;
        const rotateY = -x / 10;
        
        floatingCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

// Reset card rotation when mouse leaves
document.addEventListener('mouseleave', function() {
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (assessmentStarted && document.getElementById('assessment').style.display === 'block') {
        if (e.key === 'ArrowLeft' && currentQuestion > 0) {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && answers[currentQuestion]) {
            nextQuestion();
        } else if (e.key >= '1' && e.key <= '5') {
            const optionIndex = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll('.option-button');
            if (buttons[optionIndex]) {
                buttons[optionIndex].click();
            }
        }
    }
});

// Add loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
            <p>Analyzing your interests...</p>
        </div>
    `;
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    document.body.appendChild(loadingDiv);
    
    setTimeout(() => {
        document.body.removeChild(loadingDiv);
    }, 2000);
}