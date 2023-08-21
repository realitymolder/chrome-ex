import App from './App.svelte';

const observer = new MutationObserver((mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList') {
			const element = document.querySelector('#below');
			if (element) {
				let root: HTMLDivElement;
				if (!element.getAttribute('plugin-load')) {
					element.setAttribute('plugin-load', 'true');
					root = document.createElement('div');
					element.prepend(root);
				} else {
					root = element.firstChild! as HTMLDivElement;
					root.firstChild?.remove();
				}
				new App({ target: root });
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

// const observer = new MutationObserver((mutationsList) => {
// 	for (const mutation of mutationsList) {
// 		if (mutation.type === 'childList') {
// 			const element = document.querySelector('#below');
// 			if (element) {
// 				if (!element.getAttribute('plugin-load')) {
// 					const iframe = document.createElement('iframe');
// 					iframe.title = '';
// 					element.prepend(iframe);
// 					iframe.onload = (ev) => {
// 						new App({
// 							target: iframe.contentWindow!.document.body,
// 						});
// 					};
// 				}
// 				observer.disconnect();
// 				return;
// 			}
// 		}
// 	}
// });
