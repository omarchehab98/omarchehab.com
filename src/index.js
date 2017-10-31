import './styles/all.scss';
import './js/to-inline-svg.js';
import './js/animations.js';

if (process.env.NODE_ENV === 'production') {
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/service-worker.js');
	}
}
