---
layout: page
title: REFLECTIONS ON THE WORST FIFTEEN DAYS OF SUMMER AKA SAD SUMMER AKA SAD SAD SAD AKA SUMMER OF EMPTINESS AND PAIN
permalink: /statement/
nav-title: Director's Statement
---

<div class="gallery-wrapper worst-days">
{% for image in site.static_files %}
    {% if image.path contains 'assets/images/reflections/thumb' %}

<a href="{{ site.url }}/assets/images/reflections/large/{{ image.name }}" data-size="1483x1919" data-med="{{ site.url }}/assets/images/reflections/med/{{ image.name }}" data-med-size="791x1024" data-author="Mitchell Jón Stafiej" class="gallery-item">
<img src="{{ site.url }}/assets/images/reflections/thumb/{{ image.name }}" alt="" />
</a>

    {% endif %}
{% endfor %}
</div>

