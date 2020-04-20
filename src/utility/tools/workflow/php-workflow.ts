/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Path, getSystemPath, schema, virtualFs } from '@angular-devkit/core';
import { workflow } from '@angular-devkit/schematics'; // tslint:disable-line:no-implicit-dependencies
import { FileSystemEngine } from '@angular-devkit/schematics/tools/description';
import { PhpModulesEngineHost } from '../php-module-engine-host';
import { PhpTaskExecutor } from '../../tasks/php';

/**
 * A workflow specifically for Node tools.
 */
export class PhpWorkflow extends workflow.BaseWorkflow {
  constructor(
    host: virtualFs.Host,
    options: {
      force?: boolean;
      dryRun?: boolean;
      root?: Path;
      packageManager?: string;
      registry?: schema.CoreSchemaRegistry;
      resolvePaths?: string[];
    }
  ) {
    const engineHost = new PhpModulesEngineHost(options.resolvePaths);
    super({
      host,
      engineHost,

      force: options.force,
      dryRun: options.dryRun,
      registry: options.registry
    });

    engineHost.registerTaskExecutor(PhpTaskExecutor.PhpPackage, {
      allowPackageManagerOverride: true,
      packageManager: options.packageManager,
      rootDirectory: options.root && getSystemPath(options.root)
    });
    // engineHost.registerTaskExecutor(PhpTaskExecutor.RepositoryInitializer, {
    //   rootDirectory: options.root && getSystemPath(options.root)
    // });
    // engineHost.registerTaskExecutor(PhpTaskExecutor.RunSchematic);
    // engineHost.registerTaskExecutor(PhpTaskExecutor.TslintFix);

    this._context = [];
  }

  get engine(): FileSystemEngine {
    return (this._engine as {}) as FileSystemEngine;
  }
  get engineHost(): PhpModulesEngineHost {
    return this._engineHost as PhpModulesEngineHost;
  }
}
