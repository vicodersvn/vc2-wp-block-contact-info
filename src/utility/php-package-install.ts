import { Tree, SchematicContext } from '@angular-devkit/schematics';
import { PhpPackageInstallTask } from './tasks/php-package/install-task';
import { PhpTaskExecutor } from './tasks/php';
import { getSystemPath } from '@angular-devkit/core';
/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
export default function phpPackageIntall(options?: any) {
  return (_host: Tree, _context: SchematicContext) => {
    (_context as any).engine._host.registerTaskExecutor(PhpTaskExecutor.PhpPackage, {
      allowPackageManagerOverride: true,
      packageManager: options.packageManager,
      rootDirectory: options.root && getSystemPath(options.root)
    });
    _context.addTask(new PhpPackageInstallTask(options));
  };
}
