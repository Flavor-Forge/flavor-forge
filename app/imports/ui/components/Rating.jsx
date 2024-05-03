import React from 'react';

const Rating = ({ max = 5, value = 0 }) => {
  value = Math.floor(value);
  const numStarsToShow = Math.min(value, max); // Show up to 'value' number of stars, capped at 'max'

  return (
    <div>
      {Array.from({ length: numStarsToShow }, (_, index) => index + 1).map(index => (
        <span
          style={{ fontSize: 25 }}
          key={index}
          tabIndex={0}
        >
          ★
        </span>
      ))}
      {Array.from({ length: max - numStarsToShow }, (_, index) => index + numStarsToShow + 1).map(index => (
        <span
          style={{ fontSize: 25 }}
          key={index}
          tabIndex={0}
        >
          ☆
        </span>
      ))}
    </div>
  );
};

export default Rating;
