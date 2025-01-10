import React, { useState } from "react";
import { Link } from 'react-router-dom';

import Paragraph from "../Paragraph/Paragraph";
import newsImg from '../../assets/news/sample-news-img.png';

const newsItems = [
    { date: 'August 10, 2023', title: 'Don’t: Passive income in 5 ways', image: newsImg },
    { date: 'August 12, 2023', title: 'Don’t: Passive income in 5 ways', image: newsImg },
    { date: 'August 15, 2023', title: 'Do: 5 ways for passive income', image: newsImg },
    { date: 'August 20, 2023', title: 'Do: 5 ways for passive income', image: newsImg },
    { date: 'August 22, 2023', title: 'Don’t: Passive income in 5 ways', image: newsImg },
    { date: 'August 24, 2023', title: 'Do: 5 ways for passive income', image: newsImg },
    { date: 'August 26, 2023', title: 'Do: 5 ways for passive income', image: newsImg },
];

const NewsItem = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + itemsPerPage, newsItems.length - itemsPerPage));
    };

    const displayedItems = newsItems.slice(currentIndex, currentIndex + itemsPerPage);

    const isPreviousDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex + itemsPerPage >= newsItems.length;



    const [currentIndexSm, setCurrentIndexSm] = useState(0);
    const itemsPerPageSm = 3;

    const handlePreviousSm = () => {
        setCurrentIndexSm(prevIndex => Math.max(prevIndex - itemsPerPageSm, 0));
    };

    const handleNextSm = () => {
        setCurrentIndexSm(prevIndex => Math.min(prevIndex + itemsPerPageSm, newsItems.length - itemsPerPageSm));
    };

    const displayedItemsSm = newsItems.slice(currentIndexSm, currentIndexSm + itemsPerPageSm);

    const isPreviousDisabledSm = currentIndexSm === 0;
    const isNextDisabledSm = currentIndexSm + itemsPerPageSm >= newsItems.length;



    return (
        <>
            <div className="news-content list">
                <div className="list-heading">
                    <Paragraph text="Recent news" className="news-pagination-label" />
                    <div className="frame-2">
                        <button className={`img-wrapper ${isPreviousDisabled ? 'disabled' : ''}`} onClick={handlePrevious} disabled={isPreviousDisabled}>
                            <svg className={`img img-previous ${isPreviousDisabled ? 'disabled' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z" fill="" />
                            </svg>
                        </button>
                        <button className={`img-wrapper ${isNextDisabled ? 'disabled' : ''} `} onClick={handleNext} disabled={isNextDisabled}>
                            <svg className={`img img-next ${isNextDisabled ? 'disabled' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" fill="" />
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="divider" />
                <div className="list-container">
                    <div className="list-group">
                        {displayedItems.map((item, index) => (
                            <div className="list-item" key={currentIndex + index}>
                                <img className="recent-news-list-item" src={item.image} alt="" />
                                <div className="list-item-content">
                                    <div className="div-4">
                                        <div className="publish-date-container news-item">
                                            <Paragraph text="Published" className="publish-date-text" />
                                            <Paragraph text={item.date} className="publish-date-text" />
                                        </div>
                                        <Paragraph text={item.title} className="news-item-name news-item-name-md" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/" className="secondary-CTA" rel="noopener noreferrer" >
                        All recent news (+{newsItems.length - (currentIndex + itemsPerPage)} more)
                    </Link>
                </div>
            </div>

            
            <div className="news-content list list-sm">
                <div className="list-heading">
                    <Paragraph text="Recent news" className="news-pagination-label" />
                    <div className="frame-2">
                        <button className={`img-wrapper ${isPreviousDisabledSm ? 'disabled' : ''}`} onClick={handlePreviousSm} disabled={isPreviousDisabledSm}>
                            <svg className={`img img-previous ${isPreviousDisabledSm ? 'disabled' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z" fill="" />
                            </svg>
                        </button>
                        <button className={`img-wrapper ${isNextDisabledSm ? 'disabled' : ''} `} onClick={handleNextSm} disabled={isNextDisabledSm}>
                            <svg className={`img img-next ${isNextDisabledSm ? 'disabled' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" fill="" />
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="divider" />
                <div className="list-container">
                    <div className="list-group">
                        {displayedItemsSm.map((item, index) => (
                            <div className="list-item" key={currentIndexSm + index}>
                                <img className="recent-news-list-item" src={item.image} alt="" />
                                <div className="list-item-content">
                                    <div className="div-4">
                                        <div className="publish-date-container news-item">
                                            <Paragraph text="Published" className="publish-date-text" />
                                            <Paragraph text={item.date} className="publish-date-text" />
                                        </div>
                                        <Paragraph text={item.title} className="news-item-name news-item-name-md" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/" className="secondary-CTA" rel="noopener noreferrer" >
                        All recent news (+{newsItems.length - (currentIndexSm + itemsPerPageSm)} more)
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NewsItem;