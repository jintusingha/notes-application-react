import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Notes from "./Components/Notes";
import "./App.css";

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    useEffect(() => {
        
        if (isDarkTheme) {
            document.body.style.backgroundImage = "url('/images/dark.jpg')";
        } else {
            document.body.style.backgroundImage = "url('/images/backgroundimage.jpg')";
        }
    }, [isDarkTheme]);

    return (
        <div className={`main ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
            <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <Notes />
        </div>
    );
}

export default App;
