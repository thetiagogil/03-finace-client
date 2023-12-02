import "./DashboardPage.css";
import DashboardPageDonutChart from "./DashboardPageDonutChart";
import DashboardPageBarChart from "./DashboardPageBarChart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const DashboardPage = () => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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

    data.map((oneData) => {
      if (
        !subCatArray.includes(oneData.subCategory) &&
        oneData.category === category &&
        new Date(oneData.date).getFullYear() === Number(selectedYear)
      ) {
        subCatArray.push(oneData.subCategory);
      }
    });

    return subCatArray;
  };

  // FILTER DATA BY YEARS
  const filterByYears = () => {
    let yearsArray = [];

    data.map((oneData) => {
      const year = new Date(oneData.date).getFullYear();
      if (!yearsArray.includes(year)) {
        yearsArray.push(year);
      }
    });

    yearsArray.sort();

    return yearsArray;
  };

  // FILTER BY MONTH AND SUM VALUES
  const filterByMonth = (month, category, type) => {
    const filteredData = data
      .filter(
        (oneData) =>
          new Date(oneData.date).getFullYear() === Number(selectedYear) &&
          monthsArray[new Date(oneData.date).getMonth()] === month
      )
      .filter(
        (oneData) => oneData.category === category && oneData.type === type
      );

    const filteredDataSum = filteredData.reduce(
      (sum, oneData) => sum + parseFloat(oneData.value),
      0
    );

    return filteredDataSum;
  };

  // CALCULATIONS
  // CALCULATE VALUES FOR A SUB CATEGORY
  const calculateSubCategoryValues = (subcategory) => {
    // first filter data array
    const trackedFilteredData = data
      .filter((oneData) => oneData.type === "Tracked")
      .filter((oneData) => oneData.subCategory === subcategory)
      .filter(
        (oneData) =>
          new Date(oneData.date).getFullYear() === Number(selectedYear)
      );

    const plannedFilteredData = data
      .filter((oneData) => oneData.type === "Planned")
      .filter((oneData) => oneData.subCategory === subcategory)
      .filter(
        (oneData) =>
          new Date(oneData.date).getFullYear() === Number(selectedYear)
      );

    // then reduce each filtered array
    const trackedSum = trackedFilteredData.reduce(
      (sum, entry) => sum + entry.value,
      0
    );
    const plannedSum = plannedFilteredData.reduce(
      (sum, entry) => sum + entry.value,
      0
    );

    // then make the calculations you need
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

  // CALCULATE TOTAL VALUES FOR ALL SUB CATEGORIES WITHIN A CATEGORY
  const calculateTotalValues = (subcategory) => {
    // get an array of subcategories for the specific category
    const subcategories = subCategoryArray(subcategory);

    // then initialize variables
    let totalTrackedSum = 0;
    let totalPlannedSum = 0;
    let totalPercentCompletion = 0;
    let totalRemaining = 0;
    let totalExcess = 0;

    // then filter out sub categories with zero tracked sum
    const subcategoriesFiltered = subcategories.filter(
      (subcategory) => calculateSubCategoryValues(subcategory).trackedSum !== 0
    );

    // iterate through filtered sub categories and sum totals
    subcategoriesFiltered.map((subcategory) => {
      const { trackedSum, plannedSum, percentCompletion, remaining, excess } =
        calculateSubCategoryValues(subcategory);

      totalTrackedSum += trackedSum;
      totalPlannedSum += plannedSum;
      totalPercentCompletion += percentCompletion;
      totalRemaining += remaining;
      totalExcess += excess;
    });

    // calculate average percentage
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

  // CALCULATE THE TOP 4 SUB CATEGORIES
  const calculateTopSubcategories = (category) => {
    const subcategories = subCategoryArray(category);

    // Sort subcategories based on total tracked sum
    const sortedSubcategories = subcategories.sort((a, b) => {
      const totalSumA = calculateSubCategoryValues(a).trackedSum;
      const totalSumB = calculateSubCategoryValues(b).trackedSum;
      return totalSumB - totalSumA;
    });

    // Get the top 4 subcategories
    const topSubcategories = sortedSubcategories
      .slice(0, 4)
      .map((subcategory) => ({
        subcategory,
        totalSum: calculateSubCategoryValues(subcategory).trackedSum,
      }));

    return topSubcategories;
  };

  // CALCULATE THE OTHER SUB CATEGORIES
  const calculateSumOfOtherCategories = (category) => {
    const allSubcategories = subCategoryArray(category);
    const topSubcategories = calculateTopSubcategories(category).map(
      (item) => item.subcategory
    );

    const otherSubcategories = allSubcategories.filter(
      (subcategory) => !topSubcategories.includes(subcategory)
    );

    const sumOfOther = otherSubcategories.reduce(
      (sum, subcategory) =>
        sum + calculateSubCategoryValues(subcategory).trackedSum,
      0
    );

    return sumOfOther;
  };

  console.log(calculateTopSubcategories("Income"));

  // INCOME DONUT CHART
  const donutChartIncome = {
    labels: [
      ...calculateTopSubcategories("Income").map((item) => item.subcategory),
      "Other",
    ],
    datasets: [
      {
        data: [
          ...calculateTopSubcategories("Income").map((item) => item.totalSum),
          calculateSumOfOtherCategories("Income"),
        ],
        backgroundColor: [
          "rgb(20, 80, 140, 0.8)",
          "rgb(20, 80, 140, 0.6)",
          "rgb(20, 80, 140, 0.4)",
          "rgb(20, 80, 140, 0.2)",
          "rgb(0, 0, 0, 0.2)",
        ],
      },
    ],
  };

  const [donutChartIncomeData, setDonutChartIncomeData] =
    useState(donutChartIncome);

  // EXPENSE DONUT CHART
  const donutChartExpense = {
    labels: [
      ...calculateTopSubcategories("Expense").map((item) => item.subcategory),
      "Other",
    ],
    datasets: [
      {
        data: [
          ...calculateTopSubcategories("Expense").map((item) => item.totalSum),
          calculateSumOfOtherCategories("Expense"),
        ],
        backgroundColor: [
          "rgb(80, 20, 100, 0.8)",
          "rgb(80, 20, 100, 0.6)",
          "rgb(80, 20, 100, 0.4)",
          "rgb(80, 20, 100, 0.2)",
          "rgb(0, 0, 0, 0.2)",
        ],
      },
    ],
  };

  const [donutChartExpenseData, setDonutChartExpenseData] =
    useState(donutChartExpense);

  // BAR CHART
  const barChart = {
    labels: monthsArrayShort,
    datasets: [
      {
        label: "Income Tracked",
        data: monthsArray.map((month) =>
          filterByMonth(month, "Income", "Tracked")
        ),
        backgroundColor: "rgb(20, 80, 140, 0.6)",
      },
      {
        label: "Income Planned",
        data: monthsArray.map((month) =>
          filterByMonth(month, "Income", "Planned")
        ),
        backgroundColor: "rgb(20, 80, 140, 0.3)",
      },
      {
        label: "Expense Tracked",
        data: monthsArray.map((month) =>
          filterByMonth(month, "Expense", "Tracked")
        ),
        backgroundColor: "rgb(80, 20, 100, 0.6)",
      },
      {
        label: "Expense Planned",
        data: monthsArray.map((month) =>
          filterByMonth(month, "Expense", "Planned")
        ),
        backgroundColor: "rgb(80, 20, 100, 0.3)",
      },
    ],
  };

  const [barChartData, setBarChartData] = useState(barChart);

  // EFFECT TO FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      await readAllData();
      if (dataLoaded) {
        setBarChartData(barChart);
        setDonutChartIncomeData(donutChartIncome);
        setDonutChartExpenseData(donutChartExpense);
      }
    };

    fetchData();
  }, [currentUser, dataLoaded, Number(selectedYear), selectedMonth]);

  return (
    <div className="container">
      <div>
        <select
          value={Number(selectedYear)}
          onChange={(event) => setSelectedYear(event.target.value)}
        >
          {filterByYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
        >
          <option value="all">All Year</option>
          {monthsArray.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

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
                      <td>{trackedSum.toFixed(2)} €</td>
                      <td>{plannedSum.toFixed(2)} €</td>
                      <td>{percentCompletion.toFixed(0)} %</td>
                      <td>{remaining.toFixed(2)} €</td>
                      <td>{excess.toFixed(2)} €</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Total</td>
                  <td>
                    {calculateTotalValues("Income").totalTrackedSum.toFixed(2)}{" "}
                    €
                  </td>
                  <td>
                    {calculateTotalValues("Income").totalPlannedSum.toFixed(2)}{" "}
                    €
                  </td>
                  <td>
                    {calculateTotalValues(
                      "Income"
                    ).avgPercentCompletion.toFixed(0)}{" "}
                    %
                  </td>
                  <td>
                    {calculateTotalValues("Income").totalRemaining.toFixed(2)} €
                  </td>
                  <td>
                    {calculateTotalValues("Income").totalExcess.toFixed(2)} €
                  </td>
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
                      <td>{trackedSum.toFixed(2)} €</td>
                      <td>{plannedSum.toFixed(2)} €</td>
                      <td>{percentCompletion.toFixed(0)} %</td>
                      <td>{remaining.toFixed(2)} €</td>
                      <td>{excess.toFixed(2)} €</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Total</td>
                  <td>
                    {calculateTotalValues("Expense").totalTrackedSum.toFixed(2)}{" "}
                    €
                  </td>
                  <td>
                    {calculateTotalValues("Expense").totalPlannedSum.toFixed(2)}{" "}
                    €
                  </td>
                  <td>
                    {calculateTotalValues(
                      "Expense"
                    ).avgPercentCompletion.toFixed(0)}{" "}
                    %
                  </td>
                  <td>
                    {calculateTotalValues("Expense").totalRemaining.toFixed(2)}{" "}
                    €
                  </td>
                  <td>
                    {calculateTotalValues("Expense").totalExcess.toFixed(2)} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-summary-box">
          <h2>Summary</h2>

          <div className="dash-summary">
            <div className="dash-summary-category-chart">
              <div className="dash-summary-donut-chart">
                <DashboardPageDonutChart chartData={donutChartIncomeData} />
              </div>

              <div className="dash-summary-donut-chart">
                <DashboardPageDonutChart chartData={donutChartExpenseData} />
              </div>
            </div>

            <div className="dash-summary-bar-chart">
              <DashboardPageBarChart chartData={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
