import React, { useState, useMemo, useRef, useEffect } from "react";
import dataItems from '../default/data.json';

const T = {
  bg:        "#fff0f6",
  card:      "#ffffff",
  header:    "#9d174d",
  headerSub: "#be185d",
  accent:    "#ec4899",
  accentLt:  "#fce7f3",
  border:    "#fbcfe8",
  textPri:   "#4a0026",
  textSec:   "#9d6080",
  rowEven:   "#fff5f9",
  rowHover:  "#fce7f3",
  rowActive: "#fbcfe8",
};

const CAT = {
  "Tools":        { bg:"#fff7ed", color:"#c2410c", border:"#fed7aa" },
  "Equipment":    { bg:"#fdf4ff", color:"#86198f", border:"#f0abfc" },
  "Appliances":   { bg:"#fff1f2", color:"#be123c", border:"#fecdd3" },
  "Furniture":    { bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe" },
  "Electrical":   { bg:"#faf5ff", color:"#7e22ce", border:"#e9d5ff" },
  "Safety":       { bg:"#f0fdf4", color:"#166534", border:"#86efac" },
  "Security":     { bg:"#fef9c3", color:"#854d0e", border:"#fde047" },
  "Storage":      { bg:"#ede9fe", color:"#5b21b6", border:"#c4b5fd" },
  "Stationery":   { bg:"#ede9fe", color:"#5b21b6", border:"#c4b5fd" },
  "Laundry":      { bg:"#ecfdf5", color:"#065f46", border:"#6ee7b7" },
  "Bedroom":      { bg:"#f0f9ff", color:"#0c4a6e", border:"#7dd3fc" },
  "Cleaning":     { bg:"#f0fdf4", color:"#14532d", border:"#86efac" },
  "Office":       { bg:"#f5f3ff", color:"#4c1d95", border:"#c4b5fd" },
  "Kitchenware":  { bg:"#fff1f2", color:"#9f1239", border:"#fda4af" },
  "Garden":       { bg:"#f7fee7", color:"#3f6212", border:"#bef264" },
  "Home Comfort": { bg:"#fdf2f8", color:"#701a75", border:"#f0abfc" },
};

const ACTIVITY_MAP = {
  1:[12,18,9,24,31,22,40,35,28,45,38,52],   2:[5,14,22,18,9,30,25,19,34,28,41,36],
  3:[20,15,28,35,22,40,18,30,45,25,38,50],  4:[8,12,19,15,25,20,30,18,28,35,22,40],
  5:[15,22,18,30,25,35,28,40,32,45,38,50],  6:[30,25,40,35,50,45,55,48,60,52,65,58],
  7:[10,18,14,22,28,20,35,30,25,40,35,45],  8:[6,10,15,12,20,18,25,22,30,28,35,32],
  9:[18,25,20,30,35,28,42,38,32,48,42,55],  10:[40,35,50,45,60,55,65,58,70,62,75,68],
  11:[22,30,25,38,32,45,40,35,50,44,58,52], 12:[15,20,28,22,35,30,40,35,28,45,38,50],
  13:[25,32,28,40,35,48,42,38,52,45,58,52], 14:[35,28,42,38,50,45,55,50,42,60,52,65],
  15:[8,14,10,18,22,16,28,24,18,32,28,38],  16:[50,42,58,52,65,60,72,65,58,75,68,80],
  17:[20,28,22,35,30,42,38,32,48,40,55,48], 18:[12,18,15,24,20,30,28,22,35,30,40,36],
  19:[28,35,30,42,38,50,45,40,55,48,62,55], 20:[45,38,55,50,62,58,70,65,58,75,68,80],
  21:[15,22,18,28,25,35,30,25,38,32,45,40], 22:[30,25,38,32,45,40,52,48,40,58,50,62],
  23:[40,35,48,45,55,50,62,58,52,68,62,72], 24:[25,32,28,38,35,45,42,38,50,45,58,52],
  25:[10,16,12,20,18,26,22,18,28,25,32,28], 26:[18,25,20,30,28,38,34,30,42,38,48,44],
  27:[55,48,65,58,72,68,80,75,68,85,78,90], 28:[30,38,32,45,40,52,48,42,58,52,65,60],
  29:[35,28,42,38,50,46,58,52,45,62,55,68], 30:[12,18,14,22,20,28,25,20,32,28,38,34],
  31:[16,22,18,28,25,34,30,26,38,34,42,38], 32:[28,22,35,30,42,38,48,44,38,52,46,58],
  33:[22,28,25,35,32,42,38,32,48,42,55,50], 34:[32,26,40,35,48,44,55,50,42,60,54,65],
  35:[5,8,6,10,12,9,15,12,8,18,14,20],      36:[8,12,10,16,14,20,18,14,22,20,26,22],
  37:[22,18,28,25,35,32,42,38,30,48,42,52], 38:[6,10,8,14,12,18,15,12,20,18,24,20],
  39:[10,15,12,20,18,25,22,18,28,25,32,28], 40:[38,32,48,42,55,50,62,58,50,68,62,72],
  41:[14,20,16,25,22,30,28,22,35,30,38,34], 42:[42,35,52,48,60,55,68,62,55,72,65,78],
  43:[10,14,12,18,16,22,20,16,26,22,30,26], 44:[16,22,18,28,25,32,30,25,38,34,42,38],
  45:[12,18,15,22,20,28,25,20,30,28,36,32], 46:[18,24,20,30,28,36,32,28,40,36,45,40],
  47:[22,30,25,35,32,42,38,32,48,44,55,50], 48:[60,52,72,65,80,75,88,82,75,92,85,98],
  49:[4,8,6,10,8,14,12,8,16,14,20,16],      50:[38,32,48,42,55,50,62,58,52,68,62,75],
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ROWS_PER_PAGE = 10;

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function DragHandle() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ display:"block", margin:"auto", cursor:"grab" }}>
      {[[4,4],[10,4],[4,10],[10,10],[4,16],[10,16]].map(([cx,cy],i) =>
        <circle key={i} cx={cx} cy={cy} r="1.6" fill="#f9a8d4"/>
      )}
    </svg>
  );
}
function ChevronUp()   { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>; }
function ChevronDown() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function SortBoth() {
  return (
    <svg width="11" height="14" viewBox="0 0 24 28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18,11 12,5 6,11"/><polyline points="6,17 12,23 18,17"/>
    </svg>
  );
}

