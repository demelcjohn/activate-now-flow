# AGENTS.md - GitHub Copilot Guidance

This document provides guidance for **GitHub Copilot** and developers working on the **Activate Now Flow** project.

## Using GitHub Copilot on This Project

GitHub Copilot has been instrumental in developing this project. Here's how to leverage it effectively:

### Copilot Setup

1. Install [GitHub Copilot](https://github.com/features/copilot) extension in VS Code
2. Sign in with GitHub account
3. Enable in settings: File > Preferences > Settings > "Copilot"

### Copilot Usage Examples

#### Example 1: Generate Component

```typescript
// Type a comment like this, then press Ctrl+Enter
// Create a standalone Angular component for displaying user profile
// with name, email, and edit button

// Copilot will suggest the complete component structure
```

#### Example 2: Form Validation

```typescript
// In validators file, add this comment:
// Create a validator for Indian phone numbers: 10 digits or +91 followed by 10 digits

export function phoneNumberValidator(): ValidatorFn {
  // Copilot completes the implementation
}
```

#### Example 3: HTTP Service

```typescript
// Type this comment in a service:
// Create methods to fetch user data from /user1 and submit activation to /user

@Injectable({ providedIn: "root" })
export class UserService {
  // Copilot generates both methods with proper types
}
```

### Copilot Tips & Tricks

- **Better suggestions**: Add detailed comments explaining the intent
- **Multiple options**: Press Alt+[ or Alt+] to see different suggestions
- **Adjust suggestions**: Edit the comment to be more specific
- **Accept with Tab**: Use Tab to accept Copilot's suggestion
- **Dismiss**: Press Escape if the suggestion isn't helpful

### Best Prompts for This Project

1. "Create an Angular component for a modal form with phone and email validation"
2. "Write a custom validator for Indian PAN format (5 letters, 4 digits, 1 letter)"
3. "Create a service to fetch data from localhost:8080/user1 and POST to /user"
4. "Add real-time validation feedback with green checkmarks for valid fields"
5. "Create SCSS styling for a dashboard with gradient header and cards"

### Common Copilot Patterns

- Component scaffolding with standalone API
- Reactive Forms with validation
- HTTP services with error handling
- SCSS with BEM naming
- TypeScript with strict types
- Angular best practices

### When Copilot Struggles

- Very project-specific business logic
- Complex conditional rendering
- Custom styling requirements

**Solution**: Break the problem into smaller parts and guide Copilot with specific comments.

### Copilot Limitations

- Sometimes generates outdated patterns (e.g., NgModule instead of standalone)
- May not understand project-specific conventions initially
- Can suggest overly complex solutions for simple problems

**Mitigation**: Review code, provide examples from existing code, refine prompts.

## Project Context

### What This Project Does

Educational fee management system with student activation workflow:

1. Students access dashboard showing their fee details
2. Click "Activate Now" to open a form modal
3. Enter name, phone, email, and PAN with real-time validation
4. Submit to backend for processing
5. Upon success, button changes to "Activated" (disabled)

### Technology Stack

- **Frontend**: Angular 19, RxJS, Reactive Forms, SCSS
- **Backend**: Spring Boot, MySQL, JPA
- **Build**: Maven (backend), npm/Angular CLI (frontend)

## Code Style & Conventions

### TypeScript/Angular

```typescript
// ✅ GOOD: Standalone components, type annotations
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  data: string = '';
  isLoading: boolean = false;
}

// ❌ AVOID: NgModules, any types, not standalone
@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule]
})
```

### Form Validation

```typescript
// ✅ GOOD: Custom validators in separate file
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const phonePattern = /^(?:\d{10}|\+91\d{10})$/;
    return phonePattern.test(control.value) ? null : { invalidPhone: true };
  };
}

// ✅ GOOD: Use in component
this.form = this.fb.group({
  phone: ["", [Validators.required, phoneNumberValidator()]],
});
```

### HTML Templates

```html
<!-- ✅ GOOD: Control flow syntax, null-safe operators -->
@if (isLoading) {
<p>Loading...</p>
} @else {
<div>{{ data }}</div>
}

<span *ngIf="control?.invalid && control?.touched" class="error"> Error </span>

<!-- ❌ AVOID: Old *ngIf patterns -->
<div *ngIf="isLoading">Loading...</div>
```

### SCSS

```scss
// ✅ GOOD: BEM naming, nesting, variables
.modal {
  &__header {
    background: linear-gradient(270deg, #ffa36e 0%, #ff728e 100%);
  }

  &__content {
    padding: 20px;
  }
}

.button {
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &.activated {
    background-color: #4caf50;
    cursor: not-allowed;
  }
}
```

## File Organization

### When Creating New Components

```
src/app/components/my-component/
├── my-component.component.ts
├── my-component.component.html
├── my-component.component.scss
└── my-component.component.spec.ts
```

### When Creating Services

```
src/app/services/
├── my.service.ts
└── my.service.spec.ts
```

### When Creating Validators

```
src/app/validators/
└── custom.validators.ts
```

## Common Patterns

### HTTP Service

```typescript
@Injectable({ providedIn: "root" })
export class MyService {
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  submitData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, data);
  }
}
```

### Component with API Call

```typescript
export class MyComponent implements OnInit {
  data: any;
  loading = false;
  error = "";

  constructor(private service: MyService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.service.getData().subscribe(
      (response: any) => {
        this.data = response;
        this.loading = false;
      },
      (error: any) => {
        this.error = "Failed to load data";
        this.loading = false;
      },
    );
  }
}
```

### Modal Component with @Output

```typescript
@Component({
  selector: "app-my-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal" *ngIf="isOpen">
      <button (click)="close()">Close</button>
    </div>
  `,
})
export class MyModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
```

## Before Making Changes

### Checklist

- [ ] Understand the feature/bug completely
- [ ] Check existing patterns in codebase
- [ ] Verify file structure follows conventions
- [ ] Include proper type annotations
- [ ] Add validation where needed
- [ ] Consider error handling
- [ ] Test with `npm run build`
- [ ] Update imports when moving files

### Testing Changes

```bash
# Frontend
cd frontend
npm run build          # Check for TypeScript errors
npm run start         # Test in dev server
npm run test          # Run unit tests

