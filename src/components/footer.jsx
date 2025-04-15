const Footer = () => {
  return (
    <div className="hidden md:flex w-full justify-center font-primary mt-20 mb-20">
      <div className="rounded-2xl bg-primary flex flex-col justify-center items-center w-5/6 py-10 pb-20">
        <h1 className="font-semibold text-4xl text-final font-primary pt-10">
          Ready to monitor your APIs?
        </h1>
        <div className="flex flex-col md:flex-row my-10">
          <span className="text-final px-4 pt-0.5">Secure and scalable architecure</span>
          <ul className="flex flex-wrap gap-x-6 pl-4 list-disc text-final marker:text-lg">
            <li>Multiprotocol support</li>
            <li>API monitoring</li>
            <li>Incident management</li>
            <li>Uptime monitoring</li>
          </ul>
        </div>
        <div>
          <button className=" bg-final border-2 border-final mr-2 px-10 py-3 rounded-md text-primary font-medium">
            Get Started
          </button>
          <button className=" bg-primary border-2 border-final mr-2 px-10 py-3 rounded-md text-final font-medium">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
