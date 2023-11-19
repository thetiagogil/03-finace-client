import "./forms/DataForm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DataBox from "./components/DataBox";
import DataFormCreate from "./forms/DataFormCreate";

const TransactionsPage = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(0);

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

  // FILTER DATA
  const dataFiltered = () => {
    const type = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);
    const year = parseInt(selectedYear);

    const filteredData = data.filter(
      (element) => element.type === type && (!year || element.year === year)
    );

    return filteredData;
  };

  // FILTER DATA BY YEARS
  const filterByYears = () => {
    let yearsArray = [];
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    data.map((oneData) => {
      if (
        !yearsArray.includes(oneData.year) &&
        oneData.type === typeUpperCase
      ) {
        yearsArray.push(oneData.year);
      }
    });

    yearsArray.sort();

    return yearsArray;
  };

  // CREATE NEW DATA FORM VISIBILITY
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleCloseForm = () => {
    setFormVisibility(false);
  };

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <select
        onChange={(event) => setSelectedYear(event.target.value)}
        value={selectedYear}
      >
        <option value="">Select an year</option>
        {filterByYears().map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button onClick={handleShowForm}>Create New Data</button>

      {isFormVisible && (
        <div className="data-form-overlay">
          <div className="data-form">
            <DataFormCreate data={data} typeProp={typeProp} />
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
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {dataFiltered().map((oneData, index) => (
            <tr key={index}>
              <DataBox
                key={index}
                oneData={oneData}
                readAllData={readAllData}
                typeProp={typeProp}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
