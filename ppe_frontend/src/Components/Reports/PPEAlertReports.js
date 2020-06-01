import React, { useState, useEffect } from "react";

export default function PPEAlertReports() {
  const [image, setImage] = useState(null);

  return (
    <div>
      PPE Alert reports yet to be developed
      <img
        src={image}
        alt={
          image ? "Base 64 unable to be converted to image" : "Not available"
        }
      />
    </div>
  );
}
