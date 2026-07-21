import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

export default function RelatedProducts({ category, subCategory, id }) {
  const { products } = useContext(ShopContext);

  const related = products
    .filter((item) => category === item.category)
    .filter((item) => subCategory === item.subCategory)
    .filter((item) => item._id !== id)
    .slice(0, 5);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            tag={item.tag}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}


