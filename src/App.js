import ProductList from './app/main/homepage/components/ProductList';
import { Routes, Route } from 'react-router-dom';
import Homepage from './app/main/homepage/page';
import ToDoList from './ToDoList';
import ProductData from './app/main/homepage/components/data-table/data-table';

const sampleItems = [
  { id: 1,  name: "Chef's Knife",      sku: "KN-001", category: "Tools",        price: 1500,  quantity: 10, status: "In Stock",    date: "2024-01-15" },
  { id: 2,  name: "Mixing Bowl",        sku: "BW-002", category: "Kitchenware",  price: 850,   quantity: 3,  status: "Low Stock",   date: "2024-02-10" },
  { id: 3,  name: "Stand Mixer",        sku: "AP-003", category: "Appliances",   price: 12000, quantity: 0,  status: "Out of Stock",date: "2024-03-05" },
  { id: 4,  name: "Cutting Board",      sku: "KB-004", category: "Kitchenware",  price: 650,   quantity: 15, status: "In Stock",    date: "2024-01-20" },
  { id: 5,  name: "Rice Cooker",        sku: "AP-005", category: "Appliances",   price: 3500,  quantity: 8,  status: "In Stock",    date: "2024-02-15" },
  { id: 6,  name: "Dish Rack",          sku: "ST-006", category: "Storage",      price: 950,   quantity: 2,  status: "Low Stock",   date: "2024-03-10" },
  { id: 7,  name: "Broom Set",          sku: "CL-007", category: "Cleaning",     price: 450,   quantity: 20, status: "In Stock",    date: "2024-01-25" },
  { id: 8,  name: "Office Chair",       sku: "FN-008", category: "Furniture",    price: 8500,  quantity: 5,  status: "In Stock",    date: "2024-02-20" },
  { id: 9,  name: "Extension Cord",     sku: "EL-009", category: "Electrical",   price: 750,   quantity: 0,  status: "Out of Stock",date: "2024-03-15" },
  { id: 10, name: "Fire Extinguisher",  sku: "SF-010", category: "Safety",       price: 2500,  quantity: 4,  status: "Low Stock",   date: "2024-01-30" },
  { id: 11, name: "Laundry Basket",     sku: "LN-011", category: "Laundry",      price: 550,   quantity: 12, status: "In Stock",    date: "2024-02-25" },
  { id: 12, name: "CCTV Camera",        sku: "SC-012", category: "Security",     price: 4500,  quantity: 3,  status: "Low Stock",   date: "2024-03-20" },
  { id: 13, name: "Throw Pillow",       sku: "BD-013", category: "Bedroom",      price: 350,   quantity: 25, status: "In Stock",    date: "2024-01-10" },
  { id: 14, name: "Desk Lamp",          sku: "OF-014", category: "Office",       price: 1200,  quantity: 7,  status: "In Stock",    date: "2024-02-05" },
  { id: 15, name: "Garden Hose",        sku: "GD-015", category: "Garden",       price: 1800,  quantity: 0,  status: "Out of Stock",date: "2024-03-25" },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/todo" element={<ToDoList />} />
      <Route path="/data" element={<ProductData items={sampleItems} />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
}
export default App;