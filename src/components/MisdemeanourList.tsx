import { ChangeEvent, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { MISDEMEANOURS } from "./GenerateMisdemeanours";
import { useMisdemeanourContext } from "./MisdemeanourContext";
import "./MisdemeanourList.css";

const MisdemeanourList = () => {
  const { misdemeanourList } = useMisdemeanourContext();
  const [filteredList, setFilteredList] = useState(misdemeanourList);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setFilteredList(misdemeanourList);
  }, [misdemeanourList]);

  return (
    <div className="misdemeanourListContainer">
      <select onChange={onChangeFilterSelection} defaultValue={"show all"}>
        <option value={"show all"}>Show All</option>
        {MISDEMEANOURS.map((item, index) => {
          return (
            <option value={item} key={index}>
              {capitalizeFirstLetter(item)}
            </option>
          );
        })}
      </select>
      <div className="misdemeanourListTitle">
        <label className="misdemeanourList__item">Citizen ID</label>
        <label className="misdemeanourList__item">Date</label>
        <label className="misdemeanourList__item">Misdemeanour</label>
        <label className="misdemeanourList__item">Punishment Idea</label>
      </div>
      {filteredList.map((item, index) => {
        return (
          <div className="misdemeanourList" key={index}>
            <label className="misdemeanourList__item">{item.citizenId}</label>
            <label className="misdemeanourList__item">{item.date}</label>
            <div className="misdemeanourList__item misdemeanourList__misdemeanourContainer">
              <label>{item.content?.subject + " " + item.content?.emoji}</label>
              <label>{item.content?.detail}</label>
            </div>
            <img
              className="misdemeanourList__item"
              src={`https://picsum.photos/${Math.round(
                width * 0.2
              )}/${Math.round(height * 0.2)}?random=${index}`}
              width={Math.round(width * 0.2)}
              height={Math.round(height * 0.2)}
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

export default MisdemeanourList;
