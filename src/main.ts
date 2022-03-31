import Aurelia, { RouterConfiguration } from 'aurelia';
import { ChuckNorrisApp } from './chuck-norris-app';

import '../static/site.css';

Aurelia
  .register(
    RouterConfiguration.customize({ sameUrlStrategy: 'reload' })
  )
  .app(ChuckNorrisApp)
  .start();
