/* Kertomus site — small, dependency-free enhancements. */
(() => {
  const REPO = 'mahakammoonlightstudio-beep/Kertomus';
  const RELEASES = `https://github.com/${REPO}/releases`;
  const LATEST = `${RELEASES}/latest`;
  const API = `https://api.github.com/repos/${REPO}/releases/latest`;
  const isID = document.documentElement.lang === 'id';

  const copy = isID
    ? {
        win: 'Unduh untuk Windows',
        mac: 'Unduh untuk macOS',
        linux: 'Unduh untuk Linux',
        all: 'Lihat semua unduhan',
        detected: 'Terdeteksi',
      }
    : {
        win: 'Download for Windows',
        mac: 'Download for macOS',
        linux: 'Download for Linux',
        all: 'Browse all downloads',
        detected: 'Detected',
      };

  const detectOS = () => {
    const ua = navigator.userAgent || '';
    const platform = navigator.userAgentData && navigator.userAgentData.platform;
    const p = String(platform || navigator.platform || '');
    if (/win/i.test(ua) || /win/i.test(p)) return 'win';
    if (/mac/i.test(ua) || /mac/i.test(p)) return 'mac';
    if (/linux|android/i.test(ua) || /linux/i.test(p)) return 'linux';
    return 'all';
  };

  const os = detectOS();
  const primary = document.getElementById('primary-download');
  const primaryLabel = document.getElementById('primary-label');
  const detected = document.getElementById('detected-os');
  if (primary) primary.href = LATEST;
  if (primaryLabel) primaryLabel.textContent = copy[os] || copy.all;
  if (detected && os !== 'all') {
    const names = { win: 'Windows', mac: 'macOS', linux: 'Linux' };
    detected.textContent = `${copy.detected}: ${names[os]}`;
  }

  const assetFor = (release, target) => {
    if (!release || !Array.isArray(release.assets)) return null;
    const assets = release.assets;
    const find = (patterns) => assets.find((a) => patterns.every((re) => re.test(a.name)));
    if (target === 'win') {
      return find([/win/i, /x64/i, /\.exe$/i]) || find([/win/i, /\.zip$/i]);
    }
    if (target === 'mac') {
      return find([/mac/i, /universal/i, /\.dmg$/i]) || find([/mac/i, /\.zip$/i]);
    }
    if (target === 'linux') {
      return find([/linux/i, /x64/i, /\.AppImage$/i]) || find([/linux/i, /\.tar\.gz$/i]);
    }
    if (target === 'linux-arm64') {
      return find([/linux/i, /arm64/i, /\.AppImage$/i]) || find([/linux/i, /arm64/i, /\.tar\.gz$/i]);
    }
    return null;
  };

  const setVersion = (tag) => {
    document.querySelectorAll('[data-version]').forEach((el) => {
      el.textContent = String(tag || '1.3.1').replace(/^v/i, '');
    });
  };

  fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((release) => {
      if (!release || !release.tag_name) return;
      setVersion(release.tag_name);
      document.querySelectorAll('[data-os]').forEach((link) => {
        const target = link.getAttribute('data-os');
        const asset = assetFor(release, target);
        if (asset && asset.browser_download_url) link.href = asset.browser_download_url;
      });
      if (primary) primary.href = release.html_url || LATEST;
    })
    .catch(() => {
      /* The static release links are the fallback. No toast, no drama. */
    });

  const menu = document.querySelector('.menu-btn');
  const nav = document.getElementById('site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // A note for the people who open the console. That is all it is.
  console.log('%cThere is a seventh shelf.', 'color:#e3ae43;font:italic 16px Georgia,serif');
  console.log('%cWe will not be explaining that.', 'color:#a99b85;font:11px ui-monospace,monospace');
})();