# Backend
cd backend
./mvnw clean install  # Build and test
./mvnw spring-boot:run
```

## Sensitive Data

### Never Commit

- `backend/src/main/resources/application.properties`
- `node_modules/`
- `target/`
- `.env` files
- API keys, passwords, credentials

### Always Exclude

- Add to `.gitignore` before committing
- Use `.example` files for templates
- Store secrets in environment variables

## Git Workflow for Agents

```bash
# 1. Read current status
git status

# 2. Create branch for changes
git checkout -b feature/component-name

# 3. Make changes following conventions
# ... edit files ...

# 4. Test changes
npm run build  # Frontend
./mvnw clean install  # Backend

# 5. Stage and commit
git add .
git commit -m "feat: add new component with validation"

# 6. Push
git push origin feature/component-name
```

## Common Issues & Solutions

### Build Error: "Cannot find module"

- Check import path is correct relative to file location
- Verify file exists in target directory
- Ensure `standalone: true` is set for components using other imports

### TypeScript Error: "Parameter implicitly has 'any' type"

- Add explicit type annotation: `(param: any) => {}`
- Or enable strict mode and use proper types

### Form Validation Not Working

- Ensure validator is added to form control
- Check `form.get('fieldName')` syntax
- Verify validator returns `null` for valid, `{ error: true }` for invalid

### API Call Fails

- Check backend is running on localhost:8080
- Verify endpoint URL in service matches backend
- Check for CORS issues (may need backend configuration)
- Look at browser DevTools Network tab

## When to Ask Questions

If the AI agent is unclear about:

- Business logic or requirements
- Project-specific conventions
- Whether a change impacts other components
- How to test a feature

Create a GitHub issue or ask the human developer.

## Resources & Documentation

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot Best Practices](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)
- [Angular Docs](https://angular.dev)
- [RxJS Guide](https://rxjs.dev)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [MySQL Docs](https://dev.mysql.com/doc/)

---

**Last Updated**: 2026-08-23  
**Primary AI Tool**: GitHub Copilot  
**Project**: Activate Now Flow
