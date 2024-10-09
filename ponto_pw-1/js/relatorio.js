document.addEventListener('DOMContentLoaded', function() {
    const reportBody = document.getElementById('reportBody');
    const recordsTable = document.getElementById('recordsTable');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterTypeSelect = document.getElementById('filterType');
    const filterValueInput = document.getElementById('filterValue');
    const applyFilterButton = document.getElementById('applyFilterButton');
    const cancelFilterButton = document.getElementById('cancelFilterButton');
    const filterButton = document.getElementById('filterButton');
    const editOverlay = document.getElementById('editOverlay'); // Overlay para edição

    function loadRecords() {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        recordsTable.innerHTML = ''; // Limpa a tabela existente

        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.ra}</td>
                <td>${record.action}</td>
                <td>${record.date}</td>
                <td><button class="editButton" data-index="${index}">Editar</button></td>
                <td><button class="deleteButton" data-index="${index}">Excluir</button></td>
                <td><input type="file" onchange="uploadFile('${index}', this)"></td>
            `;
            recordsTable.appendChild(row);
        });

        // Adiciona eventos de clique para os botões de editar e excluir
        const editButtons = document.querySelectorAll('.editButton');
        const deleteButtons = document.querySelectorAll('.deleteButton');

        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = button.getAttribute('data-index');
                openEditOverlay(index);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = button.getAttribute('data-index');
                confirmDeletion(index);
            });
        });
    }

    loadRecords();

    // Função para abrir o overlay de edição
    function openEditOverlay(index) {
        editOverlay.style.display = 'flex'; // Exibe o overlay de edição
        const records = JSON.parse(localStorage.getItem('records')) || [];
        const record = records[index];

        // Preenche os campos do overlay de edição com os dados do registro
        document.getElementById('editName').value = record.name;
        document.getElementById('editRA').value = record.ra;
        document.getElementById('editAction').value = record.action;
        document.getElementById('editDate').value = record.date;

        // Salva as mudanças ao clicar no botão salvar
        document.getElementById('saveEditButton').onclick = function() {
            record.name = document.getElementById('editName').value;
            record.ra = document.getElementById('editRA').value;
            record.action = document.getElementById('editAction').value;
            record.date = document.getElementById('editDate').value;

            localStorage.setItem('records', JSON.stringify(records));
            editOverlay.style.display = 'none'; // Fecha o overlay
            loadRecords(); // Recarrega a tabela para refletir as mudanças
        };
    }

    // Fecha o overlay de edição ao pressionar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            editOverlay.style.display = 'none'; // Fecha o overlay
        }
    });

    // Função para confirmar exclusão
    function confirmDeletion(index) {
        const confirmDelete = confirm("Você realmente deseja excluir o ponto?");
        if (confirmDelete) {
            deleteRecord(index);
        }
    }

    // Função para deletar um registro
    function deleteRecord(index) {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        records.splice(index, 1); // Remove o registro pelo índice
        localStorage.setItem('records', JSON.stringify(records));
        loadRecords(); // Recarrega a tabela para refletir a exclusão
    }

    // Abrir a janela de filtro ao clicar no botão
    filterButton.addEventListener('click', function() {
        filterOverlay.style.display = 'flex'; // Exibe o overlay de filtro
    });

    // Fechar a janela de filtro ao clicar no botão Cancelar
    cancelFilterButton.addEventListener('click', function() {
        filterOverlay.style.display = 'none'; // Esconde o overlay de filtro
    });

    // Aplicar o filtro ao clicar no botão Aplicar Filtro
    applyFilterButton.addEventListener('click', function() {
        const filterType = filterTypeSelect.value; // Tipo de filtro (name, ra ou date)
        const filterValue = filterValueInput.value.toLowerCase(); // Valor do filtro

        const rows = reportBody.querySelectorAll('tr');
        rows.forEach(row => {
            const cellValue = row.querySelector(`td:nth-child(${filterType === 'name' ? 1 : filterType === 'ra' ? 2 : 4})`).textContent.toLowerCase();
            
            if (cellValue.includes(filterValue)) {
                row.style.display = ''; // Mostra a linha se o filtro corresponder
            } else {
                row.style.display = 'none'; // Esconde a linha se não corresponder
            }
        });

        filterOverlay.style.display = 'none'; // Esconde o overlay de filtro após aplicar o filtro
    });

    document.getElementById('goToHome').addEventListener('click', function() {
        window.location.href = 'index.html'; // Redireciona para a página principal
    });
});

// Função para fazer upload de arquivo (exemplo simples)
function uploadFile(index, input) {
    const file = input.files[0];
    const records = JSON.parse(localStorage.getItem('records')) || [];
    if (file) {
        records[index].file = file.name; // Apenas salva o nome do arquivo
        localStorage.setItem('records', JSON.stringify(records));
        alert('Arquivo carregado: ' + file.name);
    }
}
