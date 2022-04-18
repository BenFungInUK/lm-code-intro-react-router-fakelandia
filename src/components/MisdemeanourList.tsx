import { ChangeEvent, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { MISDEMEANOURS } from "./GenerateMisdemeanours";
import { useMisdemeanourContext } from "./MisdemeanourContext";
import "./MisdemeanourList.css";

const MisdemeanoutList = () => {
  const { misdemeanourList } = useMisdemeanourContext();
  const [filteredList, setFilteredList] = useState(misdemeanourList);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setFilteredList(misdemeanourList);
  }, [misdemeanourList]);

  return (
    <div className="misdemeanoutListContainer">
      <select onChange={onChangeFilterSelection}>
        <option value={"show all"} selected>
          Show All
        </option>
        {MISDEMEANOURS.map((item, index) => {
          return (
            <option value={item} key={index}>
              {capitalizeFirstLetter(item)}
            </option>
          );
        })}
      </select>
      <div className="misdemeanoutListTitle">
        <label className="misdemeanoutList__item">Citizen ID</label>
        <label className="misdemeanoutList__item">Date</label>
        <label className="misdemeanoutList__item">Misdemeanour</label>
        <label className="misdemeanoutList__item">Punishment Idea</label>
      </div>
      {filteredList.map((item, index) => {
        return (
          <div className="misdemeanoutList" key={index}>
            <label className="misdemeanoutList__item">{item.citizenId}</label>
            <label className="misdemeanoutList__item">{item.date}</label>
            <label className="misdemeanoutList__item">
              {item.misdemeanour}
            </label>
            <img
              className="misdemeanoutList__item"
              src={`https://picsum.photos/${Math.round(
                width * 0.2
              )}/${Math.round(height * 0.2)}?random=${index}`}
              alt="Punishment Idea"
            />
          </div>
        );
      })}
    </div>
  );

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function onChangeFilterSelection(event: ChangeEvent<HTMLSelectElement>) {
    event.target.value === "show all"
      ? setFilteredList(misdemeanourList)
      : setFilteredList(
          misdemeanourList.filter(
            (item) => item.misdemeanour === event.target.value
          )
        );
  }
};

export default MisdemeanoutList;
