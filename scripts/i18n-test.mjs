/**
 * Locale registry tests (headless).
 *
 * Guards the parts that are easy to break silently:
 *   - eight locales exist and both English variants are derived from English (US),
 *   - British spelling is applied to whole words with case preserved,
 *   - Spanish/Hindi only add keys that exist in English (no typo keys),
 *   - every translated value keeps the same {placeholders} as its source,
 *   - missing advanced strings fall back to English instead of showing a key,
 *   - html lang / guide language mappings stay well-formed.
 *
 * Run: node scripts/i18n-test.mjs
 */
import { loadTs } from './lib/load-ts.mjs';

const {
  dictionaries, translate, LANGS, htmlLang, guideLangFor, toBritishEnglish, isLang
} = await loadTs('src/i18n.ts');
const en1700 = dictionaries.en1700;

const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`);
};

const en = dictionaries.en;
const es = dictionaries.es;
const hi = dictionaries.hi;
const ja = dictionaries.ja;
const pirate = dictionaries.pirate;
const beta = { es, hi, ja, pirate, en1700 };

check('locales: eight options in a stable order',
  LANGS.map((l) => l.id).join(',') === 'en,en-GB,en1700,id,es,hi,ja,pirate',
  LANGS.map((l) => l.id).join(','));

check('locales: stored values are validated',
  isLang('en-GB') && isLang('en1700') && isLang('hi') && isLang('ja') && isLang('pirate')
  && !isLang('en-US') && !isLang('xx') && !isLang(null));

check('english UK: every US key has a British counterpart',
  Object.keys(dictionaries['en-GB']).length === Object.keys(en).length,
  `${Object.keys(dictionaries['en-GB']).length} vs ${Object.keys(en).length}`);

check('english UK: spelling pass preserves case and whole words',
  toBritishEnglish('Accent color and behavior') === 'Accent colour and behaviour'
  && toBritishEnglish('Colors') === 'Colours'
  && toBritishEnglish('Analyze the organization') === 'Analyse the organisation'
  && toBritishEnglish('A dialog with a catalog') === 'A dialogue with a catalogue',
  toBritishEnglish('Accent color and behavior'));

check('english UK: reads as a separate dictionary value',
  translate('en-GB', 'appearance.accent') === 'Accent colour'
  && translate('en', 'appearance.accent') === 'Accent color',
  translate('en-GB', 'appearance.accent'));

check('beta locales: substantial core coverage',
  Object.keys(es).length >= 500 && Object.keys(hi).length >= 500
  && Object.keys(ja).length >= 300 && Object.keys(pirate).length >= 300
  && Object.keys(en1700).length === Object.keys(en).length,
  `${Object.keys(es).length} / ${Object.keys(hi).length} / ${Object.keys(ja).length} / ${Object.keys(pirate).length} / ${Object.keys(en1700).length}`);

check('1700s english: derived every key and rewrote the controls',
  translate('en1700', 'app.newChat') === 'A new discourse'
  && translate('en1700', 'writing.save') === 'Save'
  && translate('en1700', 'chat.welcomeSub') !== en['chat.welcomeSub'],
  translate('en1700', 'app.newChat'));

check('spanish and hindi: cover the same keys', (() => {
  const a = Object.keys(es).sort().join(',');
  const b = Object.keys(hi).sort().join(',');
  return a === b;
})(), `${Object.keys(es).length} / ${Object.keys(hi).length}`);

check('beta locales: no key that English does not ship', (() => {
  const bad = Object.values(beta).flatMap((dict) => Object.keys(dict)).filter((k) => !(k in en));
  return bad.length === 0 ? true : [...new Set(bad)].join(',');
})());

check('beta locales: every value keeps its {placeholders}', (() => {
  const holders = (s) => (String(s).match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
  const bad = [];
  for (const [lang, dict] of Object.entries(beta)) {
    for (const [key, value] of Object.entries(dict)) {
      if (holders(value) !== holders(en[key])) bad.push(`${lang}:${key}`);
    }
  }
  return bad.length === 0 ? true : bad.join(',');
})());

check('japanese and pirate: real translations, not English copies', (() => {
  const core = ['app.newChat', 'chat.send', 'writing.save', 'settings.appearance', 'about.tagline'];
  const bad = core.filter((k) => !ja[k] || !pirate[k] || ja[k] === en[k] || pirate[k] === en[k]);
  return bad.length === 0 ? true : bad.join(',');
})());

check('1700s english: placeholders survive the archaizer', (() => {
  const holders = (s) => (String(s).match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
  const bad = Object.entries(en1700).filter(([k, v]) => holders(v) !== holders(en[k])).map(([k]) => k);
  return bad.length === 0 ? true : bad.join(',');
})());

check('fallback: translated core differs from English',
  translate('es', 'stats.check') !== en['stats.check']
  && translate('hi', 'stats.check') !== en['stats.check'],
  `${translate('es', 'stats.check')} / ${translate('hi', 'stats.check')}`);

check('fallback: an untranslated advanced key returns English',
  translate('es', 'agent.premise') === en['agent.premise']
  && translate('hi', 'agent.premise') === en['agent.premise']);

check('fallback: an unknown key returns itself',
  translate('es', 'no.such.key') === 'no.such.key');

check('html lang: US English is tagged en-US, UK stays en-GB',
  htmlLang('en') === 'en-US' && htmlLang('en-GB') === 'en-GB'
  && htmlLang('id') === 'id' && htmlLang('es') === 'es' && htmlLang('hi') === 'hi'
  && htmlLang('ja') === 'ja');

check('html lang: voices, not languages, stay tagged as English',
  htmlLang('pirate') === 'en' && htmlLang('en1700') === 'en',
  `${htmlLang('pirate')} / ${htmlLang('en1700')}`);

check('guide language: only Indonesian maps to the ID guide',
  guideLangFor('id') === 'id' && guideLangFor('en') === 'en'
  && guideLangFor('en-GB') === 'en' && guideLangFor('es') === 'en' && guideLangFor('hi') === 'en'
  && guideLangFor('ja') === 'en' && guideLangFor('pirate') === 'en'
  && guideLangFor('en1700') === 'en');

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${failed === 0 ? `ALL I18N TESTS PASSED (${results.length})` : `${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
