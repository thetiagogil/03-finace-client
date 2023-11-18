import "./forms/CreateDataForm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DataBox from "./DataBox";
import CreateDataForm from "./forms/CreateDataForm";

const TransactionsPage = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [isFormVisible, setFormVisibility] = useState(false);

  // READ DATA
  const readAllData = async () => {
    try {
      if (currentUser) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/data/${currentUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const allData = await response.json();
          setData(allData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER DATA BY TYPE
  const filterByType = () => {
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);
    const dataFilteredByType = data.filter((element) => {
      return element.type === typeUpperCase;
    });

    return dataFilteredByType;
  };

  // CREATE NEW DATA FORM VISIBILITY
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleCloseForm = () => {
    setFormVisibility(false);
  };

  // USE EFFECT
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <button onClick={handleShowForm}>Create New Data</button>

      {isFormVisible && (
        <div className="create-data-form-overlay">
          <div className="create-data-form">
            <CreateDataForm typeProp={typeProp} />
            <button onClick={handleCloseForm}>Close</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Type</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {filterByType().map((oneData, index) => (
            <tr key={index}>
              <DataBox
                key={index}
                oneData={oneData}
                readAllData={readAllData}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
