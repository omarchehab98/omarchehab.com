---
title: Articles
layout: page
---
<h1>
	Articles
	<a
		href="{{ '/feed.xml' | absolute_url }}"
		target="_blank"
		style="vertical-align: sub;"
	>
		<img class="svg"
			src="/assets/icon-rss.svg"
			alt="RSS Feed"
		/>
	</a>
</h1>

<div>
	{% for post in site.posts %}
		{% include article-preview.html post=post %}
	{% endfor %}
</div>
