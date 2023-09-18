function difficultyFind(labelarr:any) {
    const easyLabels = ['easy', 'beginner'];
    const mediumLabels = ['medium', 'intermediate'];
    const hardLabels = ['hard', 'advanced'];
    const expertLabels = ['expert'];
    
    let difficulty = '';
    
    if (labelarr.some(label => easyLabels.includes(label.name))) {
      difficulty = 'easy';
    } else if (labelarr.some(label => mediumLabels.includes(label.name))) {
      difficulty = 'medium';
    } else if (labelarr.some(label => hardLabels.includes(label.name))) {
      difficulty = 'hard';
    } else if (labelarr.some(label => expertLabels.includes(label.name))) {
      difficulty = 'expert';
    } else {
      difficulty = 'easy';
    }
    return difficulty;
}

export default difficultyFind;