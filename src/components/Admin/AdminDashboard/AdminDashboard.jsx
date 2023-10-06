import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { GetChartData } from "../../../services/adminApi";
import Loader from "../../Loading/Loading";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function AdminDashboard() {
  const [chartData, setChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const getDatas = async () => {
    try {
      handleLoading();
      const res = await GetChartData();
      if (res.status === 200) {
        setLineChartData(res.data.line_chart);
        setChartData(res.data.pie_chart);
      }
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
      toast.error("Some thing wrong");
    }
  };
  useEffect(() => {
    document.title = "Dashboard | Career Bridge";
    getDatas();
  }, []);
  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  return (
    <>
      {" "}
      {loading && <Loader />}
      <ToastContainer />
      <div className="grid grid-cols-2">
        {" "}
        {lineChartData && (
          <div className="mt-4 border border-purple-400 rounded-xl mx-5 xl:w-5/5 p-5">
            <p className="font-bold text-xl text-gray-800">
              Post Counts Over Months
            </p>
            <Line data={lineChartData} />
          </div>
        )}
        {chartData && (
          <div className="mt-4 border border-purple-400 rounded-xl mx-5 xl:w-3/5 p-5">
            <p className="font-bold text-xl text-gray-800">
              Users And Posts Chart
            </p>
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
