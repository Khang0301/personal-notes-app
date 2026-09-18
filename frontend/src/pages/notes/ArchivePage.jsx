import NoteListView from '../../components/notes/NoteListView'

function ArchivePage() {
  return (
    <NoteListView
      title="Archive"
      emptyMessage="No archived notes. Notes you archive will show up here."
      baseFilters={{ archived: true }}
      showArchiveToggle
    />
  )
}

export default ArchivePage
