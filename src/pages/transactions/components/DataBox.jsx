import editIcon from "../../../assets/icon-edit.png";
import trashIcon from "../../../assets/icon-trash.png";
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

  // TRANSFORM DATE TO DECENT FORMAT
  const date = new Date(oneData.date).toLocaleDateString();

  return (
    <>
      <td>{date}</td>
      <td>{oneData.category}</td>
      <td>{oneData.subCategory}</td>
      <td>
        {oneData.value} {oneData.currency}
      </td>
      <td>{oneData.description}</td>

      <td>
        <button type="button" onClick={handleShowForm}>
          <img src={editIcon} />
        </button>
      </td>

      <td>
        <button
          type="button"
          onClick={() => {
            deleteData(oneData);
          }}
        >
          <img src={trashIcon} />
        </button>
      </td>

      {isFormVisible && (
        <div className="data-form-overlay">
          <DataFormUpdate
            oneData={oneData}
            typeProp={typeProp}
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}
    </>
  );
};

export default DataBox;
