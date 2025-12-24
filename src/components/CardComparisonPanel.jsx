import React from 'react';
import '../styles/CardComparisonPanel.css';

export default function CardComparisonPanel({ chunk, onClose }) {
  if (!chunk || !chunk.card) return null;

  const card = chunk.card.card;

  return (
    <div className="comparison-panel-overlay" onClick={onClose}>
      <div className="comparison-panel" onClick={e => e.stopPropagation()}>
        <div className="comparison-panel-header">
          <h2>Chunk {chunk.id} - Side-by-Side Comparison</h2>
          <button className="comparison-panel-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="comparison-panel-content">
          <div className="comparison-column">
            <h3>Original Chunk</h3>
            <div className="comparison-section">
              <div className="comparison-meta">
                <strong>Chunk ID:</strong> {chunk.id}
              </div>
              <div className="comparison-meta">
                <strong>Word Count:</strong> {chunk.wordCount} words
              </div>
              <div className="comparison-meta">
                <strong>Relevance:</strong>
                <span className={`relevance-badge relevance-${chunk.qrel}`}>
                  {chunk.qrel === 2 ? 'Highly Relevant' : 
                   chunk.qrel === 1 ? 'Partially Relevant' : 
                   'Not Relevant'}
                </span>
              </div>
            </div>
            <div className="comparison-section">
              <h4>Raw Text</h4>
              <div className="comparison-text">
                {chunk.rawText || 'No text available.'}
              </div>
            </div>
          </div>

          <div className="comparison-column">
            <h3>Extracted Card</h3>
            <div className="comparison-section">
              <div className="card-field-row">
                <strong>Topic:</strong>
                <span>{card.topic || 'N/A'}</span>
              </div>
              <div className="card-field-row">
                <strong>Section:</strong>
                <span>{card.section || 'N/A'}</span>
              </div>
              {card.period && (
                <div className="card-field-row">
                  <strong>Period:</strong>
                  <span>{card.period}</span>
                </div>
              )}
              <div className="card-field-row">
                <strong>Boilerplate:</strong>
                <span>{card.boilerplate_flag ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {card.entities && card.entities.length > 0 && (
              <div className="comparison-section">
                <h4>Entities</h4>
                <div className="card-list">
                  {card.entities.map((entity, idx) => (
                    <span key={idx} className="card-tag">{entity}</span>
                  ))}
                </div>
              </div>
            )}

            {card.metrics && card.metrics.length > 0 && (
              <div className="comparison-section">
                <h4>Metrics</h4>
                <div className="card-list">
                  {card.metrics.map((metric, idx) => (
                    <span key={idx} className="card-tag">{metric}</span>
                  ))}
                </div>
              </div>
            )}

            {card.numbers && card.numbers.length > 0 && (
              <div className="comparison-section">
                <h4>Numbers</h4>
                <div className="card-list">
                  {card.numbers.map((number, idx) => (
                    <span key={idx} className="card-tag">{number}</span>
                  ))}
                </div>
              </div>
            )}

            {card.summary && (
              <div className="comparison-section">
                <h4>Summary</h4>
                <div className="comparison-text">
                  {card.summary}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





