document.addEventListener('DOMContentLoaded', () => {
    // Custom Dropdown Functionality
    const customDropdown = document.querySelector('.custom-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    customDropdown.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!customDropdown.contains(e.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    // Drag & Drop Functionality
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('video/')) {
                alert('Please upload only video files');
                return;
            }
            
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = `${file.name} (${formatFileSize(file.size)})`;
            fileList.appendChild(fileItem);
        });
        checkAchievements();
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Quality Checklist Progress
    const qualityChecks = document.querySelectorAll('.quality-check');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    qualityChecks.forEach(check => {
        check.addEventListener('change', updateProgress);
    });

    function updateProgress() {
        const checked = document.querySelectorAll('.quality-check:checked').length;
        const total = qualityChecks.length;
        const progress = (checked / total) * 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
    }

    // Exercise Data
    const exerciseData = {
        "binary-stars": {
            image: "./assets/1.png",
            steps: [
                "Rotate the closed tips of jewelers forceps around each other",
                "Progressively increase or decrease the distance between the tips during rotation"
            ]
        },
        "synchronized-strengthening": {
            image: "./assets/2.png",
            steps: [
                "Slowly open and close both jeweler’s forceps simultaneously",
                "Open jeweler’s forceps half way and keep open for 5 seconds",
                "Move from 25% open to 50% open to 75% open to 100 % open",
            ]
        },
        "Intrinsic Strengthening and Movement": {
            image: "./assets/3.png",
            steps: [
                "Alternate opening and closing the tips of two jeweler’s forceps to 50% open",
                "Alternate moving the tip of each jeweler to a new random position on the background and open it to 50% open and then close it",
                "Return to the instrument to the middle of the background",
                "Aim to move the jeweler tips to the extremes of the background",
                "Return to the center of the background between each movement with tips closed"
            ]
        },
        "Follow the Leader": {
            image: "./assets/4.png",
            steps: [
                "Perform this calisthenic exercise with a partner",
                "Alternate touching the tip of your partner’s jeweler’s forceps as they move it around the background"
            ]
        },
        "box-tracing": {
            image: "./assets/5.png",
            steps: [
                "Trace outline of square and diagonals with a jeweler",
                "Alternate hands"
            ]
        },
        "Rotating Suture": {
            image: "./assets/6.png",
            steps: [
                "Pick up loose end of cut suture and rotate in place with jeweler’s forceps through wrist and hand pronation and supination",
                "Pass the suture to the other jeweler’s forceps and rotate again",
                "Alternate back and forth between the jeweler’s forceps",
            ]
        },
        "Passing Suture": {
            image: "./assets/7.png",
            steps: [
                "Perform this calisthenic exercise with a partner",
                "Pick up loose end of cut suture with jeweler’s forceps",
                "Move the instrument and suture to another place in the background without dropping the suture",
                "Partner should then grab the suture from your forceps with their jeweler’s forceps and without dropping it move it another place in the background",
                "Alternate passing suture between each other"
            ]
        },
        "Running Suture": {
            image: "./assets/8.png",
            steps: [
                "Pick up suture with 2 jeweler’s forceps, maintain a short distance between them. Then run the suture using the two jewelers in side-to-side fashion",
                "Practice passing to the left and to the right",
                "Practice passing to the top and to the bottom",
            ]
        },
        "Cutting Suture": {
            image: "./assets/9.png",
            steps: [
                "Pick up suture with jeweler, and cut suture in 1 mm increments",
                "Switch the position of the suture",
                "Practice with tips up and tips down",
            ]
        },
        "Load the Needle": {
            image: "./assets/10.png",
            steps: [
                "Pick up needle with a micro needle driver",
                "Use a jeweler in the other hand and reposition the adjust where the needle driver is in contact with the needle",
                "Use the jewelers to help rotate the needle tip into the correct position while holding the needle with the needle driver",
                "Practice turning the needle tip without the aid of the jewelers",
                "Practice holding the needle at the 1/3, 1/2, and 2/3 locations"
            ]
        },
        "Circle Cut": {
            image: "./assets/11.png",
            steps: [
                "Start with piece of paper with outline of 2 circles",
                "Using curved scissors and a jeweler, cut along the inner circle",
                "There should be no ink from outer circle on the cut circle",
            ]
        }
    };

    // Modal Handling
    const modal = document.getElementById('exerciseModal');
    const modalClose = document.querySelector('.modal-close');

    // Add click handlers to exercise labels
    document.querySelectorAll('.dropdown-content label').forEach(label => {
        label.addEventListener('click', (e) => {
            const exerciseId = e.target.querySelector('input').value;
            if(exerciseData[exerciseId]) {
                showExerciseModal(exerciseId);
            }
        });
    });

    function showExerciseModal(exerciseId) {
        const data = exerciseData[exerciseId];
        document.getElementById('modalTitle').textContent = 
            document.querySelector(`input[value="${exerciseId}"]`).parentElement.textContent.trim();
        document.getElementById('modalImage').src = data.image;
        
        const instructionsList = document.getElementById('modalInstructions');
        instructionsList.innerHTML = '';
        data.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            instructionsList.appendChild(li);
        });

        modal.classList.add('modal-visible');
        modal.style.display = 'flex';
    }

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('modal-visible');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    // Form Submission
    document.getElementById('submissionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) isValid = false;
        });

        if (isValid) {
            alert('Submission Successful! Thank you for your contribution.');
            e.target.reset();
            progressBar.style.width = '0%';
            progressText.textContent = '0% Complete';
            document.getElementById('fileList').innerHTML = '';
            showAchievement('🎉 Submission Complete!');
        } else {
            alert('Please fill all required fields');
        }
    });

    // Scroll Animations and Engagement Features
    let scrollPosition = 0;
    let achievements = [];
    let currentStep = 1;



    document.querySelectorAll('.form-section').forEach(section => {
        observer.observe(section);
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        // Progress Ribbon
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressRibbon').style.width = scrolled + "%";

        // Floating Helper Animation
        if(winScroll > scrollPosition) {
            document.getElementById('floatingHelper').style.display = 'block';
        } else {
            document.getElementById('floatingHelper').style.display = 'none';
        }
        scrollPosition = winScroll;

        // Achievement System
        checkAchievements();
    });

    // Engagement Features
    function checkAchievements() {
        const sectionsCompleted = document.querySelectorAll('.form-section.visible').length;
        const filesUploaded = document.querySelectorAll('.file-item').length;
        
        // Section Completion Achievement
        if(sectionsCompleted >= 3 && !achievements.includes('sections')) {
            showAchievement('📋 Form Master!');
            achievements.push('sections');
        }
        
        // File Upload Achievement
        if(filesUploaded >= 1 && !achievements.includes('files')) {
            showAchievement('🎥 Camera Ready!');
            achievements.push('files');
        }
    }

    function showAchievement(text) {
        const badge = document.getElementById('achievementBadge');
        badge.textContent = text;
        badge.style.display = 'block';
        setTimeout(() => badge.style.display = 'none', 3000);
    }

    // Infinite Scroll Simulation
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if(scrollTop + clientHeight >= scrollHeight - 50 && currentStep < 3) {
            loadNextStep();
        }
    });

    function loadNextStep() {
        currentStep++;
        const newSection = document.createElement('fieldset');
        newSection.className = 'form-section';
        newSection.innerHTML = `
            <legend><span class="icon">🌟</span> Pro Tip ${currentStep}</legend>
            <p>Advanced technique: Try varying your suture patterns for better muscle memory!</p>
        `;
        document.getElementById('submissionForm').insertBefore(newSection, document.querySelector('.submit-btn'));
        observer.observe(newSection);
        setTimeout(() => window.scrollBy(0, 100), 300);
    }

    // Initial Animation
    setTimeout(() => {
        document.querySelectorAll('.form-section')[0].classList.add('visible');
    }, 500);
});