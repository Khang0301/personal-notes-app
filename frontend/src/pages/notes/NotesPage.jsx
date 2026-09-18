import NoteListView from '../../components/notes/NoteListView'

function NotesPage() {
  return (
    <NoteListView
      title="Notes"
      emptyMessage="No notes yet. Create your first note."
      baseFilters={{}}
      showArchiveToggle
    />
  )
}

export default NotesPage
