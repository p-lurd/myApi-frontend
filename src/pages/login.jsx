import Header from "../components/header";
import LoginForm from "../components/login-form";
import bgUrl from "../assets/bg.svg";

const Login = () => {
  return (
    <div
      className="bg-repeat w-full h-screen font-primary text-secondary"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundRepeat: "repeat" }}
    >
      <Header></Header>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;