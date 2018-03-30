document.querySelectorAll('img.svg').forEach(function(img){
	var imgID = img.id;
	var imgClass = img.className;
	var imgURL = img.src;

	fetch(imgURL).then(function(response) {
		return response.text();
	}).then(function(text) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(text, "text/xml");
		var svg = xmlDoc.getElementsByTagName('svg')[0];
		if(typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
		}
		if(typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass+' replaced-svg');
		}
		svg.removeAttribute('xmlns:a');
		if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
				svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
		}
		img.parentNode.replaceChild(svg, img);
	});
});
