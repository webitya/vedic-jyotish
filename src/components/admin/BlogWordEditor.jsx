"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Heading1, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon,
  Minus, Undo, Redo, RemoveFormatting, Eye, Code2,
  Maximize2, Minimize2, Sparkles, Check, X,
  Type, Palette, Highlighter, Upload, Loader2, Info, AlertTriangle
} from "lucide-react";

export default function BlogWordEditor({
  value = "",
  onChange,
  onImageUpload,
  placeholder = "Start writing your rich blog essay here...",
}) {
  const editorRef = useRef(null);
  const [viewMode, setViewMode] = useState("visual"); // "visual" | "html" | "preview"
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [linkData, setLinkData] = useState({ url: "", text: "", newTab: true });
  const [imageData, setImageData] = useState({ url: "", alt: "", caption: "" });
  const [tableData, setTableData] = useState({ rows: 3, cols: 3, hasHeader: true });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false);

  // Saved selection for modals
  const savedSelectionRef = useRef(null);

  // Word & Reading statistics
  const [stats, setStats] = useState({ words: 0, chars: 0, readTime: "1 min read" });

  const updateStats = (html) => {
    if (!html) {
      setStats({ words: 0, chars: 0, readTime: "1 min read" });
      return;
    }
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(" ").filter(Boolean).length : 0;
    const chars = text.length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setStats({
      words,
      chars,
      readTime: `${minutes} min read`,
    });
  };

  // Sync external value to visual editor when switching modes or initial mount
  useEffect(() => {
    if (editorRef.current && viewMode === "visual") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    updateStats(value);
  }, [value, viewMode]);

  // Handle content changes from visual editor
  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      updateStats(html);
    }
  };

  const saveSelection = () => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      savedSelectionRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (typeof window === "undefined" || !savedSelectionRef.current) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedSelectionRef.current);
  };

  const executeCmd = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  // ── Block formatting ───────────────────────────────────────────────────────
  const formatBlock = (tag) => {
    executeCmd("formatBlock", tag ? `<${tag}>` : "<p>");
  };

  // ── Custom Inserts ────────────────────────────────────────────────────────
  const insertHTML = (html) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    handleEditorInput();
  };

  // ── Callout Box ───────────────────────────────────────────────────────────
  const insertCallout = (type = "info") => {
    const bg = type === "info" ? "#EFF6FF" : "#FEF3C7";
    const border = type === "info" ? "#3B82F6" : "#F59E0B";
    const title = type === "info" ? "Vedic Astrological Insight" : "Important Scriptural Principle";
    const html = `
      <div style="background-color: ${bg}; border-left: 4px solid ${border}; padding: 14px 16px; margin: 16px 0; font-family: inherit;">
        <strong style="color: #111827; display: block; margin-bottom: 4px;">${title}</strong>
        <p style="margin: 0; color: #374151; font-size: 14px;">Enter key insights or remedial instructions here...</p>
      </div>
      <p></p>
    `;
    insertHTML(html);
  };

  // ── Table Insertion ───────────────────────────────────────────────────────
  const insertTable = () => {
    const { rows, cols, hasHeader } = tableData;
    let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #D1D5DB; font-size: 13px;">`;
    
    if (hasHeader) {
      tableHtml += `<thead style="background-color: #F3F4F6;"><tr>`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<th style="border: 1px solid #D1D5DB; padding: 8px 12px; text-align: left; font-weight: 600; color: #111827;">Header ${c + 1}</th>`;
      }
      tableHtml += `</tr></thead>`;
    }
    
    tableHtml += `<tbody>`;
    for (let r = 0; r < rows; r++) {
      const bg = r % 2 === 0 ? "#FFFFFF" : "#F9FAFB";
      tableHtml += `<tr style="background-color: ${bg};">`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td style="border: 1px solid #D1D5DB; padding: 8px 12px; color: #374151;">Cell ${r + 1},${c + 1}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p></p>`;
    
    insertHTML(tableHtml);
    setShowTableModal(false);
  };

  // ── Link Insertion ────────────────────────────────────────────────────────
  const handleInsertLink = () => {
    if (!linkData.url) return;
    const target = linkData.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    const text = linkData.text || linkData.url;
    const html = `<a href="${linkData.url}"${target} style="color: #5C1625; text-decoration: underline; font-weight: 500;">${text}</a>`;
    insertHTML(html);
    setShowLinkModal(false);
    setLinkData({ url: "", text: "", newTab: true });
  };

  // ── Image Insertion ───────────────────────────────────────────────────────
  const handleInsertImage = () => {
    if (!imageData.url) return;
    let html = `<figure style="margin: 20px 0; text-align: center;">
      <img src="${imageData.url}" alt="${imageData.alt || ""}" style="max-width: 100%; height: auto; border: 1px solid #E5E7EB; display: inline-block;" />`;
    if (imageData.caption) {
      html += `<figcaption style="font-size: 12px; color: #6B7280; margin-top: 6px; font-style: italic;">${imageData.caption}</figcaption>`;
    }
    html += `</figure><p></p>`;
    insertHTML(html);
    setShowImageModal(false);
    setImageData({ url: "", alt: "", caption: "" });
  };

  // ── Handle file upload to Cloudinary directly in editor ───────────────────
  const handleDirectImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;
    setUploadingImage(true);
    try {
      const url = await onImageUpload(file);
      if (url) {
        setImageData((p) => ({ ...p, url }));
      }
    } catch (err) {
      alert("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Palettes
  const textColors = [
    { label: "Default", color: "#1F2228" },
    { label: "Maroon", color: "#5C1625" },
    { label: "Gold", color: "#B88E4B" },
    { label: "Navy", color: "#1E3A8A" },
    { label: "Emerald", color: "#065F46" },
    { label: "Crimson", color: "#DC2626" },
    { label: "Slate", color: "#475569" },
    { label: "Purple", color: "#6B21A8" },
  ];

  const highlightColors = [
    { label: "None", color: "transparent" },
    { label: "Vedic Gold", color: "#FEF08A" },
    { label: "Soft Amber", color: "#FDE68A" },
    { label: "Mint Green", color: "#A7F3D0" },
    { label: "Sky Blue", color: "#BAE6FD" },
    { label: "Lavender", color: "#E9D5FF" },
    { label: "Rose Pink", color: "#FECDD3" },
  ];

  return (
    <div
      className={`border border-neutral-300 bg-white flex flex-col rounded-none transition-all ${
        isFullscreen ? "fixed inset-0 z-[999] h-screen w-screen" : "w-full min-h-[560px]"
      }`}
    >
      {/* ── Top Ribbon (MS Word Style Toolbar) ─────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-300 p-1.5 flex flex-wrap items-center justify-between gap-1.5 shrink-0 select-none">
        
        {/* Left Toolbar Items */}
        <div className="flex flex-wrap items-center gap-1">
          
          {/* Block Type Dropdown */}
          <select
            onChange={(e) => formatBlock(e.target.value)}
            defaultValue="p"
            title="Paragraph Style"
            className="h-7 text-[11px] font-medium bg-white border border-neutral-300 hover:border-neutral-400 px-2 py-0.5 rounded-none text-black focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="p">Normal (Paragraph)</option>
            <option value="h1">Heading 1 (Main Section)</option>
            <option value="h2">Heading 2 (Sub Section)</option>
            <option value="h3">Heading 3 (Sub Point)</option>
            <option value="h4">Heading 4 (Minor Point)</option>
            <option value="blockquote">Quote Block</option>
            <option value="pre">Code / Preformatted</option>
          </select>

          {/* Font Family selector */}
          <select
            onChange={(e) => executeCmd("fontName", e.target.value)}
            defaultValue="Georgia, serif"
            title="Font Family"
            className="h-7 text-[11px] font-medium bg-white border border-neutral-300 hover:border-neutral-400 px-2 py-0.5 rounded-none text-black focus:outline-none focus:border-black cursor-pointer hidden sm:block"
          >
            <option value="Georgia, serif">Serif (Vedic Classic)</option>
            <option value="Inter, sans-serif">Sans-Serif (Modern)</option>
            <option value="Courier New, monospace">Monospace (Code)</option>
            <option value="Cinzel, serif">Decorative Serif</option>
          </select>

          <div className="w-[1px] h-5 bg-neutral-300 mx-0.5" />

          {/* Basic Inline Styles */}
          <div className="flex items-center bg-white border border-neutral-300">
            <button
              type="button"
              onClick={() => executeCmd("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("strikeThrough")}
              title="Strikethrough"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Text Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setColorMenuOpen(!colorMenuOpen);
                setHighlightMenuOpen(false);
              }}
              title="Text Color"
              className="h-7 px-2 bg-white border border-neutral-300 hover:border-neutral-400 flex items-center gap-1 text-[11px] font-medium text-neutral-800 cursor-pointer rounded-none"
            >
              <Palette className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden md:inline">Color</span>
            </button>

            {colorMenuOpen && (
              <div className="absolute top-8 left-0 z-50 bg-white border border-neutral-300 shadow-xl p-2 w-40 grid grid-cols-4 gap-1.5 rounded-none">
                {textColors.map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    title={c.label}
                    onClick={() => {
                      executeCmd("foreColor", c.color);
                      setColorMenuOpen(false);
                    }}
                    style={{ backgroundColor: c.color }}
                    className="w-7 h-7 border border-neutral-300 cursor-pointer hover:scale-110 transition-transform rounded-none"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Highlight Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setHighlightMenuOpen(!highlightMenuOpen);
                setColorMenuOpen(false);
              }}
              title="Highlight Background"
              className="h-7 px-2 bg-white border border-neutral-300 hover:border-neutral-400 flex items-center gap-1 text-[11px] font-medium text-neutral-800 cursor-pointer rounded-none"
            >
              <Highlighter className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden md:inline">Highlight</span>
            </button>

            {highlightMenuOpen && (
              <div className="absolute top-8 left-0 z-50 bg-white border border-neutral-300 shadow-xl p-2 w-40 grid grid-cols-4 gap-1.5 rounded-none">
                {highlightColors.map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    title={c.label}
                    onClick={() => {
                      executeCmd("hiliteColor", c.color);
                      setHighlightMenuOpen(false);
                    }}
                    style={{ backgroundColor: c.color }}
                    className="w-7 h-7 border border-neutral-300 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-[9px] text-neutral-500 rounded-none"
                  >
                    {c.color === "transparent" ? "✕" : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-[1px] h-5 bg-neutral-300 mx-0.5" />

          {/* Alignment */}
          <div className="flex items-center bg-white border border-neutral-300">
            <button
              type="button"
              onClick={() => executeCmd("justifyLeft")}
              title="Align Left"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("justifyCenter")}
              title="Align Center"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("justifyRight")}
              title="Align Right"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("justifyFull")}
              title="Justify"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center bg-white border border-neutral-300">
            <button
              type="button"
              onClick={() => executeCmd("insertUnorderedList")}
              title="Bullet List"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-5 bg-neutral-300 mx-0.5" />

          {/* Insert Dropdown / Actions */}
          <div className="flex items-center bg-white border border-neutral-300">
            <button
              type="button"
              onClick={() => {
                saveSelection();
                setShowLinkModal(true);
              }}
              title="Insert Link"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                saveSelection();
                setShowImageModal(true);
              }}
              title="Insert Image"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                saveSelection();
                setShowTableModal(true);
              }}
              title="Insert Table"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertCallout("info")}
              title="Insert Vedic Insight Box"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("insertHorizontalRule")}
              title="Horizontal Divider"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-5 bg-neutral-300 mx-0.5" />

          {/* Undo / Redo / Clear */}
          <div className="flex items-center bg-white border border-neutral-300">
            <button
              type="button"
              onClick={() => executeCmd("undo")}
              title="Undo (Ctrl+Z)"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("redo")}
              title="Redo (Ctrl+Y)"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCmd("removeFormat")}
              title="Clear Formatting"
              className="p-1.5 hover:bg-neutral-100 text-neutral-700 hover:text-black cursor-pointer rounded-none border-l border-neutral-200"
            >
              <RemoveFormatting className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Toolbar Controls (View Switcher & Fullscreen) */}
        <div className="flex items-center gap-1.5">
          {/* View Modes */}
          <div className="flex items-center bg-neutral-200 p-0.5 border border-neutral-300 rounded-none">
            <button
              type="button"
              onClick={() => setViewMode("visual")}
              className={`px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer rounded-none flex items-center gap-1 ${
                viewMode === "visual" ? "bg-white text-black shadow-xs font-semibold" : "text-neutral-600 hover:text-black"
              }`}
            >
              <Type className="w-3 h-3" />
              <span>Visual Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("html")}
              className={`px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer rounded-none flex items-center gap-1 ${
                viewMode === "html" ? "bg-white text-black shadow-xs font-semibold" : "text-neutral-600 hover:text-black"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>HTML Source</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer rounded-none flex items-center gap-1 ${
                viewMode === "preview" ? "bg-white text-black shadow-xs font-semibold" : "text-neutral-600 hover:text-black"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
            className="p-1.5 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-black cursor-pointer rounded-none"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── Editor Canvas Area ─────────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-y-auto bg-neutral-50/50 min-h-[400px]">
        {viewMode === "visual" && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onBlur={handleEditorInput}
            className="w-full h-full min-h-[420px] p-6 sm:p-8 bg-white focus:outline-none prose prose-neutral max-w-none text-neutral-800 text-[15px] leading-relaxed font-serif selection:bg-neutral-200"
            style={{ minHeight: "420px" }}
            data-placeholder={placeholder}
          />
        )}

        {viewMode === "html" && (
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              updateStats(e.target.value);
            }}
            rows={22}
            className="w-full h-full min-h-[420px] p-4 bg-neutral-900 text-green-400 font-mono text-xs focus:outline-none resize-none leading-relaxed selection:bg-neutral-700"
            spellCheck={false}
          />
        )}

        {viewMode === "preview" && (
          <div className="w-full h-full min-h-[420px] p-6 sm:p-10 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="text-[11px] uppercase tracking-widest text-[#5C1625] font-semibold mb-2">
                Public Reader Live Preview
              </div>
              <div
                className="prose prose-base max-w-none text-[#2F333B] leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: value || "<p class='italic text-neutral-400'>Article body is empty. Type content in Visual Editor to preview.</p>" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Status Bar / Footer ────────────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-t border-neutral-300 px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-neutral-600 font-normal shrink-0">
        <div className="flex items-center gap-3">
          <span><strong>{stats.words}</strong> words</span>
          <span>·</span>
          <span><strong>{stats.chars}</strong> characters</span>
          <span>·</span>
          <span>Est. <strong>{stats.readTime}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">MS Word Rich Editor</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" title="Ready" />
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────────── */}
      
      {/* 1. Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 p-5 w-full max-w-md shadow-2xl rounded-none space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Insert Hyperlink</h4>
              <button onClick={() => setShowLinkModal(false)} className="text-neutral-400 hover:text-black cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Target URL *</label>
              <input
                type="url"
                value={linkData.url}
                onChange={(e) => setLinkData((p) => ({ ...p, url: e.target.value }))}
                placeholder="https://example.com or /consultation"
                className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Display Text (optional)</label>
              <input
                type="text"
                value={linkData.text}
                onChange={(e) => setLinkData((p) => ({ ...p, text: e.target.value }))}
                placeholder="Custom text..."
                className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="newTab"
                checked={linkData.newTab}
                onChange={(e) => setLinkData((p) => ({ ...p, newTab: e.target.checked }))}
                className="rounded-none cursor-pointer"
              />
              <label htmlFor="newTab" className="text-xs text-neutral-700 cursor-pointer">Open in new tab</label>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <button onClick={() => setShowLinkModal(false)} className="px-3 py-1.5 text-xs border border-neutral-300 rounded-none cursor-pointer">Cancel</button>
              <button onClick={handleInsertLink} disabled={!linkData.url} className="px-4 py-1.5 text-xs bg-black text-white rounded-none cursor-pointer hover:bg-neutral-800 disabled:opacity-50 font-medium">Insert Link</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 p-5 w-full max-w-md shadow-2xl rounded-none space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Embed In-Content Image</h4>
              <button onClick={() => setShowImageModal(false)} className="text-neutral-400 hover:text-black cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Upload file directly */}
            {onImageUpload && (
              <div className="p-3 bg-neutral-50 border border-dashed border-neutral-300 text-center">
                <label className="cursor-pointer flex flex-col items-center gap-1.5">
                  <Upload className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs font-medium text-black">Upload file to Cloudinary</span>
                  <span className="text-[10px] text-neutral-400">JPG, PNG, WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDirectImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                {uploadingImage && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-600 mt-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Or Image URL *</label>
              <input
                type="url"
                value={imageData.url}
                onChange={(e) => setImageData((p) => ({ ...p, url: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Alt Text (Accessibility & SEO)</label>
              <input
                type="text"
                value={imageData.alt}
                onChange={(e) => setImageData((p) => ({ ...p, alt: e.target.value }))}
                placeholder="Descriptive explanation of image"
                className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Caption (Optional)</label>
              <input
                type="text"
                value={imageData.caption}
                onChange={(e) => setImageData((p) => ({ ...p, caption: e.target.value }))}
                placeholder="e.g. Navamsha Chart Alignment diagram"
                className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <button onClick={() => setShowImageModal(false)} className="px-3 py-1.5 text-xs border border-neutral-300 rounded-none cursor-pointer">Cancel</button>
              <button onClick={handleInsertImage} disabled={!imageData.url} className="px-4 py-1.5 text-xs bg-black text-white rounded-none cursor-pointer hover:bg-neutral-800 disabled:opacity-50 font-medium">Embed Image</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 p-5 w-full max-w-sm shadow-2xl rounded-none space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Insert Data Table</h4>
              <button onClick={() => setShowTableModal(false)} className="text-neutral-400 hover:text-black cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableData.rows}
                  onChange={(e) => setTableData((p) => ({ ...p, rows: parseInt(e.target.value) || 1 }))}
                  className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableData.cols}
                  onChange={(e) => setTableData((p) => ({ ...p, cols: parseInt(e.target.value) || 1 }))}
                  className="w-full text-xs border border-neutral-300 px-2.5 py-1.5 focus:outline-none focus:border-black rounded-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hasHeader"
                checked={tableData.hasHeader}
                onChange={(e) => setTableData((p) => ({ ...p, hasHeader: e.target.checked }))}
                className="rounded-none cursor-pointer"
              />
              <label htmlFor="hasHeader" className="text-xs text-neutral-700 cursor-pointer">Include Header Row</label>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <button onClick={() => setShowTableModal(false)} className="px-3 py-1.5 text-xs border border-neutral-300 rounded-none cursor-pointer">Cancel</button>
              <button onClick={insertTable} className="px-4 py-1.5 text-xs bg-black text-white rounded-none cursor-pointer hover:bg-neutral-800 font-medium">Create Table</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
