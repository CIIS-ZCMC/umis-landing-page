import React from "react";

import NestedPagesBody from "../NestedPagesBody/NestedPagesBody.jsx";
import NestedPagesImages from "../NestedPagesImages/NestedPagesImages.jsx";

import '../../styles/nested-pages-body.css';
import "../../styles/nested-pages-images.css";
import "../../styles/nested-pages-content.css";

const NestedPagesContent = () => {
  return (
    <div className="landing-page-desktop nested-pages">
      <div className="row-lg">
        <NestedPagesImages />
        <NestedPagesBody />
        <NestedPagesImages />
      </div>
      <div className="col-sm">
        <NestedPagesBody />
        <NestedPagesImages />
      </div>
    </div>
  );
};

export default NestedPagesContent;
