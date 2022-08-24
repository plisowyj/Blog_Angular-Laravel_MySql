import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string='';
  public user : User;
  public token:any=null;
  public identity:any=null;
  public status:string='';
  public url:string='';

  public froala_options: Object = {
                                    charCounterCount: true,
                                    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
                                    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
                                    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
                                    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
                                  };
  
  public afuConfig  = {
                          multiple: false,
                          formatsAllowed: ".jpg,.png, .jpeg, .bmp",
                          maxSize: 50,
                          uploadAPI: {
                            url:global.url+'user/upload',
                            headers: {
                              "Authorization" : this._userService.getToken(),
                              method:"POST"
                            }
                          },
                          theme: "attachPin",//dragNDrop
                          hideProgressBar: false,
                          hideResetBtn: true,
                          replaceTexts: {
                            attachPinBtn: 'Sube tu avatar',
                            afterUploadMsg_success: 'La imagen se subio correctamente!',
                            afterUploadMsg_error: 'Falló subida imagen!',
                            sizeLimit: 'Limite de tamaño',
                            selectFileBtn: 'Buscar imgen',
                            uploadBtn: 'Subir imagen',
                            dragNDropBox: 'Soltar imagen aquí...',
                          }
                      };

  constructor(
    private _userService: UserService
  ){
    this.page_title = 'Ajustes de Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    this.user = new User(
      this.identity.sub,
      this.identity.fullname,
      this.identity.profile,
      this.identity.email,
      '',
      this.identity.avatar);

  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
      this._userService.update(this.token,this.user).subscribe(
          response => {
            if (response && response.status){
              this.status = 'success';

              let res  = JSON.stringify(response);
              let data = JSON.parse(res);
              console.log(data.changes.fullname);

              if (data.changes.fullname){
                this.user.fullname = data.changes.fullname.toUpperCase();
              }
              if (data.changes.email){
                this.user.email = data.changes.email.toUpperCase();
              }
              if (data.changes.avatar){
                this.user.avatar = data.changes.avatar;
              }

              this.identity=this.user;
              localStorage.setItem('identity', JSON.stringify(this.identity));
            }else{
              this.status = 'error';
            }
          },
          error => {
            this.status='error';
            console.log(<any>error);
          }
      );
  }

  avatarUpload(datos:any){
    let res  = JSON.stringify(datos);
    let data = JSON.parse(res);
    this.user.avatar = data.body.image;
    this.identity.avatar = this.user.avatar;
    console.log(JSON.parse(JSON.stringify(datos)));
  }
}
