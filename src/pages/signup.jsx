import Header from "../components/header";
import SignupForm from "../components/signup-form";
import bgUrl from "../assets/bg.svg";

const Signup = () => {
  return (
    <div
      className="bg-repeat w-full h-screen font-primary text-secondary"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundRepeat: "repeat" }}
    >
      <Header></Header>
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;
