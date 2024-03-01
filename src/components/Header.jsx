import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { VscGithub, VscColorMode } from "react-icons/vsc";
import WardIcon from "../assets/WardIcon.png"

const Header = () => {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <div className="flex items-center">
                <img src={WardIcon} alt="" className="w-9 h-8 mr-3" />
                <h1 className="text-3xl font-bold">Ward.GG</h1>
            </div>

            <div className="flex items-center gap-3">
                {/*  */}
                <Button variant="outline" disabled>
                    <VscColorMode className="w-5 h-5" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <a href="https://github.com/felipecomarques/ward-gg" target="_blank">
                    <Button variant="outline">
                        <VscGithub className="w-5 h-5" />
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default Header;