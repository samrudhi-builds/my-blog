---
layout: page
title: Blog
label: "// writing"
description: Technical deep dives, internship stories, and lessons learned building at the intersection of cybersecurity, blockchain, and design.
permalink: /blog/
---

{% if site.posts.size > 0 %}
<div class="posts-list">
  {% for post in site.posts %}
  <div class="post-item">
    <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
    <div>
      <div class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
      {% if post.description %}
        <p class="post-excerpt">{{ post.description }}</p>
      {% elsif post.excerpt %}
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
      {% endif %}
      {% if post.categories.size > 0 %}
      <div class="tags" style="margin-top:0.4rem;">
        {% for cat in post.categories %}<span class="tag">{{ cat }}</span>{% endfor %}
      </div>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<div style="padding:3rem 0;text-align:center;">
  <p style="color:var(--text-muted);font-size:1rem;margin-bottom:1rem;">No posts yet — they're coming soon!</p>
  <p style="color:var(--text-muted);font-size:0.875rem;">In the meantime, check out my newsletters:</p>
  <div class="social-strip" style="justify-content:center;margin-top:1rem;">
    <a href="https://containersandcoffee.substack.com" class="social-link" target="_blank" rel="noopener">☕ Containers &amp; Coffee</a>
    <a href="https://framesandfrappes.substack.com" class="social-link" target="_blank" rel="noopener">📸 Frames &amp; Frappes</a>
  </div>
</div>
{% endif %}
