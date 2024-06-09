import { useState } from "react";

const CustomTabs = (props) => {
  const { Tabs, onChange = ()=>{} } = props;
  const [state,setState] = useState("0")

  const changeRadio = (val) =>{
    onChange(val);
    setState(val);
  }

  return (
    <div id="custom-radio-tabs" className="flex bg-[#fafafa] text-[#999] rounded-[20px]">
      {Tabs?.map((val) => {
        return (
          <>
            <input
              type="radio"
              className="hidden"
              id={`input-${val.label}`}
              name="tabs_type"
              value={val.value}
                checked="checked"
                onChange={(e) => {changeRadio(e.target.value)}}
            />
            <label
              for={`input-${val.label}`}
              className={`${state === val.value ? "active" : ""}`}
            >
              {val.label}
            </label>
          </>
        );
      })}
    </div>
  );
};

export default CustomTabs;
