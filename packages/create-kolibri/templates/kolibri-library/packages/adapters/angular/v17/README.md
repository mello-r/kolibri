# KoliBri - Angular 17-Adapter

## Motivation

Provide an adapter for [Angular](https://angular.dev/) version 17 to use the KoliBri components.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i -g https://www.npmjs.com/package/@public-ui/angular-v17
pnpm i -g https://www.npmjs.com/package/@public-ui/angular-v17
yarn add -g https://www.npmjs.com/package/@public-ui/angular-v17
```

## Usage

First, register KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KoliBriModule } from '@public-ui/angular-v17';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/themes';

@NgModule({
	imports: [BrowserModule, KoliBriModule],
})
export class AppModule {
	public constructor() {
		register(DEFAULT, defineCustomElements).catch(/* Handle errors */);
	}
}
```

Then, you can use any KoliBri component within your templates:

```html
<kol-button _label="Hello World" />
```
