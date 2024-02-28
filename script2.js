document.addEventListener("DOMContentLoaded", function() {
    const circleContainer = document.getElementById('circle-container');
    const resultDiv = document.getElementById('result');
    const totalImages = 5; // Number of images to display

    const radius = 180; // adjust the radius as needed
    const centerX = circleContainer.offsetWidth / 2;
    const centerY = circleContainer.offsetHeight / 2;

    // Sample image URLs
    const imageUrls = [
        "man_1.png",
        "man_2.png",
        "man_3.png",
        "man_4.png",
        "man_5.png"
    ];

    for (let i = 0; i < totalImages; i++) {
        const image = new Image();
        image.src = imageUrls[i];
        image.classList.add('png-image');
        image.dataset.order = i + 1;

        const angle = (i / totalImages) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        image.style.position = 'absolute';
        image.style.left = `${x - image.width / 2}px`;
        image.style.top = `${y - image.height / 2}px`;

        image.addEventListener('click', () => {
            const order = parseInt(image.dataset.order);
            selectedOrder.push(order);
            checkOrder();
            image.classList.add('selected');
        });

        circleContainer.appendChild(image);
    }

    let selectedOrder = [];

    function checkOrder() {
        if (selectedOrder.length === totalImages) {
            const correctOrder = getCorrectOrder(); // Get the correct order from the second table
            const isEqual = selectedOrder.every((value, index) => value === correctOrder[index]);

            if (isEqual) {
                resultDiv.textContent = 'Congratulations! You have won!';
            } else {
                resultDiv.textContent = 'Sorry, wrong order. Try again!';
            }

            // Reset selected order for a new game
            selectedOrder = [];
        }
    }

    function getCorrectOrder() {
        const correctOrder = [];
        const tableRows = document.querySelectorAll('#philosophers-table tbody tr');

        tableRows.forEach(row => {
            const philosopherId = parseInt(row.children[2].textContent);
            correctOrder.push(philosopherId);
        });

        return correctOrder;
    }
});

function startSimulation2() {
  const burstTimeTableBody = document.querySelector('#burst-time-table tbody');
  burstTimeTableBody.innerHTML = '';
  
  const philosophers = [];
  const burstTimes = generateRandomBurstTimes();

  for (let i = 0; i < 5; i++) {
    philosophers.push({
      id: i + 1,
      burstTime: burstTimes[i],
      sjfOrder: 0,
      waitingTime: 0,
      turnaroundTime: 0,
      completionTime: 0
    });
  }

  // Sort philosophers by philosopher number
  philosophers.sort((a, b) => a.id - b.id);

  for (const philosopher of philosophers) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${philosopher.id}</td>
      <td>${philosopher.burstTime}</td>
    `;
    burstTimeTableBody.appendChild(row);
  }

  const tableBody = document.querySelector('#philosophers-table tbody');
  tableBody.innerHTML = '';

  // Sort philosophers by burst time
  philosophers.sort((a, b) => a.burstTime - b.burstTime);

  let currentTime = 0;
  for (const philosopher of philosophers) {
    philosopher.sjfOrder = philosophers.findIndex(p => p.id === philosopher.id) + 1;
    philosopher.waitingTime = currentTime;
    philosopher.turnaroundTime = philosopher.waitingTime + philosopher.burstTime;
    philosopher.completionTime = philosopher.turnaroundTime;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${philosopher.sjfOrder}</td>
      <td>${philosopher.burstTime}</td>
      <td>${philosopher.id}</td>
      <td>${philosopher.waitingTime}</td>
      <td>${philosopher.turnaroundTime}</td>
      <td>${philosopher.completionTime}</td>
    `;
    tableBody.appendChild(row);

    currentTime += philosopher.burstTime;
  }

  // Calculate average waiting time
  const totalWaitingTime = philosophers.reduce((acc, curr) => acc + curr.waitingTime, 0);
  const averageWaitingTime = totalWaitingTime / 5;
  document.getElementById('average-waiting-time').textContent = averageWaitingTime.toFixed(2);

  // Show the "Show Answer" button
  const showAnswerBtn = document.getElementById('show-answer-btn');
  showAnswerBtn.classList.remove('hidden');

  // Hide the "Refresh" button
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn.classList.add('hidden');
}

function generateRandomBurstTimes() {
  const burstTimes = [];
  for (let i = 0; i < 5; i++) {
    burstTimes.push(Math.floor(Math.random() * 10) + 1); // Random burst time between 1 to 10 units
  }
  return burstTimes;
}

function showAnswer() {
  const resultContainer = document.getElementById('result-container');
  resultContainer.classList.remove('hidden');

  // Hide the "Show Answer" button after it's clicked
  const showAnswerBtn = document.getElementById('show-answer-btn');
  showAnswerBtn.classList.add('hidden');

  // Show the "Refresh" button
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn.classList.remove('hidden');
}

function refreshPage() {
  window.location.reload();
}