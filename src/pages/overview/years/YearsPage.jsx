import "./YearsPage.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const YearsPage = ({ pageProp, typeProp }) => {
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

  // FILTER DATA BY YEARS
  const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);

  const filterByYears = () => {
    let yearsArray = [];

    data.map((oneData) => {
      const year = new Date(oneData.date).getFullYear();
      if (!yearsArray.includes(year) && oneData.type === typeUpperCase) {
        yearsArray.push(year);
      }
    });

    yearsArray.sort();

    return yearsArray;
  };

  // CALCULATE TOTAL INCOME, EXPENSE, AND NUMBER OF DATA
  const calculateYearlyStats = (year) => {
    const filteredData = data.filter(
      (oneData) =>
        new Date(oneData.date).getFullYear() === year &&
        oneData.type === typeUpperCase
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

    const numberOfData = filteredData.length;

    return { totalIncome, totalExpense, numberOfData };
  };

  // USE EFFECT
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <div className="over-yearsBox">
        {dataLoaded &&
          filterByYears().map((oneYear, index) => (
            <Link to={`/${pageProp}/${typeProp}/${oneYear}`} key={index}>
              <div className="over-oneYearBox">
                <h3>{oneYear}</h3>
                <p>
                  Total Income: {calculateYearlyStats(oneYear).totalIncome} €
                </p>
                <p>
                  Total Expense: {calculateYearlyStats(oneYear).totalExpense} €
                </p>
                <p>
                  {typeUpperCase} Data Count:{" "}
                  {calculateYearlyStats(oneYear).numberOfData}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default YearsPage;
