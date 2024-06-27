import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { fadeInUp400ms } from "../../../@vex/animations/fade-in-up.animation";
import { AuthenticationService } from "../../services/auth-service/auth-service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
  userId: string;
  password: string;
  visible = false;
  inputType = "password";
  errorMessage: string;
  successMessage: string;
  signInLoading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  togglePassword() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  clearAll() {
    window.location.reload();
  }

  signIn() {
    this.errorMessage = "";
    if (this.userId && this.password) {
      this.signInLoading = true;
      this.authService
        .getLogin({ username: this.userId, password: this.password })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.signInLoading = false;
            this.cd.markForCheck();
            this.storeUserInfoInSession(response);
            this.router.navigate(['']);
          },
          (error) => {
            this.signInLoading = false;
            console.log(error);
            if (error.status === 0) {
              Swal.fire({
                icon: "error",
                title: "Error!",
                html: "Unable to connect to the server",
              });
            }
            this.successMessage = "";
            this.errorMessage = error.error.responseMessage;
            this.cd.markForCheck();
          }
        );
    } else {
      this.errorMessage = "Please fill up all the required fields";
      console.log(this.errorMessage);
      this.cd.markForCheck();
    }
  }

  storeUserInfoInSession(response: any) {
    this.authService.setUserName("Admin");
    this.authService.setIsAuthenticated(true);
    this.authService.setJwt(response.authToken);
  }
}
