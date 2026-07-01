'use client'

import {
  useState,
  useActionState,
  useTransition,
  useEffect,
} from 'react'
import {
  Plus,
  X,
  Pin,
  PinOff,
  Pencil,
  Trash2,
  AlertCircle,
  Megaphone,
} from 'lucide-react'
import FadeInView from '@cpe/shared/components/animations/FadeInView'
import { saveAnnouncement, deleteAnnouncement, togglePin, type ActionState } from './actions'

export type Announcement = {
  id: string
  title: string
  content: string | null
  category: string
  is_pinned: boolean
  is_private: boolean
  expires_at: string | null
  created_at: string
}

const CATEGORIES = ['General', 'Academic', 'Events', 'Urgent', 'Notice']

const CATEGORY_STYLE: Record<string, string> = {
  General: 'bg-bg-elevated text-text-muted border-border-subtle',
  Academic: 'bg-grad-blue/12 text-grad-blue border-grad-blue/25',
  Events:   'bg-grad-violet/12 text-grad-violet border-grad-violet/25',
  Urgent:   'bg-red-500/12 text-red-400 border-red-500/25',
  Notice:   'bg-grad-cyan/12 text-grad-cyan border-grad-cyan/25',
}

function AnnouncementForm({
  editingItem,
  onClose,
}: {
  editingItem: Announcement | null
  onClose: () => void
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    saveAnnouncement,
    null
  )

  useEffect(() => {
    if (state && 'success' in state) onClose()
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="glass-card glow-border rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-text-primary">
          {editingItem ? 'Edit Announcement' : 'New Announcement'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-text-dim hover:text-text-muted hover:bg-bg-elevated transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {state && 'error' in state && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4">
          <AlertCircle size={14} />
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={editingItem?.title ?? ''}
            placeholder="e.g. Enrollment deadline reminder"
            className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1.5">Content</label>
          <textarea
            name="content"
            rows={4}
            defaultValue={editingItem?.content ?? ''}
            placeholder="Full announcement text..."
            className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Category</label>
            <select
              name="category"
              defaultValue={editingItem?.category ?? 'General'}
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-border-glow transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">
              Expires At <span className="text-text-dim font-normal">(optional)</span>
            </label>
            <input
              type="datetime-local"
              name="expires_at"
              defaultValue={
                editingItem?.expires_at
                  ? editingItem.expires_at.slice(0, 16)
                  : ''
              }
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-border-glow transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              name="is_pinned"
              defaultChecked={editingItem?.is_pinned ?? false}
              className="w-4 h-4 accent-accent-glow"
            />
            Pin to top
          </label>
          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              name="is_private"
              defaultChecked={editingItem?.is_private ?? false}
              className="w-4 h-4 accent-accent-glow"
            />
            Private <span className="text-text-dim text-xs">(staff only)</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-semibold text-sm rounded-xl px-6 py-2.5 glow-btn hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? 'Saving…' : editingItem ? 'Save Changes' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-bg-elevated transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AnnouncementsManager({
  initialAnnouncements,
}: {
  initialAnnouncements: Announcement[]
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Announcement | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleEdit = (item: Announcement) => {
    setEditingItem(item)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewClick = () => {
    setEditingItem(null)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this announcement? This cannot be undone.')) return
    startTransition(async () => {
      await deleteAnnouncement(id)
    })
  }

  const handleTogglePin = (id: string, currentlyPinned: boolean) => {
    startTransition(async () => {
      await togglePin(id, !currentlyPinned)
    })
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">

      <FadeInView>
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-2">
              // admin.announcements
            </p>
            <h1 className="text-3xl font-black text-text-primary">
              <span className="gradient-text">Announcements</span>
            </h1>
            <p className="text-text-muted text-sm mt-1">
              Create and manage department bulletins.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={handleNewClick}
              className="flex items-center gap-2 bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-semibold text-sm rounded-xl px-5 py-2.5 glow-btn hover:opacity-90 transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <Plus size={14} />
              New
            </button>
          )}
        </div>
      </FadeInView>

      {showForm && (
        <FadeInView>
          <AnnouncementForm
            key={editingItem?.id ?? 'new'}
            editingItem={editingItem}
            onClose={handleClose}
          />
        </FadeInView>
      )}

      <FadeInView delay={0.05}>
        <div className="glass-card glow-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border-subtle flex items-center gap-2">
            <Megaphone size={14} className="text-accent-glow" />
            <h2 className="text-sm font-bold text-text-primary">
              All Announcements
            </h2>
            <span className="ml-auto text-xs text-text-dim font-mono">
              {initialAnnouncements.length} total
            </span>
          </div>

          {initialAnnouncements.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-text-dim text-sm">No announcements yet.</p>
              {!showForm && (
                <button
                  onClick={handleNewClick}
                  className="text-xs text-accent-glow font-mono hover:opacity-75 transition-opacity mt-2 cursor-pointer"
                >
                  Create the first one →
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {initialAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className={`px-6 py-4 transition-colors ${
                    isPending ? 'opacity-60' : 'hover:bg-bg-elevated/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {item.is_pinned && (
                          <span className="text-[10px] font-mono font-bold bg-grad-blue/15 text-grad-blue border border-grad-blue/25 px-2 py-px rounded-full">
                            PINNED
                          </span>
                        )}
                        {item.is_private && (
                          <span className="text-[10px] font-mono font-bold bg-bg-elevated text-text-dim border border-border-subtle px-2 py-px rounded-full">
                            PRIVATE
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono font-bold border px-2 py-px rounded-full ${
                            CATEGORY_STYLE[item.category] ?? CATEGORY_STYLE.General
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>

                      <p className="font-semibold text-text-primary text-sm leading-snug">
                        {item.title}
                      </p>

                      {item.content && (
                        <p className="text-text-dim text-xs mt-0.5 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>
                      )}

                      <p className="text-text-dim text-[11px] font-mono mt-1.5">
                        {new Date(item.created_at).toLocaleDateString('en-PH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                        {item.expires_at && (
                          <span className="text-text-dim">
                            {' · '}Expires{' '}
                            {new Date(item.expires_at).toLocaleDateString('en-PH', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => handleTogglePin(item.id, item.is_pinned)}
                        disabled={isPending}
                        title={item.is_pinned ? 'Unpin' : 'Pin to top'}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-40 cursor-pointer ${
                          item.is_pinned
                            ? 'text-grad-blue hover:bg-grad-blue/12'
                            : 'text-text-dim hover:bg-bg-elevated hover:text-text-muted'
                        }`}
                      >
                        {item.is_pinned ? <PinOff size={14} /> : <Pin size={14} />}
                      </button>

                      <button
                        onClick={() => handleEdit(item)}
                        title="Edit"
                        className="p-2 rounded-lg text-text-dim hover:bg-bg-elevated hover:text-text-muted transition-colors cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        title="Delete"
                        className="p-2 rounded-lg text-text-dim hover:bg-red-500/12 hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeInView>
    </div>
  )
}
