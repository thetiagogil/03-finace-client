import "./TransactionsPage.css";
import "./forms/DataForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "./forms/DataFormDatepicker.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DataBox from "./components/DataBox";
import DataFormCreate from "./forms/DataFormCreate";

const TransactionsPage = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [isFormVisible, setFormVisibility] = useState(false);
  const [hasData, setHasData] = useState(false);

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
          setHasData(allData.length > 0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER DATA
  const dataFiltered = () => {
    const type = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);
    const category = selectedCategory;
    const year = parseInt(selectedYear);
    const month = selectedMonth;

    const filteredData = data.filter((element) => {
      const elementYear = new Date(element.date).getFullYear();
      const elementMonth = monthsArray[new Date(element.date).getMonth()];

      return (
        (!type || element.type === type) &&
        (!category || element.category === category) &&
        (!year || elementYear === year) &&
        (!month || elementMonth === month)
      );
    });

    return filteredData;
  };

  // FILTER DATA BY CATEGORY
  const filterByCategory = () => {
    let catArray = [];
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    data.map((oneData) => {
      if (
        !catArray.includes(oneData.category) &&
        oneData.type === typeUpperCase
      ) {
        catArray.push(oneData.category);
      }
    });

    return catArray;
  };

  // FILTER DATA BY YEARS
  const filterByYears = () => {
    let yearsArray = [];
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    data.map((oneData) => {
      const year = new Date(oneData.date).getFullYear();
      if (!yearsArray.includes(year) && oneData.type === typeUpperCase) {
        yearsArray.push(year);
      }
    });

    yearsArray.sort();

    return yearsArray;
  };

  // FILTER DATA BY MONTHS
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

  // CREATE NEW DATA FORM VISIBILITY
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleCloseForm = () => {
    setFormVisibility(false);
  };

  // HANDLE IF HAS DATA
  const handleHasData = () => {
    return data.length > 0;
  };

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      {/* SELECT FOR YEARS*/}
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

      {/* SELECT FOR MONTH */}
      <select
        onChange={(event) => setSelectedMonth(event.target.value)}
        value={selectedMonth}
      >
        <option value="">Select a month</option>
        {monthsArray.map((month) => {
          return (
            <option key={month} value={month}>
              {month}
            </option>
          );
        })}
      </select>

      {/* SELECT FOR CATEGORY */}
      <select
        onChange={(event) => setSelectedCategory(event.target.value)}
        value={selectedCategory}
      >
        <option value="">Select a category</option>
        {filterByCategory().map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* CREATE DATA FORM */}
      <button onClick={handleShowForm}>Create New Data</button>

      {isFormVisible && (
        <div className="data-form-overlay">
          <div className="data-form">
            <DataFormCreate data={data} typeProp={typeProp} />
            <button onClick={handleCloseForm}>Close</button>
          </div>
        </div>
      )}

      {/* DATA TABLE */}
      {!handleHasData() && (
        <p className="tran-table-noData">there is no data created</p>
      )}
      {handleHasData() && !dataFiltered().length > 0 && (
        <p className="tran-table-noData">there is no matching data</p>
      )}
      {handleHasData() && dataFiltered().length > 0 && (
        <table className="tran-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Value</th>
              <th>Description</th>
              <th></th>
              <th></th>
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
      )}
    </div>
  );
};

export default TransactionsPage;
