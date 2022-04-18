import { MisdemeanourContextProvider } from "./MisdemeanourContext";
import MisdemeanourList from "./MisdemeanourList";

const Misdemeanour: React.FC = () => {
  return (
    <MisdemeanourContextProvider>
      <MisdemeanourList />
    </MisdemeanourContextProvider>
  );
};

export default Misdemeanour;
