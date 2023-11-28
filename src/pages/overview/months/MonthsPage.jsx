import "./MonthsPage.css";
import MonthsPageLineChart from "./MonthsPageLineChart";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const MonthsPage = ({ typeProp }) => {
  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);
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

  // CALCULATE YEAR TOTAL
  const calculateYearTotal = () => {
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

  // FILTER BY MONTH AND SUM VALUES
  const filterByMonth = (month) => {
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

  // FILTER BY CATEGORY AND SUM
  const filterByCategory = (month, category) => {
    const filteredData = data
      .filter((oneData) => oneData.type === typeUpperCase)
      .filter(
        (oneData) => new Date(oneData.date).getFullYear() === parseInt(year)
      )
      .filter(
        (oneData) => monthsArray[new Date(oneData.date).getMonth()] === month
      )
      .filter((oneData) => oneData.category === category);

    const filteredDataSum = filteredData.reduce(
      (sum, oneData) => sum + oneData.value,
      0
    );

    return filteredDataSum;
  };

  // FILTER BY SUB CATEGORY AND SUM
  const filterBySubCategory = (month, subCategory, category) => {
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

  const [lineChartData, setLineChartData] = useState({
    labels: monthsArrayShort,
    datasets: [
      {
        label: `${year} Monthly ${typeUpperCase} Values`,
        data: monthsArray.map((month) => filterByMonth(month)),
      },
    ],
  });

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
    if (dataLoaded) {
      setLineChartData({
        labels: monthsArrayShort,
        datasets: [
          {
            label: `${year} Monthly ${typeUpperCase} Values`,
            data: monthsArray.map((month) => filterByMonth(month)),
          },
        ],
      });
    }
  }, [currentUser, dataLoaded, typeProp]);

  return (
    <div className="container">
      <div className="over-info-box">
        <div className="over-info">
          <h1>{year}</h1>
        </div>

        <div className="over-info-chart">
          <MonthsPageLineChart chartData={lineChartData} />
        </div>
      </div>

      <div className="over-table-box">
        {subCategoryArray("Income").length > 0 && (
          <div className="over-table">
            {/* INCOME TABLE */}
            <table className="over-table-incomes">
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
                        {filterBySubCategory(oneMonth, oneSubCat, "Income")} €
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td>Total</td>
                  {monthsArray.map((oneMonth, indexMonth) => (
                    <td key={indexMonth}>
                      {filterByCategory(oneMonth, "Income")} €
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {subCategoryArray("Expense").length > 0 && (
          <div className="over-table">
            {/* EXPENSE TABLE */}
            <table className="over-table-expenses">
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
                        {filterBySubCategory(oneMonth, oneSubCat, "Expense")} €
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td>Total</td>
                  {monthsArray.map((oneMonth, indexMonth) => (
                    <td key={indexMonth}>
                      {filterByCategory(oneMonth, "Expense")} €
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthsPage;
