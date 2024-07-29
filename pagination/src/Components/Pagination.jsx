import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [error,setError]=useState('')
  const count = 10;

  useEffect(() => {
    console.log("Fetch");
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        console.log(response.data);
      } catch  {
        
        // eslint-disable-next-line no-throw-literal
        throw "failed to fetch data"
      }
    };
    fetchdata();
  }, []);

  const previous = () => {
    console.log("Previous");
    if (currentpage > 1) {
      setCurrentPage(currentpage - 1);
    }
  };
  const next = () => {
    console.log("Next", currentpage, data.length / count);
    if (currentpage < data.length / count) {
      setCurrentPage(currentpage + 1);
    }
  };
  const Employeedata = data.slice(
    (currentpage - 1) * count,
    currentpage * count
  );
  console.log(data);
  return (
    <div>
      <h1>Employee Data Table</h1>
      <table className={styles.tables}>
        <thead>
          <tr className={styles.head}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {Employeedata.map((employee) => (
            <tr>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <button onClick={previous}>Previous</button>
        <p className={styles.para}>{currentpage}</p>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
