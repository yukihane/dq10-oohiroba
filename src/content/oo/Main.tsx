import React, { ChangeEvent, useState } from "react";
import { searchItem } from "./API";

export const Main = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    void searchItem("アモールの水");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(() => e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleClick}>検索</button>
    </div>
  );
};
