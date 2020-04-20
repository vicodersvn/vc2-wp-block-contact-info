import { PhpService } from '../PhpService';
import { Rule, Tree } from '@angular-devkit/schematics';

export class LaravelService extends PhpService {
  /**
   * Get AppServiceProvider.php file path
   *
   * @param options
   *
   * @return string
   */
  getAppServiceProviderPath(options: any) {
    return `${options.sourceDir}/app/Providers/AppServiceProvider.php`;
  }

  /**
   * Declared abstract on Service Container
   *
   * @param options
   * @param abstract
   * @param implementation
   *
   * @return void
   */

  bindProvider(options: any, abstract: any, implementation: any): Rule {
    return (tree: Tree) => {
      let readVal = tree.read(this.getAppServiceProviderPath(options));
      const declarationRecorder = tree.beginUpdate(this.getAppServiceProviderPath(options));
      if (readVal) {
        let val = readVal || '';
        if (val) {
          let str = val.toString();
          //   const is_declared = str.indexOf(provider) > -1 || str.indexOf(provider.slice(0, -1)) > -1;
          //   if (!is_declared) {
          const found = str.match(/register.*\(.*\)/gi);
          if (found) {
            const rest = str.slice(str.indexOf(found[0]));
            if (rest.indexOf('}') > -1) {
              declarationRecorder.insertLeft(str.indexOf(found[0]) + rest.indexOf('}'), `$this->app->bind(${abstract}, ${implementation});\n`);
            }
          }
        }
        // }
      }
      tree.commitUpdate(declarationRecorder);
    };
  }
}
