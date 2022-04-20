import { useEffect, useState } from "react";
import { Misdemeanour, MISDEMEANOURS } from "./GenerateMisdemeanours";
import { useMisdemeanourContext } from "./MisdemeanourContext";
import "./ConfessForm.css";
import ConfessFormInput from "./ConfessFormInput";

const ConfessForm = () => {
  const [submitDisnable, setSubmitDisable] = useState(true);
  const [citizenId, setCitizenId] = useState("");
  const [subject, setSubject] = useState("");
  const [contactType, setContactType] = useState("talk");
  const [detail, setDetail] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const { misdemeanourList, setMisdemeanourList } = useMisdemeanourContext();

  useEffect(() => {
    if (citizenId.length > 0) {
      const regex = /^[1-9][0-9]*$/g;
      const found = citizenId.match(regex);
      if (!found) setValidationMsg("Citizen ID must be an integer.");
      else setValidationMsg("");
    }
    citizenId.length > 0 &&
    subject.length > 0 &&
    detail.length > 0 &&
    validationMsg.length === 0
      ? setSubmitDisable(false)
      : setSubmitDisable(true);
  }, [citizenId, subject, detail, validationMsg]);

  return (
    <form onSubmit={(e) => onSubmitConfess(e)} className="form">
      {validationMsg.length > 0 && (
        <div className="form__inputContainer form__errMsg">
          <label>{validationMsg}</label>
        </div>
      )}
      <ConfessFormInput
        labelText="Citizen ID"
        inputValue={citizenId}
        onChangeFunc={setCitizenId}
        name="citizenInput"
      />
      <ConfessFormInput
        labelText="Subject"
        inputValue={subject}
        onChangeFunc={setSubject}
        name="subjectInput"
      />
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
        aria-label="detailInput"
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
