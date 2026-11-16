import { useMemo } from 'react';
import { useData, createProjectUi } from '../store';
import { useT } from '../i18nReact';
import { textPrompt } from './TextPrompt';
import { Icon } from './Icons';

const words = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/**
 * The shelf that greets a writer who has not picked a novel yet.
 *
 * Deliberately not a dashboard: it is a row of books, each with the only two
 * numbers a draft deserves (chapters and words) and the last line that moved.
 * Choosing one drops straight onto the board; the empty state is an invitation,
 * not a feature list.
 */
export function WritingHome() {
  const t = useT();
  // Agent-created projects can carry a format the Projects picker does not
  // offer ("novella"); show that raw instead of leaking a translation key.
  const formatLabel = (format: string | undefined) => {
    const id = format || 'novel';
    return ['short-story', 'novel', 'book', 'fanfic', 'script'].includes(id)
      ? t('projects.format.' + id)
      : id;
  };
  const projects = useData((s) => s.projects);
  const chapters = useData((s) => s.chapters);
  const setActiveProject = useData((s) => s.setActiveProject);

  const shelf = useMemo(
    () => projects.map((p) => {
      const own = chapters.filter((c) => c.project_id === p.id);
      const wordsTotal = own.reduce((n, c) => n + words(c.content), 0);
      const latest = own.slice().sort((a, b) => (b.updated_at || 0) - (a.updated_at || 0))[0] || null;
      return { project: p, chapters: own.length, words: wordsTotal, latest };
    }).sort((a, b) => (b.project.updated_at || 0) - (a.project.updated_at || 0)),
    [projects, chapters]
  );

  async function create() {
    const name = await textPrompt({ title: t('writing.newNovel'), confirmLabel: t('projects.create') });
    if (!name) return;
    await createProjectUi(name);
  }

  return (
    <div className="page write-home">
      <header className="write-home-head">
        <div>
          <div className="wh-kicker">{t('writing.shelfKicker')}</div>
          <h1>{t('writing.shelfTitle')}</h1>
          <p className="sub">{t('writing.shelfSub')}</p>
        </div>
        <button className="primary" onClick={() => { void create(); }}>
          <Icon name="plus" size={14} /> {t('writing.newNovel')}
        </button>
      </header>

      {shelf.length === 0 ? (
        <div className="write-home-empty">
          <Icon name="book" size={34} />
          <h2>{t('writing.shelfEmptyTitle')}</h2>
          <p>{t('writing.shelfEmpty')}</p>
          <button className="primary" onClick={() => { void create(); }}>
            <Icon name="plus" size={14} /> {t('writing.newNovel')}
          </button>
        </div>
      ) : (
        <div className="shelf-grid">
          {shelf.map(({ project, chapters: count, words: total, latest }) => (
            <button
              key={project.id}
              className="shelf-book"
              onClick={() => setActiveProject(project.id)}
            >
              <span className="sb-spine" aria-hidden="true" />
              <span className="sb-body">
                <span className="sb-format">{formatLabel(project.format)}</span>
                <span className="sb-title">{project.name}</span>
                <span className="sb-meta">
                  {t('writing.shelfChapters').replace('{n}', String(count))}
                  <span className="dot">·</span>
                  {t('writing.words').replace('{n}', total.toLocaleString())}
                </span>
                <span className="sb-latest">
                  {latest ? t('writing.shelfLatest').replace('{title}', latest.title) : t('writing.shelfBlank')}
                </span>
              </span>
              <Icon name="chevronRight" size={14} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
