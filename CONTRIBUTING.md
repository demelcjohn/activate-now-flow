# Contributing Guide

## Getting Started

1. Read [DEVELOPMENT.md](DEVELOPMENT.md) for setup instructions
2. Review [AGENTS.md](AGENTS.md) for code conventions
3. Check [.instructions.md](.instructions.md) for project structure

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use prefixes:

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Production fixes
- `docs/` - Documentation updates

### 2. Make Changes

- Follow conventions in [AGENTS.md](AGENTS.md)
- Write type-safe TypeScript
- Include tests for new features
- Update documentation if needed

### 3. Test Locally

```bash
# Frontend
cd frontend
npm run build    # Check for TypeScript errors
npm run start    # Test in browser
npm run test     # Run unit tests

# Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, semicolons)
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Build/dependency changes

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:

- Clear title and description
- Link to related issues
- Screenshots for UI changes
- Testing instructions

## Code Review

### For Reviewers

- Check code follows [AGENTS.md](AGENTS.md) conventions
- Verify tests are included and passing
- Ensure no sensitive data is committed
- Test the changes locally
- Provide constructive feedback

### For Authors

- Address all review comments
- Keep commits clean and organized
- Update PR description if scope changes
- Rebase before merging if needed

## Testing Requirements

### Frontend

- ✅ All components have `.spec.ts` files
- ✅ Unit tests pass: `npm run test`
- ✅ Build succeeds: `npm run build`
- ✅ No TypeScript errors
- ✅ Manual testing in browser

### Backend

- ✅ Unit tests pass: `./mvnw test`
- ✅ Build succeeds: `./mvnw clean install`
- ✅ No compilation errors
- ✅ Integration tests for API endpoints

## Documentation

Update documentation when:

- Adding new features
- Changing API endpoints
- Modifying configuration
- Updating dependencies
- Changing conventions

### Files to Update

- `README.md` - For major features
- `.instructions.md` - For project structure changes
- `AGENTS.md` - For convention changes
- `DEVELOPMENT.md` - For setup changes

## Security Guidelines

### Never Commit

- Passwords or credentials
- API keys or tokens
- Database credentials
- Private keys
- Sensitive configuration

### Always Exclude

- `.env` files
- `application.properties` (use `.example`)
- `node_modules/`
- `target/`
- Build artifacts

### Use Environment Variables

```bash
# For sensitive configuration
export DB_PASSWORD=your_password
export API_KEY=your_key
```

## Performance Considerations

- Run `npm run build` to check bundle size
- Use OnPush change detection where possible
- Lazy load routes for large features
- Unsubscribe from observables
- Profile with Angular DevTools

## Accessibility

- Add `aria-labels` to interactive elements
- Use semantic HTML
- Ensure color contrast (WCAG AA standard)
- Test keyboard navigation
- Check with accessibility tools

## Questions or Issues?

1. Check existing GitHub issues
2. Read [DEVELOPMENT.md](DEVELOPMENT.md) and [AGENTS.md](AGENTS.md)
3. Ask in PR comments or discussions
4. Create a new issue with details

## License

By contributing, you agree your code will be under the project's license.

---

**Thank you for contributing!** 🎉
