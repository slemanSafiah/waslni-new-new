import React, { Component } from "react";
import { DotScale } from "styled-loaders-react";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <DotScale color="#33777d" size="100px" duration="5s" />
      </div>
    );
  }
}
