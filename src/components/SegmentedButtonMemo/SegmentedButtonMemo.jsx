import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Paragraph from "../Paragraph/Paragraph";

import fileArrowDown from '../../assets/file-arrow-down.svg';
import announcementOpen from '../../assets/open.svg';

const SegmentedButtonMemo = ({ announcementContent, memorandumContent }) => {
    const [selected, setSelected] = useState('announcement'); // Default selection: 'announcement'

    const handleClick = (option) => {
        setSelected(option);
    };

    return (
        <div className="segmented-button-container">
            <div className="segmented-button-group">
                <button className={`segmented-button ${selected === 'announcement' ? 'selected' : ''}`} onClick={() => handleClick('announcement')}>
                    Announcements
                </button>
                <button className={`segmented-button ${selected === 'memorandum' ? 'selected' : ''}`} onClick={() => handleClick('memorandum')}>
                    Memoranda
                </button>
            </div>

            {/* Content Display */}
            <div className="segmented-button-body">
                <div className='memo-announcement'>
                    {selected === 'announcement' && (
                        <div className='memo-announcement-column'>
                            {announcementContent.map((item, index) => (
                                <Link to={item.link} className="memo-announcement-card" key={index} rel="noopener noreferrer" >
                                    <div className="memo-card-content">
                                        <span className="memo-announcement-date-published">
                                            <Paragraph text={item.date} className="memo-announcement-card-date" />
                                            <Paragraph text={item.time} className="memo-announcement-card-time" />
                                        </span>
                                        <Paragraph text={item.title} className="memo-announcement-card-title" />
                                    </div>
                                    <div className="memo-file-icon">
                                        <img src={announcementOpen} alt="Open announcement icon" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {selected === 'memorandum' && (
                        <div className='memo-announcement-column'>
                            {memorandumContent.map((item, index) => (
                                <Link to={item.link} className="memo-announcement-card" key={index} rel="noopener noreferrer" >
                                    <div className="memo-card-content">
                                        <span className="memo-announcement-date-published">
                                            <Paragraph text={item.date} className="memo-announcement-card-date" />
                                            <Paragraph text={item.time} className="memo-announcement-card-time" />
                                        </span>
                                        <Paragraph text={item.title} className="memo-announcement-card-title" />
                                    </div>
                                    <div className="memo-file-icon">
                                        <img src={fileArrowDown} alt="File download icon" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default SegmentedButtonMemo;