function DualCurveChart({ data }) {
  const w = 300, h = 110, pad = 10;
  const inner = h - pad * 2;
  const max1 = Math.max(...data), min1 = Math.min(...data), range1 = max1 - min1 || 1;
  const pts1 = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    pad + inner - ((v - min1) / range1) * inner,
  ]);
  const makePath = pts => pts.map((p, i) => {
    if (i === 0) return `M ${p[0].toFixed(1)},${p[1].toFixed(1)}`;
    const pr = pts[i - 1], cx = (pr[0] + p[0]) / 2;
    return `C ${cx.toFixed(1)},${pr[1].toFixed(1)} ${cx.toFixed(1)},${p[1].toFixed(1)} ${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  }).join(" ");
  const path1 = makePath(pts1);
  const gridY = [0.25, 0.5, 0.75].map(r => pad + inner * (1 - r));
  const gridX = [0, 0.25, 0.5, 0.75, 1].map(r => r * w);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%", height:110 }}>
      <defs>
        <filter id="glow1" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {gridY.map((y, i) => (
        <line key={`gy${i}`} x1={0} y1={y} x2={w} y2={y} stroke="#fbcfe8" strokeWidth="0.8" strokeDasharray="4,4"/>
      ))}
      {gridX.map((x, i) => (
        <line key={`gx${i}`} x1={x} y1={pad} x2={x} y2={h - pad} stroke="#fbcfe8" strokeWidth="0.8" strokeDasharray="4,4"/>
      ))}
      <path d={path1} fill="none" stroke="#38bdf8" strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" filter="url(#glow1)"/>
    </svg>
  );
}

function SidePanel({ item, onClose }) {
  if (!item) return null;
  const act   = ACTIVITY_MAP[item.id] || Array(12).fill(0);
  const peak  = Math.max(...act);
  const avg   = Math.round(act.reduce((a,b) => a+b, 0) / act.length);
  const total = act.reduce((a,b) => a+b, 0);
  return (
    <div style={{
      position:"fixed", top:0, right:0, height:"100vh", width:360,
      background:"linear-gradient(180deg, #ffffff 0%, #fff0f6 45%, #fce7f3 100%)",
      boxShadow:"-12px 0 40px rgba(91,33,182,0.18)",
      zIndex:1000, display:"flex", flexDirection:"column",
      fontFamily:"'Inter',sans-serif", overflowY:"auto",
      borderLeft:"1px solid rgba(236,72,153,0.25)",
    }}>
      <div style={{ background:"linear-gradient(135deg, #831843 0%, #be185d 55%, #f472b6 100%)", padding:"24px 20px 22px", color:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, opacity:0.6, marginBottom:6, textTransform:"uppercase", letterSpacing:2, fontWeight:700 }}>
              Warehouse · {item.sku}
            </div>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.4, lineHeight:1.2 }}>{item.name}</div>
            <div style={{ marginTop:12, display:"flex", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontSize:11, padding:"4px 12px", borderRadius:999, fontWeight:700, background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.28)" }}>
                {item.category}
              </span>
              <span style={{ fontSize:11, padding:"4px 12px", borderRadius:999, fontWeight:700,
                background: item.status==="In Stock"?"rgba(34,197,94,0.28)":item.status==="Low Stock"?"rgba(245,158,11,0.28)":"rgba(239,68,68,0.28)",
                color:"#fff", border:"1px solid rgba(255,255,255,0.24)" }}>
                {item.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.35)",
            color:"#fff", borderRadius:"50%", width:34, height:34,
            cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          }}>✕</button>
        </div>
        <div style={{ marginTop:18, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[["Price","₱"+item.price.toLocaleString()],["Qty",item.quantity],["Date", item.date.slice(5).replace("-","/")]].map(([l,v])=>(
            <div key={l} style={{ background:"rgba(255,255,255,0.16)", borderRadius:12, padding:"10px 12px", border:"1px solid rgba(255,255,255,0.22)" }}>
              <div style={{ fontSize:10, opacity:0.7, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{l}</div>
              <div style={{ fontSize:15, fontWeight:800 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:18, display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ background:"#fff5f9", borderRadius:16, padding:16, border:"1px solid rgba(236,72,153,0.12)" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#be185d", marginBottom:10, textTransform:"uppercase", letterSpacing:1.6 }}>
            Movement History
          </div>
          <DualCurveChart data={act}/>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            {["Jan","Jul","Dec"].map(m => <span key={m} style={{ fontSize:10, color:"#f9a8d4", fontWeight:600 }}>{m}</span>)}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[["Peak",peak],["Avg",avg],["Total",total]].map(([l,v]) => (
            <div key={l} style={{ background:"#ffffff", borderRadius:14, padding:"14px 8px", textAlign:"center", border:"1px solid rgba(236,72,153,0.12)" }}>
              <div style={{ fontSize:20, fontWeight:800, color:T.accent }}>{v}</div>
              <div style={{ fontSize:10, color:"#ec4899", textTransform:"uppercase", letterSpacing:1.2, marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff5f9", borderRadius:16, padding:16, border:"1px solid rgba(236,72,153,0.12)" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#be185d", marginBottom:12, textTransform:"uppercase", letterSpacing:1.6 }}>
            Monthly Breakdown
          </div>
          {MONTHS.map((m,i) => (
            <div key={m} style={{ display:"flex", alignItems:"center", marginBottom:8 }}>
              <div style={{ width:30, fontSize:10, color:"#7c6fa0", fontWeight:600 }}>{m}</div>
              <div style={{ flex:1, background:"#fce7f3", borderRadius:999, height:6, margin:"0 10px" }}>
                <div style={{ width:`${(act[i]/peak)*100}%`, height:"100%", background:"linear-gradient(90deg, #38bdf8, #ec4899)", borderRadius:999, transition:"width 0.4s" }}/>
              </div>
              <div style={{ width:26, fontSize:10, color:T.textPri, textAlign:"right", fontWeight:700 }}>{act[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductData({ items }) {
  const resolvedItems = (items && items.length > 0) ? items : dataItems;

  const [search,      setSearch]      = useState("");
  const [sortKey,     setSortKey]     = useState("id");
  const [sortDir,     setSortDir]     = useState("asc");
  const [selected,    setSelected]    = useState([]);
  const [page,        setPage]        = useState(1);
  const [activeItem,  setActiveItem]  = useState(null);
  const [rowOrder,    setRowOrder]    = useState(null);
  const [dragIdx,     setDragIdx]     = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [hovCol,      setHovCol]      = useState(null);
  const cbRef    = useRef(null);
  const dragItem = useRef(null);

 const filtered = useMemo(() => {
    const safeItems = Array.isArray(resolvedItems) ? resolvedItems : [];
    const q = search.toLowerCase();
    return safeItems.filter(i =>
      String(i.id).includes(q) ||
      i.name.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      String(i.price).includes(q)
    );
}, [resolvedItems, search]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
    return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  }), [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
  const sortedPage = sorted.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE);
  const paginated  = rowOrder || sortedPage;
  const allChecked  = paginated.length > 0 && paginated.every(i => selected.includes(i.id));
  const someChecked = paginated.some(i => selected.includes(i.id)) && !allChecked;

  useEffect(() => { setRowOrder(null); }, [page, sortKey, sortDir, search]);
  useEffect(() => { if (cbRef.current) cbRef.current.indeterminate = someChecked; }, [someChecked]);

  const handleSort      = k => { if (sortKey===k) setSortDir(d => d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("asc"); }};
  const handleSelectAll = e => { if (e.target.checked) setSelected(paginated.map(i=>i.id)); else setSelected([]); };
  const handleSelect    = id => setSelected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  const handleRowClick  = item => setActiveItem(p => p?.id===item.id ? null : item);

  const onDragStart = (e, idx) => { dragItem.current=idx; setDragIdx(idx); e.dataTransfer.effectAllowed="move"; };
  const onDragEnter = idx => setDragOverIdx(idx);
  const onDragOver  = e => { e.preventDefault(); e.dataTransfer.dropEffect="move"; };
  const onDrop      = (e, toIdx) => {
    e.preventDefault();
    const from = dragItem.current;
    if (from===null || from===toIdx) return;
    const arr = [...paginated];
    const [moved] = arr.splice(from, 1);
    arr.splice(toIdx, 0, moved);
    setRowOrder(arr);
    setDragIdx(null); setDragOverIdx(null); dragItem.current=null;
  };
  const onDragEnd = () => { setDragIdx(null); setDragOverIdx(null); dragItem.current=null; };

  const pageNumbers = () => {
    const ps = [];
    if (totalPages <= 7) { for (let i=1;i<=totalPages;i++) ps.push(i); }
    else {
      ps.push(1);
      if (page > 3) ps.push("...");
      for (let i=Math.max(2,page-1); i<=Math.min(totalPages-1,page+1); i++) ps.push(i);
      if (page < totalPages-2) ps.push("...");
      ps.push(totalPages);
    }
    return ps;
  };

  const catBadge = cat => {
    const c = CAT[cat] || { bg:"#f5f3ff", color:T.accent, border:"#ddd6fe" };
    return { display:"inline-block", padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:700, background:c.bg, color:c.color, border:`1px solid ${c.border}` };
  };

  const SortIcon = ({ col }) => {
    const s = { marginLeft:6, display:"inline-flex", verticalAlign:"middle" };
    if (sortKey !== col) return <span style={s}><SortBoth/></span>;
    return <span style={s}>{sortDir==="asc" ? <ChevronUp/> : <ChevronDown/>}</span>;
  };

  const pageBtn = active => ({
    width:30, height:30, borderRadius:6,
    border: active ? "none" : `1px solid ${T.border}`,
    background: active ? T.accent : "#fff",
    color:  active ? "#fff" : T.textSec,
    fontWeight: active ? 700 : 400,
    fontSize:13, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    transition:"all 0.15s",
  });

  const COLS = [["id","ID"],["name","Name"],["category","Category"],["price","Price (₱)"],["quantity","Qty"],["status","Status"]];

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", padding:28, background:T.bg, minHeight:"100vh" }}>
      <div style={{ background:T.card, borderRadius:16, boxShadow:"0 4px 24px rgba(109,40,217,0.10)", overflow:"hidden", border:`1px solid ${T.border}` }}>

        <div style={{ padding:"18px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:T.textPri, letterSpacing:-0.4 }}>
              House & Equipment Inventory
            </div>
            <div style={{ fontSize:12, color:T.textSec, marginTop:2 }}>
              {filtered.length} items{selected.length > 0 ? ` · ${selected.length} selected` : ""}
              {rowOrder && <span style={{ marginLeft:8, color:T.accent, fontWeight:600 }}>● Custom order</span>}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {rowOrder && (
              <button onClick={() => setRowOrder(null)} style={{
                fontSize:11, color:T.textSec, background:T.accentLt, border:`1px solid ${T.border}`,
                borderRadius:6, padding:"6px 12px", cursor:"pointer", fontFamily:"inherit", fontWeight:600,
              }}>Reset order</button>
            )}
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:8, padding:"7px 12px", minWidth:220 }}>
              <SearchIcon/>
              <input
                style={{ border:"none", background:"transparent", outline:"none", fontSize:13, color:T.textPri, width:"100%" }}
                placeholder="Search inventory..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:`linear-gradient(135deg, ${T.header} 0%, ${T.headerSub} 60%, #f472b6 100%)` }}>
                <th style={{ padding:"13px 8px 13px 16px", width:36 }}/>
                <th style={{ padding:"0 16px", width:44, height:46, borderRight:"1px solid rgba(255,255,255,0.1)", verticalAlign:"middle", textAlign:"left" }}>
                  <input type="checkbox" ref={cbRef} checked={allChecked} onChange={handleSelectAll}
                    style={{ accentColor:"#fff", width:14, height:14, cursor:"pointer" }}/>
                </th>
                {COLS.map(([key, label], i, arr) => (
                  <th key={key}
                    onClick={() => handleSort(key)}
                    onMouseEnter={() => setHovCol(key)}
                    onMouseLeave={() => setHovCol(null)}
                    style={{
                      padding:"13px 16px", textAlign:"left",
                      fontSize:11, fontWeight:700, letterSpacing:0.8, color:"#fff",
                      textTransform:"uppercase", cursor:"pointer", userSelect:"none", whiteSpace:"nowrap",
                      borderRight: i < arr.length-1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      background: sortKey===key ? "rgba(0,0,0,0.18)" : hovCol===key ? "rgba(0,0,0,0.09)" : "transparent",
                      transition:"background 0.15s",
                    }}>
                    {label}<SortIcon col={key}/>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={COLS.length+2} style={{ padding:56, textAlign:"center", color:T.textSec, fontSize:14 }}>
                  No items found
                </td></tr>
              ) : paginated.map((item, idx) => {
                const isActive   = activeItem?.id === item.id;
                const isSelected = selected.includes(item.id);
                const isEven     = idx % 2 === 1;
                const isDragging = dragIdx === idx;
                const isOver     = dragOverIdx === idx && dragIdx !== idx;
                return (
                  <tr key={item.id}
                    draggable
                    onDragStart={e => onDragStart(e, idx)}
                    onDragEnter={() => onDragEnter(idx)}
                    onDragOver={onDragOver}
                    onDrop={e => onDrop(e, idx)}
                    onDragEnd={onDragEnd}
                    onClick={() => handleRowClick(item)}
                    style={{
                      background: isDragging?"#f5f0ff":isOver?T.accentLt:isActive?T.rowActive:isSelected?"#f5f0ff":isEven?T.rowEven:"#ffffff",
                      opacity: isDragging ? 0.45 : 1,
                      cursor:"pointer",
                      borderLeft: isOver||isActive ? `3px solid ${T.accent}` : "3px solid transparent",
                      transition:"background 0.1s, opacity 0.1s",
                    }}
                    onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = T.rowHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isDragging?"#f5f0ff":isOver?T.accentLt:isActive?T.rowActive:isSelected?"#f5f0ff":isEven?T.rowEven:"#ffffff"; }}
                  >
                    <td style={{ padding:"11px 8px 11px 16px", borderBottom:`1px solid ${T.border}`, width:36 }} onClick={e => e.stopPropagation()}>
                      <DragHandle/>
                    </td>
                    <td style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, verticalAlign:"middle" }} onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleSelect(item.id)}
                        style={{ accentColor:T.accent, width:14, height:14, cursor:"pointer" }}/>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:13, fontWeight:700, color:T.textSec }}>{item.id}</div>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:13, fontWeight:600, color:T.textPri }}>{item.name}</div>
                      <div style={{ fontSize:11, color:T.textSec, marginTop:1 }}>{item.sku}</div>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <span style={catBadge(item.category)}>{item.category}</span>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:13, fontWeight:700, color:T.textPri }}>₱{item.price.toLocaleString()}</div>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:13, fontWeight:600, color: item.quantity===0?"#ef4444":item.quantity<=5?"#f59e0b":T.textPri }}>
                        {item.quantity}
                      </div>
                    </td>
                    <td style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}` }}>
                      <span style={{
                        fontSize:11, padding:"3px 10px", borderRadius:999, fontWeight:700,
                        background: item.status==="In Stock"?"#f0fdf4":item.status==="Low Stock"?"#fffbeb":"#fff1f2",
                        color:      item.status==="In Stock"?"#16a34a":item.status==="Low Stock"?"#d97706":"#dc2626",
                        border: `1px solid ${item.status==="In Stock"?"#bbf7d0":item.status==="Low Stock"?"#fde68a":"#fecaca"}`,
                      }}>{item.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ padding:"13px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ fontSize:12, color:T.textSec }}>
            Showing{" "}
            <strong style={{ color:T.textPri }}>{sorted.length===0?0:Math.min((page-1)*ROWS_PER_PAGE+1, sorted.length)}</strong>
            –
            <strong style={{ color:T.textPri }}>{Math.min(page*ROWS_PER_PAGE, sorted.length)}</strong>
            {" "}of{" "}
            <strong style={{ color:T.textPri }}>{sorted.length}</strong>
          </div>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
              style={{ ...pageBtn(false), opacity:page===1?0.35:1 }}>‹</button>
            {pageNumbers().map((p,i) =>
              p==="..." ? (
                <span key={`e${i}`} style={{ fontSize:13, color:T.textSec, padding:"0 4px" }}>…</span>
              ) : (
                <button key={p} onClick={() => setPage(p)} style={pageBtn(page===p)}>{p}</button>
              )
            )}
            <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
              style={{ ...pageBtn(false), opacity:page===totalPages?0.35:1 }}>›</button>
          </div>
        </div>
      </div>

      {activeItem && (
        <>
          <div onClick={() => setActiveItem(null)} style={{ position:"fixed", inset:0, background:"rgba(157,23,77,0.2)", zIndex:999 }}/>
          <SidePanel item={activeItem} onClose={() => setActiveItem(null)}/>
        </>
      )}
    </div>
  );
}