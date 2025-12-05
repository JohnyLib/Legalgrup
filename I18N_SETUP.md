# Многоязычная настройка (Multilingual Setup)

Ваш сайт теперь поддерживает 3 языка: **English (en)**, **Русский (ru)**, и **Română (ro)**.

## Структура

### Файлы конфигурации i18n
- `lib/i18n/config.ts` - Конфигурация языков
- `lib/i18n/types.ts` - TypeScript типы для переводов
- `lib/i18n/context.tsx` - React контекст для переводов
- `lib/i18n/utils.ts` - Утилиты для работы с путями
- `lib/i18n/link.tsx` - Компонент локализованных ссылок

### Файлы переводов
- `lib/i18n/translations/en.ts` - Английские переводы
- `lib/i18n/translations/ru.ts` - Русские переводы
- `lib/i18n/translations/ro.ts` - Румынские переводы

### Роутинг
- `middleware.ts` - Middleware для автоматического редиректа на локализованные маршруты
- `app/[locale]/layout.tsx` - Layout с поддержкой локали
- `app/[locale]/page.tsx` - Главная страница (нужно мигрировать)

## Как использовать

### В компонентах

```tsx
"use client";
import { useTranslations } from "../../lib/i18n/context";

export function MyComponent() {
  const { t, locale } = useTranslations();
  
  return (
    <div>
      <h1>{t.home.hero.title}</h1>
      <p>{t.home.hero.description}</p>
    </div>
  );
}
```

### Локализованные ссылки

```tsx
import { LocalizedLink } from "../../lib/i18n/link";

<LocalizedLink href="/services">
  {t.nav.services}
</LocalizedLink>
```

### Переключение языка

```tsx
import { LanguageSwitcher } from "../components/LanguageSwitcher";

<LanguageSwitcher />
```

## Миграция страниц

Все страницы должны быть перемещены в структуру `app/[locale]/`:

1. **Текущая структура:**
   ```
   app/
     page.tsx
     services/page.tsx
     attorneys/page.tsx
     ...
   ```

2. **Новая структура:**
   ```
   app/
     [locale]/
       page.tsx
       services/page.tsx
       attorneys/page.tsx
       ...
   ```

3. **Шаги миграции для каждой страницы:**

   a. Переместить файл в `app/[locale]/`
   
   b. Добавить `"use client"` если используется состояние
   
   c. Импортировать переводы:
   ```tsx
   import { useTranslations } from "../../../lib/i18n/context";
   ```
   
   d. Заменить все текстовые строки на переводы:
   ```tsx
   const { t } = useTranslations();
   // Было: <h1>Home</h1>
   // Стало: <h1>{t.nav.home}</h1>
   ```
   
   e. Обновить все ссылки на использование `LocalizedLink`:
   ```tsx
   import { LocalizedLink } from "../../../lib/i18n/link";
   ```

## Статус миграции

- ✅ Инфраструктура i18n создана
- ✅ Файлы переводов для всех языков созданы
- ✅ Middleware настроен
- ✅ Language switcher компонент создан
- ⏳ Страницы нужно мигрировать в `app/[locale]/` структуру
- ⏳ Компоненты нужно обновить для использования переводов

## Следующие шаги

1. Мигрировать главную страницу (`app/page.tsx` → `app/[locale]/page.tsx`)
2. Мигрировать остальные страницы (services, attorneys, insights, contact)
3. Обновить компоненты (`SiteChrome.tsx`, формы, и т.д.) для использования переводов
4. Добавить переключатель языка в навигацию

## URL структура

- `/en` - Английская версия
- `/ru` - Русская версия  
- `/ro` - Румынская версия
- `/` - Автоматический редирект на `/en`

## Добавление новых переводов

1. Откройте соответствующий файл в `lib/i18n/translations/`
2. Добавьте новый ключ в интерфейс `TranslationKeys` в `lib/i18n/types.ts`
3. Добавьте переводы для всех трех языков

