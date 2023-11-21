import "./TransactionsPage.css";
import "./forms/DataForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "./forms/DataFormDatepicker.css";
import crossIcon from "../../assets/icon-plus.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DataBox from "./components/DataBox";
import DataFormCreate from "./forms/DataFormCreate";

const TransactionsPage = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [sortOrderByDate, setSortOrderByDate] = useState("asc");
  const [sortOrderByValue, setSortOrderByValue] = useState("asc");

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
    const year = parseInt(selectedYear);
    const month = selectedMonth;
    const category = selectedCategory;
    const subCategory = selectedSubCategory;

    const filteredData = data.filter((element) => {
      const elementYear = new Date(element.date).getFullYear();
      const elementMonth = monthsArray[new Date(element.date).getMonth()];

      return (
        (!type || element.type === type) &&
        (!year || elementYear === year) &&
        (!month || elementMonth === month) &&
        (!category || element.category === category) &&
        (!subCategory || element.subCategory === subCategory)
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

  // FILTER DATA BY YEARS
  const filterBySubCategory = () => {
    let subCatArray = [];
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    data.map((oneData) => {
      if (
        !subCatArray.includes(oneData.subCategory) &&
        oneData.type === typeUpperCase
      ) {
        subCatArray.push(oneData.subCategory);
      }
    });

    return subCatArray;
  };

  // SORT DATA BY DATE
  const sortByDate = () => {
    const orderMultiplier = sortOrderByDate === "asc" ? 1 : -1;

    const sortedData = [...dataFiltered()];
    sortedData.sort((a, b) => {
      return orderMultiplier * (new Date(a.date) - new Date(b.date));
    });

    setData(sortedData);
    setSortOrderByDate(sortOrderByDate === "asc" ? "desc" : "asc");
  };

  // SORT DATA BY VALUE
  const sortByValue = () => {
    const orderMultiplier = sortOrderByValue === "asc" ? 1 : -1;

    const sortedData = [...dataFiltered()];
    sortedData.sort((a, b) => {
      return orderMultiplier * (a.value - b.value);
    });

    setData(sortedData);
    setSortOrderByValue(sortOrderByValue === "asc" ? "desc" : "asc");
  };

  // CREATE NEW DATA FORM VISIBILITY
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleCloseForm = () => {
    setFormVisibility(false);
  };

  // HANDLE IF DATA EXISTS
  const handleDataExists = () => {
    return data.length > 0;
  };

  // TRANSFORM DATE TO DECENT FORMAT
  const date = new Date().toLocaleDateString();

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <div className="tran-box-info">
        <section>
          <p>Date of today</p>
          <p>{date}</p>
        </section>

        <section>
          <p>Date of today</p>
          <p>{date}</p>
        </section>

        <section>
          <p>Nº of {typeProp} data</p>
          <p>{dataFiltered().length}</p>
        </section>
      </div>

      <div className="tran-box-management">
        <section></section>
        <section>
          {/* SELECT FOR YEARS*/}
          <select
            onChange={(event) => setSelectedYear(event.target.value)}
            value={selectedYear}
          >
            <option value="">Filter by year</option>
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
            <option value="">Filter by month</option>
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
            <option value="">Filter by category</option>
            {filterByCategory().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* SELECT FOR CATEGORY */}
          <select
            onChange={(event) => setSelectedSubCategory(event.target.value)}
            value={selectedSubCategory}
          >
            <option value="">Filter by Sub Category</option>
            {filterBySubCategory().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </section>

        {/* CREATE DATA FORM */}
        <section>
          <button onClick={handleShowForm}>
            <img src={crossIcon} />
          </button>
        </section>
      </div>

      <div>
        {isFormVisible && (
          <div className="data-form-overlay">
            <DataFormCreate
              data={data}
              typeProp={typeProp}
              handleCloseForm={handleCloseForm}
            />
          </div>
        )}
      </div>

      <div className="tran-box-table">
        {/* DATA TABLE */}
        {!handleDataExists() && (
          <p className="tran-table-noData">there is no data created</p>
        )}
        {handleDataExists() && !dataFiltered().length > 0 && (
          <p className="tran-table-noData">there is no matching data</p>
        )}
        {handleDataExists() && dataFiltered().length > 0 && (
          <table className="tran-table">
            <thead>
              <tr>
                <th>
                  Date{" "}
                  <button onClick={sortByDate}>
                    {sortOrderByDate === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>
                  Value{" "}
                  <button onClick={sortByValue}>
                    {sortOrderByValue === "asc" ? "▲" : "▼"}
                  </button>
                </th>

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
    </div>
  );
};

export default TransactionsPage;
