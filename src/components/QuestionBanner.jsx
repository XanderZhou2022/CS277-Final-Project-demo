import React from 'react';
import '../styles/QuestionBanner.css';

export default function QuestionBanner({ question, onClose }) {
  if (!question) return null;

  return (
    <div className="question-banner">
      <div className="question-banner-content">
        <div className="question-banner-label">Question:</div>
        <div className="question-banner-text">{question}</div>
      </div>
      {onClose && (
        <button className="question-banner-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      )}
    </div>
  );
}





