import { getThemeDetails, setThemeStyle } from 'adopted-style-sheets';

import { processEnv } from '@public-ui/schema';
import { setMode } from '@stencil/core';

import { register } from '../core';
import { Log } from '../utils/dev.utils';

// ts-prune-ignore-next
export default async (): Promise<void> => {
	setMode((elm) => {
		try {
			if (elm.shadowRoot instanceof ShadowRoot) {
				setThemeStyle(elm, getThemeDetails(elm));
			}
		} catch (error) {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
		return 'default';
	});

	await register([], []);

	import('./devtools')
		.then((devTools) => {
			if (typeof devTools === 'object' && devTools !== null && typeof devTools.initialize === 'function') {
				devTools.initialize();
			}
		})
		.catch((error) => {
			Log.error(error);
		});

	/* Import scripts necessary for the development server, i.e. the /dev/*.html files. Only include in development environment. */
	if (processEnv) {
		import('../dev');
	}
};
