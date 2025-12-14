import React from 'react';
import '../styles/ChunkDetailPanel.css';

export default function ChunkDetailPanel({ chunk, onClose }) {
  if (!chunk) return null;

  return (
    <div className="detail-panel-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}>
        <div className="detail-panel-header">
          <h2>Chunk {chunk.id} Details</h2>
          <button className="detail-panel-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="detail-panel-content">
          <div className="detail-section">
            <div className="detail-meta">
              <span className="detail-label">Word Count:</span>
              <span className="detail-value">{chunk.wordCount} words</span>
            </div>
            {chunk.qrel !== undefined && (
              <div className="detail-meta">
                <span className="detail-label">Relevance:</span>
                <span className={`detail-value relevance-${chunk.qrel}`}>
                  {chunk.qrel === 2 ? 'Highly Relevant' : 
                   chunk.qrel === 1 ? 'Partially Relevant' : 
                   'Not Relevant'}
                </span>
              </div>
            )}
          </div>

          <div className="detail-section">
            <h3>Raw Text</h3>
            <div className="detail-text-content">
              {chunk.rawText || 'No text available.'}
            </div>
          </div>

          {chunk.card && chunk.card.card && (
            <div className="detail-section">
              <h3>Summary</h3>
              <div className="detail-text-content">
                {chunk.card.card.summary || 'No summary available yet.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

