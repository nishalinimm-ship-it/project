import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
  //added
// import { provideAnimations } from '@angular/platform-browser/animations';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes)
//   ]
// });



// //addedd
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...(appConfig.providers || []),
//     provideRouter(routes),
//     provideAnimations()
//   ]
// }).catch(err => console.error(err));
