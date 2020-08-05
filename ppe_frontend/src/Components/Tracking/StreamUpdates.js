import React, { useEffect, useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { rdb } from "../../FirebaseConfig";
import { UserContext } from "../AdminDashboard";
import "react-circular-progressbar/dist/styles.css";
import CustomCircularProgressbar from "./CircularProgressBar";

import BackIcon from '../placeholders/BackIcon.png'

export default function StreamUpdates(props) {
  const user = useContext(UserContext);
  const [totalPeople, setTotalPeople] = useState(15);
  const [bodySuit, setBodySuit] = useState(0);
  const [boots, setBoots] = useState(0);
  const [gloves, setGloves] = useState(0);
  const [headgear, setHeadgear] = useState(0);
  const [safetyGoggles, setSafetyGoggles] = useState(0);
  const [masks, setMasks] = useState(0);

  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");

    rdb.ref(`PPE_Alerts/${user.id}/${IPAddress}`).on("value", (snapshot) => {
     
      const collection = snapshot.val();
      console.log(collection)
      for (const field in collection) {
        if (field !== "Logs") {
          switch (field) {
            case "people":
              setTotalPeople(collection[field]);
              break;
            case "body_Suit":
              setBodySuit(collection[field]);
              break;
            case "boots":
              setBoots(collection[field]);
              break;
            case "gloves":
              setGloves(collection[field]);
              break;
            case "headgear":
              setHeadgear(collection[field]);
              break;
            case "mask":
              setMasks(collection[field]);
              break;
            case "headgear":
              setHeadgear(collection[field]);
              break;
            case "safety_goggles":
              setSafetyGoggles(collection[field]);
              break;
            default:
              break;
          }
        }
      }
    });
  }, []);

  return (
    <div>
                    <Button
                      startIcon={<img src={BackIcon} />}
                      onClick={() => props.handleBack()}
                    >
                      Go Back
                  </Button>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontWeight: "bolder" }}>Total people detected</h5>
          <h1 style={{ fontWeight: "bold", color: "#5A1111" }}>
            {totalPeople}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>PPE Alerts detected on persons</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CustomCircularProgressbar
              // percentage={(bodySuit / totalPeople) * 100}
              percentage={20}
              title="No Body Suit"
            />
            <CustomCircularProgressbar
              percentage={(boots / totalPeople) * 100}
              title="No Boots"
            />
            <CustomCircularProgressbar
              percentage={(gloves / totalPeople) * 100}
              title="No Gloves"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <CustomCircularProgressbar
              percentage={(headgear / totalPeople) * 100}
              title="No Headgear"
            />
            <CustomCircularProgressbar
              percentage={(masks / totalPeople) * 100}
              title="No Mask"
            />
            <CustomCircularProgressbar
              percentage={(safetyGoggles / totalPeople) * 100}
              title="No Safety Goggles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
