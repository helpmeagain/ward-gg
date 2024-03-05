import { Badge } from "./ui/badge";

const Profile = () => {
    return (
        <div>
            <div className="flex items-center gap-6">
                <div className="flex-col">
                    <img
                        className="h-36 w-36 rounded-full border-2"
                        src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/profileicon/4500.png`}
                        alt="Profile Picture"
                    />
                    <div className="flex justify-center mt-1">
                        <Badge variant="secondary">000</Badge>
                    </div>
                </div>

                <h1 className="text-5xl text-[#F0E6D2] mb-6"> PlayerName
                    <span className="text-xl text-[#F0E6D2] text-muted-foreground">#BR1</span>
                </h1>
            </div>
        </div>
    )
};

export default Profile;
