import './app.postcss';
import App from './App.svelte';

const observer = new MutationObserver((mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList') {
			const element = document.querySelector('#below');
			if (element) {
				if (!element.getAttribute('plugin-load')) {
					element.setAttribute('plugin-load', 'true');
					const root = document.createElement('div');
					new App({ target: root });
					element.prepend(root);
				}
				observer.disconnect();
				return;
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true,
});
