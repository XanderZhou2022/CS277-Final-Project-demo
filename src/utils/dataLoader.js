/**
 * Data loading and normalization utilities
 */

/**
 * Normalize chunk ID to string for consistent comparison
 */
export function normalizeChunkId(id) {
  return String(id);
}

/**
 * Calculate word count from text
 */
export function getWordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Get snippet of text (first N characters)
 */
export function getSnippet(text, maxLength = 80) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Load and merge chunk data with cards
 */
export async function loadChunkData() {
  try {
    // Load chunk data
    // Files are in ../data_overview/ relative to front_end/
    // Vite is configured to serve from parent directory
    const chunkResponse = await fetch('/data_overview/chunk_special_transformed.json');
    if (!chunkResponse.ok) {
      throw new Error(`Failed to load chunk data: ${chunkResponse.statusText}`);
    }
    const chunkData = await chunkResponse.json();
    
    // Use first example
    const example = chunkData[0];
    
    // Load cards data
    const cardsResponse = await fetch('/data_overview/cards.json');
    if (!cardsResponse.ok) {
      throw new Error(`Failed to load cards data: ${cardsResponse.statusText}`);
    }
    const cardsData = await cardsResponse.json();
    
    // Create a map of chunk_id to card
    const cardMap = new Map();
    cardsData.forEach(card => {
      const chunkId = normalizeChunkId(card.chunk_id);
      cardMap.set(chunkId, card);
    });
    
    // Merge chunks with their cards
    const chunks = [];
    const textChunks = example.messages['Text chunks'] || {};
    
    Object.keys(textChunks).forEach(chunkId => {
      const normalizedId = normalizeChunkId(chunkId);
      const rawText = textChunks[chunkId];
      const card = cardMap.get(normalizedId);
      const qrel = example.qrel[chunkId] || 0;
      
      chunks.push({
        id: normalizedId,
        rawText,
        wordCount: getWordCount(rawText),
        qrel,
        card: card || null
      });
    });
    
    // Sort by chunk ID (numeric sort)
    chunks.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
    return {
      question: example.messages.question,
      uuid: example.uuid,
      chunks,
      totalChunks: chunks.length
    };
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

