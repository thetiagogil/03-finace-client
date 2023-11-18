import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DataBox from "./DataBox";

const TransactionsPage = ({ typeProp }) => {
  const token = localStorage.getItem("authToken");
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);

  // CREATE DATA
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [value, setValue] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");

  const payload = {
    type,
    category,
    subCategory,
    value,
    year,
    month,
    user: `${currentUser}`,
  };

  const createData = async () => {
    try {
      if (currentUser) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          readAllData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // FILTER DATA BY TYPE
  const filterByType = () => {
    const typeUpperCase = typeProp.charAt(0).toUpperCase() + typeProp.slice(1);
    const dataFilteredByType = data.filter((element) => {
      return element.type === typeUpperCase;
    });

    return dataFilteredByType;
  };

  // USE EFFECT
  useEffect(() => {
    readAllData();
  }, [currentUser]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Type</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {filterByType().map((oneData, index) => (
            <tr key={index}>
              <DataBox key={index} oneData={oneData} readAllData={readAllData} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
