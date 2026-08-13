(function () {
  var ROLE_LABEL = {
    scene: '诗中地',
    origin: '相关出处',
    writing: '写作地',
    mention: '提及',
    route: '行程',
  };

  var DYNASTY_ORDER = [
    '先秦', '汉', '魏', '晋', '南北朝', '唐', '宋', '元', '明', '清', '现代',
  ];

  var DYNASTY_CLASS = {
    '先秦': 'xianqin',
    '汉': 'han',
    '魏': 'wei',
    '晋': 'jin',
    '南北朝': 'nanbeichao',
    '唐': 'tang',
    '宋': 'song',
    '元': 'yuan',
    '明': 'ming',
    '清': 'qing',
    '现代': 'modern',
  };

  var state = {
    poems: [],
    filtered: [],
    selectedId: null,
    layer: null,
    markersById: {},
  };

  var els = {
    stage: document.getElementById('filter-stage'),
    dynasty: document.getElementById('filter-dynasty'),
    role: document.getElementById('filter-role'),
    modal: document.getElementById('map-modal'),
    backdrop: document.getElementById('modal-backdrop'),
    close: document.getElementById('modal-close'),
    count: document.getElementById('panel-count'),
    meta: document.getElementById('card-meta'),
    title: document.getElementById('card-title'),
    author: document.getElementById('card-author'),
    place: document.getElementById('card-place'),
    body: document.getElementById('card-body'),
    notes: document.getElementById('card-notes'),
    notesList: document.getElementById('card-notes-list'),
    siblings: document.getElementById('card-siblings'),
  };

  var map = L.map('map', {
    center: [35.5, 105],
    zoom: 5,
    minZoom: 3,
    maxZoom: 12,
    zoomControl: true,
  });

  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    attribution: '&copy; 高德地图',
    subdomains: '1234',
    maxZoom: 18,
    minZoom: 3,
  }).addTo(map);

  function placeOf(poem) {
    return poem.places && poem.places[0] ? poem.places[0] : null;
  }

  function coordKey(place) {
    return Number(place.lng.toFixed(2)) + ',' + Number(place.lat.toFixed(2));
  }

  function shortTitle(title) {
    var t = String(title || '').replace(/\s+/g, '');
    t = t.replace(/（.*?）/g, '').replace(/\(.*?\)/g, '');
    if (t.length > 8) t = t.slice(0, 8);
    return t || '无题';
  }

  function shortAuthor(author) {
    var a = String(author || '').replace(/\s+/g, '');
    if (!a) return '';
    if (a.length > 3) a = a.slice(0, 3);
    return a;
  }

  /** 同坐标旗帜文案：同名时追作者，仍撞名再追年级简写 */
  function bannerLabel(poem, peers) {
    var base = shortTitle(poem.title);
    var sameTitle = (peers || []).filter(function (p) {
      return shortTitle(p.title) === base;
    });
    if (sameTitle.length <= 1) return base;

    var withAuthor = base + shortAuthor(poem.author);
    var sameAuthor = sameTitle.filter(function (p) {
      return shortAuthor(p.author) === shortAuthor(poem.author);
    });
    if (sameAuthor.length <= 1) return withAuthor.length > 8 ? withAuthor.slice(0, 8) : withAuthor;

    var gradeHint = String(poem.grade || '').replace(/册$/, '');
    var label = shortAuthor(poem.author) + gradeHint;
    return label.length > 8 ? label.slice(0, 8) : label;
  }

  function siblingLabel(poem, peers) {
    var sameTitle = peers.every(function (p) { return p.title === poem.title; });
    var sameAuthor = peers.every(function (p) { return p.author === poem.author; });
    if (sameTitle && !sameAuthor) {
      return (poem.author || '佚名') + ' · ' + (poem.grade || '');
    }
    if (sameTitle && sameAuthor) {
      return poem.grade || poem.id;
    }
    return (poem.title || '') + ' · ' + (poem.author || '') + ' · ' + (poem.grade || '');
  }

  function readQuery() {
    var q = new URLSearchParams(window.location.search);
    return {
      stage: q.get('stage') || 'all',
      dynasty: q.get('dynasty') || 'all',
      role: q.get('role') || 'scene',
      id: q.get('id') || null,
    };
  }

  function writeQuery() {
    var q = new URLSearchParams();
    if (els.stage.value !== 'all') q.set('stage', els.stage.value);
    if (els.dynasty.value !== 'all') q.set('dynasty', els.dynasty.value);
    if (els.role.value !== 'scene') q.set('role', els.role.value);
    if (state.selectedId) q.set('id', state.selectedId);
    var qs = q.toString();
    var url = qs ? '/map?' + qs : '/map';
    window.history.replaceState(null, '', url);
  }

  function fillDynastyOptions(poems) {
    var set = {};
    poems.forEach(function (p) {
      if (p.dynasty) set[p.dynasty] = true;
    });
    DYNASTY_ORDER.forEach(function (name) {
      if (!set[name]) return;
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      els.dynasty.appendChild(opt);
    });
    Object.keys(set).forEach(function (name) {
      if (DYNASTY_ORDER.indexOf(name) >= 0) return;
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      els.dynasty.appendChild(opt);
    });
  }

  function applyFilters() {
    var stage = els.stage.value;
    var dynasty = els.dynasty.value;
    var role = els.role.value;

    state.filtered = state.poems.filter(function (p) {
      var place = placeOf(p);
      if (!place) return false;
      if (stage !== 'all' && p.stage !== stage) return false;
      if (dynasty !== 'all' && p.dynasty !== dynasty) return false;
      if (role !== 'all' && place.role !== role) return false;
      return true;
    });

    renderMarkers();
    els.count.textContent = '显示 ' + state.filtered.length + ' 首';

    if (state.selectedId) {
      var still = state.filtered.some(function (p) { return p.id === state.selectedId; });
      if (still) {
        showPoem(state.selectedId, false);
      } else {
        closeModal(false);
      }
    }
    writeQuery();
  }

  function bannerIcon(poem, place, offsetX, active, peers) {
    var title = bannerLabel(poem, peers);
    var tip = poem.title + (poem.author ? ' · ' + poem.author : '') + (poem.grade ? ' · ' + poem.grade : '');
    var flagH = Math.max(52, title.length * 14 + 18);
    var totalH = flagH + 26;
    var width = 28;
    var cls = 'poem-banner';
    if (place.role === 'origin') cls += ' is-origin';
    if (place.confidence === 'region') cls += ' is-region';
    if (active) cls += ' is-active';

    return L.divIcon({
      className: 'poem-banner-wrap',
      html:
        '<div class="' + cls + '" title="' + escapeHtml(tip) + '">' +
          '<div class="poem-banner__flag"><span class="poem-banner__text">' + escapeHtml(title) + '</span></div>' +
          '<div class="poem-banner__tail"></div>' +
          '<div class="poem-banner__pole"></div>' +
          '<div class="poem-banner__pin"></div>' +
        '</div>',
      iconSize: [width, totalH],
      iconAnchor: [width / 2 - offsetX, totalH - 2],
    });
  }

  function groupByCoord(poems) {
    var groups = {};
    poems.forEach(function (p) {
      var place = placeOf(p);
      if (!place) return;
      var key = coordKey(place);
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    return groups;
  }

  function groupOffsets(groups) {
    var offsets = {};
    Object.keys(groups).forEach(function (key) {
      var list = groups[key];
      list.forEach(function (p, i) {
        offsets[p.id] = (i - (list.length - 1) / 2) * 24;
      });
    });
    return offsets;
  }

  function renderMarkers() {
    if (state.layer) {
      map.removeLayer(state.layer);
    }
    state.layer = L.layerGroup();
    state.markersById = {};

    var groups = groupByCoord(state.filtered);
    var offsets = groupOffsets(groups);

    state.filtered.forEach(function (poem) {
      var place = placeOf(poem);
      if (!place) return;
      var peers = groups[coordKey(place)] || [poem];
      var offsetX = offsets[poem.id] || 0;
      var marker = L.marker([place.lat, place.lng], {
        icon: bannerIcon(poem, place, offsetX, poem.id === state.selectedId, peers),
        riseOnHover: true,
        zIndexOffset: poem.id === state.selectedId ? 500 : Math.round(place.lat),
      });
      marker.poemId = poem.id;
      marker.on('click', function () {
        showPoem(poem.id, true);
      });
      state.markersById[poem.id] = marker;
      state.layer.addLayer(marker);
    });

    map.addLayer(state.layer);

    if (state.filtered.length > 0) {
      try {
        map.fitBounds(state.layer.getBounds().pad(0.12));
      } catch (e) {
        map.setView([35.5, 105], 5);
      }
    }
  }

  function refreshActiveBanner() {
    var groups = groupByCoord(state.filtered);
    var offsets = groupOffsets(groups);
    Object.keys(state.markersById).forEach(function (id) {
      var marker = state.markersById[id];
      var poem = state.filtered.find(function (p) { return p.id === id; });
      if (!poem) return;
      var place = placeOf(poem);
      var peers = groups[coordKey(place)] || [poem];
      marker.setIcon(bannerIcon(poem, place, offsets[id] || 0, id === state.selectedId, peers));
      marker.setZIndexOffset(id === state.selectedId ? 800 : Math.round(place.lat));
    });
  }

  function poemsAtSamePoint(poem) {
    var place = placeOf(poem);
    if (!place) return [poem];
    var key = coordKey(place);
    return state.filtered.filter(function (p) {
      var pl = placeOf(p);
      return pl && coordKey(pl) === key;
    });
  }

  function openModal() {
    els.modal.classList.remove('is-hidden');
    els.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(updateUrl) {
    state.selectedId = null;
    els.modal.classList.add('is-hidden');
    els.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    refreshActiveBanner();
    if (updateUrl !== false) writeQuery();
  }

  function showPoem(id, pan) {
    var poem = state.filtered.find(function (p) { return p.id === id; })
      || state.poems.find(function (p) { return p.id === id; });
    if (!poem) return;

    var place = placeOf(poem);
    if (!place) return;

    state.selectedId = id;

    els.meta.textContent = poem.stage + ' · ' + poem.grade + ' · ' + (ROLE_LABEL[place.role] || place.role);
    els.title.textContent = poem.title;

    var dynastyCls = DYNASTY_CLASS[poem.dynasty] || '';
    els.author.innerHTML =
      (poem.dynasty
        ? '<span class="map-modal__dynasty ' + dynastyCls + '">' + escapeHtml(poem.dynasty) + '</span>'
        : '') +
      '<span>' + escapeHtml(poem.author || '') + '</span>';

    els.place.innerHTML =
      '<strong>' + escapeHtml(place.nameAncient) + '</strong> · ' +
      escapeHtml(place.nameModern) +
      (place.nameInDynasty ? '<br><span style="color:#8b6914">时称 ' + escapeHtml(place.nameInDynasty) + '</span>' : '') +
      (place.confidence === 'region' ? '<br><span style="opacity:.75">示意位置</span>' : '');

    var lines = poem.lines && poem.lines.length ? poem.lines : (poem.excerpt ? [poem.excerpt] : []);
    els.body.innerHTML = lines.map(function (line) {
      return '<p>' + escapeHtml(line) + '</p>';
    }).join('');

    var notes = poem.notes && poem.notes.length ? poem.notes : [];
    if (notes.length) {
      els.notes.classList.remove('is-hidden');
      els.notesList.innerHTML = notes.map(function (n) {
        return '<span class="map-modal__note-item">' + escapeHtml(n) + '</span>';
      }).join('');
    } else {
      els.notes.classList.add('is-hidden');
      els.notesList.innerHTML = '';
    }

    var siblings = poemsAtSamePoint(poem);
    if (siblings.length > 1) {
      els.siblings.classList.remove('is-hidden');
      els.siblings.innerHTML =
        '<span class="map-modal__list-label">同地 ' + siblings.length + ' 首</span>' +
        '<div class="map-modal__list-tabs">' +
        siblings.map(function (p) {
          var active = p.id === id ? ' is-active' : '';
          return '<button type="button" class="' + active.trim() + '" data-id="' + escapeHtml(p.id) + '">' +
            escapeHtml(siblingLabel(p, siblings)) + '</button>';
        }).join('') +
        '</div>';
      Array.prototype.forEach.call(els.siblings.querySelectorAll('button'), function (btn) {
        btn.addEventListener('click', function () {
          showPoem(btn.getAttribute('data-id'), false);
        });
      });
    } else {
      els.siblings.classList.add('is-hidden');
      els.siblings.innerHTML = '';
    }

    refreshActiveBanner();
    openModal();

    if (pan) {
      map.setView([place.lat, place.lng], Math.max(map.getZoom(), 7), { animate: true });
    }
    writeQuery();
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initFiltersFromQuery(q) {
    if (q.stage) els.stage.value = q.stage;
    if (q.role) els.role.value = q.role;
    if (q.dynasty) els.dynasty.value = q.dynasty;
  }

  fetch('/api/poems-meta')
    .then(function (res) {
      if (!res.ok) throw new Error('load failed');
      return res.json();
    })
    .then(function (data) {
      state.poems = (data.poems || []).filter(function (p) {
        return placeOf(p);
      });
      fillDynastyOptions(state.poems);
      var q = readQuery();
      initFiltersFromQuery(q);
      applyFilters();
      if (q.id) {
        showPoem(q.id, true);
      }
    })
    .catch(function () {
      els.count.textContent = '加载失败';
    });

  els.stage.addEventListener('change', applyFilters);
  els.dynasty.addEventListener('change', applyFilters);
  els.role.addEventListener('change', applyFilters);
  els.close.addEventListener('click', function () { closeModal(true); });
  els.backdrop.addEventListener('click', function () { closeModal(true); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !els.modal.classList.contains('is-hidden')) {
      closeModal(true);
    }
  });
})();
