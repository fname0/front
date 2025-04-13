import * as XLSX from 'xlsx';

export const exportToExcel = (data) => {
    // Создаем данные для таблицы
    // const data = [
    //   ["Имя", "Возраст", "Город"],
    //   ["Алексей", 30, "Москва"],
    //   ["Мария", 25, "Санкт-Петербург"],
    //   ["Иван", 35, "Казань"]
    // ];
    
    // Создаем новую книгу Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, "Лист1");

    console.log(new Date());
    
    
    // Сохраняем файл
    XLSX.writeFile(wb, "отчёт.xlsx");
  };