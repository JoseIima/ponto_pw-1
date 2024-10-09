document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, checar com um backend ou verificar no localStorage
    // Para fins de exemplo, vamos apenas redirecionar se o usuário não estiver vazio

    if (username && password) {
        // Redireciona para a página de bater ponto (substitua pelo caminho correto)
        window.location.href = 'index.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Usuário ou senha inválidos.';
    }
});
