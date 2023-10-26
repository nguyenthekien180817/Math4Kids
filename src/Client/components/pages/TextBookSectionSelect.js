import React, { useState, useEffect } from "react";
import "../layout/Theory Pages/TheoryPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import SectionSelection from "../layout/navbar/SectionSelection";

function TextbookSectionSelection() {
  return (
    <div>
      <SectionSelection />
    </div>
  );
}

export default TextbookSectionSelection;
