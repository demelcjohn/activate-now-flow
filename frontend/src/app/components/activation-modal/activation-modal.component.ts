import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { phoneNumberValidator } from '../../validators/custom.validators';

@Component({
  selector: 'app-activation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activation-modal.component.html',
  styleUrl: './activation-modal.component.scss',
})
export class ActivationModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  activationForm: FormGroup;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.activationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
      pan: ['', [Validators.required]],
    });
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onActivate(): void {
    if (this.activationForm.invalid) {
      this.markFormGroupTouched(this.activationForm);
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = this.activationForm.value;

    this.userService.submitActivation(formData).subscribe(
      (response: any) => {
        console.log('Activation successful:', response);
        this.successMessage =
          'Activation successful! Your request has been submitted.';
        this.loading = false;
        setTimeout(() => {
          this.closeModal.emit();
        }, 2000);
      },
      (error: any) => {
        console.error('Activation failed:', error);
        this.errorMessage =
          error.error?.message ||
          'Failed to submit activation. Please try again.';
        this.loading = false;
      },
    );
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.activationForm.get(fieldName);
    return control ? control.valid && control.value : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.activationForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control.errors['minlength']) {
      return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (control.errors['invalidPhone']) {
      return 'Phone must be 10 digits or +91 followed by 10 digits';
    }

    return 'Invalid input';
  }
}
