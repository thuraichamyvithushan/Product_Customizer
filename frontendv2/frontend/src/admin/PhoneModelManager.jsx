import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import {
  adminCreatePhoneModel,
  adminDeletePhoneModel,
  adminAddTemplateToModel,
  adminRemoveTemplateFromModel,
  fetchPhoneModels
} from "../api/phoneModelApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const PhoneModelManager = () => {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({ name: "", key: "", templateFile: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [addingTemplate, setAddingTemplate] = useState(false);
  const [fetched, setFetched] = useState(false); // <--- added state

  const loadModels = async () => {
    try {
      const data = await fetchPhoneModels();
      setModels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetched(true); // <--- mark fetch as done
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "templateFile") {
      setForm((prev) => ({ ...prev, templateFile: files?.[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.templateFile) {
      setError("Please choose a template image.");
      return;
    }

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await adminCreatePhoneModel(
            {
              name: form.name,
              key: form.key,
              templateImages: [reader.result]
            },
            token
          );
          setForm({ name: "", key: "", templateFile: null });
          await loadModels();
        } catch (err) {
          setError(err.response?.data?.message || "Unable to create phone model");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(form.templateFile);
    } catch (err) {
      console.error(err);
      setError("Unable to read template image.");
      setLoading(false);
    }
  };

  const handleAddTemplate = async (modelId, file) => {
    if (!file) return;

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    setAddingTemplate(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await adminAddTemplateToModel(modelId, reader.result, token);
        } catch (err) {
          setError(err.response?.data?.message || "Unable to add template");
          setAddingTemplate(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError("Unable to read template image.");
      setAddingTemplate(false);
    }
  };

  const handleAddMultipleTemplates = async (modelId, files) => {
    if (!files || files.length === 0) return;

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    setAddingTemplate(true);
    setError("");

    try {
      const filePromises = Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      const imageDataUrls = await Promise.all(filePromises);

      for (const imageData of imageDataUrls) {
        try {
          await adminAddTemplateToModel(modelId, imageData, token);
        } catch (err) {
          console.error("Error adding template:", err);
          setError(err.response?.data?.message || "Some templates failed to add");
        }
      }

      await loadModels();
      setSelectedModel(null);
    } catch (err) {
      console.error(err);
      setError("Unable to read template images.");
    } finally {
      setAddingTemplate(false);
    }
  };

  const handleRemoveTemplate = async (modelId, templateIndex) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    if (!window.confirm("Remove this template?")) return;

    try {
      await adminRemoveTemplateFromModel(modelId, templateIndex, token);
      await loadModels();
      setSelectedModel(null);
    } catch (err) {
      console.error(err);
      setError("Unable to remove template.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }
    if (!window.confirm("Delete this phone model?")) return;
    try {
      await adminDeletePhoneModel(id, token);
      await loadModels();
    } catch (err) {
      console.error(err);
      setError("Unable to delete phone model.");
    }
  };

  const getTemplates = (model) => {
    return model.templateImages && model.templateImages.length > 0
      ? model.templateImages
      : model.templateImage
      ? [model.templateImage]
      : [];
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <AdminSidebar />
      <main className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Phone Models</h1>
          <p className="text-sm text-slate-500">
            Create and manage available phone models with multiple cover templates.
          </p>
        </div>

        <form
          onSubmit={handleCreate}
          className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              name="name"
              placeholder="Display name (e.g. iPhone 15)"
              value={form.name}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="text"
              name="key"
              placeholder="Key (e.g. iphone15)"
              value={form.key}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="file"
              name="templateFile"
              accept="image/*"
              onChange={handleChange}
              className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add Phone Model"}
          </button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Templates</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!fetched ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-500">
                    Loading phone models...
                  </td>
                </tr>
              ) : models.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-500">
                    No phone models yet.
                  </td>
                </tr>
              ) : (
                models.map((m) => {
                  const templates = getTemplates(m);
                  const firstTemplate = templates[0] || m.templateImage;
                  return (
                    <tr key={m._id}>
                      <td className="px-4 py-3">
                        <img
                          src={firstTemplate}
                          alt={m.name}
                          className="h-16 w-10 rounded-lg border border-slate-200 object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">{m.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{m.key}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-600">{templates.length} template(s)</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3 space-x-2 text-right">
                        <button
                          onClick={() => setSelectedModel(m)}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selectedModel && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-4">
          <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Manage Templates</h2>
                <p className="text-xs text-slate-500">{selectedModel.name}</p>
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Add New Template(s)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleAddMultipleTemplates(selectedModel._id, files);
                  }
                }}
                className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm"
                disabled={addingTemplate}
              />
              <p className="mt-1 text-xs text-slate-500">
                {addingTemplate
                  ? "Uploading templates..."
                  : "You can select multiple images at once"}
              </p>
            </div>

            <div className="max-h-96 space-y-2 overflow-y-auto">
              {getTemplates(selectedModel).map((template, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
                >
                  <img
                    src={template}
                    alt={`Template ${index + 1}`}
                    className="h-20 w-12 rounded border border-slate-200 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Template {index + 1}</p>
                    <p className="text-xs text-slate-500">Cover design option</p>
                  </div>
                  <button
                    onClick={() => handleRemoveTemplate(selectedModel._id, index)}
                    className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {getTemplates(selectedModel).length === 0 && (
                <p className="py-8 text-center text-sm text-slate-500">No templates yet. Add one above.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneModelManager;
