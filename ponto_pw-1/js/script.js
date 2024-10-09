document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirmButton');
    const punchButton = document.getElementById('punchButton'); // Botão Bater Ponto
    const overlay = document.getElementById('overlay'); // O overlay
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const currentDateElem = document.getElementById('currentDate');
    const currentTimeElem = document.getElementById('currentTime');

    // Função para mostrar a mensagem de sucesso
    function showSuccessMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.innerText = "Ponto salvo com sucesso!";
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.padding = '15px';
        messageDiv.style.backgroundColor = '#4CAF50'; // Verde
        messageDiv.style.color = 'white';
        messageDiv.style.fontSize = '16px';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.borderRadius = '5px';

        const closeButton = document.createElement('button');
        closeButton.innerText = "Fechar";
        closeButton.style.marginLeft = '10px';
        closeButton.style.backgroundColor = '#ffffff';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';

        closeButton.addEventListener('click', function() {
            messageDiv.remove();
        });

        messageDiv.appendChild(closeButton);
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Função para atualizar a data e a hora na tela principal
    function updateDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = now.toLocaleDateString('pt-BR', options);
        const time = now.toLocaleTimeString('pt-BR');

        currentDateElem.innerText = date;
        currentTimeElem.innerText = time;
    }

    // Função para mostrar a sobreposição
    punchButton.addEventListener('click', function() {
        overlay.style.display = 'block'; // Exibe a sobreposição
        updateOverlayDateTime(); // Atualiza a data e hora na sobreposição
    });

    // Função para atualizar a data e hora na sobreposição
    function updateOverlayDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = now.toLocaleDateString('pt-BR', options);
        const time = now.toLocaleTimeString('pt-BR');
        
        const overlayDateTime = document.getElementById('overlayDateTime');
        overlayDateTime.innerText = `Data: ${date} - Hora: ${time}`;
    }

    // Chama a função para exibir a data e hora atuais
    updateDateTime();
    
    // Atualiza a data e hora a cada segundo
    setInterval(updateDateTime, 1000);

    // Evento de clique para salvar o ponto
    confirmButton.addEventListener('click', function() {
        const name = document.getElementById('employeeName').value;
        const ra = document.getElementById('employeeRA').value;
        const action = document.getElementById('actionSelect').value;
        const entryDate = document.getElementById('entryDate').value;

        if (name && ra && action && entryDate) {
            const record = { name, ra, action, date: entryDate, file: null };
            records.push(record);
            localStorage.setItem('records', JSON.stringify(records));

            // Mostrar a mensagem de sucesso
            showSuccessMessage();

            // Limpar os campos após salvar
            document.getElementById('employeeName').value = '';
            document.getElementById('employeeRA').value = '';
            document.getElementById('actionSelect').value = '';
            document.getElementById('entryDate').value = '';

            // Fechar o overlay após salvar
            overlay.style.display = 'none';
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Evento para fechar o overlay
    document.getElementById('closeButton').addEventListener('click', function() {
        overlay.style.display = 'none'; // Esconde a sobreposição
    });

    // Evento para o botão de relatórios
    const goToReports = document.getElementById('goToReports');
    goToReports.addEventListener('click', function() {
        window.location.href = 'relatorio.html'; // Mude para o caminho correto do seu arquivo de relatórios
    });
});
