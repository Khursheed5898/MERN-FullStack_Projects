function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close hamburger menu on mobile after clicking
        const menu = document.querySelector('.nav-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
}

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

let currentSlide = 1;
let answers = {};

function startAssessment() {
    document.getElementById('assessment-popup').style.display = 'flex';
    currentSlide = 1;
    answers = {};
    updateSlide();
}

function closeAssessment() {
    document.getElementById('assessment-popup').style.display = 'none';
    const slides = document.querySelectorAll('.popup-slide');
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    document.getElementById('slide-1').classList.add('active');
    document.getElementById('prev-btn').classList.add('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('progress-fill').style.width = '20%';
}

function updateSlide() {
    const slides = document.querySelectorAll('.popup-slide');
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    document.getElementById(`slide-${currentSlide}`).classList.add('active');
    document.getElementById('progress-fill').style.width = `${currentSlide * 20}%`;
    document.getElementById('prev-btn').classList.toggle('hidden', currentSlide === 1);
    document.getElementById('next-btn').classList.toggle('hidden', currentSlide === 6);
}

function answerQuestion(question, score) {
    answers[question] = score;
    nextSlide();
}

function nextSlide() {
    const slides = document.querySelectorAll('.popup-slide');
    if (currentSlide < 6) {
        slides[currentSlide - 1].classList.add('prev');
        currentSlide++;
        updateSlide();
    }
    if (currentSlide === 6) {
        showResults();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function showResults() {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    let resultText = '';
    if (totalScore >= 20) {
        resultText = 'You have a strong interest in creative and leadership roles with a tech focus. Consider careers in design, management, or tech innovation.';
    } else if (totalScore >= 10) {
        resultText = 'You prefer a balance of teamwork and independent work. Explore roles in project management, consulting, or technical support.';
    } else {
        resultText = 'You lean towards structured, independent roles. Careers in research, data analysis, or engineering may suit you.';
    }
    document.getElementById('result-text').textContent = resultText;
}

// Basic form submission handling (client-side example)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! Our team will respond within 2 business days.');
    this.reset();
});
