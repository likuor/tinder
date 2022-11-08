import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
      axios
        .get(
          "http://localhost:8000/getuserinfo",
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setUser(res.data);
          // navigate("/profile")
        });
	}, []);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
