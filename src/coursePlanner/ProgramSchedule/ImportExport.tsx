import { Select, Option, Typography, Link } from "@mui/joy";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface IData {
  [key: string]: any;
}

export const ImportExport = () => {
  const exportToJson = () => {
    const dataStr = JSON.stringify(localStorage);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let date = new Date();
    let today = date.toISOString().split("T")[0];

    let filename = `uvic-program-planner-${today}.json`;

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", filename);
    linkElement.style.display = "none"; // Ensuring the link element does not show up on your web page
    document.body.appendChild(linkElement);

    linkElement.click();

    // Clean up by removing the link element from the DOM
    document.body.removeChild(linkElement);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      console.log("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const json: IData = JSON.parse(event.target?.result as string);
        console.log(json);
        // Store each key-value pair in local storage

        localStorage.clear();
        Object.keys(json).forEach(function (k) {
          localStorage.setItem(k, json[k]);
        });

        console.log("JSON data has been stored in local storage.");
        window.location.reload();
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Link href="#" onClick={handleFileUpload}>
        Import
      </Link>
      <Link target="_blank" onClick={exportToJson}>
        Export
      </Link>
    </>
  );
};
