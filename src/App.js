import { useCallback, useState } from "react";
import "./App.css";
import { makeWildCardZipCodes } from "./makeWildCardZipCodes";

function App() {
  const [isCustomDropdownShowing, setIsCustomDropdownShowing] = useState(false);
  const [customeSelectedCodes, setCustomSelectedCodes] = useState([]);
  const [currentEnteredCodeValue, setCurrentEnteredCodeValue] = useState("");
  const [codes, setCodes] = useState([]);

  const handleZipCodes = useCallback((e) => {
    const arrOfCodes = makeWildCardZipCodes(e.target.value);
    if (!codes?.filter((code) => arrOfCodes.includes(code)).length) {
      setCodes(arrOfCodes);
    }
  }, []);

  const handleCustomeDropDownListClick = (e) => {
    const value = e.target.dataset.value;
    !customeSelectedCodes.includes(value) &&
      setCustomSelectedCodes((prev) => [...prev, value]);
    setCodes(codes?.filter((code) => code != value));
  };
  const removeCustomSelectedItem = (e) => {
    console.log(e.target.parentNode);
    const value =
      e.target.parentNode.dataset.value ||
      e.target.parentNode.parentNode.parentNode.dataset.value ||
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.value;
    setCodes((prev) => [...prev, value].sort());
    setCustomSelectedCodes(
      customeSelectedCodes?.filter((code) => code != value)
    );
  };

  const handleCustomSelectKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value.length == 5) {
      !customeSelectedCodes.includes(e.target.value) &&
        setCustomSelectedCodes([e.target.value]);
      setIsCustomDropdownShowing(false);
    }
  };

  return (
    <div className="add_filter_popup">
      <div className="custom_multiselect_input">
        <div className="input">
          <input
            type="text"
            onChange={(e) => {
              handleZipCodes(e);
              setIsCustomDropdownShowing(true);
              setCurrentEnteredCodeValue(e.target.value);
            }}
            defaultValue={currentEnteredCodeValue}
            onKeyUp={handleCustomSelectKeyUp}
          />
          <span
            className="icon_down"
            onClick={() => setIsCustomDropdownShowing(!isCustomDropdownShowing)}
          >
            ^
          </span>
          {isCustomDropdownShowing && (
            <div className="drop_down_multi_selectable_list">
              {codes?.length ? (
                <>
                  {codes?.map((code, i) => (
                    <div
                      key={i}
                      data-value={code}
                      className="drop_down_list_item"
                      onClick={handleCustomeDropDownListClick}
                    >
                      {code}
                    </div>
                  ))}
                </>
              ) : (
                <span className="text-center">Nothing to Show</span>
              )}
            </div>
          )}
        </div>
        <div className="selected_list_items">
          {customeSelectedCodes?.map((code, i) => (
            <div key={i} className="item" data-value={code}>
              {code}
              <span
                className="remove_item_icon"
                onClick={removeCustomSelectedItem}
              >
                x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
