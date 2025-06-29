import { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import './Main.css'
import { Context } from '../../context/Context'
import { signInWithGoogle } from '../auth';
// import ExploreIcon from '@mui/icons-material/ExploreOutlined';
// import LightbulbIcon from '@mui/icons-material/LightbulbOutlined';
// import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import CodeIcon from '@mui/icons-material/CodeOutlined';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import SendIcon from '@mui/icons-material/SendRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GeminiLogo from '../../assets/images/gemini-logo.png';


function Main({ user }) {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [showMenu, setShowMenu] = useState(false);
    const [imgError, setImgError] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Avoid closing when clicking the avatar
        setShowMenu((prev) => !prev);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const closeMenu = () => setShowMenu(false);
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, []);

    // Get the best available profile photo
    const profilePhoto =
        user?.photoURL ||
        (user?.providerData && user.providerData[0]?.photoURL) ||
        null;


    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>

                <div className="user-profile" onClick={toggleMenu}>
                    {user === null ? (
                        <span>G</span>
                    ) : profilePhoto && !imgError ? (
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="profile-picture"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <AccountCircleIcon className="profile-default-icon" />
                    )}
                    {showMenu && (
                        <div className="user-menu" onClick={(e) => e.stopPropagation()}>
                            <div className="menu-loggedin">
                                <p className="menu-user-email" id="user-email">
                                    {user?.email || "Not logged in"}
                                </p>
                                {profilePhoto && !imgError ? (
                                    <img
                                        src={profilePhoto}
                                        alt="User Profile"
                                        className="menu-profile-pic"
                                        id="user-pic"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <AccountCircleIcon className="profile-default-icon menu-profile-pic" />
                                )}
                                <p className="menu-user-name" id="user-name">
                                    Hi, {user?.displayName || "Guest"}!
                                </p>
                            </div>
                            <div className="switch-account" onClick={signInWithGoogle}>
                                Switch Account
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, {user?.displayName || "user"}.</span></p>
                            {/* <p>How can I help you today?</p> */}
                        </div>
                        {/* <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <ExploreIcon className='bottom-icon' />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <LightbulbIcon className='bottom-icon' />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our weak retreat</p>
                                <ChatBubbleIcon className='bottom-icon' />
                            </div>
                            <div className="card">
                                <p>Tell me about React Javascript or React Native</p>
                                <CodeIcon className='bottom-icon' />
                            </div>
                        </div> */}
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <p>{recentPrompt}</p>
                        </div>
                        <div className={`result-data${loading ? ' loading' : ''}`}>
                            <img src={GeminiLogo} alt="Gemini Logo" className="gemini-logo" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>

                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input className='input-search' onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' />
                        <AddPhotoIcon className='input-icon' />
                        <KeyboardVoiceIcon className='input-icon' />
                        {input ? <SendIcon className='input-icon' onClick={() => onSent()} /> : null}
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

Main.propTypes = {
    user: PropTypes.shape({
        photoURL: PropTypes.string,
        email: PropTypes.string,
        displayName: PropTypes.string,
        providerData: PropTypes.arrayOf(
            PropTypes.shape({
                photoURL: PropTypes.string,
            })
        ),
    }),
};

export default Main;