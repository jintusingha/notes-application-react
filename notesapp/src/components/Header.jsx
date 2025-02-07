import React from "react";

const Header = ({ toggleTheme, isDarkTheme }) => {
    return (
        <div className="header">
            <h1 className="title">Notes</h1>
            <button className="theme-toggle-button" onClick={toggleTheme}>
                {isDarkTheme ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    );
};

export default Header;
