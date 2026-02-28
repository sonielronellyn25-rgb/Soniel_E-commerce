import Card from "../../../../components/ui/card";

function CardList() {
  const products = [
    {
      id: 1,
      name: "Essential Cookware Starter Set",
      price: "129",
      salePrice: "99",
      category: "Cookware",
      reviews: "1.1k+ reviews",
      description: "Everyday pots and pans with even heat and easy cleanup.",
      image:
        "https://learn.surlatable.com/wp-content/uploads/2023/02/Essential-Cookware.jpg"
    },
    {
      id: 2,
      name: "Premium Kitchen Essentials Bundle",
      price: "189",
      salePrice: "149",
      category: "Bundles",
      reviews: "860+ reviews",
      description: "Curated tools for chopping, mixing, and everyday prep.",
      image:
        "https://images.getfastr.com/c6/18/e95c99e2412f99f24773a4efe0ae.webp?im=UnsharpMask;Resize,width=1536"
    },
    {
      id: 3,
      name: "Kitchen Essentials for Beginners",
      price: "99",
      salePrice: "79",
      category: "Starter Kits",
      reviews: "540+ reviews",
      description: "Everything a new kitchen needs to cook with confidence.",
      image:
        "https://cookaids.com/wp-content/uploads/2024/02/kitchen_essentials_for_beginners.jpg"
    },
    {
      id: 4,
      name: "Stainless Steel Stockpot",
      price: "74",
      salePrice: "59",
      category: "Cookware",
      reviews: "2.3k+ reviews",
      description: "Deep capacity pot for soups, pasta, and family meals.",
      image:
        "https://m.media-amazon.com/images/I/61bqFnYEfbL._AC_SL1500_.jpg"
    },
    {
      id: 5,
      name: "Essential Utensils Collection",
      price: "58",
      salePrice: "45",
      category: "Utensils",
      reviews: "1.4k+ reviews",
      description: "Must-have tools for stirring, flipping, and serving.",
      image:
        "https://img.freepik.com/premium-photo/collection-essential-kitchen-utensils-tools_841543-26123.jpg?w=2000"
    },
    {
      id: 6,
      name: "Nonstick Fry Pan",
      price: "42",
      salePrice: "34",
      category: "Cookware",
      reviews: "980+ reviews",
      description: "Lightweight pan with a smooth, scratch-resistant coating.",
      image: "https://tse1.mm.bing.net/th/id/OIP.IBWfIFC04FqdqeOyg2p3RQHaE0?pid=Api&P=0&h=220"
    },
    {
      id: 7,
      name: "KitchenEssentials Signature Set",
      price: "159",
      salePrice: "119",
      category: "Bundles",
      reviews: "670+ reviews",
      description: "Stylish cookware set to refresh your everyday cooking.",
      image: "https://kessentials.com/wp-content/uploads/2023/01/1-.png"
    },
    {
      id: 8,
      name: "Kitchen Essentials 3D Pack",
      price: "88",
      salePrice: "69",
      category: "Tools",
      reviews: "420+ reviews",
      description: "A colorful set of essentials for prep, bake, and serve.",
      image:
        "https://img.freepik.com/premium-psd/kitchen-essentials-3d-illustrations-pack_505787-171.jpg"
    },
    {
      id: 9,
      name: "Chef's Knife Set",
      price: "110",
      salePrice: "92",
      category: "Cutlery",
      reviews: "1.2k+ reviews",
      description: "Precision blades with comfortable, balanced handles.",
      image:
        "https://m.media-amazon.com/images/I/81WSWngW66L._AC_SL1500_.jpg"
    }
  ];

  return (
    <div className="card-grid">
      {products.map((product) => (
        <Card
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          salePrice={product.salePrice}
          description={product.description}
          category={product.category}
          reviews={product.reviews}
        />
      ))}
    </div>
  );
}

export default CardList;
