const sheetID = "1SxJ7iaGVa4EEENkpAUT3fz-FxCjTodaSDbJv8g1-FEY"; // ID таблицы
const apiKey = "AIzaSyBeqCnh-0LqzCkVCXHAqyjk3S0fODeNNhY"; // API ключ

const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Лист1!A:F?key=${apiKey}`; // Загружаем все 6 столбцов

const tbody = document.getElementById('group-data'); // Получаем tbody для добавления данных

fetch(sheetURL)
  .then(response => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    return response.json();
  })
  .then(data => {
    const rows = data.values.slice(1, 9); // Ограничиваем только 8 группами
    rows.forEach(row => {
      const [group, behavior, grades, activity, total, final] = row;

      // Добавляем строку в таблицу на главной странице
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><a href="group.html?group=${encodeURIComponent(group)}" style="color: #007bff;">${group}</a></td>
        <td>${behavior}</td>
        <td>${grades}</td>
        <td>${activity}</td>
        <td>${total}</td>
        <td>${final}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error("Ошибка при загрузке данных из Google Sheets:", error);
    alert("Не удалось загрузить данные.");
  });
