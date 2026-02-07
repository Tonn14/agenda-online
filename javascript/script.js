const inicio = 9;
const fim = 18;
const intervalo = 30;

function gerarHorarios() {
  let horarios = [];
  for (let h = inicio * 60; h < fim * 60; h += intervalo) {
    const hora = String(Math.floor(h / 60)).padStart(2, "0");
    const min = String(h % 60).padStart(2, "0");
    horarios.push(`${hora}:${min}`);
  }
  return horarios;
}

function carregarHorarios() {
  const data = document.getElementById("data").value;
  const duracao = parseInt(document.getElementById("servico").value);
  const select = document.getElementById("hora");

  select.innerHTML = '<option value="">Selecione o horário</option>';

  if (!data || !duracao) return;

  const agendados = JSON.parse(localStorage.getItem(data)) || [];
  const horarios = gerarHorarios();

  horarios.forEach((hora, index) => {
    const blocos = duracao / intervalo;
    let disponivel = true;

    for (let i = 0; i < blocos; i++) {
      if (agendados.includes(horarios[index + i])) {
        disponivel = false;
      }
    }

    if (disponivel && horarios[index + blocos - 1]) {
      const option = document.createElement("option");
      option.value = hora;
      option.textContent = hora;
      select.appendChild(option);
    }
  });
}

function agendar() {
  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const duracao = parseInt(document.getElementById("servico").value);

  if (!nome || !data || !hora || !duracao) {
    alert("Preencha todos os campos");
    return;
  }

  const horarios = gerarHorarios();
  const index = horarios.indexOf(hora);
  const blocos = duracao / intervalo;

  let agendados = JSON.parse(localStorage.getItem(data)) || [];

  for (let i = 0; i < blocos; i++) {
    agendados.push(horarios[index + i]);
  }

  localStorage.setItem(data, JSON.stringify(agendados));

  const msg =
    `Novo agendamento:%0A%0A` +
    `Nome: ${nome}%0A` +
    `Serviço: ${duracao} minutos%0A` +
    `Data: ${data}%0A` +
    `Horário: ${hora}`;

  const telefone = "5571985297554"; // SEU WHATSAPP
  window.open(`https://wa.me/${telefone}?text=${msg}`, "_blank");

  alert("Horário agendado com sucesso!");
  carregarHorarios();
}
