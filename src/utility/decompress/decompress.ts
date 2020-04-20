import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable } from 'rxjs/internal/Observable';
import * as decompresser from 'decompress';

export function decompress(source: string, dest: string): Rule {
  return (host: Tree) => {
    return new Observable<Tree>(subscriber => {
      decompresser(source, dest).then(() => {
        subscriber.next(host);
        subscriber.complete();
      });
    });
  };
}
