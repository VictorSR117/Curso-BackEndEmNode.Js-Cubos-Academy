const pacientes = ['José', 'Pedro', 'Maria', 'João', 'Ana', 'Bárbara', 'Joana'];
let operation = "agendar"
let name = "Victor"

atendment = (pacientes, operation, name="") => {
    if(operation === "agendar") {
        pacientes.push(name);
        console.log(pacientes);
    }
    else if (operation === "atender") {
        pacientes.shift();
        console.log(pacientes);
    }
    else console.log("Operação inválida");
}

atendment(pacientes, operation, name)