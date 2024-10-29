import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  pass = '';
  pass_verify = '';
  codigo = '';
  showPassword = false;
  showPasswordVerify = false;
  showCode = false;

  constructor(private router: Router, private authService: AuthService) { }

  handleRegister() {
    if (this.pass !== this.pass_verify) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(this.email, this.pass, this.codigo).subscribe(
      (response) => {
        console.log(response);

        console.log('Respuesta del registro:', response);

        if (this.codigo === '982647035') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      },
      (error) => {
        console.error('Error al registrar:', error);
        alert('Error al registrar el usuario');
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVerifyVisibility() {
    this.showPasswordVerify = !this.showPasswordVerify;
  }

  toggleCodeVisibility() {
    this.showCode = !this.showCode;
  }
}
