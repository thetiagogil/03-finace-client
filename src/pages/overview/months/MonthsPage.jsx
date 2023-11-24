import "./MonthsPage.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const MonthsPage = ({ typeProp }) => {
  const { year } = useParams();

  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // FETCH DATA
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
          setDataLoaded(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CALCULATE YEAR TOTAL
  const calculateYearTotal = () => {
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    const filteredData = data.filter(
      (oneData) =>
        oneData.type === typeUpperCase &&
        new Date(oneData.date).getFullYear() === parseInt(year)
    );

    const totalIncome = filteredData
      .filter((oneData) => oneData.category === "Income")
      .reduce((sum, oneData) => {
        return sum + oneData.value;
      }, 0);

    const totalExpense = filteredData
      .filter((oneData) => oneData.category === "Expense")
      .reduce((sum, oneData) => {
        return sum + oneData.value;
      }, 0);

    const total = totalIncome - totalExpense;

    return total;
  };

  // FILTER BY MONTH
  const filterByMonth = (month) => {
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    const filteredData = data
      .filter((oneData) => oneData.type === typeUpperCase)
      .filter(
        (oneData) => new Date(oneData.date).getFullYear() === parseInt(year)
      )
      .filter(
        (oneData) => monthsArray[new Date(oneData.date).getMonth()] === month
      );

    const filteredDataSum = filteredData.reduce((sum, oneData) => {
      return (
        sum + (oneData.category === "Income" ? +oneData.value : -oneData.value)
      );
    }, 0);

    return filteredDataSum;
  };

  // FILTER BY SUB CATEGORY
  const filterBySubCategory = (month, subCategory, category) => {
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    const filteredData = data
      .filter((oneData) => oneData.type === typeUpperCase)
      .filter(
        (oneData) => new Date(oneData.date).getFullYear() === parseInt(year)
      )
      .filter(
        (oneData) => monthsArray[new Date(oneData.date).getMonth()] === month
      )
      .filter((oneData) => oneData.category === category)
      .filter((oneData) => oneData.subCategory === subCategory);

    const filteredDataSum = filteredData.reduce(
      (sum, oneData) => sum + oneData.value,
      0
    );

    return filteredDataSum;
  };

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

  const monthsArrayShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // SUB CATEGORY ARRAY
  const subCategoryArray = (category) => {
    let subCatArray = [];
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

    data.map((oneData) => {
      if (
        !subCatArray.includes(oneData.subCategory) &&
        oneData.type === typeUpperCase &&
        oneData.category === category
      ) {
        subCatArray.push(oneData.subCategory);
      }
    });

    return subCatArray;
  };

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container over-monthsTables table th">
      <h1>{year}</h1>

      {/* TOTALS TABLE */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Year Total</th>

              {monthsArrayShort.map((oneMonth, index) => (
                <th key={index}>{oneMonth}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{calculateYearTotal()} €</td>

              {monthsArray.map((oneMonth, indexMonth) => (
                <td key={indexMonth}>{filterByMonth(oneMonth)} €</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* INCOMES TABLE */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Incomes</th>
              {monthsArrayShort.map((oneMonth, index) => (
                <th key={index}>{oneMonth}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {subCategoryArray("Income").map((oneSubCat, indexSubCat) => (
              <tr key={indexSubCat}>
                <td>{oneSubCat}</td>

                {monthsArray.map((oneMonth, indexMonth) => (
                  <td key={indexMonth}>
                    {filterBySubCategory(oneMonth, oneSubCat, "Income") !== 0
                      ? `${filterBySubCategory(
                          oneMonth,
                          oneSubCat,
                          "Income"
                        )} €`
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EXPENSES TABLE */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Expenses</th>
              {monthsArrayShort.map((oneMonth, index) => (
                <th key={index}>{oneMonth}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {subCategoryArray("Expense").map((oneSubCat, indexSubCat) => (
              <tr key={indexSubCat}>
                <td>{oneSubCat}</td>

                {monthsArray.map((oneMonth, indexMonth) => (
                  <td key={indexMonth}>
                    {filterBySubCategory(oneMonth, oneSubCat, "Expense") !== 0
                      ? `${filterBySubCategory(
                          oneMonth,
                          oneSubCat,
                          "Expense"
                        )} €`
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthsPage;
