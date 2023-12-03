const campos = document.querySelectorAll(".required");
const erro = document.querySelectorAll(".erro");
const form = document.getElementById("meuFormulario");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validanome();
  validaNomeMae();
  testTelFixo();
  testTelCel();
  testEndereco();
  testLogin();
  validaSenha();
  comparaSenha();
});

console.log(erro.length);

form.addEventListener("reset", () => {
  for (var i = 0; i < erro.length; i++) {
    erro[i].setAttribute("style", "visibility: hidden");
    campos[i].setAttribute("style", "border: 1px solid #ccc");
  }
});

// ================== FUNC ERRO ===============
// define erro
function error(index) {
  erro[index].setAttribute("style", "visibility: visible");
  campos[index].setAttribute("style", "border: 1px solid red");
}

//retira erro
function cleanError(index) {
  erro[index].setAttribute("style", "visibility: hidden");
  campos[index].setAttribute("style", "border: 1px solid lime");
}

function reset(index) {
  setAttribute("style", "visibility: hidden");
  setAttribute("style", "border: none");
}

//================================= primeira letra maiúscula ===============
const formataUpperCase = (event) => {
  let input = event.target;
  input.value = formatarUpperCase(input.value);
};

const formatarUpperCase = (value) => {
  if (value != null) {
    value = value.replace(/(?:^|\s)\S/g, function (capitalize) {
      return capitalize.toUpperCase();
    });
    return value;
  }
};
//================================= end: primeira letra maiúscula ===============

//========================= NOME ==========================

function validanome() {
  const onlyLetras = /^[a-zA-Z \W]*$/;
  if (!onlyLetras.test(campos[0].value)) {
    formataUpperCase(event);
    error(0);
    erro[0].textContent = "Apenas letras.";
  } else if (campos[0].value.length < 15) {
    formataUpperCase(event);
    error(0);
    erro[0].textContent = "Digite o nome completo.";
  } else if (campos[0].value.length > 60) {
    formataUpperCase(event);
    error(0);
    erro[0].textContent = "Abrevie o nome.";
  } else if (campos[0].value.length > 15 && campos[0].value.length < 60) {
    formataUpperCase(event);
    cleanError(0);
  }
}

//==================================== NOME MATERNO ====================================
function validaNomeMae() {
  const onlyLetras = /^[a-zA-Z \W]*$/;
  if (!onlyLetras.test(campos[1].value)) {
    formataUpperCase(event);
    error(1);
    erro[1].textContent = "Apenas letras.";
  } else if (campos[1].value.length < 15) {
    formataUpperCase(event);
    error(1);
    erro[1].textContent = "Digite o nome completo.";
  } else if (campos[0].value.length > 60) {
    formataUpperCase(event);
    error(1);
    erro[1].textContent = "Abrevie o nome.";
  } else if (campos[1].value.length > 15 && campos[1].value.length < 60) {
    formataUpperCase(event);
    cleanError(1);
  }
}

//========================= TELEFONES ==========================
//=========================== telefone fixo ======================

const handlePhoneFixo = (event) => {
  let input = event.target;
  input.value = phoneMaskFixo(input.value);
};

const phoneMaskFixo = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/^\d{6}[6-9]/g, "");
  value = value.replace(/(\d{0})(\d{2})(\d)/, "+55$1 ($2) $3");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

function testTelFixo() {
  if (campos[4].value.length !== 18) {
    error(4);
    erro[4].textContent = "Digite um número de telefone válido.";
  } else {
    cleanError(4);
  }
}

//=========================== telefone celular ======================
const handlePhoneCel = (event) => {
  let input = event.target;
  input.value = phoneMaskCel(input.value);
};

const phoneMaskCel = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{0})(\d{2})(\d)/, "+55$1 ($2) $3");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

function testTelCel() {
  if (campos[3].value.length !== 19) {
    error(3);
    erro[3].textContent = "Digite um número de telefone válido.";
  } else {
    cleanError(3);
  }
}

