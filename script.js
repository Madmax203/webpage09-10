const modalLoginEl = document.getElementById('modalLogin');
const modalRegistroEl = document.getElementById('modalRegistro');
const modalLogin = new bootstrap.Modal(modalLoginEl);
const modalRegistro = new bootstrap.Modal(modalRegistroEl);

const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const mensagem = document.getElementById('mensagem');

// Mostra um aviso na página
function mostrarMensagem(texto, tipo = 'success') {
  mensagem.textContent = texto;
  mensagem.className = `alert alert-${tipo}`;
}

// Alterna entre os dois modais
document.getElementById('irParaRegistro').addEventListener('click', (e) => {
  e.preventDefault();
  modalLogin.hide();
  modalLoginEl.addEventListener('hidden.bs.modal', () => modalRegistro.show(), { once: true });
});

document.getElementById('irParaLogin').addEventListener('click', (e) => {
  e.preventDefault();
  modalRegistro.hide();
  modalRegistroEl.addEventListener('hidden.bs.modal', () => modalLogin.show(), { once: true });
});

// Login
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formLogin.checkValidity()) {
    formLogin.classList.add('was-validated');
    return;
  }

  const email = document.getElementById('loginEmail').value;

  // Aqui você chamaria sua API (fetch) para autenticar o usuário
  modalLogin.hide();
  mostrarMensagem(`Login realizado com ${email}.`);
  formLogin.reset();
  formLogin.classList.remove('was-validated');
});

// Registro
formRegistro.addEventListener('submit', (e) => {
  e.preventDefault();

  const senha = document.getElementById('regSenha');
  const confirma = document.getElementById('regConfirma');

  // Confere se as senhas são iguais
  confirma.setCustomValidity(senha.value === confirma.value ? '' : 'diferente');

  if (!formRegistro.checkValidity()) {
    formRegistro.classList.add('was-validated');
    return;
  }

  const nome = document.getElementById('regNome').value;

  // Aqui você chamaria sua API (fetch) para criar a conta
  modalRegistro.hide();
  mostrarMensagem(`Conta criada com sucesso, ${nome}!`);
  formRegistro.reset();
  formRegistro.classList.remove('was-validated');
});

// Limpa validação ao fechar os modais
[modalLoginEl, modalRegistroEl].forEach((el) => {
  el.addEventListener('hidden.bs.modal', () => {
    const form = el.querySelector('form');
    form.reset();
    form.classList.remove('was-validated');
  });
});
