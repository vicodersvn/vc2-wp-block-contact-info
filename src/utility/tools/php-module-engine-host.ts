/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseException, InvalidJsonCharacterException, UnexpectedEndOfInputException } from '@angular-devkit/core';
import { dirname, extname, join, resolve } from 'path';
import { RuleFactory } from '@angular-devkit/schematics';
import { FileSystemCollectionDesc, FileSystemSchematicDesc } from '@angular-devkit/schematics/tools/description';
import { ExportStringRef } from '@angular-devkit/schematics/tools/export-ref';
import {
  CollectionCannotBeResolvedException,
  CollectionMissingSchematicsMapException,
  FileSystemEngineHostBase,
  InvalidCollectionJsonException,
  SchematicMissingFieldsException
} from '@angular-devkit/schematics/tools/file-system-engine-host-base';
import { readJsonFile } from '@angular-devkit/schematics/tools/file-system-utility';

export class PhpPackageDoesNotSupportSchematics extends BaseException {
  constructor(name: string) {
    super(`Package ${JSON.stringify(name)} was found but does not support schematics.`);
  }
}

/**
 * A simple EngineHost that uses NodeModules to resolve collections.
 */
export class PhpModulesEngineHost extends FileSystemEngineHostBase {
  constructor(private readonly paths?: string[]) {
    super();
  }

  protected _resolveCollectionPath(name: string): string {
    let collectionPath: string | undefined = undefined;
    if (name.startsWith('.') || name.startsWith('/')) {
      name = resolve(name);
    }

    if (extname(name)) {
      // When having an extension let's just resolve the provided path.
      collectionPath = require.resolve(name, { paths: this.paths });
    } else {
      const composerJsonPath = require.resolve(join(name, 'composer.json'), { paths: this.paths });
      const { schematics } = require(composerJsonPath);

      if (!schematics || typeof schematics !== 'string') {
        throw new PhpPackageDoesNotSupportSchematics(name);
      }

      collectionPath = resolve(dirname(composerJsonPath), schematics);
    }

    try {
      readJsonFile(collectionPath);

      return collectionPath;
    } catch (e) {
      if (e instanceof InvalidJsonCharacterException || e instanceof UnexpectedEndOfInputException) {
        throw new InvalidCollectionJsonException(name, collectionPath, e);
      }
    }

    throw new CollectionCannotBeResolvedException(name);
  }

  protected _resolveReferenceString(refString: string, parentPath: string) {
    const ref = new ExportStringRef<RuleFactory<{}>>(refString, parentPath);
    if (!ref.ref) {
      return null;
    }

    return { ref: ref.ref, path: ref.module };
  }

  protected _transformCollectionDescription(name: string, desc: Partial<FileSystemCollectionDesc>): FileSystemCollectionDesc {
    if (!desc.schematics || typeof desc.schematics != 'object') {
      throw new CollectionMissingSchematicsMapException(name);
    }

    return {
      ...desc,
      name
    } as FileSystemCollectionDesc;
  }

  protected _transformSchematicDescription(name: string, _collection: FileSystemCollectionDesc, desc: Partial<FileSystemSchematicDesc>): FileSystemSchematicDesc {
    if (!desc.factoryFn || !desc.path || !desc.description) {
      throw new SchematicMissingFieldsException(name);
    }

    return desc as FileSystemSchematicDesc;
  }
}
