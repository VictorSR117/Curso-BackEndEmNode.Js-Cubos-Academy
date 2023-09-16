function processData(input) {
    let lines = input.trim().split('\n');
    let numberOfEmployeesCubos = parseInt(lines[0]);
    let maxDistance = 0;

    for (let i = 1; i <= numberOfEmployeesCubos; i++) {
        let [x1, y1] = lines[i].trim().split(' ').map(Number);
        for (let j = i + 1; j <= numberOfEmployeesCubos; j++) {
            let [x2, y2] = lines[j].trim().split(' ').map(Number);
            let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            maxDistance = Math.max(maxDistance, distance);
        }
    }
    console.log(maxDistance);
} 

processData(`5
3.56 17
-5.1 36.3
0.0002 -2
5 5
-9.01 -17.7`)