import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionAlertComponent } from 'src/@vex/components/widgets/widget-session-alert/session-alert/session-alert.component';
import { AuthenticationService } from './auth-service/auth-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerService {

  private _sessionTimer = new BehaviorSubject<any>(null);
  sessionTimer$ = this._sessionTimer.asObservable();

  private _dialogClosed = new BehaviorSubject<boolean>(false);
  dialogClosed$ = this._dialogClosed.asObservable();
  
  sessionStartTimeKey = 'sessionStartTime';
  SESSION_DURATION = environment.sessionTime;

  intervalId: any;

  constructor(private dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router) {
      // Check for stored session start time on service initialization
      const storedStartTime = sessionStorage.getItem(this.sessionStartTimeKey);
      if (storedStartTime) {
        console.log("Session Timer Resumed.");
        const elapsedTime = Date.now() - parseInt(storedStartTime, 10);
        const remainingSeconds = Math.max(0, this.SESSION_DURATION - Math.floor(elapsedTime / 1000));
        this.startSession(remainingSeconds);
      }
    }

  sessionTimeOutAlert(){
    const dialogRef = this.dialog.open(SessionAlertComponent, {
      disableClose: true,
      closeOnNavigation: false,
      autoFocus: false,
      panelClass: ['animate__animated','animate__fadeIn']
    });

    dialogRef.afterClosed().subscribe(result => {
      dialogRef.addPanelClass('animate__fadeOut');
    });
  }

  //session timer function to call from anywhere to start the session
  startSession(second: number) {
    console.log("Session Timer Started.");
    const storedStartTime = sessionStorage.getItem(this.sessionStartTimeKey);
    if (!storedStartTime) {
      sessionStorage.setItem(this.sessionStartTimeKey, Date.now().toString());
    }
    let seconds = second;
    let textSec: any = '0';
    let statSec = second;
  
    this.intervalId = setInterval(() => {
      seconds--;
      statSec--;
      
      if (seconds == 30 ) {
        this.sessionTimeOutAlert();
      }

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      // if (seconds%10 == 0) console.log(`Remaining session time: ${seconds}s`);
  
      this._sessionTimer.next(`${textSec}`);
      if (seconds == 0) {
        this.authService.logout();
        this.router.navigate(['login']);
        this.clearInterval();
        Swal.fire({
          title: "Session Ended!",
          text: "Your active session was expired!",
          icon: "question"
        });
      }
    }, 1000);
  }

  setDialogClosed(value: boolean){
    this._dialogClosed.next(value);
  }

  clearInterval(){
    clearInterval(this.intervalId);
    sessionStorage.removeItem(this.sessionStartTimeKey);
  }
  
}
