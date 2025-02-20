import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
};

export const renderTable = (element, users = []) => {
    if (!table) {
        table = createTable();
        element.append(table);
    }

    let tableHTML = '';
    users.forEach(user => {
        const statusClass = user.isActive ? 'status-active' : 'status-inactive';
        const statusText = user.isActive ? 'Activo' : 'Inactivo';
        
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>$${user.balance.toFixed(2)}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>
                    <div class="table-actions">
                        <a href="#/" class="action-select" data-id="${user.id}">Editar</a>
                        <a href="#/" class="action-delete" data-id="${user.id}">Eliminar</a>
                    </div>
                </td>
            </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;
};
