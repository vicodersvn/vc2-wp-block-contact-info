// import * as pluralize from 'pluralize';
import { strings } from '@angular-devkit/core';

export class WordpressResourceResolver {

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
    return strings.underscore(name);
  }

}
