import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import davis from "../assets/davis.png";

const Dashboard = () => {
  const filter = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const calculateTotalTime = (events) => {
    let totalMilliseconds = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "clock-in") {
        const clockOutEvent = events.find(
          (event, index) => index > i && event.type === "clock-out"
        );
        if (clockOutEvent) {
          const clockInTime = new Date(events[i].timestamp).getTime();
          const clockOutTime = new Date(clockOutEvent.timestamp).getTime();
          const timeDifference = clockOutTime - clockInTime;
          totalMilliseconds += timeDifference;
        }
      }
    }
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(
      (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { totalHours, totalMinutes };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("sent request");
      const response = await axios.get(
        "http://localhost:3000/user/bulk?filter=" + filter
      );
      setData(response.data.events);
    };
    fetchUsers();
  }, [reload]);

  const totalWorkTime = calculateTotalTime(data);

  const handleClockIn = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/user/clockIn",
        null,
        {
          headers: {
            email: filter,
          },
        }
      );
      setData(response.data.events);
      setReload(!reload);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/user/clockOut",
        null,
        {
          headers: {
            email: filter,
          },
        }
      );
      setData(response.data.events);
      setReload(!reload);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-beige">
      <div className=" mr-16 flex justify-end mt-10 font-semibold underline">
        <a href="/Landing" className="">
          Return to Landing Page
        </a>
      </div>
      <div className="container mx-auto p-4   ">
        <h1 className=" font-bold text-center mb-4 mt-10 text-5xl">
          Dashboard
        </h1>
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-16 ">
            Welcome to the Aggie House Volunteer Clock-in Page, {filter}
          </h2>
        </div>
        <div className="flex justify-center mb-2 ">
          <Button onClick={handleClockIn} label={"Clock-in"} />
          <Button onClick={handleClockOut} label={"Clock-out"} />
        </div>
        <div className="text-center font-serif mt-16 text-2xl">
          <p>Total hours worked: {totalWorkTime.totalHours}</p>
          <p>Total minutes worked: {totalWorkTime.totalMinutes}</p>
        </div>
      </div>
      <div className="flex justify-between mt-20">
        <div>
          <p className="font-serif  rounded-lg bg-gray-200  text-xl  mt-40 max-w-screen-sm ml-10 p-5">
            At Aggie House, we highly appreciate our volunteers' dedication. Our
            new clock-in page streamlines time-tracking, making it easy for you
            to focus on what matters most. Thanks for choosing to volunteer with
            us. Let's make a difference together!{" "}
          </p>
        </div>
        <div className=" mr-10 ml-10">
          <img src={davis} className="rounded-lg max-w-screen-sm"></img>
        </div>
      </div>
      <div>
        <p> </p>{" "}
      </div>
    </div>
  );
};

export default Dashboard;
