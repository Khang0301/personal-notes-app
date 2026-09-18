import NoteListView from '../../components/notes/NoteListView'

function PinnedPage() {
  return (
    <NoteListView
      title="Pinned"
      emptyMessage="No pinned notes yet. Tap the pin icon on a note to keep it here."
      baseFilters={{ pinned: true }}
      showArchiveToggle
    />
  )
}

export default PinnedPage
