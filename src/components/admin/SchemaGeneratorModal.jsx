"use client";

import { useState, useEffect } from "react";
import { X, Check, Copy, FileCode, Code2, RefreshCw } from "lucide-react";

export default function SchemaGeneratorModal({
  isOpen,
  onClose,
  blogData = {},
  currentSchema = "",
  onApplySchema,
}) {
  const [schemaType, setSchemaType] = useState("BlogPosting");
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateSchema = (type = schemaType) => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://vedicjyotishkendra.in";
    const postUrl = `${siteUrl}/blogs/${blogData.slug || "url-slug"}`;
    const dateStr = new Date().toISOString();

    const schemaObj = {
      "@context": "https://schema.org",
      "@type": type,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl,
      },
      "headline": blogData.metaTitle || blogData.title || "Vedic Astrology Article",
      "description": blogData.metaDescription || blogData.excerpt || "Comprehensive Vedic Jyotish analysis and remedies.",
      "image": blogData.image?.url ? [blogData.image.url] : [`${siteUrl}/og-image.jpg`],
      "author": {
        "@type": "Person",
        "name": blogData.author?.name || "Ach. Dr. Mohit Shah",
        "jobTitle": blogData.author?.role || "Founder & Chief Astrologer",
        "url": siteUrl,
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vedic Jyotish Kendra",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
        },
      },
      "datePublished": blogData.createdAt || dateStr,
      "dateModified": dateStr,
      "keywords": Array.isArray(blogData.metaKeywords) && blogData.metaKeywords.length > 0
        ? blogData.metaKeywords.join(", ")
        : "Vedic Astrology, Kundali, Horoscope, Jyotish, Vastu Shastra",
      "articleSection": blogData.category || "Jyotish",
      "inLanguage": "en-US",
    };

    const formatted = JSON.stringify(schemaObj, null, 2);
    setJsonText(formatted);
    setError("");
  };

  useEffect(() => {
    if (isOpen) {
      if (currentSchema && currentSchema.trim()) {
        try {
          // If valid JSON format, pretty print
          const parsed = JSON.parse(currentSchema);
          setJsonText(JSON.stringify(parsed, null, 2));
          if (parsed["@type"]) setSchemaType(parsed["@type"]);
        } catch {
          setJsonText(currentSchema);
        }
      } else {
        generateSchema();
      }
    }
  }, [isOpen, currentSchema]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = () => {
    try {
      // Validate JSON
      JSON.parse(jsonText);
      onApplySchema(jsonText);
      onClose();
    } catch (err) {
      setError("Invalid JSON format: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-300 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl rounded-none">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-none">
              <FileCode className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-black uppercase tracking-wider">
                Schema.org JSON-LD Generator
              </h3>
              <p className="text-[10px] text-neutral-500 font-normal">
                Structured data for Google Rich Snippets & Search Cards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black cursor-pointer rounded-none hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-none font-normal">
              {error}
            </div>
          )}

          {/* Type Selector & Regenerate */}
          <div className="flex items-center justify-between gap-3 bg-neutral-100 p-2.5 border border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-700">Schema Type:</span>
              <select
                value={schemaType}
                onChange={(e) => {
                  setSchemaType(e.target.value);
                  generateSchema(e.target.value);
                }}
                className="text-xs border border-neutral-300 bg-white px-2 py-1 rounded-none font-medium text-black focus:outline-none focus:border-black"
              >
                <option value="BlogPosting">BlogPosting (Recommended)</option>
                <option value="Article">Article</option>
                <option value="NewsArticle">NewsArticle</option>
                <option value="TechArticle">TechArticle</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => generateSchema()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-neutral-300 hover:border-neutral-500 text-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Auto-Generate from Blog</span>
            </button>
          </div>

          {/* Code Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-medium flex items-center gap-1.5">
                <Code2 className="w-3 h-3 text-neutral-500" />
                <span>JSON-LD Code (Editable)</span>
              </label>
              <span className="text-[10px] text-green-700 font-medium bg-green-50 px-1.5 py-0.5 border border-green-200">
                Google Rich Snippet Compatible
              </span>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={14}
              className="w-full text-xs font-mono bg-neutral-900 text-green-400 p-3.5 border border-neutral-800 focus:border-neutral-600 focus:outline-none rounded-none leading-relaxed resize-none selection:bg-neutral-700"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 rounded-none cursor-pointer font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy JSON-LD"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs border border-neutral-300 text-neutral-600 hover:bg-neutral-100 rounded-none cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span>Apply to Blog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
