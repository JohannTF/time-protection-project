# MiniSistema de Inicio de Sesión con Detección por Tiempo Mínimo

Sistema de autenticación con detección de bots mediante tiempo mínimo de respuesta.

## Instalación

```bash
npm install
```

## Configuración

Crear la base de datos PostgreSQL:

```sql
CREATE DATABASE timeprotection_db;
```

Ejecutar migraciones:

```bash
npx prisma migrate dev --name init
```

## Ejecución

```bash
npm start
```

o

```bash
npx tsx src/app.js
```

## Prueba de bot

```bash
npx tsx test/fast_submit.js
```
