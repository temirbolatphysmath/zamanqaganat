const sheetID = "1SxJ7iaGVa4EEENkpAUT3fz-FxCjTodaSDbJv8g1-FEY"; // ID таблицы
const apiKey = "AIzaSyBeqCnh-0LqzCkVCXHAqyjk3S0fODeNNhY"; // API ключ

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const groupName = urlParams.get('group'); // Название группы

if (!groupName) {
  alert("Группа не найдена!");
} else {
  // Устанавливаем заголовок страницы с названием группы
  document.getElementById('group-name').textContent = `Қағанат: ${groupName}`;

  // URL для получения данных с Google Sheets для этой группы
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${groupName}!A:F?key=${apiKey}`;

  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      if (data.values && data.values.length > 0) {
        const rows = data.values.slice(1); // Пропускаем заголовки

        const tbody = document.getElementById('details-data');
        rows.forEach(row => {
          const [studentName, behavior, grades, activity, term, total] = row;

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${studentName}</td>
            <td>${behavior}</td>
            <td>${grades}</td>
            <td>${activity}</td>
            <td>${term}</td>
            <td>${total}</td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        alert("Данные не найдены для этой группы.");
      }
    })
    .catch(error => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось загрузить данные.");
    });
}
