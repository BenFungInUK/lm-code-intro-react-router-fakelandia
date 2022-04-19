import "./Confess.css";
import ConfessForm from "./ConfessForm";

const Confess: React.FC = () => (
  <div className="confessContainer">
    <h2>
      It's very difficult to catch people committing misdemeanours so we
      appreciate it when citizens confess to us directly.
    </h2>
    <p></p>
    <h2>
      However, if you're just having a hard day and need to vent then you're
      welcome to contact us here too. Up to you!
    </h2>
    <ConfessForm />
  </div>
);

export default Confess;
