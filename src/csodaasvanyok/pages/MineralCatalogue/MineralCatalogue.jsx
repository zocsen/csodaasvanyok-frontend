import { useData } from "../../../hooks/dataContext";
import ProductMinerals from "../../components/ProductMinerals/ProductMinerals";

export default function MineralCatalogue() {
  const { allMinerals } = useData();

  if (!allMinerals) return null;
  console.log(allMinerals);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          padding: "60px 0 40px",
          fontSize: "3rem",
        }}
      >
        Ásvány Katalógus
      </h1>
      <ProductMinerals product={allMinerals} />
    </>
  );
}
