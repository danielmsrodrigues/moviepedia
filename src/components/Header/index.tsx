import { Container, LightSwitch } from "./styles";
import { Link } from "react-router-dom";
import { Logo } from "./styles";
import ThemeBtn from "../ThemeBtn";
import SearchBar from "../SearchBar";

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <p>Moviepedia</p>
        </Link>
      </Logo>
      <SearchBar />
      <LightSwitch>
        <ThemeBtn />
      </LightSwitch>
    </Container>
  );
};

export default Header;
