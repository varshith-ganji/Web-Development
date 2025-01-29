const quizForm = document.getElementById("quiz-form");
quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const correctAnswers = [0, 1, 2];
    let score = 0;
    let resultHTML = "<h2>Quiz Results:</h2>";

    correctAnswers.forEach((correct, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const isCorrect = selectedOption && parseInt(selectedOption.value) === correct;

        if (isCorrect) score++;

        resultHTML += `
            <p class="${isCorrect ? 'correct' : 'incorrect'}">
                Question ${index + 1} - 
                ${isCorrect ? 'Correct' : `Incorrect (Correct answer: ${document.querySelector(`input[name="q${index}"][value="${correct}"]`).parentNode.textContent.trim()})`}
            </p>
        `;
    });

    resultHTML += `<h3>Your Score: ${score}/${correctAnswers.length}</h3>`;
    localStorage.setItem("quizResults", resultHTML);
    window.location.href = "results.html";
});
