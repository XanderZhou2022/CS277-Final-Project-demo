import React, { useState, useEffect } from 'react';
import { loadChunkData } from './utils/dataLoader';
import QuestionBanner from './components/QuestionBanner';
import ChunkGrid from './components/ChunkGrid';
import ChunkDetailPanel from './components/ChunkDetailPanel';
import CardComparisonPanel from './components/CardComparisonPanel';
import './styles/App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isCardView, setIsCardView] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    loadChunkData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAskQuestion = () => {
    setShowQuestion(true);
  };

  const handleToggleCardView = () => {
    setIsCardView(!isCardView);
    // Close detail panel when switching views
    setSelectedChunk(null);
    setShowComparison(false);
  };

  const handleChunkClick = (chunk) => {
    setSelectedChunk(chunk);
    // In card view, show comparison; otherwise show detail
    setShowComparison(isCardView);
  };

  const handleClosePanel = () => {
    setSelectedChunk(null);
    setShowComparison(false);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>Error loading data: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-error">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Financial Filing Evidence Selection Demo</h1>
          <div className="header-info">
            <div className="info-item">
              <span className="info-label">Company:</span>
              <span className="info-value">Ameren Corporation Filing (Demo)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Period:</span>
              <span className="info-value">FY 2023</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Chunks:</span>
              <span className="info-value">{data.totalChunks}</span>
            </div>
          </div>
        </div>
      </header>

      {showQuestion && (
        <QuestionBanner 
          question={data.question} 
          onClose={() => setShowQuestion(false)}
        />
      )}

      <main className="app-main">
        <div className="container">
          <div className="controls-bar">
            {!showQuestion && (
              <button 
                className="btn btn-primary"
                onClick={handleAskQuestion}
              >
                Ask the Question
              </button>
            )}
            <button
              className={`btn btn-toggle ${isCardView ? 'active' : ''}`}
              onClick={handleToggleCardView}
            >
              {isCardView ? '📋 Card View' : '📄 Text View'}
            </button>
          </div>

          {showQuestion && (
            <div className="relevance-legend">
              <div className="legend-title">Relevance Legend:</div>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-color relevance-2"></span>
                  <span>Highly Relevant (qrel=2)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color relevance-1"></span>
                  <span>Partially Relevant (qrel=1)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color relevance-0"></span>
                  <span>Not Relevant (qrel=0)</span>
                </div>
              </div>
            </div>
          )}

          <ChunkGrid
            chunks={data.chunks}
            isCardView={isCardView}
            showRelevance={showQuestion}
            onChunkClick={handleChunkClick}
          />
        </div>
      </main>

      {selectedChunk && !showComparison && (
        <ChunkDetailPanel
          chunk={selectedChunk}
          onClose={handleClosePanel}
        />
      )}

      {selectedChunk && showComparison && (
        <CardComparisonPanel
          chunk={selectedChunk}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}

export default App;





