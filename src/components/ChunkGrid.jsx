import React from 'react';
import { getSnippet } from '../utils/dataLoader';
import '../styles/ChunkGrid.css';

export default function ChunkGrid({ 
  chunks, 
  isCardView, 
  showRelevance, 
  onChunkClick 
}) {
  if (!chunks || chunks.length === 0) {
    return (
      <div className="chunk-grid-empty">
        <p>No chunks available.</p>
      </div>
    );
  }

  return (
    <div className="chunk-grid">
      {chunks.map(chunk => {
        const relevanceClass = showRelevance 
          ? `relevance-${chunk.qrel}` 
          : '';
        
        return (
          <div
            key={chunk.id}
            className={`chunk-tile ${relevanceClass}`}
            onClick={() => onChunkClick(chunk)}
          >
            <div className="chunk-tile-header">
              <span className="chunk-id">Chunk {chunk.id}</span>
              <span className="chunk-word-count">{chunk.wordCount} words</span>
            </div>
            
            {isCardView && chunk.card ? (
              <div className="chunk-tile-card">
                <div className="card-field">
                  <span className="card-label">Topic:</span>
                  <span className="card-value">{chunk.card.card.topic || 'N/A'}</span>
                </div>
                <div className="card-field">
                  <span className="card-label">Section:</span>
                  <span className="card-value">{chunk.card.card.section || 'N/A'}</span>
                </div>
                {chunk.card.card.entities && chunk.card.card.entities.length > 0 && (
                  <div className="card-field">
                    <span className="card-label">Entities:</span>
                    <span className="card-value">
                      {chunk.card.card.entities.slice(0, 3).join(', ')}
                      {chunk.card.card.entities.length > 3 && '...'}
                    </span>
                  </div>
                )}
                {chunk.card.card.metrics && chunk.card.card.metrics.length > 0 && (
                  <div className="card-field">
                    <span className="card-label">Metrics:</span>
                    <span className="card-value">
                      {chunk.card.card.metrics.slice(0, 2).join(', ')}
                      {chunk.card.card.metrics.length > 2 && '...'}
                    </span>
                  </div>
                )}
                {chunk.card.card.summary && (
                  <div className="card-summary">
                    {getSnippet(chunk.card.card.summary, 100)}
                  </div>
                )}
              </div>
            ) : (
              <div className="chunk-tile-snippet">
                {getSnippet(chunk.rawText, 80)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

