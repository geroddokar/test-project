export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-6">Технічне завдання</h1>
        
        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Прочитати і зрозуміти основи JavaScript</h2>
            <ul className="list-disc pl-6 space-y-1">
                <li>Цикли: як працюють <strong>for, while, do-while</strong> цикли.</li>
                <li>Типи даних: примітивні типи (<em>числа, строки, булеві значення, null, undefined, symbol</em>) та об'єкти.</li>
                <li>Функції для роботи з масивами: методи масивів, такі як <strong>sort, filter, map, reduce, forEach, push, pop, shift, unshift, splice, slice</strong>.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Зрозуміти концепції CRUD та REST</h2>
            <ul className="list-disc pl-6 space-y-1">
                <li>CRUD (Create, Read, Update, Delete): основні операції для роботи з базами даних або колекціями даних.</li>
                <li>REST (Representational State Transfer): розуміння HTTP методів <strong>GET, POST, PUT, DELETE</strong> для виконання CRUD операцій.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Виконати технічне завдання</h2>
            <p>Створити веб-додаток для управління користувачами, використовуючи <strong>JavaScript, Node.js, Next.js (React), MySQL</strong>.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Вимоги до завдання</h2>
            <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold">Створення проекту</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Ініціалізувати новий <strong>Next.js</strong> проект.</li>
                    <li>Створити базу даних <strong>MySQL</strong> з таблицею користувачів (<em>ID, ім'я, email, дата створення</em>).</li>
                </ul>
            </div>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Функціонал CRUD</h2>
            <ul className="list-disc pl-6 space-y-1">
                <li>Сторінка з таблицею користувачів, яка відображає всі записи з бази даних.</li>
                <li>Додавання нового користувача.</li>
                <li>Редагування існуючого користувача.</li>
                <li>Видалення користувача.</li>
                <li>Кнопка "Видалити всі" для очищення бази.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Імпорт даних з XLSX файлу</h2>
            <ul className="list-disc pl-6 space-y-1">
                <li>Додати кнопку для завантаження XLSX файлу.</li>
                <li>Реалізувати імпорт даних у базу даних.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Результати</h2>
            <p>Викласти код у <strong>GitHub</strong> і надати посилання.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Додаткові вимоги</h2>
            <ul className="list-disc pl-6 space-y-1">
                <li>Зрозуміти весь процес і змогти пояснити свою роботу.</li>
            </ul>
        </section>
    </div>
  );
}
