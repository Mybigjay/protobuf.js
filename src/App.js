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
