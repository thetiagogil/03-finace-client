import "./DashboardPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const DashboardPage = () => {
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

  // SUB CATEGORY ARRAY
  const subCategoryArray = (category) => {
    let subCatArray = [];

    data.map((oneData) => {
      if (
        !subCatArray.includes(oneData.subCategory) &&
        oneData.category === category
      ) {
        subCatArray.push(oneData.subCategory);
      }
    });

    return subCatArray;
  };

  // CALCULATIONS
  const calculateSubCategoryValues = (subcategory) => {
    const trackedFilteredData = data
      .filter((oneData) => oneData.type === "Tracked")
      .filter((oneData) => oneData.subCategory === subcategory);

    const plannedFilteredData = data
      .filter((oneData) => oneData.type === "Planned")
      .filter((oneData) => oneData.subCategory === subcategory);

    const trackedSum = trackedFilteredData.reduce(
      (sum, entry) => sum + entry.value,
      0
    );
    const plannedSum = plannedFilteredData.reduce(
      (sum, entry) => sum + entry.value,
      0
    );

    const percentCompletion =
      plannedSum !== 0 ? (trackedSum / plannedSum) * 100 : 0;
    const remaining = plannedSum - trackedSum < 0 ? 0 : plannedSum - trackedSum;
    const excess = trackedSum - plannedSum < 0 ? 0 : trackedSum - plannedSum;

    return {
      trackedSum,
      plannedSum,
      percentCompletion,
      remaining,
      excess,
    };
  };

  const calculateTotalValues = (category) => {
    const subcategories = subCategoryArray(category);

    let totalTrackedSum = 0;
    let totalPlannedSum = 0;
    let totalPercentCompletion = 0;
    let totalRemaining = 0;
    let totalExcess = 0;

    subcategories.forEach((subcategory) => {
      const { trackedSum, plannedSum, percentCompletion, remaining, excess } =
        calculateSubCategoryValues(subcategory);

      totalTrackedSum += trackedSum;
      totalPlannedSum += plannedSum;
      totalPercentCompletion += percentCompletion;
      totalRemaining += remaining;
      totalExcess += excess;
    });

    const avgPercentCompletion =
      subcategories.length !== 0
        ? totalPercentCompletion / subcategories.length
        : 0;

    return {
      totalTrackedSum,
      totalPlannedSum,
      avgPercentCompletion,
      totalRemaining,
      totalExcess,
    };
  };

  // EFFECT TO FETCH DATA
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <div className="dash-box">
        <div className="dash-table-box">
          <h2>Breakdown</h2>

          <div className="dash-table">
            <table className="dash-table-income">
              <thead>
                <tr>
                  <th>Incomes</th>
                  <th>Tracked</th>
                  <th>Planned</th>
                  <th>% Compl.</th>
                  <th>Remaining</th>
                  <th>Excess</th>
                </tr>
              </thead>

              <tbody>
                {subCategoryArray("Income").map((oneSubCat, indexSubCat) => {
                  const {
                    trackedSum,
                    plannedSum,
                    percentCompletion,
                    remaining,
                    excess,
                  } = calculateSubCategoryValues(oneSubCat);

                  return (
                    <tr key={indexSubCat}>
                      <td>{oneSubCat}</td>
                      <td>{trackedSum} €</td>
                      <td>{plannedSum} €</td>
                      <td>{percentCompletion.toFixed(0)} %</td>
                      <td>{remaining} €</td>
                      <td>{excess} €</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Total</td>
                  <td>{calculateTotalValues("Income").totalTrackedSum} €</td>
                  <td>{calculateTotalValues("Income").totalPlannedSum} €</td>
                  <td>
                    {calculateTotalValues(
                      "Income"
                    ).avgPercentCompletion.toFixed(0)}{" "}
                    %
                  </td>
                  <td>{calculateTotalValues("Income").totalRemaining} €</td>
                  <td>{calculateTotalValues("Income").totalExcess} €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="dash-table">
            <table className="dash-table-expense">
              <thead>
                <tr>
                  <th>Expenses</th>
                  <th>Tracked</th>
                  <th>Planned</th>
                  <th>% Compl.</th>
                  <th>Remaining</th>
                  <th>Excess</th>
                </tr>
              </thead>

              <tbody>
                {subCategoryArray("Expense").map((oneSubCat, indexSubCat) => {
                  const {
                    trackedSum,
                    plannedSum,
                    percentCompletion,
                    remaining,
                    excess,
                  } = calculateSubCategoryValues(oneSubCat);

                  return (
                    <tr key={indexSubCat}>
                      <td>{oneSubCat}</td>
                      <td>{trackedSum} €</td>
                      <td>{plannedSum} €</td>
                      <td>{percentCompletion.toFixed(0)} %</td>
                      <td>{remaining} €</td>
                      <td>{excess} €</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Total</td>
                  <td>{calculateTotalValues("Expense").totalTrackedSum} €</td>
                  <td>{calculateTotalValues("Expense").totalPlannedSum} €</td>
                  <td>
                    {calculateTotalValues(
                      "Expense"
                    ).avgPercentCompletion.toFixed(0)}{" "}
                    %
                  </td>
                  <td>{calculateTotalValues("Expense").totalRemaining} €</td>
                  <td>{calculateTotalValues("Expense").totalExcess} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-summary-box">
          <h2>Summary</h2>

          <div className="dash-summary">
            <div className="dash-summary-category-chart">
              <div className="dash-summary-income-chart"></div>
              <div className="dash-summary-expense-chart"></div>
            </div>

            <div className="dash-summary-type-chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
