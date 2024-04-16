const Footer = ({ style }) => {
  return (
    <footer
      className={`flex flex-col ${style} items-center justify-center h-12  bg-seagreen bottom-0 fixed w-screen md:h-16`}
    >
      <h1>
        Developed with <span className="animate-pulse text-red-600 text-xl">❤️</span> by{" "}
        <a
          href="https://naitiklodha.tech"
          className="text-pink-700 font-bold italic underline hover:text-slate-950"
        >
          Naitik Lodha
        </a>
      </h1>
    </footer>
  );
};
export default Footer;
