import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { VscGithub } from "react-icons/vsc";
import WardIcon from "../assets/WardIcon.png"
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = ({ setPlayerPUUID, setPlayerTag }) => {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            {/* PROGRAM NAME */}
            <Link to={"/"}>
                <div className="flex items-center ml-14 gap-3">
                    <img src={WardIcon} alt="" className="w-10 h-9" />
                    <h1 className="text-4xl BeaufortforLOL text-[#F0E6D2]">Ward.GG</h1>
                    <Search setPlayerPUUID={setPlayerPUUID} setPlayerTag={setPlayerTag}/>
                </div>
            </Link>

            {/* BUTTONS RIGHT */}
            <div className="flex items-center gap-3 mr-5">
                {/* <Separator orientation="vertical" className="h-6" /> */}
                <a href="https://github.com/felipecomarques/ward-gg" target="_blank">
                    <Button variant="outline">
                        <VscGithub className="w-5 h-5 text-[#F0E6D2]" />
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default Header;