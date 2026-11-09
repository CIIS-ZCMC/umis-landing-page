import React from 'react';

const Paragraph = ({ text, className }) => {
  const content =
    text instanceof Error
      ? text.message
      : typeof text === "object" && text !== null
      ? text.message || JSON.stringify(text)
      : text;
  return <p className={className}>{content}</p>;
};

export default Paragraph;