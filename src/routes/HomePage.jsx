import leagueIcon from "../assets/images/leagueIcon.png";
const HomePage = () => {
    return (
        <div className="flex justify-center items-center">
            <img src={leagueIcon} alt="" className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-ful lg:h-full mt-10" />
        </div>
    );
};

export default HomePage;