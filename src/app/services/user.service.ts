import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
	public url:string;
	public identity:any=null;
	public token:any=null;

	constructor(
		public _http:HttpClient
	){
		this.url = global.url;

	}

	test(){
		return "hola mundo desde servicio"
	}

	register(user:any):Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'register',params,{headers:headers});
	}

	signup(user:any, gettoken:any):Observable<any>{
		if (gettoken){
			user.gettoken='true';
		}

		//console.log(user);
		let json = JSON.stringify(user);
		let params='json='+json;
		
		let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'login',params,{headers:headers});

	}

	update(token:any, user:any):Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
										.set('Authorization', token);
		
		return this._http.put(this.url + 'user/update',params, {headers:headers});

	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity')|| '{}');
		//console.log(identity.fullname);

		if (identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity=null;
			
		}
		return this.identity;
	}

	getToken(){
		let token = JSON.parse(localStorage.getItem('token')|| '{}');

		if (token && token != "undefined"){
			this.token = token;
		}else{
			this.token=null;
		}
		return this.token;
	}


}