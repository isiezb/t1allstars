import { useState, useEffect } from 'react';

interface AdminCRUDConfig<T, FormData> {
  fetchAPI: {
    getAll: () => Promise<T[]>;
  };
  adminAPI: {
    create: (data: FormData, token: string) => Promise<T>;
    update: (id: string, data: FormData, token: string) => Promise<T>;
    delete: (id: string, token: string) => Promise<void>;
  };
  initialFormData: FormData;
  entityName: string; // e.g., "player", "tournament", "standing"
}

export function useAdminCRUD<T extends { id: string }, FormData>({
  fetchAPI,
  adminAPI,
  initialFormData,
  entityName,
}: AdminCRUDConfig<T, FormData>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await fetchAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error(`Failed to fetch ${entityName}s:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    transformData?: (data: FormData) => any
  ) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const dataToSubmit = transformData ? transformData(formData) : formData;

      if (editingItem) {
        await adminAPI.update(editingItem.id, dataToSubmit, token);
      } else {
        await adminAPI.create(dataToSubmit, token);
      }

      setShowForm(false);
      setEditingItem(null);
      setFormData(initialFormData);
      fetchItems();
    } catch (error) {
      alert(
        `Failed to save ${entityName}: ` +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  const handleEdit = (item: T, transformItem?: (item: T) => FormData) => {
    setEditingItem(item);
    const formDataToSet = transformItem ? transformItem(item) : (item as any);
    setFormData(formDataToSet);
    setShowForm(true);
  };

  const handleDelete = async (id: string, displayName: string) => {
    if (!confirm(`Are you sure you want to delete ${displayName}?`)) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await adminAPI.delete(id, token);
      fetchItems();
    } catch (error) {
      alert(
        `Failed to delete ${entityName}: ` +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData(initialFormData);
  };

  return {
    items,
    loading,
    showForm,
    setShowForm,
    editingItem,
    formData,
    setFormData,
    fetchItems,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelForm,
  };
}
