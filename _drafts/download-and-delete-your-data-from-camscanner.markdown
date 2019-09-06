---
title: Download and delete your data from CamScanner
date: 2019-09-06 13:24:00 Z
---

# Download All Your Docs

https://www.camscanner.com/files/holder

```js
prevID = null;
intervalID = setInterval(() => {
	const docs = Array.from($('.mydoc_container'));
	const docIndex = docs.findIndex((el) => el.id === prevID);
	if (docIndex + 1 === docs.length) {
		clearInterval(intervalID);
    } else {
        const doc = docs[docIndex + 1];
        prevID = doc.id;
        doc.scrollIntoView();
        doc.style.backgroundColor = 'rgba(50, 255, 50, 0.2)';
        $(`#${doc.id} .doc_more_opt`).click();
        setTimeout(() => {
            $(`.pop_download`).click();
        }, 1000);
        setTimeout(() => {
            $(`.btn_download.jpg`).click();
        }, 2000);
    }
}, 3000);
```

# Move All Your Docs to Trash

https://www.camscanner.com/files/holder

```
prevID = null;
intervalID = setInterval(() => {
	const docs = Array.from($('.mydoc_container'));
	if (0 === docs.length) {
		clearInterval(intervalID);
    } else {
        const doc = docs[0];
        $(`#${doc.id} .doc_more_opt`).click();
        setTimeout(() => {
            $(`.pop_delete`).click();
        }, 1000);
        setTimeout(() => {
            $(`.iu_dialog_button_0`).click();
        }, 2000);
    }
}, 3000);
```