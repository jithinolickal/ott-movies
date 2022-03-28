import React, { useCallback, useRef } from "react";
import "./App.css";
import { HomeList } from "./components/HomeList";
import { Header } from "./components/Header";



function App() {
  return (
    <div className="App bg-gradient-to-b from-black to-neutral-900">
      {/* <div className="bg-blue-500 md:bg-red-500 lg:bg-green-500 ">
        asdfadsfAADADD
      </div> */}
      <div className="mx-3">
        <Header />
        <HomeList />
        
      </div>
    </div>
  );
}

//.25 24
//.5rem 30px
//.75  36
//

export default App;
