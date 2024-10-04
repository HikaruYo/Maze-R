import React, { useState, useEffect, useRef } from 'react';
import '../css/home.css';
import BGIMG from '../assets/TITLE-SCREEN.png';
import PlayBTN from '../assets/1-bit_UI_byBatuhanK_2.png';
import PlayBTNhover from '../assets/1-bit_UI_byBatuhanK_2-1.png';
import SettingBTN from '../assets/1-bit_UI_byBatuhanK_2_(1).png';
import SettingBTNhover from '../assets/1-bit_UI_byBatuhanK_2_(1)-1.png';

function Home() {
    const menuRef = useRef(null);
    const settingBtnRef = useRef(null);
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Untuk membuat animasi pada tombol play
    function changeImage(x, e) {
        if (x === 1) {
            e.target.src = PlayBTNhover;
        } else if (x === 2) {
            e.target.src = PlayBTN;
        }
    }

    function changeOverlayImage(y, e) {
        if (y === 1) {
            e.target.src = SettingBTNhover;
        } else if (y === 2) {
            e.target.src = SettingBTN;
        }
    }

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    // Event listener untuk mendeteksi klik di luar menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && !settingBtnRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="wrapper">
            <div className="ImageContainer">
                <img src={BGIMG} alt="" />
            </div>
            <div className="OverlayImg" ref={settingBtnRef} onClick={toggleMenu}>
                <img 
                    src={SettingBTN} 
                    alt="Menu" 
                    onMouseOver={(e) => changeOverlayImage(1, e)} 
                    onMouseOut={(e) => changeOverlayImage(2, e)} 
                />
            </div>
            <div 
                id="menu" 
                ref={menuRef} 
                className={`menu-container ${isMenuOpen ? 'show' : ''}`} 
                style={{ display: isMenuOpen ? 'block' : 'none' }}
            >
                <ul>
                    <li>Username</li>
                    <li>Volume</li>
                    <li>Credit</li>
                </ul>
            </div>

            <div className="OverlayText">
                <h1>NamaGame</h1>
                <h2>Uji Kecerdasanmu!</h2>
                <br />
                <img 
                    src={PlayBTN} 
                    id="playButton" 
                    onMouseOver={(e) => changeImage(1, e)} 
                    onMouseOut={(e) => changeImage(2, e)} 
                    alt="Play Button"
                />
            </div>
        </div>
    );
}

export default Home;
