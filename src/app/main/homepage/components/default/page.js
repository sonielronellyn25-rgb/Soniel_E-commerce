import ProductData from "../data-table/data-table";
import data from "./data.json";

export default function ProductTable() {
    return (
        <>
            <ProductData items={data} />
        </>
    );
}