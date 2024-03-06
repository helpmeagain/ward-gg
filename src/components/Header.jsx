import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { VscGithub, VscKey } from "react-icons/vsc";
import WardIcon from "../assets/WardIcon.png"

const Header = () => {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <div className="flex items-center">
                <img src={WardIcon} alt="" className="w-10 h-9 mr-3" />
                <h1 className="text-4xl BeaufortforLOL text-[#F0E6D2]">Ward.GG</h1>
            </div>

            <div className="flex items-center gap-3">
                {/*  */}
                <Button variant="outline" disabled>
                    <VscKey className="w-5 h-5 text-[#F0E6D2]" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
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