/**
 * BulkImageUpload — custom Sanity Studio input for the gallery imagesList field.
 *
 * Renders a drag-and-drop zone above the normal array editor.
 * Drop or pick multiple images → each uploads in parallel to Sanity assets
 * → appended to imagesList with a blank caption.
 * The normal array editor still appears below for reordering / captioning / deleting.
 */

import React, { useRef, useState, useCallback } from 'react';
import { useClient, PatchEvent, insert } from 'sanity';

// ─── types ────────────────────────────────────────────────────────────────────

interface FileState {
  id: string;
  file: File;
  name: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  errorMsg?: string;
}

interface GalleryItem {
  _type: 'galleryItem';
  _key: string;
  image: {
    _type: 'image';
    asset: { _type: 'reference'; _ref: string };
  };
  caption: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

// ─── component ────────────────────────────────────────────────────────────────

export default function BulkImageUpload(props: any) {
  const { onChange, value: currentValue, renderDefault } = props;
  const client = useClient({ apiVersion: '2023-01-01' });
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileState[]>([]);
  const [dragging, setDragging] = useState(false);

  // ── validation ───────────────────────────────────────────────────────────────

  function validate(file: File): string | null {
    if (!ACCEPT.includes(file.type))
      return `Unsupported format (${file.type || 'unknown'}). Use JPEG, PNG, WebP, GIF or AVIF.`;
    if (file.size > MAX_BYTES)
      return `Too large (${formatBytes(file.size)}). Max 10 MB per image.`;
    return null;
  }

  // ── enqueue ──────────────────────────────────────────────────────────────────

  function enqueue(incoming: FileList | File[]) {
    const list = Array.from(incoming);
    const entries: FileState[] = list.map((file) => {
      const err = validate(file);
      return { id: uid(), file, name: file.name, status: err ? 'error' : 'pending', progress: 0, errorMsg: err ?? undefined };
    });
    setFiles((prev) => [...prev, ...entries]);
    entries.filter((e) => e.status === 'pending').forEach(uploadOne);
  }

  // ── upload ───────────────────────────────────────────────────────────────────

  const uploadOne = useCallback((entry: FileState) => {
    setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: 'uploading', progress: 0 } : f));

    const obs$ = client.observable.assets.upload('image', entry.file, { filename: entry.file.name });

    obs$.subscribe({
      next(event: any) {
        if (event.type === 'progress' && typeof event.percent === 'number') {
          setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, progress: Math.round(event.percent) } : f));
        } else if (event.type === 'response') {
          // The observable wraps the asset: event.body.document
          const asset = event.body.document;

          const newItem: GalleryItem = {
            _type: 'galleryItem',
            _key: uid(),
            image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
            caption: '',
          };

          const lastKey = (currentValue ?? []).slice(-1)[0]?._key;
          onChange(PatchEvent.from(insert([newItem], 'after', lastKey ? [{ _key: lastKey }] : [-1])));

          setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: 'done', progress: 100 } : f));
        }
      },
      error(err: any) {
        setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: 'error', errorMsg: err?.message ?? 'Upload failed' } : f));
      },
    });
  }, [client, currentValue, onChange]);

  // ── drag handlers ─────────────────────────────────────────────────────────────

  function onDragOver(e: React.DragEvent) { e.preventDefault(); setDragging(true); }
  function onDragLeave() { setDragging(false); }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) enqueue(e.dataTransfer.files);
  }

  function clearFinished() {
    setFiles((prev) => prev.filter((f) => f.status === 'uploading' || f.status === 'pending'));
  }

  const uploading = files.filter((f) => f.status === 'uploading' || f.status === 'pending');
  const done      = files.filter((f) => f.status === 'done');
  const errors    = files.filter((f) => f.status === 'error');
  const hasFinished = done.length > 0 || errors.length > 0;

  // ── styles ───────────────────────────────────────────────────────────────────

  const zone: React.CSSProperties = {
    border: `2px dashed ${dragging ? '#2276fc' : '#c8d0e0'}`,
    borderRadius: 10,
    padding: '28px 20px',
    textAlign: 'center',
    background: dragging ? '#eef4ff' : '#f8f9fb',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s',
    marginBottom: 16,
  };

  const badge = (color: 'green' | 'red' | 'yellow'): React.CSSProperties => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 600,
    marginLeft: 6,
    background: color === 'green' ? '#dcfce7' : color === 'red' ? '#fee2e2' : '#fef9c3',
    color:      color === 'green' ? '#16a34a' : color === 'red' ? '#dc2626' : '#854d0e',
  });

  // ── render ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      {/* Drop zone */}
      <div
        style={zone}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="Bulk image upload drop zone"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT.join(',')}
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && enqueue(e.target.files)}
        />

        {/* Upload icon */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
          stroke={dragging ? '#2276fc' : '#8899b4'} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ margin: '0 auto 10px' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: dragging ? '#2276fc' : '#3d5a80' }}>
          {dragging ? 'Drop images here' : 'Drag & drop images, or click to browse'}
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#8899b4' }}>
          JPEG · PNG · WebP · GIF · AVIF &nbsp;·&nbsp; max 10 MB each &nbsp;·&nbsp; multiple files supported
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#aab4c4' }}>
          Captions can be added per image in the list below after uploading.
        </p>
      </div>

      {/* Upload queue */}
      {files.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#3d4a5c' }}>
              Upload queue
              {uploading.length > 0 && <span style={badge('yellow')}>{uploading.length} uploading</span>}
              {done.length > 0     && <span style={badge('green')}>{done.length} done</span>}
              {errors.length > 0   && <span style={badge('red')}>{errors.length} failed</span>}
            </span>
            {hasFinished && (
              <button onClick={clearFinished} style={{ fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                Clear finished
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {files.map((f) => (
              <div key={f.id} style={{
                borderRadius: 8, border: '1px solid',
                borderColor: f.status === 'done' ? '#bbf7d0' : f.status === 'error' ? '#fecaca' : '#e2e8f0',
                background:  f.status === 'done' ? '#f0fdf4' : f.status === 'error' ? '#fff5f5' : '#fff',
                padding: '10px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: f.status === 'done' ? '#16a34a' : f.status === 'error' ? '#dc2626' : '#64748b' }}>
                    {f.status === 'done'      && '✓ Uploaded'}
                    {f.status === 'error'     && '✗ Failed'}
                    {f.status === 'uploading' && `${f.progress}%`}
                    {f.status === 'pending'   && 'Pending…'}
                  </span>
                </div>

                {/* Progress bar */}
                {(f.status === 'uploading' || f.status === 'pending') && (
                  <div style={{ marginTop: 6, height: 4, borderRadius: 99, background: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 99, background: '#2276fc', width: `${f.progress}%`, transition: 'width 0.2s' }} />
                  </div>
                )}

                {/* Error message */}
                {f.status === 'error' && f.errorMsg && (
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: '#dc2626' }}>{f.errorMsg}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Normal Sanity array editor — reorder, caption, delete */}
      <div>{renderDefault(props)}</div>
    </div>
  );
}
