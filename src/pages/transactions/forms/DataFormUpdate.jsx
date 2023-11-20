import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import DataFormText from "./DataFormText";

const DataFormUpdate = ({ oneData, typeProp, handleCloseForm }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // UPDATE DATA
  const [updatedCategory, setUpdatedCategory] = useState(oneData.category);
  const [updatedSubCategory, setUpdatedSubCategory] = useState(
    oneData.subCategory
  );
  const [updatedValue, setUpdatedValue] = useState(oneData.value);
  const [updatedCurrency, setUpdatedCurrency] = useState(oneData.currency);
  const [updatedDate, setUpdatedDate] = useState(new Date(oneData.date));
  const [updatedDescription, setUpdatedDescription] = useState(
    oneData.description
  );

  console.log("oneData.date:", oneData.date);

  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

  const updatedPayload = {
    type: `${typeUpperCase}`,
    category: updatedCategory,
    subCategory: updatedSubCategory,
    value: updatedValue,
    currency: updatedCurrency,
    date: updatedDate,
    description: updatedDescription,
    user: `${currentUser}`,
  };

  const updateData = async () => {
    try {
      if (currentUser) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/data/${oneData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPayload),
          }
        );
        if (response.ok) {
          await response.json();
          readAllData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (<DataFormText
    formType="Update"
    handleCloseForm={handleCloseForm}
    category={updatedCategory}
    subCategory={updatedSubCategory}
    value={updatedValue}
    currency={updatedCurrency}
    date={updatedDate}
    description={updatedDescription}
    setCategory={setUpdatedCategory}
    setSubCategory={setUpdatedSubCategory}
    setValue={setUpdatedValue}
    setCurrency={setUpdatedCurrency}
    setDate={setUpdatedDate}
    setDescription={setUpdatedDescription}
    functionType={updateData} />
  );
};

export default DataFormUpdate;
