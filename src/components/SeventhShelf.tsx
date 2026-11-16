import { useEffect } from 'react';

/**
 * A story that does not appear in any menu.
 *
 * Found by typing the studio's name while no field has focus, or by the one
 * line at the very bottom of About. It is a thank-you, not a feature: no data
 * is touched, nothing unlocks, and closing it leaves the studio exactly as it
 * was.
 */
export function SeventhShelf({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="seventh-overlay" role="presentation" onClick={onClose}>
      <div
        className="seventh-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seventh-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="seventh-kicker">A shelf with no catalogue number</div>
        <h2 id="seventh-title">The Seventh Shelf</h2>
        <div className="seventh-rule" />
        <p>
          The library had six shelves and a librarian who counted them every morning.
          On the seventh morning she found a seventh shelf between the sixth and the wall,
          and on it a book with her own name on the spine.
        </p>
        <p>
          She did not open it. She dusted it, straightened its neighbours, and went back
          to the desk. The next morning the book had moved half an inch to the left.
          She moved it back.
        </p>
        <p>
          This went on for a year. Then one morning she arrived early, took the book down,
          and found that it was warm. She sat on the floor between the shelves and read
          the first page. It began: <em>“The library had six shelves and a librarian who
          counted them every morning.”</em>
        </p>
        <p className="seventh-last">
          She laughed, once, and turned the page. There was still so much to write.
        </p>
        <div className="seventh-foot">
          <span>You found the shelf. Tell no one. — M.</span>
          <button className="small" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
