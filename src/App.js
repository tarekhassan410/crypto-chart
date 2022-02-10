import { useEffect, useState } from "react";
import "./App.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-10");
  const [chartData, setChartData] = useState({
    labels: ["20", "30", "20", "30", "20", "30"],
    datasets: [
      {
        label: "Dataset 1",
        data: ["20", "30", "20", "30", "20", "30"],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "BTC daily chart",
      },
    },
  };

  async function fetchData() {
    const res = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?%20start=${startDate}&end=${endDate}&index=[USD]`
    );
    const coinData = res.data.bpi;
    // res.data.bpi.map((coinData) => console.log(coinData));
    let labels = [];
    let chartData = [];
    Object.keys(coinData).map((key) => {
      console.log("key:", key);
      labels.push(key);
      chartData.push(coinData[key]);
    });
    setChartData({
      labels,
      datasets: [
        {
          label: "BTC USD",
          data: chartData,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App pt-16">
      <div className="flex justify-center">
        <div className="border border-black">
          <DayPickerInput
            onDayChange={(day) =>
              setStartDate(moment(day).format("YYYY-MM-DD"))
            }
          />
        </div>
        <div className="border border-black ml-2">
          <DayPickerInput
            onDayChange={(day) => setEndDate(moment(day).format("YYYY-MM-DD"))}
          />
        </div>
        <div className="border border-black ml-2 px-2 bg-teal-800 text-white">
          <button onClick={fetchData}> update </button>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="chart">
          <Line options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
