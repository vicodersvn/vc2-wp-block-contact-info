/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics';
import { PhpPackageName, PhpPackageTaskOptions } from './options';

export class PhpPackageInstallTaskOptions {
  packageManager: string;
  packageName: string;
  workingDirectory: string;
  quiet: boolean;
  hideOutput: boolean;
}

export class PhpPackageInstallTask implements TaskConfigurationGenerator<PhpPackageTaskOptions> {
  quiet = true;
  hideOutput = true;
  workingDirectory?: string;
  packageManager?: string;
  packageName?: string;

  constructor(workingDirectory?: string);
  constructor(options: Partial<PhpPackageInstallTaskOptions>);
  constructor(options?: string | Partial<PhpPackageInstallTaskOptions>) {
    if (typeof options === 'string') {
      this.workingDirectory = options;
    } else if (typeof options === 'object') {
      if (options.quiet != undefined) {
        this.quiet = options.quiet;
      }
      if (options.hideOutput != undefined) {
        this.hideOutput = options.hideOutput;
      }
      if (options.workingDirectory != undefined) {
        this.workingDirectory = options.workingDirectory;
      }
      if (options.packageManager != undefined) {
        this.packageManager = options.packageManager;
      }
      if (options.packageName != undefined) {
        this.packageName = options.packageName;
      }
    }
  }

  toConfiguration(): TaskConfiguration<PhpPackageTaskOptions> {
    return {
      name: PhpPackageName,
      options: {
        command: 'install',
        quiet: this.quiet,
        hideOutput: this.hideOutput,
        workingDirectory: this.workingDirectory,
        packageManager: this.packageManager,
        packageName: this.packageName
      }
    };
  }
}
