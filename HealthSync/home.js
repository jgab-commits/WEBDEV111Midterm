const specialties = [
  { id: 'cardiology', label: 'Cardiology', description: 'Heart, vascular care and preventive cardiology.' },
  { id: 'dermatology', label: 'Dermatology', description: 'Skin health, allergy checks, and dermatologic care.' },
  { id: 'pediatrics', label: 'Pediatrics', description: 'Child and adolescent care with trusted specialists.' },
  { id: 'orthopedics', label: 'Orthopedics', description: 'Bone, joint, and mobility consultations.' },
  { id: 'neurology', label: 'Neurology', description: 'Brain and nervous system evaluation and support.' }
];

const doctors = {
  cardiology: [
    { id: 'dr-maya', name: 'Dr. Maya Patel', title: 'Interventional Cardiologist' },
    { id: 'dr-li', name: 'Dr. Alex Li', title: 'Preventive Cardiology Specialist' }
  ],
  dermatology: [
    { id: 'dr-nora', name: 'Dr. Nora Khan', title: 'Clinical Dermatologist' },
    { id: 'dr-james', name: 'Dr. James Cole', title: 'Dermatology Surgeon' }
  ],
  pediatrics: [
    { id: 'dr-sara', name: 'Dr. Sara Williams', title: 'Pediatrician' },
    { id: 'dr-noah', name: 'Dr. Noah Turner', title: 'Child Health Specialist' }
  ],
  orthopedics: [
    { id: 'dr-ivan', name: 'Dr. Ivan Chen', title: 'Orthopedic Surgeon' },
    { id: 'dr-amira', name: 'Dr. Amira Hassan', title: 'Sports Medicine Provider' }
  ],
  neurology: [
    { id: 'dr-ella', name: 'Dr. Ella Brown', title: 'Neurologist' },
    { id: 'dr-omar', name: 'Dr. Omar Rizvi', title: 'Neurorehabilitation Specialist' }
  ]
};

const schedules = [
  'Monday, 9:00 AM',
  'Tuesday, 11:30 AM',
  'Wednesday, 2:00 PM',
  'Thursday, 4:15 PM'
];

const state = {
  step: 1,
  specialty: null,
  doctor: null,
  schedule: null
};

function createOptionButton(label, detail, selected) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = selected ? 'option-button selected' : 'option-button';
  button.innerHTML = `<span>${label}</span><small>${detail || ''}</small>`;
  return button;
}

function renderStep() {
  const stepScreen = document.getElementById('step-screen');
  const currentStep = document.getElementById('current-step');
  const progressFill = document.getElementById('progress-fill');

  currentStep.textContent = state.step;
  progressFill.style.width = `${((state.step - 1) / 3) * 100}%`;

  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');
  backBtn.disabled = state.step === 1;
  nextBtn.textContent = state.step === 4 ? 'Confirm' : 'Continue';

  stepScreen.innerHTML = '';

  if (state.step === 1) {
    const heading = document.createElement('div');
    heading.className = 'step-heading';
    heading.innerHTML = '<h2>Select a specialty</h2><p>Choose the clinical area you need and we will match you with the right provider.</p>';
    stepScreen.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'option-grid';
    specialties.forEach((item) => {
      const selected = state.specialty === item.id;
      const option = createOptionButton(item.label, item.description, selected);
      option.addEventListener('click', () => {
        state.specialty = item.id;
        state.doctor = null;
        renderStep();
      });
      grid.appendChild(option);
    });
    stepScreen.appendChild(grid);
  }

  if (state.step === 2) {
    const heading = document.createElement('div');
    heading.className = 'step-heading';
    heading.innerHTML = '<h2>Pick your doctor</h2><p>Select the specialist who best fits your care needs.</p>';
    stepScreen.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'option-grid';
    (doctors[state.specialty] || []).forEach((item) => {
      const selected = state.doctor === item.id;
      const option = createOptionButton(item.name, item.title, selected);
      option.addEventListener('click', () => {
        state.doctor = item.id;
        renderStep();
      });
      grid.appendChild(option);
    });
    stepScreen.appendChild(grid);
  }

  if (state.step === 3) {
    const heading = document.createElement('div');
    heading.className = 'step-heading';
    heading.innerHTML = '<h2>Choose your schedule</h2><p>Find the time that fits your calendar.</p>';
    stepScreen.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'option-grid';
    schedules.forEach((slot) => {
      const selected = state.schedule === slot;
      const option = createOptionButton(slot, 'Available', selected);
      option.addEventListener('click', () => {
        state.schedule = slot;
        renderStep();
      });
      grid.appendChild(option);
    });
    stepScreen.appendChild(grid);
  }

  if (state.step === 4) {
    const heading = document.createElement('div');
    heading.className = 'step-heading';
    heading.innerHTML = '<h2>Review and confirm</h2><p>Verify your selected specialty, doctor, and appointment time before confirming.</p>';
    stepScreen.appendChild(heading);

    const summary = document.createElement('div');
    summary.className = 'summary-card';
    const specialtyLabel = specialties.find((item) => item.id === state.specialty)?.label || '—';
    const doctorInfo = Object.values(doctors).flat().find((item) => item.id === state.doctor) || { name: '—', title: '—' };
    summary.innerHTML = `
      <div class="summary-item"><span>Specialty</span><strong>${specialtyLabel}</strong></div>
      <div class="summary-item"><span>Doctor</span><strong>${doctorInfo.name}</strong><small>${doctorInfo.title}</small></div>
      <div class="summary-item"><span>Schedule</span><strong>${state.schedule || '—'}</strong></div>
    `;
    stepScreen.appendChild(summary);

    const note = document.createElement('p');
    note.className = 'helper-text';
    note.textContent = 'All selected information will be confirmed once you complete this booking wizard.';
    stepScreen.appendChild(note);
  }
}

function initializeWizard() {
  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');

  backBtn.addEventListener('click', () => {
    if (state.step > 1) {
      state.step -= 1;
      renderStep();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (state.step === 1 && !state.specialty) return;
    if (state.step === 2 && !state.doctor) return;
    if (state.step === 3 && !state.schedule) return;

    if (state.step < 4) {
      state.step += 1;
      renderStep();
      return;
    }

    document.body.innerHTML = `
      <main class="confirmation-shell">
        <div class="confirmation-card">
          <h1>Booking confirmed</h1>
          <p>Your appointment request has been received. A HealthSync care coordinator will contact you shortly to finalize details.</p>
          <div class="confirmation-summary">
            <div><strong>Specialty</strong><span>${specialties.find((item) => item.id === state.specialty)?.label || '—'}</span></div>
            <div><strong>Doctor</strong><span>${Object.values(doctors).flat().find((item) => item.id === state.doctor)?.name || '—'}</span></div>
            <div><strong>Schedule</strong><span>${state.schedule || '—'}</span></div>
          </div>
        </div>
      </main>
    `;
  });

  renderStep();
}

document.addEventListener('DOMContentLoaded', initializeWizard);
