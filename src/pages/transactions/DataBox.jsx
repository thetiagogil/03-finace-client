import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const DataBox = ({ oneData, readAllData }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // UPDATE DATA
  const [updatedType, setUpdatedType] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [updatedValue, setUpdatedValue] = useState(0);
  const [updatedYear, setUpdatedYear] = useState(0);
  const [updatedMonth, setUpdatedMonth] = useState("");

  const updatedPayload = {
    type: updatedType,
    category: updatedCategory,
    subCategory: updatedSubCategory,
    value: updatedValue,
    year: updatedYear,
    month: updatedMonth,
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

  // DELETE DATA
  const deleteData = async () => {
    try {
      if (currentUser) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/data/${oneData._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          readAllData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <td>{oneData.month}</td>
      <td>{oneData.year}</td>
      <td>{oneData.type}</td>
      <td>{oneData.category}</td>
      <td>{oneData.subCategory}</td>
      <td>{oneData.value}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            deleteData(oneData);
          }}
        >
          <p>x</p>
        </button>
      </td>
    </>
  );
};

export default DataBox;
