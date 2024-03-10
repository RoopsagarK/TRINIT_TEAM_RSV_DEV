import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const GetStarted = () => {
    if (Object.keys(user).length > 0) {
      navigate("/create");
    } else navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen text-center text-white heroGradient ">
      <div className="my-1/2">
        <h1 className="mb-4 text-6xl font-bold">Welcome to ExamEase</h1>
        <p className="mb-6 text-4xl leading-10 text-white">
          Your Ultimate Test Generator for Effortless Assessments
        </p>

        <Button
          variant="contained"
          className="gradient"
          sx={{ fontSize: "20px", borderRadius: "10px" }}
          onClick={GetStarted}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default Hero;
