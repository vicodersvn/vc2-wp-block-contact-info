import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Tree, SchematicContext } from '@angular-devkit/schematics';
/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
export default function packageIntall(options?: any) {
  return (_host: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask(options));
  };
}
