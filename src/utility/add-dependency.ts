import { Rule, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { exec } from 'shelljs';

/**
 * Add package dependency to package.json
 *
 * @param name
 * @param options
 * @param options.type NodeDependencyType
 * @param options.version string
 * @param options.overwrite boolean
 */
export function addDependency(name: string, options?: any): Rule {
  return (host: Tree) => {
    options = options || {};
    addPackageJsonDependency(host, {
      name: name,
      type: options.type ? options.type : NodeDependencyType.Default,
      version: options.version
        ? options.version
        : `^${exec(`npm view ${name} version`)
            .toString()
            .replace('\n', '')}`,
      overwrite: options.override ? options.override : false
    });
    return host;
  };
}
