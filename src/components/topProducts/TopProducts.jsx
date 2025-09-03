import styles from "./TopProducts.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const products = [
  { name: "Redbull", rating: 5 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 2 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 4 },
  { name: "Bru", rating: 1 },
];

const TopProducts = () => {
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allInvoices && allProducts) {
      setIsLoading(false);
    }
  }, [allInvoices, allProducts]);

  // Enhanced debugging
  console.log("All invoices:", allInvoices);
  console.log("All products:", allProducts);
  console.log("Invoices array length:", allInvoices?.length || 0);
  console.log("Products array length:", allProducts?.length || 0);

  const topFiveSelling = Array.isArray(allInvoices)
    ? allInvoices
        .filter((invoice) => invoice && Number(invoice.amount || 0) > 0)
        .sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0))
        .slice(0, 5)
    : [];

  const topFiveProductIds = (topFiveSelling ?? []).flatMap((invoice) => {
    if (!invoice?.productId) return [];
    
    const productIds = Array.isArray(invoice.productId)
      ? invoice.productId
      : [invoice.productId];
    
    // Convert all IDs to strings for consistent comparison
    return productIds.map(id => id?.toString());
  });

  const matchedProducts = Array.isArray(allProducts)
    ? allProducts.filter((product) => 
        topFiveProductIds.includes(product._id?.toString())
      )
    : [];

  console.log("Top five selling:", topFiveSelling);
  console.log("Top five product IDs:", topFiveProductIds);
  console.log("Matched products:", matchedProducts);

  if (isLoading) {
    return (
      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>Top Products</h3>
        <div>Loading top products...</div>
      </div>
    );
  }

  if (matchedProducts.length === 0) {
    return (
      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>Top Products</h3>
        <div className={styles.list}>
          <p>No top products found</p>
          {/* Show placeholder products */}
          {products.map((item, index) => (
            <div key={index} className={styles.row}>
              <span className={styles.name}>{item.name}</span>
              <div className={styles.imageContainer}>
                <img
                  src="/placeholder.png"
                  alt={item.name}
                  className={styles.imageStyle}
                />
                <div className={styles.dots}>
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.dot} ${
                        i < item.rating ? styles.active : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Top Products</h3>
      <div className={styles.list}>
        {(matchedProducts ?? []).map((item, index) => {
          if (!item) return null;

          return (
            <div key={index} className={styles.row}>
              <span className={styles.name}>
                {item.productName ?? "Unnamed Product"}
              </span>
              <div className={styles.imageContainer}>
                <img
                  src={item?.imageUrl ?? "/placeholder.png"}
                  alt={item.productName ?? "product"}
                  className={styles.imageStyle}
                />
                <div className={styles.dots}>
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.dot} ${
                        i < (item.rating || 3) ? styles.active : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;