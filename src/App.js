import { useEffect, useState } from "react";
import "./styles/App.css";
import Table from "./components/Table";

function App() {
  const [cars, setCars] = useState(false);

  const fetchCars = () => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
      })
      .catch((error) => {
        alert("An error occurred. Try again later");
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const storageString = localStorage.getItem("Cars");

    if (storageString) {
      const storageCars = JSON.parse(storageString);
      setCars(storageCars);
    } else {
      fetchCars();
    }
    // fetchCars();
  }, []);

  useEffect(() => {
    const jsonString = JSON.stringify(cars);
    localStorage.setItem("Cars", jsonString);
  }, [cars]);

  return (
    <div className="wrapper">
      <Table items={cars} setItems={setCars} />
    </div>
  );
}

export default App;
