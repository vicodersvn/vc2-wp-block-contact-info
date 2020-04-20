/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics';
import { PhpPackageTaskOptions } from './options';
export declare class PhpPackageInstallTaskOptions {
    packageManager: string;
    packageName: string;
    workingDirectory: string;
    quiet: boolean;
    hideOutput: boolean;
}
export declare class PhpPackageInstallTask implements TaskConfigurationGenerator<PhpPackageTaskOptions> {
    quiet: boolean;
    hideOutput: boolean;
    workingDirectory?: string;
    packageManager?: string;
    packageName?: string;
    constructor(workingDirectory?: string);
    constructor(options: Partial<PhpPackageInstallTaskOptions>);
    toConfiguration(): TaskConfiguration<PhpPackageTaskOptions>;
}
