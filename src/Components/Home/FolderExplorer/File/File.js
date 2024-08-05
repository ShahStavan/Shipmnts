import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "../.././../Icon/Icon";
import { SET_PATH, SET_ROOT } from "../../../../actions";
import { calculatePath } from "../../../../helper/helper";


class File extends Component {
  
  expand() {
    if (this.props.root.class === "root") {
      this.props.setPath(calculatePath(this.props.root));
      this.props.setRoot(this.props.root);
    }
  }
  render() {
    return (
      <div className="" onClick={this.expand.bind(this)}>
        <Icon class={this.props.type} color={this.props.color} />
        <br />
        {this.props.name}
      </div>
    );
  }
}
/**
 *
 * @param {?} dispatch 
 */
const dispatchMethodsToReduxProps = dispatch => {
  return {
    setPath: (path = "") =>
      dispatch({
        type: SET_PATH,
        payload: { path }
      }),
    setRoot: (root = null) => dispatch({ type: SET_ROOT, payload: { root } })
  };
};

export default connect(
  null,
  dispatchMethodsToReduxProps
)(File);