import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/auth-service/auth-service';
import { SessionTimerService } from 'src/app/services/session-timer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'corpib-session-alert',
  templateUrl: './session-alert.component.html',
  styleUrls: ['./session-alert.component.scss']
})
export class SessionAlertComponent implements OnInit {

  sessionTimer: any;

  constructor(private authService: AuthenticationService,
    private sessionTimerService: SessionTimerService,
    private dialogRef: MatDialogRef<SessionAlertComponent>) { }

  ngOnInit(): void {
    this.sessionTimerService.sessionTimer$.subscribe((timerValue: any) => {
      this.sessionTimer = timerValue;
    });
  }

  cancel(){
    this.dialogRef.close();
    this.sessionTimerService.setDialogClosed(true);
  }

}
