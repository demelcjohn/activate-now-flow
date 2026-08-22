# Development Setup Guide

Quick setup instructions for local development.

## Prerequisites

- **Node.js**: v18+ (for Angular/npm)
- **Java**: JDK 11+ (for Spring Boot)
- **MySQL**: 5.7+ running locally
- **Maven**: 3.8+ (or use `mvnw`)

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configuration

No special configuration needed. Default API endpoint: `http://localhost:8080`

### 3. Run Development Server

```bash
npm run start
```

Navigate to `http://localhost:4200` in your browser.

### 4. Build for Production

```bash
npm run build
```

Output: `frontend/dist/frontend/`

### 5. Run Tests

```bash
npm run test
```

## Backend Setup

### 1. Database Setup

```bash
mysql -u root -p
CREATE DATABASE dashboard_db;
EXIT;
```

### 2. Configuration

Create `backend/src/main/resources/application.properties`:

```properties
spring.application.name=backend
spring.datasource.url=jdbc:mysql://localhost:3306/dashboard_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Note**: This file is in `.gitignore`. Use `application.properties.example` as reference.

### 3. Build Project

```bash
cd backend
./mvnw clean install
```

On Windows: `mvnw.cmd clean install`

### 4. Run Application

```bash
./mvnw spring-boot:run
```

Server runs on `http://localhost:8080`

## Testing

### Frontend Unit Tests

```bash
cd frontend
npm run test
```

### Frontend Build Check

```bash
npm run build
```

### Backend Unit Tests

```bash
cd backend
./mvnw test
```

## Common Commands

### Frontend

```bash
npm start          # Dev server
npm run build      # Production build
npm run test       # Run tests
npm run lint       # Lint check
```

### Backend

```bash
./mvnw clean       # Clean build artifacts
./mvnw compile     # Compile only
./mvnw test        # Run tests
./mvnw install     # Build with dependencies
./mvnw spring-boot:run  # Run application
```

## API Endpoints

### Development

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`

### Key Endpoints

- `GET /user1` - Fetch user details
- `POST /user` - Submit activation form

## Troubleshooting

### Port Already in Use

```bash
# Frontend (4200)
ng serve --port 4201

# Backend (8080)
Modify server.port in application.properties
```

### Database Connection Error

- Ensure MySQL is running
- Check credentials in `application.properties`
- Verify `dashboard_db` database exists

### npm/Maven Issues

```bash
# Clear cache
npm cache clean --force
./mvnw clean

# Reinstall
npm install
./mvnw install
```

## IDE Setup

### VS Code

1. Install extensions:
   - Angular Language Service
   - Prettier
   - GitLens
   - Thunder Client or REST Client

2. Configure settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### IntelliJ IDEA

1. Open project
2. Install Angular plugin
3. Configure Maven settings
4. Run configurations for Spring Boot

## Git Setup

```bash
# Clone repository
git clone <repo-url>
cd activate-now-flow

# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"
git push origin feature/feature-name
```

## Next Steps

1. Set up frontend (npm install, npm start)
2. Set up backend (create DB, configure properties, mvnw spring-boot:run)
3. Test both applications
4. Review [AGENTS.md](AGENTS.md) for coding conventions
5. Start development!

---

For issues or questions, check existing GitHub issues or create a new one.
