import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { WelcomeComponent } from '../pages/welcome/components/welcome.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { denyLoginRedirectGuard } from '../core/guards/deny-login-redirect.guard';
import { adminGuard } from '../core/guards/admin.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from '../core/interceptors/loader.interceptor';
import { loginRedirectGuard } from '../core/guards/login-redirect.guard';
import { PageErrorComponent } from '../core/error-handle/page-error.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { aboutUsComponent } from '../pages/about-us/about-us.component';
import { contactUsComponent } from '../pages/contact-us/contact-us.component';
import { TvlTrsmComponent } from '../pages/travel-tourism/tvl-trsm.component';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

//translate
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);

}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TvlTrsmComponent,
    PageErrorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    NgxPaginationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),

    RouterModule.forRoot([
      {path: '',
        
        loadChildren: () => import("../pages/registration/utilities/register.module").then(m => m.RegisterModule)
      },
      {path: "providers",
        canActivate: [loginRedirectGuard],
        loadChildren: () => import("../pages/providers/utilities/provider.module").then(m => m.ProviderModule)
      },
      {path: "careers",
        canActivate: [loginRedirectGuard],
        loadChildren: () => import('../pages/jobs/utilities/job.module').then(m => m.JobModule)
        
      },
      {path: "projects",
      canActivate: [loginRedirectGuard],
      loadChildren: () => import("../pages/projects/utilities/project.module").then(m => m.ProjectModule)
      },
      {
        path: 'admin',
        canActivate: [loginRedirectGuard,adminGuard],
        loadChildren: () => import('../pages/admin-panel/utilities/admin-panel.module').then(m => m.AdminPanelModule)
      },
      {path: "me",
        canActivate: [loginRedirectGuard],
        loadChildren: () => import("../pages/profile/utilities/profile.module").then(m => m.ProfileModule)
      },
      {path: "travel-tourism",component:TvlTrsmComponent},
      {path: 'welcome',
        canActivate: [loginRedirectGuard],
        component:WelcomeComponent},
        {path: 'about-us',
            canActivate: [loginRedirectGuard],
            component:aboutUsComponent},
            {path: 'contact-us',
                canActivate: [loginRedirectGuard],
                component:contactUsComponent},
      {path: 'not-found-404',component:PageErrorComponent},
      {path: '**', redirectTo:'not-found-404',pathMatch: 'full'}
    ]),

    StoreModule.forRoot({}, {}),
     BrowserAnimationsModule,
     NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
     ModalModule.forRoot(),
     ToastrModule.forRoot()

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }