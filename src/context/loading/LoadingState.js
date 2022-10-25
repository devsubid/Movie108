import LoadingContext from "./loadingContext";
import React, { useState } from "react";

const LoadingState = (props) => {
  const [loading, setLoading] = useState(1);
  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingState;
