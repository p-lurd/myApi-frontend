import Header from "../components/header";
import bgUrl from  "../assets/bg.svg"
import Content from "../components/content";
import Works from "../components/works";
import Features from "../components/features";
import FAQ from "../components/faq";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <div 
      className="bg-repeat w-full h-full px-10 font-primary pb-20 text-secondary"
      style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <Header></Header>
        <Content></Content>
      </div>
      <div className="bg-black w-full h-full font-primary pb-20 text-secondary"
      >
        <Works></Works>
        <Features></Features>
        <FAQ></FAQ>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
