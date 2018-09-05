---
title: Netlify Site with Wildcard Subdomain
date: 2018-09-05 01:54:00 Z
layout: page-article
---

> Omar Chehab: Hello, is it possible to configure a Site to serve on a wildcard subdomain?

> Chris from Netlify: Sure.  This is a paid feature, so the steps to do it are:
>
> 1. sign up for a pro team and move your sites over to it as described here: https://www.netlify.com/docs/teams/
>
> 2. purchase a wildcard SSL certificate to use with our service.  We cannot provide one for you.
>
> 3. set a domain on the site such as "wildcard.example.com"
>
> 4. set up your wildcard DNS record as a CNAME pointing to that sitename.netlify.com
>
> 5. contact us to enable the feature for you

Well, that's it. It's simple. Pay $45 / month, upgrade to Teams Pro and you're set!

If you're looking for an alternative that won't cost you $540 / year, consider an alternative approach:

1. Issue a wildcard certificate for free with LetsEncrypt for your domain and add it to your Netlify Site.

2. Set up a wildcard DNS record as a CNAME pointing to your Netlify Site.

3. Add a domain alias for each subdomain you want to create. You can do this programmatically using the Netlify API.

```js
async function addDomainAlias(siteId, domainAlias) {
    // Get Netlify Site to read existing domain aliases
    const getSite = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
        headers: {
            'User-Agent': `Omar Chehab (omarchehab98@gmail.com)`,
            Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
        },
    });
    const site = await getSite.json();
    // If Netlify Site does not have the domain alias we want to add
    if (!site.domain_aliases.includes(domainAlias)) {
        // Update the Netlify Site to include the domain alias we want to add
        await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
            method: 'PUT',
            headers: {
                'User-Agent': `Omar Chehab (omarchehab98@gmail.com)`,
                Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                domain_aliases: [
                    ...site.domain_aliases,
                    domainAlias,
                ],
            }),
        });
    }
}
```

It's not an ideal alternative because it does not mimic the behaviour exactly. If your use case requires you to create a subdomain on demand, for example, similar to what Slack has for their workspaces -- create a subdomain when a user fills a form or something. Then this will work great until you can afford to upgrade to Teams Pro.