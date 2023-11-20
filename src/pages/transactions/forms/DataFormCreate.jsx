import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import DataFormText from "./DataFormText";

const DataFormCreate = ({ typeProp, handleCloseForm }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // CREATE DATA
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

  const payload = {
    type: `${typeUpperCase}`,
    category,
    subCategory,
    value,
    currency,
    date,
    description,
    user: `${currentUser}`,
  };

  const createData = async () => {
    try {
      if (currentUser) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <DataFormText
  formType="Create"
  handleCloseForm={handleCloseForm}
  category={category}
  subCategory={subCategory}
  value={value}
  currency={currency}
  date={date}
  description={description}
  setCategory={setCategory}
  setSubCategory={setSubCategory}
  setValue={setValue}
  setCurrency={setCurrency}
  setDate={setDate}
  setDescription={setDescription}
  functionType={createData} />;
};

export default DataFormCreate;
