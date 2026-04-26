import React, { useState, useEffect } from "react";
import api from "./api/axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState(null);
    const [editProduct, setEditProduct] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [search, setSearch] = useState("");

    const categories = ["Tools", "Kitchenware", "Appliances", "Storage", "Cleaning", "Furniture", "Electrical", "Safety"];

    const fetchProducts = async () => {
        try {
            const res = await api.get("/api/v1/products");
            setProducts(res.data.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleAdd = async () => {
        if (!product || !category) return alert("Please fill in all fields");
        try {
            await api.post("/api/v1/products", { product, category });
            setProduct(""); setCategory("");
            fetchProducts();
        } catch (err) { alert("Failed to add product"); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await api.delete(`/api/v1/products/${id}`);
            fetchProducts();
        } catch (err) { alert("Failed to delete"); }
    };

    const handleEditSave = async (id) => {
        if (!editProduct || !editCategory) return alert("Please fill in all fields");
        try {
            await api.put(`/api/v1/products/${id}`, { product: editProduct, category: editCategory });
            setEditId(null);
            fetchProducts();
        } catch (err) { alert("Failed to update"); }
    };

    const filtered = products.filter(p =>
        p.product.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const styles = {
        wrap: { minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Segoe UI', sans-serif", padding: 32 },
        card: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: 28, marginBottom: 24 },
        title: { fontSize: 22, fontWeight: 700, color: "#166534", marginBottom: 4 },
        sub: { color: "#6b7280", fontSize: 13, marginBottom: 20 },
        row: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" },
        input: { flex: 1, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #bbf7d0", fontSize: 14, outline: "none", minWidth: 160 },
        select: { flex: 1, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #bbf7d0", fontSize: 14, outline: "none", minWidth: 160 },
        btnGreen: { background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 600, cursor: "pointer", fontSize: 14 },
        searchBar: { display: "flex", alignItems: "center", gap: 10, border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "10px 16px", marginBottom: 16, background: "#f0fdf4" },
        searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 15, flex: 1, color: "#333" },
        table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
        th: { background: "#dcfce7", color: "#16a34a", fontWeight: 700, padding: "12px 14px", textAlign: "left", borderBottom: "2px solid #bbf7d0" },
        td: { padding: "12px 14px", borderBottom: "1px solid #f0fdf4", color: "#374151" },
        btnEdit: { background: "#dcfce7", color: "#16a34a", border: "1.5px solid #86efac", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 600, marginRight: 6 },
        btnDel: { background: "#fef2f2", color: "#ef4444", border: "1.5px solid #fca5a5", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 600 },
        btnSave: { background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 600, marginRight: 6 },
        btnCancel: { background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 600 },
        inlineInput: { padding: "5px 8px", borderRadius: 6, border: "1.5px solid #86efac", fontSize: 13, width: "90%" },
    };

    return (
        <div style={styles.wrap}>

            {/* Add Product */}
            <div style={styles.card}>
                <div style={styles.title}>🌿 My Sample CRUD</div>
                <div style={styles.sub}>Add and manage your products</div>
                <div style={styles.row}>
                    <input
                        style={styles.input}
                        placeholder="Product name"
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                    />
                    <select
                        style={styles.select}
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button style={styles.btnGreen} onClick={handleAdd}>+ Add Product</button>
                </div>
            </div>

            {/* Table */}
            <div style={styles.card}>
                <div style={styles.searchBar}>
                    <span style={{ color: "#16a34a" }}>🔍</span>
                    <input
                        style={styles.searchInput}
                        placeholder="Search products or category..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <span style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 6, padding: "2px 10px", fontWeight: 700, fontSize: 13 }}>
                        {filtered.length}
                    </span>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Product</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((p) => (
                                <tr key={p.id_product}
                                    onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                    <td style={styles.td}>{p.id_product}</td>
                                    <td style={styles.td}>
                                        {editId === p.id_product
                                            ? <input style={styles.inlineInput} value={editProduct} onChange={e => setEditProduct(e.target.value)} />
                                            : p.product}
                                    </td>
                                    <td style={styles.td}>
                                        {editId === p.id_product
                                            ? <select style={styles.inlineInput} value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                              </select>
                                            : p.category}
                                    </td>
                                    <td style={styles.td}>
                                        {editId === p.id_product ? (
                                            <>
                                                <button style={styles.btnSave} onClick={() => handleEditSave(p.id_product)}>Save</button>
                                                <button style={styles.btnCancel} onClick={() => setEditId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button style={styles.btnEdit} onClick={() => { setEditId(p.id_product); setEditProduct(p.product); setEditCategory(p.category); }}>✏️ Edit</button>
                                                <button style={styles.btnDel} onClick={() => handleDelete(p.id_product)}>🗑️ Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}