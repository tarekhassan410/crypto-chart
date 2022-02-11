import { useEffect, useState } from "react";
import "./App.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import CryptoBarChart from "./components/CryptoBarChart";
import CryptoLineChart from "./components/CryptoLineChart";
import moment from "moment";
import axios from "axios";

function App() {
  const [startDate, setStartDate] = useState(
    moment().subtract(35, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState({
    labels: ["20", "30", "20", "30", "20", "30"],
    datasets: [
      {
        label: "Dataset 1",
        data: ["20", "30", "20", "30", "20", "30"],
        backgroundColor: "rgba(20, 184, 166, 0.5)",
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

  // fetch data from Coindesk API and update state
  async function fetchData() {
    const res = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?%20start=${startDate}&end=${endDate}&index=[USD]`
    );
    const coinData = res.data.bpi;
    let labels = [];
    let chartData = [];
    // looping over returned object
    Object.keys(coinData).map((key) => {
      labels.push(key);
      chartData.push(coinData[key]);
    });
    setChartData({
      labels,
      datasets: [
        {
          label: "BTC USD",
          data: chartData,
          backgroundColor: "rgba(20, 184, 166, 0.5)",
        },
      ],
    });
  }

  // This will run first time only
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App pt-16">
      <div className="flex justify-center">
        <div className="border border-black py-2 pl-2">
          <DayPickerInput
            value={startDate}
            onDayChange={(day) =>
              setStartDate(moment(day).format("YYYY-MM-DD"))
            }
          />
        </div>
        <div className="border border-black ml-2 py-2 pl-2">
          <DayPickerInput
            value={endDate}
            onDayChange={(day) => setEndDate(moment(day).format("YYYY-MM-DD"))}
          />
        </div>

        <div className="border border-black ml-2 px-2 bg-teal-800 text-white py-2">
          <button onClick={fetchData}> update chart </button>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="chart">
          {chartType === "bar" ? (
            <CryptoBarChart options={options} data={chartData} />
          ) : (
            <CryptoLineChart options={options} data={chartData} />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={
            "p-2 border border-2 border-black border-r-0 rounded-l-md cursor-pointer " +
            (chartType === "bar" && "bg-teal-500 text-white")
          }
          onClick={() => setChartType("bar")}
        >
          Bar chart{" "}
        </div>
        <div
          className={
            "p-2 border border-2 border-black border-l-0 rounded-r-md cursor-pointer " +
            (chartType === "line" && "bg-teal-500 text-white")
          }
          onClick={() => setChartType("line")}
        >
          {" "}
          Line chart{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
