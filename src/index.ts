import { Rule, chain, apply, url, move, mergeWith, applyTemplates } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { WordpressService } from './services/Php/Wordpress/WordpressService';
import { App } from '@nsilly/container';

export default function handler(options: any): Rule {
  const templateSource = apply(url('./files/contactInfo'), [
    applyTemplates({
      ...strings,
      ...options
    }),
    move(options.path)
  ]);
  return chain([
    mergeWith(templateSource),
    App.make(WordpressService).declareInServiceProvider('app/Providers/BlockServiceProvider.php', `\\App\\Blocks\\ContactInfoBlock::class,`)
  ]);
}
