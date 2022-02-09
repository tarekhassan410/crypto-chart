import { useState, useEffect } from "react";
import "./App.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: { min: 0, max: 1000 },
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: { min: 0, max: 1000 },
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function App() {
  const [randomVar, setRandomVar] = useState("ff");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [chartData, setChartdata] = useState([]);

  // https://api.coindesk.com/v1/bpi/historical/close.json?start=[15-05-2020]&end=[17-05-2020]&index=[USD]

  useEffect(() => {
    async function fetchData() {
      // https://api.coindesk.com/v1/bpi/historical/close.json?start=[2018-05-01]&end=[2019-05-01]&index=[USD]
      const res = await axios.get(
        "https://api.coindesk.com/v1/bpi/historical/close.json?%20start=2021-08-01&end=2021-08-10&index=[USD]"
      );

      console.log(res);
    }
    fetchData();
  }, []);

  return (
    <div className="App pt-16">
      <div className="flex justify-center">
        <div className="border border-black">
          <DayPickerInput onDayChange={(day) => setStartDate(day)} />
        </div>
        <div className="border border-black ml-2">
          <DayPickerInput onDayChange={(day) => setEndDate(day)} />
        </div>
      </div>
      <div className="h-12">
        <Bar className="h-12" options={options} data={data} />
      </div>
    </div>
  );
}

export default App;
