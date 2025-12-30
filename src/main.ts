import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent as App } from './app/app';
// import { Home } from './components/home/home';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
