// Array representing correct answers, each index corresponds to a question number
const correctAnswers = ["pretest-1b", "pretest-2c", "pretest-3b", "pretest-4d", "pretest-5b"];

document.getElementById("submit-button").addEventListener("click", function() {
    // Calculate score
    let score = 0;
    const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
    
    answerInputs.forEach(function(answerInput) {
        const questionNumber = answerInput.name.charAt(answerInput.name.length - 1);
        const userAnswer = answerInput.value;

        const correctAnswer = correctAnswers[questionNumber - 1];

        if (correctAnswer && correctAnswer === userAnswer) {
            score++;
        }
    });

    // Display results
    const resultContainer = document.getElementById("result-container");
    resultContainer.textContent = `Your score is: ${score} out of 5`;
});
