import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPhoneModels } from "../api/phoneModelApi.js";
import { useCart } from "../context/CartContext.jsx";

const Designer = () => {
  const canvasEl = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setItem } = useCart();
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const canvas = new fabric.Canvas(canvasEl.current, {
        width: 300,
        height: 500,
        preserveObjectStacking: true,
        selection: false
      });

      canvasRef.current = canvas;

      try {
        const loadedModels = await fetchPhoneModels();
        setModels(loadedModels);
        if (loadedModels.length > 0) {
          setSelectedModelId(loadedModels[0]._id);
          setSelectedTemplateIndex(0);
        }
      } catch (error) {
        console.error(error);
        setStatus("Unable to load phone models. Please contact admin.");
      }
    };

    init();

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTemplates = (model) => {
    if (!model) return [];
    return model.templateImages && model.templateImages.length > 0
      ? model.templateImages
      : model.templateImage
      ? [model.templateImage]
      : [];
  };

  useEffect(() => {
    if (!canvasRef.current || models.length === 0 || !selectedModelId) return;
    const model = models.find((m) => m._id === selectedModelId);
    if (model) {
      const templates = getTemplates(model);
      if (templates.length > 0 && selectedTemplateIndex < templates.length) {
        loadTemplate(templates[selectedTemplateIndex]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModelId, selectedTemplateIndex, models]);

  const loadTemplate = (templateImage) => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    // Clear existing background and user images
    canvas.setBackgroundColor(null, () => {
      // Clear all user-uploaded objects
      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        if (obj.selectable) {
          canvas.remove(obj);
        }
      });
      // Clear user custom image state
      setUserCustomImage(null);

      // Load new template as background
      fabric.Image.fromURL(
        templateImage,
        (img) => {
          img.selectable = false;
          img.evented = false;
          img.scaleToWidth(canvas.getWidth());
          img.scaleToHeight(canvas.getHeight());
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        {
          crossOrigin: "anonymous",
          onError: () => {
            canvas.setBackgroundColor("#0f172a", canvas.renderAll.bind(canvas));
          }
        }
      );
    });
  };

  const [userCustomImage, setUserCustomImage] = useState(null);

  const addImageToCanvas = (dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Store the user's uploaded image
    setUserCustomImage(dataUrl);

    fabric.Image.fromURL(
      dataUrl,
      (img) => {
        const scale = Math.min(
          (canvas.width * 0.8) / img.width,
          (canvas.height * 0.8) / img.height,
          1
        );

        img.set({
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
          cornerColor: "#ffffff",
          cornerStyle: "circle",
          borderColor: "#fe7245",
          cornerStrokeColor: "#fe7245",
          transparentCorners: false,
          cornerSize: 14,
          rotatingPointOffset: 30,
          selectable: true,
          evented: true
        });
        img.scale(scale);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => addImageToCanvas(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setStatus("Please login to add your design to cart.");
      navigate("/login");
      return;
    }

    const model = models.find((m) => m._id === selectedModelId);
    if (!model) {
      setStatus("Please select a phone model.");
      return;
    }

    if (!canvasRef.current) return;
    setSaving(true);
    setStatus("");
    try {
      // Export canvas with both template background and user images
      const designImage = canvasRef.current.toDataURL({ format: "png", quality: 1 });
      const templates = getTemplates(model);
      const selectedTemplate = templates[selectedTemplateIndex] || templates[0];

      setItem({
        phoneModel: model.name,
        modelId: model._id,
        designImage, // Final combined design (template + user image)
        templateImage: selectedTemplate, // The selected template background
        userCustomImage: userCustomImage || "" // User's uploaded image
      });
      navigate("/checkout");
    } catch {
      setStatus("Unable to add design to cart");
    } finally {
      setSaving(false);
    }
  };

  const selectedModel = models.find((m) => m._id === selectedModelId);
  const templates = selectedModel ? getTemplates(selectedModel) : [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold text-slate-800">Design your cover</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Phone Model
                <select
                  value={selectedModelId}
                  onChange={(e) => {
                    setSelectedModelId(e.target.value);
                    setSelectedTemplateIndex(0);
                    setUserCustomImage(null); // Clear user image when model changes
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                  disabled={models.length === 0}
                >
                  {models.length === 0 ? (
                    <option value="">No models available</option>
                  ) : (
                    models.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name}
                      </option>
                    ))
                  )}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Upload Your Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="rounded-xl border border-dashed border-slate-300 px-4 py-3"
                />
              </label>
            </div>

            {templates.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Select Cover Design</label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTemplateIndex(index)}
                      className={`flex-shrink-0 rounded-lg border-2 p-1 transition-all ${
                        selectedTemplateIndex === index
                          ? "border-accent bg-accent/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={template}
                        alt={`Cover ${index + 1}`}
                        className="h-20 w-12 rounded object-cover"
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {selectedTemplateIndex + 1} of {templates.length} cover designs
                </p>
              </div>
            )}

            <p className="text-sm text-slate-500">
              Tip: Use high-resolution PNG/JPG files and keep key elements away from the edges.
            </p>
            {status && <p className="text-sm text-red-500">{status}</p>}
            <button
              onClick={handleAddToCart}
              disabled={saving}
              className="rounded-2xl bg-accent px-6 py-3 text-white hover:bg-accent-dark disabled:opacity-60"
            >
              {saving ? "Adding..." : "Add to Cart"}
            </button>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="rounded-[32px] border border-slate-200 bg-slate-900/5 p-4">
              <canvas ref={canvasEl} width={300} height={500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;
