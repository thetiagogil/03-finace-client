import "./datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ReactDatePicker from "react-datepicker";

const DataFormCreate = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // CREATE DATA
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

  const payload = {
    type: `${typeUpperCase}`,
    category,
    subCategory,
    value,
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

  // DATE FORMATATION
  const formatDate = (date) => {
    // ENSURE THE DATE INPUT IS VALID
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    // FORMAT DATE AS "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // CATEGORY ARRAY
  const categoriesArray = ["Income", "Expense"];

  return (
    <form className="data-form-content">
      <div>
        <h2>Create Data</h2>
      </div>

      <div>
        <label>
          <p>Date:</p>
          <ReactDatePicker
            selected={new Date(date)}
            onChange={(date) => setDate(date)}
            required
          />
        </label>

        <label>
          <p>Category:</p>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="">Select a category</option>
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
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
            placeholder="subcategory"
            required
          />
        </label>

        <label>
          <p>Value:</p>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </label>

        <label>
          <p>Description:</p>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          onClick={() => {
            createData();
          }}
          className="data-form-button-create"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default DataFormCreate;