// //============================== ENDEREÇO ========================
function testEndereco() {
  const endInicio = /^(Rua|Avenida|Travessa|Av)/;
  const compareEnd = /\s[\w\s\D\d]{9}\s\w*/;

  if (endereco.value.length < 20) {
    formataUpperCase(event);
    error(5);
    erro[5].textContent = "Digite o endereço completo.";
  } else if (!endInicio.test(endereco.value)) {
    formataUpperCase(event);
    error(5);
    erro[5].textContent = "Infome: Rua, Avenida ou Travessa";
  } else if (!compareEnd.test(endereco.value)) {
    formataUpperCase(event);
    error(5);
    erro[5].textContent =
      "Separe o endereço com vírgulas ou hífens. Ex.: Rua Exemplo, 00, Bairro - Cidade - Estado";
  } else {
    formataUpperCase(event);
    cleanError(5);
  }
}

//================================= LOGIN ===========================================
function testLogin() {
  const validaLogin = /^[a-zA-Z]{6}$/;
  if (!validaLogin.test(campos[6].value)) {
    error(6);
    erro[6].textContent =
      "Seu login deve conter exatamente 6 dígitos, excluídos números e caracteres especiais (, . ^ ? ~ = + - _ / *  +)";
  } else {
    cleanError(6);
  }
}

//================================= SENHAS ===========================================
function validaSenha() {
  const validaSenha = /^[\w]{7}$/;
  return validaSenha.test(senha.value);
}

function validaSenha() {
  if (campos[7].value.length != 7) {
    comparaSenha();
    error(7);
    erro[7].textContent = "Exatamente 7 caracteres.";
  } else if (comparaSenha()) {
    error(7);
    erro[7].textContent = "As senhas não conferem.";
  } else {
    cleanError(7);
    comparaSenha();
  }
}

function comparaSenha() {
  if (campos[7].value != campos[8].value) {
    error(8);
    erro[8].textContent = "As senhas não conferem.";
  } else {
    cleanError(8);
  }
}

//========================= CPF =======================

document.addEventListener("DOMContentLoaded", function () {
  function validarCPF() {
    var cpf = document.getElementById("cpf").value.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    var regexCPF = /^\d{11}$/; // CPF deve ter exatamente 11 dígitos numéricos

    if (!regexCPF.test(cpf) || !validarDigitoVerificador(cpf)) {
      error(2);
      erro[2].textContent = "Digite um CPF válido.";
    } else {
      cleanError(2);
    }
  }

  function validarDigitoVerificador(cpf) {
    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    return resto === parseInt(cpf.substring(10, 11));
  }

  var cpfInput = document.getElementById("cpf");
  cpfInput.addEventListener("input", validarCPF);

  // Adicione este campo se necessário para validar ao enviar o formulário
  document
    .getElementById("meuFormulario")
    .addEventListener("submit", function (event) {
      validarCPF();

      var mensagensErro = document.querySelectorAll(".error-message");
      var temErros = false;
      for (var i = 0; i < mensagensErro.length; i++) {
        if (mensagensErro[i].innerHTML !== "") {
          temErros = true;
          break;
        }
      }
      if (temErros) {
        event.preventDefault();
      }
    });
});

//========================= CPF replace =======================

function testCPF() {
  if (campos[2].value.length == 3 || campos[2].value.length == 7) {
    campos[2].value += ".";
  }
  if (campos[2].value.length == 11) {
    campos[2].value += "-";
  }
  // const onlyNumeros = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
  // if (!onlyNumeros.test(campos[2].value)) {
  //   error(2);
  //   erro[2].textContent = "Apenas números.";
  // } else if (campos[2].value.length != 14) {
  //   erro[2].textContent = "Digite um CPF válido";
  // } else if (campos[2].value.length == 14) {
  //   cleanError(2);
  // }
}
