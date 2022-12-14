// import necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//importar componentes
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PostNewComponent } from './components/post-new/post-new.component';

//definir las rutas
const appRoutes: Routes = [
	{path:'', component: HomeComponent},
	{path:'inicio',component:HomeComponent},
	{path:'login',component:LoginComponent},
	{path:'logout/:sure', component: LoginComponent},
	{path:'registro',component:RegisterComponent},
	{path:'ajustes',component:UserEditComponent},
	{path:'crear-entrada',component:PostNewComponent},
	{path:'**',component:ErrorComponent}
	
];

//exportar configuraciones
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
