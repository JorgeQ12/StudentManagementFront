# Student Management Frontend

Este proyecto es una aplicación web desarrollada con **Angular v20** que permite gestionar estudiantes, materias y profesores. Está conectada a una API desarrollada en .NET siguiendo Clean Architecture, Principios Solid, Patrones de Diseño y Diseño guiado por el dominio (Domain-driven design).

## Funcionalidades

- **Login con roles** (Admin / Student)
- **Dashboard dinámico** según el rol:
  - **Administrador**
    - Gestionar estudiantes (crear, editar, eliminar)
    - Gestionar materias (crear, eliminar)
    - Gestionar profesores (crear, eliminar)
  - **Estudiante**
    - Ver materias inscritas y compañeros
    - Inscribirse a materias (máximo 3, con profesores distintos)
    - Editar su perfil

---

## Estructura del Proyecto
src/app/
│
├── core/
│ ├── guards/ → AuthGuard
│ └── interceptor/ → Interceptor de autenticación
│
├── features/
│ ├── auth/login/ → Vista de login y servicio de autenticación
│ └── dashboard/
│   ├── admin-dashboard/
│   │ ├── manage-students/ → Gestión de estudiantes + modal de registro
│   │ ├── manage-subjects/ → Gestión de materias + modal de registro
│   │ ├── manage-professors/ → Gestión de profesores (solo eliminación)
│   ├── layout/ → Layout general del dashboard
│   └── student-dashboard/ → Vista de estudiante
|     ├── edit-profile-modal/ → Modal para editar perfil
|     └── enroll-subjects-modal/ → Modal para inscripción de materias
|
└── shared/
  ├── components/ → Modales reutilizables (alerta, confirmación)
  |── models/ → Interfaces y DTOs compartidos
  └── services/ → Servicios generales (student, subject, professor, notifications)

## Instalación

git clone https://github.com/tu-usuario/student-management-angular.git
cd student-management-angular
npm install
ng serve
http://localhost:4200
