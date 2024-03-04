"use client";
import { useState, useMemo, useEffect } from "react";
import Card from "./Card";
import Select from "./CustomSelect";

const sortOptions = [
  { label: "Most popular", value: "popular" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "Price: Low to High", value: "price-low-to-high" },
];

function Products({ data }) {
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState();

  const handleSelectChange = (event) => {
    setSortBy(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, [sortBy]);

  const sortedProducts = useMemo(() => {
    if (data) {
      const sortedData = [...data];

      switch (sortBy) {
        case "popular":
          return sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
        case "best-selling":
          return sortedData.sort((a, b) => b.rating.count - a.rating.count); //sold
        case "price-low-to-high":
          return sortedData.sort((a, b) => a.price - b.price);
        default:
          return sortedData;
      }
    }
  }, [data, sortBy]);

  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="w-[195px] h-[37px]">
          <Select
            value={sortBy}
            options={sortOptions}
            onChange={handleSelectChange}
            isDisabled={data ? false : true}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-[30px] border-t-[1px] border-[rgba(0,0,0,0.5)] pt-10 mt-[2.69rem] ml-[70px]">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          sortedProducts.map((el) => <Card key={el.id} {...el} />)
        )}
      </div>
    </div>
  );
}

export default Products;
