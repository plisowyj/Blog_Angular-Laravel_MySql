import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Blog-angular';
  public identity:any=null;
  public token:any=null;
  public url:string='';

  constructor(
      public _userService: UserService
    ){
      this.loadUSer();
      this.url = global.url;
  }

  ngOnInit(){
    console.log('Webapp cargada correctamente');
  }

  ngDoCheck(){
    this.loadUSer();
  }

  loadUSer(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
