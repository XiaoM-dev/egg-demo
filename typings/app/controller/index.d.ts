// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCharacter from '../../../app/controller/character';
import ExportHome from '../../../app/controller/home';
import ExportMguser from '../../../app/controller/mguser';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    character: ExportCharacter;
    home: ExportHome;
    mguser: ExportMguser;
    user: ExportUser;
  }
}
