import { NavLink } from "react-router";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NavLink to="/invoices" className="text-blue-700">
        View Invoices
      </NavLink>
    </div>
  );
};

export default Home;
