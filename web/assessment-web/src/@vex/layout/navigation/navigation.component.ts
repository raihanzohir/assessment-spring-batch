import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { NavigationItem } from 'src/@vex/interfaces/navigation-item.interface';

@Component({
  selector: 'vex-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  items: NavigationItem[];

  constructor(private navigationService: NavigationService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.navigationService.items$.subscribe(items => {
      this.items = items;
      this.cd.detectChanges();
    });
  }
}
