const refreshButton = document.getElementById('refreshButton');
const connectionsTable = document.getElementById('connectionsTable');
const totalConnections = document.getElementById('totalConnections');
const lastUpdated = document.getElementById('lastUpdated');
let isLoading = false;

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

async function fetchConnections() {
    if (isLoading) return;

    isLoading = true;
    refreshButton.classList.add('loading');

    try {
        const response = await fetch('/api/connections');
        const data = await response.json();
                
        totalConnections.textContent = data.total;
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

        if (data.connections.length === 0) {
            connectionsTable.innerHTML = `
                <tr>
                    <td colspan="3" class="no-connections">No active connections</td>
                </tr>
            `;
        } else {
            connectionsTable.innerHTML = data.connections.map(conn => `
                <tr>
                    <td>${conn.name}</td>
                    <td>${new Date(conn.connected_at).toLocaleString()}</td>
                    <td>${formatDuration(conn.duration)}</td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching connections:', error);
    } finally {
        isLoading = false;
        refreshButton.classList.remove('loading');
    }
}

fetchConnections();
refreshButton.addEventListener('click', fetchConnections);
// i set an auto refressh every minute, can be changed or removed
setInterval(fetchConnections, 60000);