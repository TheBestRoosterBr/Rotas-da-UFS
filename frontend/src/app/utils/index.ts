export function levenshtein(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;

    const distMatrix: number[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++)
        distMatrix[i][0] = i;

    for (let j = 0; j <= len2; j++)
        distMatrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;

            distMatrix[i][j] = Math.min(
                distMatrix[i - 1][j] + 1,
                distMatrix[i][j - 1] + 1,
                distMatrix[i - 1][j - 1] + cost
            );
        }
    }

    return distMatrix[len1][len2];
}

