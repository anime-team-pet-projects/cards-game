## Заполнить .env
Скопировать `.env.exmaple`
```bash
cp .env.example .env.
```

Заполнить данные.

## Установка зависимостей отдельного MFE
```bash
pnpm i --frozen-lockfile
```

## Локальная разработка отдельного MFE
```bash
pnpm dev
```

Для того чтобы заставить микрофронтенд работать на **host’е** нужно:

```bash
pnpm remote
```
Или:

```bash
pnpm build
pnpm preview
```

## Запуск всех MFE 
После того как все микрофронты запустятся нужно будет сделать следующее:

### Локальная разработка
```bash
pnpm dev
```

### Production
```bash
pnpm remote
```
Или:

```bash
pnpm build
pnpm preview
```
