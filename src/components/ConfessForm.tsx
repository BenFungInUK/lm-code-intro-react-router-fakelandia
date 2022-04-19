import { useEffect, useState } from "react";
import { Misdemeanour, MISDEMEANOURS } from "./GenerateMisdemeanours";
import "./ConfessForm.css";
import { useMisdemeanourContext } from "./MisdemeanourContext";

const ConfessForm = () => {
  const [submitDisnable, setSubmitDisable] = useState(true);
  const [citizenId, setCitizenId] = useState("");
  const [subject, setSubject] = useState("");
  const [contactType, setContactType] = useState("talk");
  const [detail, setDetail] = useState("");
  const { misdemeanourList, setMisdemeanourList } = useMisdemeanourContext();

  useEffect(() => {
    citizenId.length > 0 && subject.length > 0 && detail.length > 0
      ? setSubmitDisable(false)
      : setSubmitDisable(true);
  }, [citizenId, subject, detail]);

  return (
    <form onSubmit={(e) => onSubmitConfess(e)} className="form">
      <div className="form__inputContainer">
        <label>Citizen ID</label>
        <input
          className="form__input"
          type="text"
          required
          value={citizenId}
          onChange={(e) => setCitizenId(e.target.value)}
        />
      </div>
      <div className="form__inputContainer">
        <label>Subject</label>
        <input
          className="form__input"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="form__inputContainer">
        <label>Reason for contact</label>
        <select
          className="form__input"
          defaultValue="talk"
          onChange={(e) => setContactType(e.target.value)}
        >
          <option value="talk">I just want to talk</option>
          {MISDEMEANOURS.map((item, index) => {
            return (
              <option value={item} key={index}>
                {capitalizeFirstLetter(item)}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        className="form__textarea form__input"
        rows={8}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>
      <div className="form__submitBtnContainer">
        <input
          className="form__submitBtn form__input"
          type="submit"
          value="Confess"
          disabled={submitDisnable}
        />
      </div>
    </form>
  );

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function onSubmitConfess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    contactType === "talk"
      ? console.log(
          `{ citizenId: ${citizenId}, subject: ${subject}, misdemeanour: ${contactType}, detail: ${detail}}`
        )
      : setMisdemeanourList([
          ...misdemeanourList,
          {
            citizenId: parseInt(citizenId),
            misdemeanour: contactType as Misdemeanour,
            content: { emoji: "", subject: subject, detail: detail },
            date: new Date().toLocaleDateString(),
          },
        ]);
    alert("Your confess has been submitted!");
  }
};

export default ConfessForm;
