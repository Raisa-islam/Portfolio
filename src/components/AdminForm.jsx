import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const RESEARCH_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'progress', 'published', 'idea'] },
  { name: 'year', label: 'Year', type: 'text' },
  { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
  { name: 'updatedLabel', label: 'Updated Label', type: 'text', placeholder: 'e.g. Updated Dec 2024' },
  { name: 'pdfUrl', label: 'PDF URL', type: 'text' },
];

const WRITING_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
  { name: 'category', label: 'Category', type: 'select', options: ['review', 'notes', 'tutorial', 'further', 'course'] },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'idea'] },
  { name: 'readTime', label: 'Read Time', type: 'text', placeholder: 'e.g. 12 min read' },
  { name: 'date', label: 'Date', type: 'text', placeholder: 'e.g. Nov 2024' },
  { name: 'draftLabel', label: 'Draft Label', type: 'text', placeholder: 'e.g. Writing, Planned' },
];

const PROJECT_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
  { name: 'github', label: 'GitHub URL', type: 'text' },
  { name: 'live', label: 'Live URL', type: 'text' },
];

function getFields(collectionName) {
  if (collectionName === 'research') return RESEARCH_FIELDS;
  if (collectionName === 'writing') return WRITING_FIELDS;
  if (collectionName === 'projects') return PROJECT_FIELDS;
  return RESEARCH_FIELDS;
}

export default function AdminForm({ item, contentType, onSave, onCancel }) {
  const isEditing = !!item;
  const collectionName = item?._collection || contentType?.collection;
  const fields = getFields(collectionName);

  const initialData = {};
  fields.forEach(f => {
    if (item) {
      initialData[f.name] = Array.isArray(item[f.name]) ? item[f.name].join(', ') : (item[f.name] || '');
    } else {
      initialData[f.name] = contentType?.defaults?.[f.name] || '';
    }
  });

  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...formData };
      if (data.tags && typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      await onSave(collectionName, data, item?.id);
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-2 text-text-2 text-sm font-semibold mb-6 bg-transparent border-none cursor-pointer hover:text-accent-1 transition-colors">
        <FiArrowLeft size={16} /> Back
      </button>

      <h3 className="font-display font-bold text-lg mb-6">
        {isEditing ? 'Edit' : 'New'} {contentType?.label || collectionName}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-text-2 mb-1.5">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name]}
                onChange={e => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className="form-field w-full py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] resize-y min-h-[100px] placeholder:text-text-3"
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.name]}
                onChange={e => handleChange(field.name, e.target.value)}
                className="form-field w-full py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)]"
              >
                <option value="">Select...</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[field.name]}
                onChange={e => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className="form-field w-full py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-text-3"
              />
            )}
          </div>
        ))}

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="py-3 px-8 rounded-xl text-white border-none font-body text-[0.92rem] font-bold cursor-pointer hover:opacity-90 transition-all disabled:opacity-60"
            style={{ background: 'var(--gradient)' }}
          >
            {saving ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-8 rounded-xl border border-border bg-transparent text-text-2 font-body text-[0.92rem] font-semibold cursor-pointer hover:border-accent-1 hover:text-accent-1 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
