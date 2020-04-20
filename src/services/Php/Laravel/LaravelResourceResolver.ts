import * as pluralize from 'pluralize';
import { strings } from '@angular-devkit/core';
import * as _ from 'lodash';

export class LaravelResourceResolver {
  resolveNamespace(type: string) {
    switch (type) {
      case 'controller':
        return `App\\Http\\Controllers`;
      case 'model':
        return `App\\Entities`;
      default:
        break;
    }
  }

  resolveResourceName(affix?: string) {
    const { name, classify } = this as any;
    if (affix) {
      return classify(name) + classify(affix);
    } else {
      return classify(name);
    }
  }

  resolveTablename(name?: any) {
    name = name || (this as any).name;
    return strings.underscore(pluralize(name));
  }

  resolveTablenameRelation(name?: any) {
    name = name || (this as any).name;
    return strings.underscore(name);
  }

  resolveNameSpaceController(namespace: string) {
    const replace = _.replace(namespace, new RegExp('/', 'g'), '\\');
    const text = replace.substr(0, replace.length - 1);
    return text;
  }
}
