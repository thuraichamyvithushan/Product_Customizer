import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPetProducts } from "../api/petProductApi.js";
import { useCart } from "../context/CartContext.jsx";

const fonts = ["Arial", "Verdana", "Tahoma", "Georgia", "Courier New", "Impact", "Times New Roman"];

const PetDesigner = () => {
  const canvasEl = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textColor, setTextColor] = useState("#fe7245");
  const [textFont, setTextFont] = useState(fonts[0]);
  const [userCustomImage, setUserCustomImage] = useState(null);

  // Load products and categories
  useEffect(() => {
    const init = async () => {
      try {
        const loadedProducts = await fetchPetProducts();
        setProducts(loadedProducts);

        const uniqueCategories = [...new Set(loadedProducts.map((p) => p.category || "Uncategorized"))];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
          const firstProduct = loadedProducts.find((p) => p.category === uniqueCategories[0]);
          if (firstProduct) setSelectedProductId(firstProduct._id);
          setSelectedTemplateIndex(0);
        }
      } catch (error) {
        console.error(error);
        setStatus("Unable to load pet products. Please contact admin.");
      }
    };
    init();
  }, []);

  // Canvas initialization
  useEffect(() => {
    if (!canvasEl.current) return;
    const product = products.find((p) => p._id === selectedProductId);
    const canvasSize = { width: 300, height: 500 };

    if (canvasRef.current) canvasRef.current.dispose();

    const canvas = new fabric.Canvas(canvasEl.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      preserveObjectStacking: true,
      selection: true,
    });

    canvasRef.current = canvas;

    canvas.on("selection:created", updateSelectedTextStyle);
    canvas.on("selection:updated", updateSelectedTextStyle);

    if (product) {
      const templates = getTemplates(product);
      if (templates.length > 0 && selectedTemplateIndex < templates.length) {
        setTimeout(() => loadTemplate(product, templates[selectedTemplateIndex]), 100);
      }
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [products, selectedProductId, selectedTemplateIndex]);

  const getTemplates = (product) => {
    if (!product) return [];
    return product.images && product.images.length > 0
      ? product.images
      : product.mainImage
      ? [product.mainImage]
      : [];
  };

  const loadTemplate = (product, templateImage) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setBackgroundColor(null, () => {
      canvas.getObjects().forEach((obj) => obj.selectable && canvas.remove(obj));
      setUserCustomImage(null);

      const backgroundImage = product.mainImage || templateImage;
      if (!backgroundImage) {
        canvas.setBackgroundColor("#f0f0f0", canvas.renderAll.bind(canvas));
        return;
      }

      fabric.Image.fromURL(
        backgroundImage,
        (img) => {
          img.selectable = false;
          img.evented = false;

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const finalScale = Math.min(scaleX, scaleY);

          img.scale(finalScale);
          img.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: "center",
            originY: "center",
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        { crossOrigin: "anonymous" }
      );
    });
  };

  const addImageToCanvas = (dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setUserCustomImage(dataUrl);

    fabric.Image.fromURL(
      dataUrl,
      (img) => {
        canvas.getObjects().forEach((obj) => obj.selectable && canvas.remove(obj));

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
          hasControls: true,
          hasBorders: true,
        });

        const maxWidth = canvas.width * 0.8;
        const maxHeight = canvas.height * 0.8;

        const scaleX = maxWidth / img.width;
        const scaleY = maxHeight / img.height;
        const finalScale = Math.min(scaleX, scaleY, 1);

        img.scale(finalScale);

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => addImageToCanvas(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !textValue.trim()) return;

    const text = new fabric.IText(textValue, {
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: "center",
      originY: "center",
      fill: textColor,
      fontSize: 24,
      fontFamily: textFont,
      selectable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setTextValue("");
  };

  const updateSelectedTextStyle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === "i-text") {
      activeObj.set({
        fill: textColor,
        fontFamily: textFont,
      });
      canvas.renderAll();
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setStatus("Please login to add your design to cart.");
      navigate("/login");
      return;
    }

    const product = products.find((p) => p._id === selectedProductId);
    if (!product) {
      setStatus("Please select a product.");
      return;
    }

    if (!canvasRef.current) return;
    setSaving(true);
    setStatus("");

    try {
      const designImage = canvasRef.current.toDataURL({ format: "png", quality: 1 });
      const templates = getTemplates(product);
      const selectedTemplate = templates[selectedTemplateIndex] || templates[0];

      addItem({
        productName: product.name,
        productId: product._id,
        price: product.price || 1000,
        designImage,
        templateImage: selectedTemplate,
        userCustomImage: userCustomImage || "",
        quantity: 1,
      });

      navigate("/checkout");
    } catch {
      setStatus("Unable to add design to cart");
    } finally {
      setSaving(false);
    }
  };

  const selectedProduct = products.find((p) => p._id === selectedProductId);
  const templates = selectedProduct ? getTemplates(selectedProduct) : [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold text-slate-800">Design Your Pet Product</h1>
            {selectedProduct && (
              <p className="text-lg font-bold text-accent">
                Price: $ {selectedProduct.price || 10}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Category Dropdown */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Category
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const firstProduct = products.find((p) => p.category === e.target.value);
                    if (firstProduct) setSelectedProductId(firstProduct._id);
                    setSelectedTemplateIndex(0);
                    setUserCustomImage(null);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>

              {/* Product Dropdown */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Product
                <select
                  value={selectedProductId}
                  onChange={(e) => {
                    setSelectedProductId(e.target.value);
                    setSelectedTemplateIndex(0);
                    setUserCustomImage(null);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >
                  {products
                    .filter((p) => p.category === selectedCategory)
                    .map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </label>

              {/* Upload Image */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Upload Pet Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="rounded-xl border border-dashed border-slate-300 px-4 py-3"
                />
              </label>
            </div>

            {/* Text, Color, Font */}
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Add Text
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3"
                  placeholder="Enter pet name or text"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Color
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateSelectedTextStyle();
                  }}
                  className="h-12 w-12 rounded-xl border border-slate-200"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Font
                <select
                  value={textFont}
                  onChange={(e) => {
                    setTextFont(e.target.value);
                    updateSelectedTextStyle();
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={handleAddText}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Add Text
            </button>

            {/* Templates */}
            {templates.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Select Template</label>
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
                        alt={`Template ${index + 1}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-slate-500">
              Tip: Use high-resolution images for best results.
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
              <canvas ref={canvasEl} width={400} height={400} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDesigner;
