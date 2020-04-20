import { Rule, Tree } from '@angular-devkit/schematics';
import * as _ from 'lodash';
import { BaseService } from '../BaseService';

export class PhpService extends BaseService {
  /**
   * Declared required Service Provider
   *
   * @param provider
   * @param options
   *
   * @return void
   */
  declareServiceProvider(provider: string, options?: any): Rule {
    options = options || {};
    if (_.isNil(options.configFilePath)) {
      options.configFilePath = 'config/app.php';
    }
    return (tree: Tree) => {
      let declarationRecorder, readVal;
      readVal = tree.read(options.configFilePath);
      declarationRecorder = tree.beginUpdate(options.configFilePath);
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          const is_declared = str.indexOf(provider) > -1 || str.indexOf(provider.slice(0, -1)) > -1;
          if (!is_declared) {
            const found = str.match(/providers.*\[(.*)/gi);
            if (found) {
              const rest = str.slice(str.indexOf(found[0]));
              if (rest.indexOf(']') > -1) {
                declarationRecorder.insertLeft(str.indexOf(found[0]) + rest.indexOf(']'), provider + ',' + '\n');
              }
            }
          }
        }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }
}
