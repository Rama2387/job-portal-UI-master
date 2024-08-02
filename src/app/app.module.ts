import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileModule } from './components/profile/profile.module';
import { LayoutModule } from "./components/layout/layout.module";
import { UserModule } from './components/user/user.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AdminModule } from './components/admin/admin.module';

@NgModule({
    declarations: [
        AppComponent,

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        ProfileModule,
        UserModule,
        LayoutModule,
        RouterModule,
        HttpClientModule,
        MessagesModule,
        ToastModule,
        AdminModule,
        
    ],
    providers: [MessageService],

})
export class AppModule { }
