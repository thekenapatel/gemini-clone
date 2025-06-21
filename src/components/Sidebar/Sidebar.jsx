import { useContext, useState } from 'react';
import './Sidebar.css';
import { Context } from '../../context/Context';
import { IconButton } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import MenuIcon from '@mui/icons-material/MenuRounded';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import PropTypes from 'prop-types';


// theme styling
const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const iconSize = 21; // Define your desired icon size here
  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        // width: 30,
        // height: 30,
        borderRadius: '100%',
        backgroundColor: isDarkMode ? '#00000' : '#00000',
        color: isDarkMode ? '#c4c7c5' : '#585858',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: isDarkMode ? '#495057' : '#d8dde3',
        },
      }}
    >
      {/* {isDarkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />} */}
      {isDarkMode ? (
        <DarkModeOutlinedIcon sx={{ fontSize: iconSize }} /> // Changed here
      ) : (
        <LightModeOutlinedIcon sx={{ fontSize: iconSize }} /> // Changed here
      )}
    </IconButton>
  );
};


ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};


const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [isDarkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };


  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };


  return (
    <div className={`sidebar ${!extended ? 'collapsed' : ''}`}>
      <div className="top">
        <div className='menu-icon'>
          <MenuIcon
            onClick={() => setExtended(prev => !prev)}
            style={{ width: '20px', height: '20px' }}
          />
        </div>
        <div className='new-chat'>
          <EditNoteRoundedIcon onClick={newChat} className='newchat-icon' style={{ width: '25px', height: '25px' }} />
          {extended && <p>New chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <p>{item.slice(0, 25)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            className='bottom-icon'
          />
          {extended && <p>Theme</p>}
        </div>

        <div className="bottom-item">
          <SettingsIcon className='bottom-icon' style={{ width: '22px', height: '22px' }} />
          {extended && <p>Settings & Help</p>}
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
