import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/admin/all");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className=" mr-16 flex justify-end mt-10 font-semibold underline">
        <a href="/Landing" className="">
          Return to Landing Page
        </a>
      </div>
      <div className="text-center text-5xl font-bold mb-6 mt-14 ">
        Welcome Admin
      </div>
      <div className="text-center mb-4 font-serif text-2xl mt-16">
        Log of Users
      </div>

      {/* new starts */}
      <div className="mb-32 lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          {/* Link for volunteer card */}
          {/* Link for admin card */}
        </div>
      </div>
      <div className="grid justify-center ml-80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-10 justify-center items-center">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-sm"
            >
              <div className="text-gray-800 font-semibold">{user}</div>
            </div>
          ))}
        </div>
      </div>
      {/* new ends */}
    </div>
  );
};
export default Admin;
