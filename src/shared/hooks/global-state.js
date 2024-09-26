import { useState } from "react";

const useGlobalState = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState("");
  const [isAppAdmin, setIsAppAdmin] = useState("");

  return {
    currentUserDetails,
    setCurrentUserDetails,
    isAppAdmin,
    setIsAppAdmin,
  };
};

export default useGlobalState;
