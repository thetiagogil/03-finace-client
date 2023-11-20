import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ReactDatePicker from "react-datepicker";

const DataFormUpdate = ({ oneData, typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // UPDATE DATA
  const [updatedCategory, setUpdatedCategory] = useState(oneData.category);
  const [updatedSubCategory, setUpdatedSubCategory] = useState(
    oneData.subCategory
  );
  const [updatedValue, setUpdatedValue] = useState(oneData.value);
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

  // CATEGORY ARRAY *this needs to be changed if new categories are added*
  const categoriesArray = ["Income", "Expense"];

  return (
    <form className="data-form-content">
      <div>
        <h2>Update Data</h2>
      </div>

      <div>
        <label>
          <p>Date:</p>
          <ReactDatePicker
            selected={new Date(updatedDate)}
            onChange={(date) => setUpdatedDate(date)}
            required
          />
        </label>

        <label>
          <p>Category:</p>
          <select
            value={updatedCategory}
            onChange={(event) => setUpdatedCategory(event.target.value)}
            required
          >
            <option value="">Select an item</option>
            {categoriesArray.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Sub Category:</p>
          <input
            type="text"
            value={updatedSubCategory}
            onChange={(event) => setUpdatedSubCategory(event.target.value)}
            placeholder="subcategory"
          />
        </label>

        <label>
          <p>Value:</p>
          <input
            type="number"
            value={updatedValue}
            onChange={(event) => setUpdatedValue(event.target.value)}
          />
        </label>

        <label>
          <p>Description:</p>
          <input
            type="text"
            value={updatedDescription}
            onChange={(event) => setUpdatedDescription(event.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          onClick={() => {
            updateData(oneData);
          }}
          className="data-form-button-create"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default DataFormUpdate;
