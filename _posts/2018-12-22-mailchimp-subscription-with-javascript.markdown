---
title: MailChimp Subscription with JavaScript
date: 2018-12-22 07:13:00 Z
description: Client-side MailChimp subscription without redirecting the user away.
layout: page-article
---

Typically, one would use MailChimp's embed forms or custom form using their builder. After submission, the form redirects the user to MailChimp's confirmation page. Boo.

I wanted to create a MailChimp subscription without navigating away so that I can register a SalesForce lead.

With [MailChimp's API v3](https://developer.mailchimp.com/documentation/mailchimp/guides/manage-subscribers-with-the-mailchimp-api) you can add a subscription by sending a `POST` request to `/3.0/lists/{list_id}/members`. But that requires authorization using an API Key which is supposed to be secret, so that's a no-go because I want it to be exclusively client-side.

Back to the embed forms I mentioned earlier. As with many things on the web, I ended up hacking it. I wrote a function `mailchimpSubscribe` that creates an invisible `iframe` with a `form` in it. It populates the `form` with `input` elements based on the parameters given to the function (email, name, last name, ...) and submits the form. It returns a promise which resolves when MailChimp has received the request.

```js
/**
 * Subscribes an email address to a MailChimp mailing list.
 * 
 * @param {string} url URL to POST to, you can get it by clicking on "Embedded forms"
 * @param {array} body array of objects with keys `key` and `value`
 * @return {promise}
 * @example
 * mailchimpSubscribe('https://***.***.list-manage.com/subscribe/post?u=***********************&id=*********', [
 *   { key: 'EMAIL', value: 'omarchehab98@gmail.com' },
 *   { key: 'NAME', value: 'Omar Chehab' },
 *   { key: 'LNAME', value: 'Chehab' },
 *   { key: 'PREFIX', value: 'Mr.' },
 *   { key: 'b_***********************_*********', value: '' },
 * ])
 *     .then(console.log)
 */
function mailchimpSubscribe(url, body) {
  const hiddenIFrame = document.createElement('iframe');
  hiddenIFrame.style.display = 'none';

  const hiddenForm = document.createElement('form');
  hiddenForm.setAttribute("action", url);
  hiddenForm.setAttribute("method", "post");
 
  body.forEach(({ key, value }) => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('name', key);
    hiddenInput.setAttribute('value', value);
    hiddenInput.setAttribute('type', 'hidden');
    hiddenForm.appendChild(hiddenInput);
  });

  document.body.appendChild(hiddenIFrame);
  hiddenIFrame.contentDocument.body.appendChild(hiddenForm);

  return new Promise((resolve) => {
    hiddenIFrame.addEventListener('load', resolve);
    hiddenIFrame.addEventListener('load', () => document.body.removeChild(hiddenIFrame));
    hiddenForm.submit();
  });
}
```