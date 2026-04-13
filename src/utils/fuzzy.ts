export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[a.length][b.length];
}

export function isFuzzyMatch(query: string, text: string): boolean {
  if (query.trim() === "") return true;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  if (textLower.includes(queryLower)) return true;

  // Split query into words
  const queryParts = queryLower.split(" ").filter(Boolean);
  // Split text into words, removing punctuation that might glue words together
  const textWords = textLower.replace(/[^\w\s-]/g, ' ').split(/[\s]+/).filter(Boolean);

  return queryParts.every(part => {
    // Exact partial match
    if (textLower.includes(part)) return true;
    
    // Scattered substring match (e.g. 'gt' matches 'go to')
    let patternIdx = 0;
    for (let i = 0; i < textLower.length && patternIdx < part.length; i++) {
      if (part[patternIdx] === textLower[i]) patternIdx++;
    }
    if (patternIdx === part.length) return true;

    // Typo tolerance checking per word
    return textWords.some(word => {
      // Allows 1 typo for ~4 char words, 2 typos for longer words
      const maxDistance = part.length < 3 ? 0 : Math.min(2, Math.max(1, Math.floor(part.length / 4)));
      return levenshteinDistance(part, word) <= maxDistance;
    });
  });
}
