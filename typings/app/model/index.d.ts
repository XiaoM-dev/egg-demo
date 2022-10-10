// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDb from '../../../app/model/db';
import ExportMguser from '../../../app/model/mguser';

declare module 'egg' {
  interface IModel {
    Db: ReturnType<typeof ExportDb>;
    Mguser: ReturnType<typeof ExportMguser>;
  }
}
