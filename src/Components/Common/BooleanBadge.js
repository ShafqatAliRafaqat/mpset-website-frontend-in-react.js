import {Badge} from "reactstrap";
import React from "react";

const BooleanBadge = (props) => {
  let {boolean} = props;

  if(typeof boolean === 'string' || boolean instanceof String){
    boolean = (boolean === '1');
  }

  return (
    <Badge color={(boolean)?"success":"danger"}>{(boolean)?"Yes":"No"}</Badge>
  );
};

export default BooleanBadge;
