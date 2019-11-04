import React from "react";
import Axie from "../Axie/Axie/Axie";
import Button from "../ui/Button";
//
import { StyledSyncController } from "./styles/StyledSyncController";
import ReactSVG from "react-svg";

class SyncController extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // axies
    const axiesObj = this.props.axies;
    // handlers
    const onClickClearAll = this.props.onClickClearAll;
    const onClickSync = this.props.onClickSync;
    const onClickCap50 = this.props.onClickCap50;
    const onClickCap100 = this.props.onClickCap100;
    const onClickRemoveOne = this.props.onClickRemoveOne;
    // axies
    const axies = Object.keys(axiesObj).map(axieKey => (
      <div key={axieKey} className="syncElem">
        <Axie
          data={axiesObj[axieKey]}
          rendering="image"
          features="breeding"
          size="tiny"
          background="none"
        />
        <ReactSVG
          onClick={() => {
            onClickRemoveOne(axiesObj[axieKey]);
          }}
          className="removeIcon"
          src={"./img/icons/general/close.svg"}
        />
      </div>
    ));
    //
    return (
      <StyledSyncController className="syncController">
        <div className="axies">{axies}</div>
        <div className="btnBar">
          <Button
            className="syncButton btn"
            name={
              <>
                <span>
                  Sync EXP of ({Object.keys(axiesObj).length}) Selected Axies{" "}
                </span>
                {Object.keys(axiesObj).length > 99 ? (
                  <span className="totalSelected">100 Axies per TX</span>
                ) : (
                  ""
                )}
              </>
            }
            type="color"
            color="#a146ef"
            onClick={onClickSync}
          />
          <Button
            className="clearAllButton btn"
            name={"Clear all"}
            type="color"
            color="#ff4c4c"
            onClick={onClickClearAll}
          />
        </div>
      </StyledSyncController>
    );
  }
}

export default SyncController;
