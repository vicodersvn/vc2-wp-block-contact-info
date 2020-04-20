import { App } from '@nsilly/container';
import { File } from '@vicoders/console';
import { Rule, Tree } from '@angular-devkit/schematics';

/**
 * Append new line to provided file
 *
 * @param file string
 * @param content boolean
 */
export function appendTo(file: string, content: string): Rule {
  return (host: Tree) => {
    App.make(File).appendTo(file, content);
    return host;
  };
}
