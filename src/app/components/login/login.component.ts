import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user:User;
  public status:string='';
  public token:any=null;
  public identity:any=null;

  constructor(
      private _userService:UserService,
      private _router: Router,
      private _route: ActivatedRoute,
    ) { 
      this.page_title = 'Identifícate';
      this.user = new User(1,'','N','','','');
  }
  ngOnInit(): void {
    //cierra sesion solo cuando le llega param SURE
    this.logout();

  }

  onSubmit(form:any){
    this._userService.signup(this.user,false).subscribe(
        response => {
          //token
          if (response.status!='error'){
            this.status='success';
            this.token=response;

            //Objeto user identificado
            this._userService.signup(this.user,true).subscribe(
                response => {
                    this.identity=response;
                    console.log(this.identity);
                    console.log(this.token);

                    //persistir datos usuario identificado
                    localStorage.setItem('token',JSON.stringify(this.token));
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    //redirijo al inicio
                    this._router.navigate(['inicio']);
                },
                error => {
                  this.status='error';

                  console.log(<any>error);
                }
            );

          }else{
            this.status='error';
          }
          

        },
        error => {
          this.status='error';

          console.log(<any>error);
        }
    );
  }

  logout(){
      this._route.params.subscribe(params => {
        let logout = +params['sure'];//con el + lo casteo a int

        if (logout==1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity=null;
          this.token='';

          //redirijo al inicio
          this._router.navigate(['inicio']);

        }
      })
  }
}
