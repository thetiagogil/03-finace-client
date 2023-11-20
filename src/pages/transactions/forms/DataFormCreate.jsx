import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const DataFormCreate = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  // CREATE DATA
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [value, setValue] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");

  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

  const payload = {
    type: `${typeUpperCase}`,
    category,
    subCategory,
    value,
    year,
    month,
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

  // CATEGORY ARRAY *this needs to be changed if new categories are added*
  const categoriesArray = ["Income", "Expense"];

  // MONTHS ARRAY
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <form className="data-form-content">
      <div>
        <h2>Create Data</h2>
      </div>

      <div>
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
          <p>Year:</p>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
        </label>

        <label>
          <p>Month:</p>
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            required
          >
            <option value="">Select a month</option>
            {monthsArray.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button
          type="submit"
          onClick={() => {
            createData();
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default DataFormCreate;
