import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service'
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title:string;
  public token:any=null;
  public identity:any=null;
  public post: Post;
  public status:string='';

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
                            url:global.url+'post/upload',
                            headers: {
                              "Authorization" : this._userService.getToken(),
                              method:"POST"
                            }
                          },
                          theme: "attachPin",//dragNDrop
                          hideProgressBar: false,
                          hideResetBtn: true,
                          replaceTexts: {
                            attachPinBtn: 'Sube Imagen',
                            afterUploadMsg_success: 'La imagen se subio correctamente!',
                            afterUploadMsg_error: 'Falló subida imagen!',
                            sizeLimit: 'Limite de tamaño',
                            selectFileBtn: 'Buscar imgen',
                            uploadBtn: 'Subir imagen',
                            dragNDropBox: 'Soltar imagen aquí...',
                          }
                      };

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService
    
    ) { 
    this.page_title='Crear un entrada';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();

    this.post=new Post(1,this.identity.sub,'','',null);

  }

  ngOnInit(): void {
    
    //console.log(this.post);
     
  }

  onSubmit(form:any){
    this._postService.create(this.token,this.post).subscribe(
      response => {
        if (response.status=='success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
            
        }
      },
      error =>{
        console.log(error)
        this.status = 'error';
      }
      );

  };

  imageUpload(datos:any){
    let res  = JSON.stringify(datos);
    let data = JSON.parse(res);
    this.post.image = data.body.image;
    
    console.log(JSON.parse(JSON.stringify(datos)));
  }
}
