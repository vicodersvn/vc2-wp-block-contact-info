# Vicoders CLI Handler

- [Vicoders CLI Handler](#vicoders-cli-handler)
  - [Getting Started](#getting-started)
  - [Steps](#steps)
    - [Add NPM dependency](#add-npm-dependency)
    - [Install NPM dependency](#install-npm-dependency)
    - [Install PHP package via composer](#install-php-package-via-composer)
    - [Add new line to a file](#add-new-line-to-a-file)

## Getting Started

Fork this repo to start build new command

## Steps

### Add NPM dependency

```javascript

/**
 * Add package dependency to package.json
 *
 * @param name
 * @param options
 * @param options.type NodeDependencyType
 * @param options.version string
 * @param options.overwrite boolean
 */
addDependency(name, options?)
```

### Install NPM dependency

```javascript
import packageIntall from './utility/package-install';

/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
packageIntall(options?)
```

### Install PHP package via composer

```javascript
import phpPackageIntall from './utility/php-package-install';

/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
phpPackageIntall(options?)
```


### Add new line to a file

```javascript
import { appendTo } from './utility/append-to-file/append-to-file';

/**
 * Install NPM dependencies
 *
 * @param options NodePackageTaskOptions
 * @param options.directory
 * @param options.packageManager ["npm", "yarn"]
 */
appendTo(file, content);
```


