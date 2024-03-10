import { Button } from "./ui/button";
import { VscGithub } from "react-icons/vsc";
import WardIcon from "../assets/images/WardIcon.png";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            {/* LOGO */}
            <div className="flex items-center gap-3">
                <Link to={"/"} className="flex items-center ml-14 gap-3">
                    <img src={WardIcon} alt="" className="w-10 h-9" />
                    <h1 className="text-4xl BeaufortforLOL text-[#F0E6D2]">Ward.GG</h1>
                </Link>
                <Search />
            </div>


            {/* BUTTONS RIGHT */}
            <div className="flex items-center gap-3 mr-14">
                <a href="https://github.com/felipecomarques/ward-gg" target="_blank">
                    <Button variant="outline">
                        <VscGithub className="w-5 h-5 text-[#F0E6D2]" />
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default Header;