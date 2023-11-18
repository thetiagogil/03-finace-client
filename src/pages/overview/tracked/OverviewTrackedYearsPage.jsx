import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const OverviewTrackedPage = () => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const fetchData = async () => {
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
          console.log(allData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const filterYears = () => {
    let yearsArray = [];

    data.forEach((oneData) => {
      if (!yearsArray.includes(oneData.year) && oneData.type === "Tracked") {
        yearsArray.push(oneData.year);
      }
    });

    yearsArray.sort();
    return yearsArray;
  };

  return (
    <div className="container">
      {filterYears().map((oneYear, index) => {
        return (
          <div key={index}>
            <Link to={`/overview/tracked/${oneYear}`}>
              <p>{oneYear}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewTrackedPage;
