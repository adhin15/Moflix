const Switcher = (props) => {
  const { switchState, setSwitchState, labelLeft = "label", labelRight="label" } = props;
  return (
    <div id="switch-toggle">
      <label className="toggleSwitch nolabel" onclick={setSwitchState}>
        <input type="checkbox" checked={switchState} onChange={()=>{setSwitchState(!switchState)}} />
        <a></a>
        <span>
          <span className="left-span">{labelLeft}</span>
          <span className="right-span">{labelRight}</span>
        </span>
      </label>
    </div>
  );
};

export default Switcher;
