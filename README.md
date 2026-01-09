# Pokedex - React Recruitment Task

React приложение для отображения данных из PokeAPI v2.

## Технологии

- **Vite** - сборщик
- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Redux Toolkit** - управление состоянием
- **React Router** - роутинг
- **Tailwind CSS** - стилизация
- **Vitest + React Testing Library** - тестирование
- **react-toastify** - уведомления

## Установка

```bash
npm install
```

## Запуск

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Tests
npm test
```

## Структура проекта

```
src/
├── api/              # API сервисы
├── components/       # Переиспользуемые компоненты
├── constants/        # Константы
├── containers/       # Контейнеры и страницы
├── router/          # Конфигурация роутинга
├── store/           # Redux store и слайсы
├── test/            # Настройка тестов
├── types/           # TypeScript типы
└── utils/           # Утилиты
```

## Функциональность

- Отображение списка покемонов (1-151, первое поколение)
- Пагинация (20 покемонов на страницу)
- Адаптивный дизайн:
  - Mobile: 1 колонка
  - md: 2 колонки
  - lg: 4 колонки
  - xl+: 5 колонок
- Роутинг: `/home` и `/pokemon/:id`
- Обработка ошибок через Error Boundary и react-toastify

## Требования

- Node.js 18+
- npm или yarn
