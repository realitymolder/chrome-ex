import browser from 'webextension-polyfill';

const observer = new MutationObserver((mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList') {
			const element = document.getElementById('below');
			if (element) {
				if (!element.getAttribute('plugin-load')) {
					element.setAttribute('plugin-load', 'true');
					const root = document.createElement('iframe');
					root.style.width = '100%';
					root.style.height = 'fit-content';
					root.style.marginTop = '2em';
					root.src = browser.runtime.getURL('src/app/app.html');
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
