/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TaskExecutorFactory } from '@angular-devkit/schematics';
import { PhpPackageTaskFactoryOptions } from '../php-package/options';
export declare class PhpTaskExecutor {
    static readonly PhpPackage: TaskExecutorFactory<PhpPackageTaskFactoryOptions>;
}
