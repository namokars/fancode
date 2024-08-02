document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'bde1a888-3d03-461f-81f5-fcea9a98d051';
    const matchesApiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

    async function fetchMatches() {
        try {
            const response = await fetch(matchesApiUrl);
            const data = await response.json();
            displayMatches(data.data);
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
    }

    async function fetchMatchInfo(matchId) {
        const matchInfoApiUrl = `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${matchId}`;
        try {
            const response = await fetch(matchInfoApiUrl);
            const data = await response.json();
            displayMatchInfo(data.data);
        } catch (error) {
            console.error('Error fetching match info:', error);
        }
    }

    function displayMatches(matches) {
        const matchesContainer = document.getElementById('matches');
        matchesContainer.innerHTML = '';

        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.className = 'bg-white p-6 rounded-lg shadow-lg transition transform duration-300 card-hover cursor-pointer';
            matchElement.setAttribute('data-match-id', match.id);

            matchElement.innerHTML = `
                <h2 class="text-2xl font-bold mb-2">${match.name}</h2>
                <p class="text-lg mb-1">Date: ${new Date(match.dateTimeGMT).toLocaleString()}</p>
                <p class="text-lg mb-1">Status: ${match.status}</p>
                <p class="text-lg mb-1">Teams: ${match.teamInfo.map(team => team.name).join(' vs ')}</p>
                <p class="text-lg mb-1">Venue: ${match.venue}</p>
            `;

            matchElement.addEventListener('click', () => {
                fetchMatchInfo(match.id);
                document.getElementById('match-modal').classList.add('active');
            });

            matchesContainer.appendChild(matchElement);
        });
    }

    function displayMatchInfo(matchInfo) {
        const matchInfoContainer = document.getElementById('match-info');
        matchInfoContainer.innerHTML = `
            <h2 class="text-3xl font-bold mb-4">${matchInfo.name}</h2>
            <p class="text-xl mb-2">Date: ${new Date(matchInfo.dateTimeGMT).toLocaleString()}</p>
            <p class="text-xl mb-2">Status: ${matchInfo.status}</p>
            <p class="text-xl mb-2">Teams: ${matchInfo.teamInfo.map(team => team.name).join(' vs ')}</p>
            <p class="text-xl mb-2">Venue: ${matchInfo.venue}</p>
            <p class="text-lg mt-4">${matchInfo.matchDetails}</p>
        `;
    }

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('match-modal').classList.remove('active');
    });

    fetchMatches();
});
