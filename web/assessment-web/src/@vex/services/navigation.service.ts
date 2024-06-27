import { Injectable } from '@angular/core';
import { NavigationDropdown, NavigationItem, NavigationLink, NavigationSubheading } from '../interfaces/navigation-item.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _itemsSubject = new BehaviorSubject<NavigationItem[]>([]);
  items$ = this._itemsSubject.asObservable() as Observable<NavigationItem[]>;

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor(private authService: AuthenticationService) {
    this.updateItems(this.convertedMenuItems);
  }

  convertedMenuItems: any;
  

  updateItems(newItems: NavigationItem[]) {
    this._itemsSubject.next(newItems);
  }

  triggerOpenChange(items$: NavigationDropdown) {
    this._openChangeSubject.next(items$);
  }

  isLink(items$: NavigationItem): items$ is NavigationLink {
    return items$.type === 'link';
  }
  
  isExternalLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'external-link';
  }

  isDropdown(items$: NavigationItem): items$ is NavigationDropdown {
    return items$.type === 'dropdown';
  }

  isSubheading(items$: NavigationItem): items$ is NavigationSubheading {
    return items$.type === 'subheading';
  }
}
