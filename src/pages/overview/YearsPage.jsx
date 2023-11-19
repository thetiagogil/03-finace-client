import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const YearsPage = ({ pageProp, typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

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
        }
      }
    } catch (error) {
      console.log(error);
    }
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

  // USE EFFECT
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      {filterByYears().map((oneYear, index) => (
        <div key={index}>
          <Link to={`/${pageProp}/${typeProp}/${oneYear}`}>
            <p>{oneYear}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default YearsPage;
