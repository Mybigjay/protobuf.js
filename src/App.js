//import { protobuf } from "protobuf.js";
import { useEffect } from "react";
/*import {
  convertProtoMessageToString,
  parseRootObjectToProtoMessage,
} from "json-to-protobuf-definition";
*/
var protobuf = require("protobufjs");
const { Buffer } = require("buffer/");
//import { Buffer } from "buffer";
//import { Buffer } = require (buffer);

function App() {
  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    //const ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");
    protobuf.load("./YPricingData.proto", (error, root) => {
      if (error) {
        return console.log(error);
      }

      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: ["GME"],
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(message) {
        const buffer = Uint8Array.from(btoa(message.data));
        //console.log("comming message");
        //console.log(message.data);

        console.log(Yaticker.decode(new Buffer(message.data, "base64")));
        //console.log(Yaticker.decode(new ArrayBuffer(message.data, 'base64')))
      };
    });
  }, []);

  return (
    <div className="App">
      <h1>Stonks</h1>
    </div>
  );
}

export default App;



/*     
import { useEffect, useState } from "react";
var protobuf = require("protobufjs");
const { Buffer } = require("buffer/");

function App() {
  const [stonk, setStonk] = useState([]);
  let [response, setResponse] = useState([]);
  useEffect(() => {
    //const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    const ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");

    ws.onopen = function open() {
      console.log("connected");
      ws.send(
        JSON.stringify({
          active_symbols: "brief",
        })
      );
    };

    ws.onclose = function close() {
      console.log("disconnected");
    };

    ws.onmessage = function incoming(msg) {
      response = JSON.parse(msg.data);
      console.log("active_symbols: %o", response);
      //console.log(msg.data);
      const next = response;
      setStonk(next);
      console.log("next", next);
      console.log("stonk", stonk);
    };
    console.log("stonk2", stonk);
  }, [response]);
  // const { active_symbols } = data;
  console.log("response", response);
  const items = Object.keys(stonk).map((item) => {
    return (
      <div>
        <h1>Stonks</h1>
        <div>
          <h2>gh{Object.keys(response).map((e) => response[e])}</h2>
          <p> ghh{Object.keys(stonk).map((item) => response)}</p>;
          <img
            src={item?.symbol}
            alt={item.name}
            height="100"
            style={{ marginBottom: 10 }}
          />
          <span>
            {item?.title}
            &nbsp;
            <span
              style={{
                color: "rgb(14, 203, 129)",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              £{item?.price}
            </span>
          </span>
        </div>
      </div>
    );
  });
}
export default App;




*/
