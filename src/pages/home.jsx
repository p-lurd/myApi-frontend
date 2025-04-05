import Header from "../components/header";
import bgUrl from  "../assets/bg.svg"
import Content from "../components/content";

const Home = () => {
  return (
    <>
      <div 
      className="bg-repeat w-full h-[500px] px-10 font-primary"
      style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <Header></Header>
        <Content></Content>
      </div>
    </>
  );
};

export default Home;
