import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import DataFormUpdate from "../forms/DataFormUpdate";

const DataBox = ({ oneData, readAllData, typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [isFormVisible, setFormVisibility] = useState(false);

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

  // CREATE NEW DATA FORM VISIBILITY
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleCloseForm = () => {
    setFormVisibility(false);
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
        <button type="button" onClick={handleShowForm}>
          <p>u</p>
        </button>

        {isFormVisible && (
          <div className="data-form-overlay">
            <div className="data-form">
              <DataFormUpdate oneData={oneData} typeProp={typeProp} />
              <button onClick={handleCloseForm}>Close</button>
            </div>
          </div>
        )}
      </td>

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
