import * as moment from 'moment';
import * as pluralize from 'pluralize';
import { strings } from '@angular-devkit/core';

export class LaravelFilenameResolver {
  resolveMigrationFilename(name: string) {
    return moment().format('YYYY_MM_DD_hhmmss') + '_create_' + strings.dasherize(pluralize(name)) + '_table';
  }

  resolveTaggableMigrationFilename() {
    return (
      moment()
        .add(1, 'second')
        .format('YYYY_MM_DD_hhmmss') +
      '_create_' +
      strings.dasherize('taggables') +
      '_table'
    );
  }
}
