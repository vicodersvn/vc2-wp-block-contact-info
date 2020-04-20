/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare const PhpPackageName = "php-package";
export interface PhpPackageTaskFactoryOptions {
    rootDirectory?: string;
    packageManager?: string;
    allowPackageManagerOverride?: boolean;
}
export interface PhpPackageTaskOptions {
    command: string;
    quiet?: boolean;
    hideOutput?: boolean;
    workingDirectory?: string;
    packageName?: string;
    packageManager?: string;
}
