import { useEffect, useState } from "react";
import "./App.css";

export default function CriteriaButtons(jsonData) {
  //-----props
  const data = jsonData;
  const data2 = data;
  // console.log(data2.data.Textarten[0].Kriterien[0].Phrasen);
  // console.log("data");

  //-----State Variables
  const [textart, setTextart] = useState(
    "Allgemeine Bewertung oder Textart wählen"
  );
  const [kriterium, setKriterium] = useState("");
  const [güteklasse, setGüteklasse] = useState("");
  const [pronomen, setPronomen] = useState("Männlich");
  const [schülername, setSchülername] = useState("");
  const [kriteriumButtonStates, setKriteriumButtonStates] = useState([]);

  const [güteKlassenButtonStates, setGüteKlassenButtonStates] = useState([]);
  const [availableSentences, setAvailableSentences] = useState([]);

  //-----useEffects
  useEffect(() => {
    data.data.Güteklassen.map((element) => {
      kriteriumButtonStates.push("");
    });
  }, []);

  useEffect(() => {
    if (kriterium !== "" && textart !== "" && güteklasse !== "") {
      let availableSentencesCopy = data.data.Textarten.find(
        (element) => element.TextArtName === textart
      )?.Kriterien.find(
        (element) => element.Kriteriumsname === kriterium
      )?.Phrasen;

      console.log(availableSentencesCopy);

      availableSentencesCopy = availableSentencesCopy.filter((phrase) => {
        return phrase.Güteklasse === güteklasse && phrase.Pronomen === pronomen;
      });

      availableSentencesCopy = availableSentencesCopy.map((phrase) => {
        let phraseMitNamen = phrase;
        phraseMitNamen.Satz = phraseMitNamen.Satz.replace(
          "!name!",
          `${schülername}`
        );
        return phraseMitNamen;
      });

      setAvailableSentences(availableSentencesCopy);
    }
  }, [kriterium, güteklasse, pronomen, schülername]);

  //-----functions
  const activateKriteriumButton = (buttonNumber, buttonValue) => {
    setKriterium(buttonValue);
    let kriteriumButtonStatesCopy = kriteriumButtonStates;
    kriteriumButtonStatesCopy = kriteriumButtonStatesCopy.map(() => {
      return "";
    });
    kriteriumButtonStatesCopy[buttonNumber] = "Highlighted";
    setKriteriumButtonStates(kriteriumButtonStatesCopy);
  };

  const activateGüteklasseButton = (buttonNumber, buttonValue) => {
    setGüteklasse(buttonValue);
    let güteKlassenButtonStatesCopy = güteKlassenButtonStates;
    güteKlassenButtonStatesCopy = güteKlassenButtonStatesCopy.map(() => {
      return "";
    });
    güteKlassenButtonStatesCopy[buttonNumber] = "Highlighted";
    setGüteKlassenButtonStates(güteKlassenButtonStatesCopy);
  };

  return (
    <div className="ButtonsBox">
      <div className="TextartBox">
        <select
          name="Textart"
          id="Textart"
          value={textart}
          onChange={(e) => {
            setTextart(e.target.value);
          }}
        >
          <option value="Allgemeine Bewertung oder Textart wählen">
            {" "}
            Allgemeine Bewertung oder Textart wählen
          </option>
          {data.data.Textarten.map((textart) => {
            return (
              <option value={textart.TextArtName}>{textart.TextArtName}</option>
            );
          })}
        </select>
        <select
          name="pronomen"
          id="pronomen"
          value={pronomen}
          onChange={(e) => {
            setPronomen(e.target.value);
          }}
        >
          <option value="Männlich">Männlich</option>
          <option value="Weiblich">Weiblich</option>
        </select>
        <input
          type="text"
          value={schülername}
          onChange={(e) => {
            setSchülername(e.target.value);
          }}
        />
      </div>

      <div className="KriterienBox">
        {data.data.Textarten.find(
          (element) => element.TextArtName === textart
        )?.Kriterien.map((kriteriumsart, index) => {
          return (
            <button
              className={`${kriteriumButtonStates[index]}`}
              onClick={() => {
                activateKriteriumButton(index, kriteriumsart.Kriteriumsname);
              }}
            >
              {kriteriumsart.Kriteriumsname}
            </button>
          );
        })}
      </div>

      <div className="GüteklassenBox">
        {data.data.Güteklassen.map((güteklasse, index) => {
          return (
            <button
              className={`${güteKlassenButtonStates[index]}`}
              onClick={() => {
                activateGüteklasseButton(
                  index,
                  güteklasse.GüteklasseBezeichnung
                );
              }}
            >
              {güteklasse.GüteklasseBezeichnung}
            </button>
          );
        })}
      </div>

      <div>
        {availableSentences?.map((sentence) => {
          return <div> {sentence.Satz} </div>;
        })}
      </div>
    </div>
  );
}
