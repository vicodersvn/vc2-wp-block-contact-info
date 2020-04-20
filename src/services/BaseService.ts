import { Rule, Tree } from '@angular-devkit/schematics';
import * as _ from 'lodash';
const dotenv = require('dotenv');

export class BaseService {
  declareEnvironmentVariable(variable: string, value: string, options: any): Rule {
    options = options || {};
    if (_.isNil(options.environmentFilePath)) {
      options.environmentFilePath = '.env';
    }
    return (tree: Tree) => {
      let declarationRecorder, readVal;
      readVal = tree.read(options.environmentFilePath);
      declarationRecorder = tree.beginUpdate(options.environmentFilePath);
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          const is_declared = str.indexOf(variable) > -1;
          if (!is_declared) {
            declarationRecorder.insertLeft(str.length, '\n' + `${variable}="${value}"`);
          } else {
            const buf = Buffer.from(val.toString());
            let valueOld = dotenv.parse(buf);
            if (valueOld[variable] === '' || _.isNil(valueOld[variable])) {
              declarationRecorder.insertLeft(str.indexOf(variable) + (variable.length + 1), value);
            } else {
              console.log('Environment variable is declared !');
            }
          }
        }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }
}
