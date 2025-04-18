 // Données mockées pour 2024-2025
 const mockData = {
    typingTests: [
        {
            id: "1",
            test_date: "2025-03-15T10:30:00",
            wpm: 72,
            accuracy: 94.5,
            test_duration: 60,
            characters_typed: 360,
            errors: 6
        },
        {
            id: "2",
            test_date: "2025-03-10T15:45:00",
            wpm: 68,
            accuracy: 92.2,
            test_duration: 60,
            characters_typed: 340,
            errors: 8
        },
        {
            id: "3",
            test_date: "2025-02-28T09:15:00",
            wpm: 65,
            accuracy: 91.1,
            test_duration: 60,
            characters_typed: 330,
            errors: 9
        },
        {
            id: "4",
            test_date: "2025-02-20T18:20:00",
            wpm: 63,
            accuracy: 89.7,
            test_duration: 60,
            characters_typed: 320,
            errors: 11
        },
        {
            id: "5",
            test_date: "2025-02-05T11:10:00",
            wpm: 59,
            accuracy: 87.3,
            test_duration: 60,
            characters_typed: 300,
            errors: 13
        },
        {
            id: "6",
            test_date: "2025-01-25T14:30:00",
            wpm: 56,
            accuracy: 86.8,
            test_duration: 60,
            characters_typed: 290,
            errors: 12
        },
        {
            id: "7",
            test_date: "2025-01-10T16:45:00",
            wpm: 52,
            accuracy: 85.5,
            test_duration: 60,
            characters_typed: 270,
            errors: 14
        },
        {
            id: "8",
            test_date: "2024-12-15T10:30:00",
            wpm: 58,
            accuracy: 88.2,
            test_duration: 60,
            characters_typed: 310,
            errors: 11
        },
        {
            id: "9",
            test_date: "2024-12-01T15:45:00",
            wpm: 55,
            accuracy: 86.7,
            test_duration: 60,
            characters_typed: 290,
            errors: 13
        },
        {
            id: "10",
            test_date: "2024-11-20T09:15:00",
            wpm: 50,
            accuracy: 84.1,
            test_duration: 60,
            characters_typed: 270,
            errors: 15
        }
    ]
};

// Variables pour stocker les instances de graphiques
let performanceChart, accuracyChart, errorsChart;

// Fonction pour filtrer les données en fonction de la période sélectionnée
function filterData(days) {
    if (days === 'all') return mockData.typingTests;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    
    return mockData.typingTests.filter(test => {
        return new Date(test.test_date) >= cutoffDate;
    });
}

// Fonction pour mettre à jour tous les graphiques
function updateCharts(filteredData) {
    // Trier les données par date (du plus récent au plus ancien)
    const sortedData = [...filteredData].sort((a, b) => 
        new Date(b.test_date) - new Date(a.test_date)
    );

    const labels = sortedData.map(test => 
        new Date(test.test_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    );

    const wpmData = sortedData.map(test => test.wpm);
    const accuracyData = sortedData.map(test => test.accuracy);
    const errorsData = sortedData.map(test => test.errors);

    // Mettre à jour le graphique principal (WPM)
    performanceChart.data.labels = labels;
    performanceChart.data.datasets[0].data = wpmData;
    performanceChart.update();

    // Mettre à jour le graphique de précision
    accuracyChart.data.labels = labels;
    accuracyChart.data.datasets[0].data = accuracyData;
    accuracyChart.update();

    // Mettre à jour le graphique d'erreurs avec un cercle plus petit
    errorsChart.data.labels = labels;
    errorsChart.data.datasets[0].data = errorsData;
    errorsChart.options.cutout = '65%'; // Réduire la taille du cercle
    errorsChart.update();

    // Mettre à jour le tableau des activités récentes
    populateRecentActivities(sortedData);
}

// Fonction pour remplir le tableau des activités récentes
function populateRecentActivities(data) {
    const tbody = document.getElementById('recent-activities');
    tbody.innerHTML = '';

    data.slice(0, 10).forEach(test => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-white/5 transition-colors duration-200';
        row.innerHTML = `
            <td class="py-3 px-4">${formatDate(test.test_date)}</td>
            <td class="py-3 px-4 font-bold ${test.wpm > 70 ? 'text-green-400' : test.wpm > 60 ? 'text-yellow-400' : 'text-red-400'}">${test.wpm}</td>
            <td class="py-3 px-4">${test.accuracy.toFixed(1)}%</td>
            <td class="py-3 px-4">${test.test_duration}s</td>
            <td class="py-3 px-4">${test.characters_typed}</td>
            <td class="py-3 px-4">${test.errors}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialiser les graphiques
function initCharts() {
    const initialData = filterData('all');
    const sortedData = [...initialData].sort((a, b) => 
        new Date(b.test_date) - new Date(a.test_date)
    );

    const labels = sortedData.map(test => 
        new Date(test.test_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    );

    const wpmData = sortedData.map(test => test.wpm);
    const accuracyData = sortedData.map(test => test.accuracy);
    const errorsData = sortedData.map(test => test.errors);

    // Graphique principal (WPM)
    const ctx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'WPM',
                data: wpmData,
                borderColor: '#bc16a5',
                backgroundColor: 'rgba(188, 22, 165, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: Math.min(...wpmData) - 10,
                    max: Math.max(...wpmData) + 10,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });

    // Graphique de précision
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    accuracyChart = new Chart(accuracyCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Précision (%)',
                data: accuracyData,
                backgroundColor: 'rgba(22, 188, 188, 0.7)',
                borderColor: 'rgba(22, 188, 188, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });

    // Graphique d'erreurs avec cercle réduit
    const errorsCtx = document.getElementById('errorsChart').getContext('2d');
    errorsChart = new Chart(errorsCtx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: errorsData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(199, 199, 199, 0.7)',
                    'rgba(83, 102, 255, 0.7)',
                    'rgba(255, 99, 255, 0.7)',
                    'rgba(99, 255, 132, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(255, 99, 255, 1)',
                    'rgba(99, 255, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000
            },
            cutout: '65%', // Cercle plus petit
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Formater la date
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Initialiser le dashboard
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    populateRecentActivities(filterData('all'));

    // Gestion des filtres
    document.getElementById('time-filter').addEventListener('change', (e) => {
        const filteredData = filterData(e.target.value);
        updateCharts(filteredData);
    });

    // Bouton export
    document.getElementById('export-btn').addEventListener('click', () => {
        alert('Fonctionnalité d\'export à implémenter');
    });
});