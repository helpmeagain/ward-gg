import { Button } from "./components/ui/button";

function App() {

  const handleClick = () => {
    console.log("Test completed");
  };

  return (
    <Button onClick={handleClick}>test</Button>
  );
}

export default App;
