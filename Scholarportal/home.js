document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.add-module');
  const semesterList = document.querySelector('.semester-list');
  const summaryCount = document.querySelector('.summary-count');
  const summaryCredits = document.querySelector('.summary-credits');

  const semesterCourses = new Map();

  function updateSummary() {
    const totalCourses = semesterCourses.size;
    const totalCredits = Array.from(semesterCourses.values()).reduce(
      (sum, credits) => sum + credits,
      0
    );
    summaryCount.textContent = `${totalCourses} course${totalCourses === 1 ? '' : 's'}`;
    summaryCredits.textContent = `${totalCredits} credits`;
  }

  function renderSemester() {
    semesterList.innerHTML = '';
    semesterCourses.forEach((credits, courseName) => {
      const item = document.createElement('li');
      item.className = 'semester-item';
      item.innerHTML = `<span>${courseName}</span><span>${credits} cr</span>`;
      semesterList.appendChild(item);
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const card = button.closest('.module-card');
      const courseName = card.dataset.course;
      const creditsText = card.querySelector('.course-credits').textContent;
      const credits = parseInt(creditsText, 10) || 0;

      if (semesterCourses.has(courseName)) {
        semesterCourses.delete(courseName);
        button.textContent = 'Add to Semester';
        button.classList.remove('added');
      } else {
        semesterCourses.set(courseName, credits);
        button.textContent = 'Added';
        button.classList.add('added');
      }

      renderSemester();
      updateSummary();
    });
  });
});