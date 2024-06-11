// // import { Component } from '@angular/core';
// // import { RouterOutlet } from '@angular/router';
// // import { IconButtonComponent } from './Element/iconButton';
// // import { NgModule } from '@angular/core';



// // @Component({
// //   selector: 'app-root',
// //   standalone: true,
// //   imports: [RouterOutlet, IconButtonComponent],
// //   templateUrl: './app.component.html',
// //   // template: `
// //   //   <h1>{{title}}</h1>
    
// //   //   <router-outlet></router-outlet>
// //   // `,
// //   styleUrl: './app.component.css'
// // })
// // export class AppComponent {
// //   title = 'Ask Nerus';
// // }


// import { Component } from '@angular/core';
// // Remove unnecessary imports like RouterOutlet and IconButtonComponent here

// @Component({
//   selector: 'app-root',
//   // templateUrl: './app.component.html',
//   template: '<h1>Hello World</h1>',
//   styleUrls: ['./app.component.css'] // Use styleUrls for CSS
// })
// export class AppComponent {
//   title = 'Ask Nerus';
// }


// Suggested code may be subject to a license. Learn more: ~LicenseLog:624933476.
import { Component, isStandalone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconButtonComponent } from './Element/iconButton/iconButton.component';
import { IconLinkComponent } from './Element/iconLink/iconLink.component';
import { NavbarComponent } from './Component/navbar.component';
import { CdkMenuStandaloneMenuExample } from "./Element/MenuButton/menuButton.component";
import { SidenavComponent } from "./Component/Sidenav/sidenav.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        IconButtonComponent,
        IconLinkComponent,
        NavbarComponent,
        CdkMenuStandaloneMenuExample,
        SidenavComponent
    ],
})
export class AppComponent {
  title = 'Ask Nerus';
}
