
const difficultyScore = (difficulty: string) => {
    let score = 0;
    switch (difficulty) {
        case "easy":
            score = 10;
            break;
        case "medium":
            score = 30;
            break;
        case "hard":
            score = 50;
            break;
        case "expert":
            score = 100;
            break;
        default:
            break;
    }
    return score;
}

export default difficultyScore;