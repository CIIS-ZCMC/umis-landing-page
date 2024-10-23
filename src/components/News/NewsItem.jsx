import React, { useState } from "react";
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

    

    return (
        <div className="list">
            <div className="list-heading">
                <div className="text-wrapper-9">Recent news</div>
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
            <div className="div-3">
                <div className="list-group">
                    {displayedItems.map((item, index) => (
                        <div className="list-item" key={currentIndex + index}>
                            <img className="recent-news-list-item" src={item.image} alt="" />
                            <div className="frame-4">
                                <div className="div-4">
                                    <p className="text-wrapper-10">Published {item.date}</p>
                                    <p className="text-wrapper-11">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="secondary-CTA" href="#" rel="noopener noreferrer">
                    All recent news (+{newsItems.length - (currentIndex + itemsPerPage)} more)
                </a>
            </div>
        </div>
    );
};

export default NewsItem;