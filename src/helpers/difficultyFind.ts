function difficultyFind(labelarr: string[]) {
    const easyLabels = ['easy', 'beginner'];
    const mediumLabels = ['medium', 'intermediate'];
    const hardLabels = ['hard', 'advanced'];
    const expertLabels = ['expert'];
    
    let difficulty = '';
    
    if (labelarr.some(label => easyLabels.includes(label))) {
      difficulty = 'easy';
    } else if (labelarr.some(label => mediumLabels.includes(label))) {
      difficulty = 'medium';
    } else if (labelarr.some(label => hardLabels.includes(label))) {
      difficulty = 'hard';
    } else if (labelarr.some(label => expertLabels.includes(label))) {
      difficulty = 'expert';
    } else {
      difficulty = 'unknown';
    }
    return difficulty;
}

export default difficultyFind;