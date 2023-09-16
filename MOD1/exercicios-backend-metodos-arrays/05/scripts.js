const pacientes = ['José', 'Pedro', 'Maria', 'João', 'Ana', 'Bárbara', 'Joana'];
let operation = "agendar";
let name = "Roberto";

agendarPaciente = (pacientes, name) => {
    pacientes.push(name);
    console.log(pacientes.join(", "));
}

atenderPaciente = pacientes => {
    pacientes.shift();
    console.log(pacientes.join(", "));
}

cancelarAtendimento = (pacientes, name) => {
    let indexPacient = pacientes.indexOf(name);
    pacientes.splice(indexPacient, 1);
    console.log(pacientes.join(", "));
}

agendarPaciente(pacientes, name);
agendarPaciente(pacientes, "Victor");
atenderPaciente(pacientes);
cancelarAtendimento(pacientes, name);