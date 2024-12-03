// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import DisplayOptions from './DisplayOptions';
import '../styles/Navbar.css';
import image from '../assets/icons_FEtask/Display.svg'
import downImage from '../assets/icons_FEtask/down.svg'
const Navbar = ({ groupingOption, setGroupingOption, orderingOption, setOrderingOption }) => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef();

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="display-button" onClick={() => setShowOptions(!showOptions)}>
                    <img src={image} alt="" />
                    <p>Display</p>
                    <img src={downImage} alt="" />
                </button>
                {showOptions && (
                    <div className="display-options-container" ref={optionsRef}>
                        <DisplayOptions
                            groupingOption={groupingOption}
                            setGroupingOption={setGroupingOption}
                            orderingOption={orderingOption}
                            setOrderingOption={setOrderingOption}
                        />
                    </div>
                )}
            </div>
            <div className="navbar-right">
                <h1>Kanban Board</h1>
            </div>
        </nav>
    );
};

export default Navbar;
