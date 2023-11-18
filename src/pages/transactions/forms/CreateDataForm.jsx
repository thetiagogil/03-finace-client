import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const CreateDataForm = ({ typeProp }) => {
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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={createData} className="create-data-form-content">
      <div>
        <h2>Create Data</h2>
      </div>

      <div>
        <label>
          <p>Category:</p>
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>

        <label>
          <p>Sub Category:</p>
          <input
            type="text"
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
          />
        </label>

        <label>
          <p>Value:</p>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label>
          <p>Year:</p>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>

        <label>
          <p>Month:</p>
          <input
            type="text"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          />
        </label>
      </div>

      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateDataForm;
