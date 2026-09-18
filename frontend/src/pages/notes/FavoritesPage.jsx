import NoteListView from '../../components/notes/NoteListView'

function FavoritesPage() {
  return (
    <NoteListView
      title="Favorites"
      emptyMessage="No favorite notes yet. Tap the heart icon on a note to add it here."
      baseFilters={{ favorite: true }}
      showArchiveToggle
    />
  )
}

export default FavoritesPage
