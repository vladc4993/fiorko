let dictionary = {};

// Загрузка словаря из JSON-файла
async function loadDictionary() {
    try {
        const response = await fetch('dictionary.json');
        if (!response.ok) {
            throw new Error('Словарь не найден или ошибка загрузки');
        }
        dictionary = await response.json();
    } catch (error) {
        console.error('Ошибка при загрузке словаря:', error);
        alert('Не удалось загрузить словарь. Пожалуйста, проверьте файл dictionary.json.');
    }
}

// Функция для перевода текста
function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    if (!inputText) {
        alert("Введите текст для перевода!");
        return;
    }

    // Разбиваем текст на слова
    const words = inputText.split(' ');
    let translatedText = '';

    // Переводим каждое слово
    words.forEach(word => {
        // Приводим слово к нижнему регистру для поиска в словаре
        const lowerCaseWord = word.toLowerCase();
        const translation = dictionary[lowerCaseWord] || word;
        translatedText += translation + ' ';
    });

    // Выводим результат
    document.getElementById('translatedText').innerText = translatedText.trim();
}

// Функция для добавления нового слова
async function addNewWord() {
    const newWord = document.getElementById('newWord').value.trim();
    const newTranslation = document.getElementById('newTranslation').value.trim();

    if (!newWord || !newTranslation) {
        alert("Пожалуйста, заполните оба поля.");
        return;
    }

    // Добавляем новое слово в словарь (в нижнем регистре)
    dictionary[newWord.toLowerCase()] = newTranslation;

    // Сохраняем обновленный словарь в localStorage
    saveDictionaryToLocalStorage();

    alert('Слово добавлено в словарь!');

    // Очищаем поля ввода
    document.getElementById('newWord').value = '';
    document.getElementById('newTranslation').value = '';
}

// Сохранение словаря в localStorage
function saveDictionaryToLocalStorage() {
    try {
        localStorage.setItem('dictionary', JSON.stringify(dictionary));
    } catch (error) {
        console.error('Ошибка при сохранении словаря в localStorage:', error);
    }
}

// Загрузка словаря из localStorage
function loadDictionaryFromLocalStorage() {
    try {
        const savedDictionary = localStorage.getItem('dictionary');
        if (savedDictionary) {
            dictionary = JSON.parse(savedDictionary);
        }
    } catch (error) {
        console.error('Ошибка при загрузке словаря из localStorage:', error);
    }
}

// Загружаем словарь при загрузке страницы
window.addEventListener('load', () => {
    loadDictionaryFromLocalStorage(); // Сначала пробуем загрузить из localStorage
    loadDictionary(); // Затем загружаем из JSON-файла (если нужно)
});
