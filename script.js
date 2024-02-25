function startSimulation() {
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
  