const disjuntores = [false, false, true, false, false, true, false, false];

disjuntores.filter((element, index) => {
    element ? console.log(index) : false
})