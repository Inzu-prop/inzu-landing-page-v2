import logo from "../assets/inzu-logo.svg";

const Logo = ({ className = "h-14" }) => {
  return (
    <img
      src={logo}
      alt="Inzu logo"
      className={className}
    />
  );
};

export default Logo;
