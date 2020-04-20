import { SchematicContext } from '@angular-devkit/schematics';
/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
export default function packageIntall(options?: any): (_host: import("@angular-devkit/schematics/src/tree/interface").Tree, _context: SchematicContext) => void;
