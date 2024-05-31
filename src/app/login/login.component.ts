import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showRegisterForm: boolean = false;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['USER', Validators.required], // Default value is 'USER'
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // A função de redirecionamento já está cuidando disso no AuthService
      },
      (error) => {
        alert('Credenciais inválidas');
      }
    );
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  onRegister() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.authService.register(registerData).subscribe(
        (response) => {
          alert('Usuário criado com sucesso');
          this.showRegisterForm = false;
        },
        (error) => {
          console.error('User registration failed', error);
        }
      );
    }
  }
}
