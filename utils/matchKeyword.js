// Ikki so'z orasidagi farqni hisoblaydi
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function matchKeyword(text, keywords) {
  const userText = text.trim().toLowerCase();

  // Avval 100% mosligini tekshiramiz
  const exactMatch = keywords.find(
    (item) => item.keyword.toLowerCase() === userText
  );

  if (exactMatch) {
    return exactMatch;
  }

  // Juda qisqa so'zlarda fuzzy matching xavfli
  if (userText.length < 4) {
    return null;
  }

  let bestMatch = null;
  let bestDistance = Infinity;

  for (const item of keywords) {
    const keyword = item.keyword.trim().toLowerCase();

    const distance = levenshteinDistance(userText, keyword);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = item;
    }
  }

  // 4-6 harfli keywordlarda maksimum 1 ta xato
  // 7+ harfli keywordlarda maksimum 2 ta xato
  const allowedDistance = userText.length >= 7 ? 2 : 1;

  if (bestDistance <= allowedDistance) {
    return bestMatch;
  }

  return null;
}

module.exports = matchKeyword;