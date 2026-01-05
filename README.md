# Webapp IdiomasApp - Creada por el agente de IA Minimax M2.1

Aplicación frontend desarrollada para consumir el backend REST API disponible en https://github.com/IsaacDiaz211/IdiomasApp. Construida con TypeScript, Bun.js, React, HeldlessUI, Ant Design y Tailwind. Este README está disponible en Español e Inglés.

---

## Español

### Descripción
Interfaz web para gestionar y consumir el servicio de aprendizaje de idiomas expuesto por el backend IdiomasApp. Todo el frontend fue creado por el agente de IA Minimax M2.1 con foco en rapidez de desarrollo y consistencia visual.

### Tecnologías
- TypeScript para tipado estático.
- Bun.js como entorno de ejecución y administración de dependencias.
- React para la construcción de componentes.
- HeldlessUI para componentes accesibles y sin estilos predefinidos.
- Ant Design para un sistema de componentes listo para producción.
- Tailwind para estilos utilitarios y personalización rápida.

### Backend
El servidor backend se encuentra en https://github.com/IsaacDiaz211/IdiomasApp. Esta webapp consume sus endpoints REST para ofrecer la funcionalidad principal.

### Ejecución con `start_webapp.sh`
1. Clona este repositorio y asegúrate de tener el backend corriendo localmente en `http://localhost:3000`.
2. Otorga permisos de ejecución al script si es necesario: `chmod +x start_webapp.sh`.
3. Ejecuta `./start_webapp.sh`. El script verifica que el backend esté disponible con `curl` y, si lo está, inicia el entorno de desarrollo con `npm run dev`.
4. Accede a la URL que indique Vite (por defecto `http://localhost:5173`).

---

## English

### Overview
Web interface designed to interact with the IdiomasApp backend REST API hosted at https://github.com/IsaacDiaz211/IdiomasApp. The entire frontend was created by the AI agent Minimax M2.1 to deliver a fast, consistent experience.

### Technologies
- TypeScript for static typing.
- Bun.js as the runtime and package manager.
- React for building UI components.
- HeldlessUI for unstyled, accessible primitives.
- Ant Design for production-ready component patterns.
- Tailwind for utility-first styling and quick customization.

### Backend
The backend server lives at https://github.com/IsaacDiaz211/IdiomasApp. This webapp is built to consume its REST API endpoints.

### Run with `start_webapp.sh`
1. Clone this repository and ensure the backend is running locally on `http://localhost:3000`.
2. Grant execute permission if needed: `chmod +x start_webapp.sh`.
3. Run `./start_webapp.sh`. The script checks backend availability via `curl` and, when found, starts the development server with `npm run dev`.
4. Open the URL printed by Vite (defaults to `http://localhost:5173`).
