import { Rule } from '@angular-devkit/schematics';
/**
 * Add package dependency to package.json
 *
 * @param name
 * @param options
 * @param options.type NodeDependencyType
 * @param options.version string
 * @param options.overwrite boolean
 */
export declare function addDependency(name: string, options?: any): Rule;
