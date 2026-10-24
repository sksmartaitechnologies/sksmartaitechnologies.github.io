// --- DOMContentLoaded & Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3-Dot LMS Menu toggle
    const lmsTriggerBtn = document.getElementById('lmsTriggerBtn');
    const lmsDropdown = document.getElementById('lmsDropdown');
    if (lmsTriggerBtn && lmsDropdown) {
        lmsTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lmsDropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            lmsDropdown.classList.remove('show');
        });
    }

    // Course filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Chatbot Toggle
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeBotBtn = document.getElementById('closeBotBtn');
    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
        closeBotBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }
});

// --- Modal Control Functions ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
}

function openAuthModal(tabName) {
    openModal('authModal');
    switchAuthTab(tabName);
}

function openRegisterModal() {
    openModal('registerModal');
}

// Switch Auth Tabs (Student, Staff, Admin, New Register)
function switchAuthTab(tabName) {
    const tabs = document.querySelectorAll('.auth-tab');
    const panes = document.querySelectorAll('.auth-pane');
    
    tabs.forEach(t => {
        if (t.getAttribute('data-tab') === tabName) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    panes.forEach(p => {
        p.classList.remove('active');
    });

    const activePane = document.getElementById('pane-' + tabName);
    if (activePane) {
        activePane.classList.add('active');
    }
}

// --- Detailed Courses & Services Blueprints Data ---
const blueprints = {
    "Artificial Intelligence (AI)": {
        title: "Artificial Intelligence (AI) - Master Curriculum",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Foundations of AI & Python for AI",
            "Module 2: Search Algorithms, Heuristics & Knowledge Representation",
            "Module 3: Computer Vision & OpenCV",
            "Module 4: Natural Language Processing (NLP) & LLM Integrations",
            "Module 5: Capstone Project: Autonomous Agent or Smart Vision System"
        ],
        outcomes: "Build intelligent systems, understand neural network foundations, and deploy generative AI solutions."
    },
    "Machine Learning (ML)": {
        title: "Machine Learning (ML) - Professional Curriculum",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Exploratory Data Analysis & Feature Engineering",
            "Module 2: Supervised Learning (Regression & Classification)",
            "Module 3: Unsupervised Learning (Clustering & Dimensionality Reduction)",
            "Module 4: Model Evaluation, Hyperparameter Tuning & Scikit-Learn",
            "Module 5: Real-World Industry ML Deployment Project"
        ],
        outcomes: "Expertise in training predictive models, evaluating performance, and productionizing ML algorithms."
    },
    "Deep Learning (DL)": {
        title: "Deep Learning (DL) - Expert Curriculum",
        duration: "2 Months",
        type: "Course",
        modules: [
            "Module 1: Neural Network Architecture & Backpropagation",
            "Module 2: Convolutional Neural Networks (CNN) for Image Recognition",
            "Module 3: Recurrent Neural Networks (RNN, LSTM, GRU) for Sequence Data",
            "Module 4: Transformers & Generative Adversarial Networks (GANs)",
            "Module 5: PyTorch & TensorFlow Advanced Model Training"
        ],
        outcomes: "Design and train state-of-the-art deep neural networks for complex computer vision and NLP problems."
    },
    "Data Science": {
        title: "Data Science - Comprehensive Blueprint",
        duration: "4 Months",
        type: "Course",
        modules: [
            "Module 1: Advanced Python, Pandas, NumPy & SciPy",
            "Module 2: SQL & NoSQL Database querying for Data Science",
            "Module 3: Statistical Hypothesis Testing & Probability",
            "Module 4: Machine Learning Modeling & Validation",
            "Module 5: Big Data Tools & End-to-End Data Science Portfolio Project"
        ],
        outcomes: "End-to-end mastery of extracting insights,
