import { Rule, Tree } from '@angular-devkit/schematics';
import * as _ from 'lodash';
import { PhpService } from '../PhpService';

export class WordpressService extends PhpService {
  /**
   * Declared required Service Provider
   *
   * @param provider
   * @param options
   *
   * @return void
   */
  appendFunctionFile(content: string, options?: any): Rule {
    options = options || {};
    if (_.isNil(options.functionFilePath)) {
      options.functionFilePath = 'functions.php';
    }
    return (tree: Tree) => {
      let declarationRecorder, readVal;
      readVal = tree.read(options.functionFilePath);
      declarationRecorder = tree.beginUpdate(options.functionFilePath);
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          declarationRecorder.insertLeft(str.length, '\n' + content);
        }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }

  declareInServiceProvider(path: string, content: string): Rule {
    return (tree: Tree) => {
      let declarationRecorder, readVal;
      readVal = tree.read(path);
      declarationRecorder = tree.beginUpdate(path);
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          const find = str.match(/];/gi);
          if (find) {
            declarationRecorder.insertLeft(str.indexOf(find[0]), content + '\n');
          }
        }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }

  declare(path: string, content: string): Rule {
    return (tree: Tree) => {
      let declarationRecorder, readVal;
      readVal = tree.read(path);
      declarationRecorder = tree.beginUpdate(path);
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          if (str.indexOf(content) >= 0) {
            console.log('file declared');
          } else {
            declarationRecorder.insertLeft(str.length, content + '\n');
          }
        }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }
}
