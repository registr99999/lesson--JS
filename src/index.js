'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import img from './modules/img';

// -------------------------------------------   Timer   ------------------------------------------------
countTimer('2022-12-31');
// -------------------------------------------   menu   ------------------------------------------------
toggleMenu();
// -------------------------------------------   popup   ------------------------------------------------
togglePopUp();
// -------------------------------------------   tabs   ------------------------------------------------
tabs();
// -------------------------------------------   sleder   ------------------------------------------------
slider();
// -------------------------------------------   calculeted   ------------------------------------------------
calc();
// -------------------------------------------   sebd-ajax-form   ------------------------------------------------
sendForm();
// -------------------------------------------   img   ------------------------------------------------
img();
