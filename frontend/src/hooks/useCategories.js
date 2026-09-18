import { useCallback, useEffect, useState } from 'react'
import * as categoryService from '../services/categoryService'
import { useToast } from '../context/ToastContext'

function useCategories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  const fetchCategories = useCallback(() => {
    setIsLoading(true)
    categoryService
      .getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => showToast('Could not load categories', 'error'))
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  async function addCategory(name) {
    await categoryService.createCategory(name)
    showToast('Category created')
    fetchCategories()
  }

  async function editCategory(id, name) {
    await categoryService.updateCategory(id, name)
    showToast('Category updated')
    fetchCategories()
  }

  // Deleting a category never deletes notes — the backend moves them to
  // Uncategorized. We just refresh the category list here.
  async function removeCategory(id) {
    await categoryService.deleteCategory(id)
    showToast('Category deleted. Its notes are now Uncategorized.')
    fetchCategories()
  }

  return { categories, isLoading, addCategory, editCategory, removeCategory, refetch: fetchCategories }
}

export default useCategories
