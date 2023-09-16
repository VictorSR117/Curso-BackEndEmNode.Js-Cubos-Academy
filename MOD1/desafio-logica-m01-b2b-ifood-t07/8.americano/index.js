function solucao(numbers) {
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
  
    let positionGoalkeeper = sum % numbers.length;
    if (positionGoalkeeper === 0) positionGoalkeeper = numbers.length;
    
    console.log(positionGoalkeeper);
}