/* =========================================================
   ⚙️ CONFIGURATION — EDIT THIS SECTION ONLY
   ========================================================= */

// Player order matters! Keep consistent across all matches.
const PLAYERS = ["AASHISH", "SAUGAT", "KAALEY", "AAYUSH"];



const DATA = [
    {
        day: "Day 1",
        matches: [
            [1, 0, 0, 3],    // Match 1
            [1, 0, 1, 0],    // Match 2
            [1, 0, 1, 3],    // Match 3
            [0, 0, 0, 0]     // Match 4
        ]
    },
   
    {
        day: "Day 2",
        matches: [
            [1, 2, 0, 0],
            [1, 0, 3, 0],
            [0, 2, 0, 0],
            [1, 2, 0, 0]
        ]
    }

    // Add more days here...
      {
        day: "Day 3",
        matches: [
            [0, 4, 1, 5],
            [0, 0, 0, 0],
            [1, 3, 0, 1],
            [0, 0, 0, 0]
        ]
    }
    
];

/* =========================================================
   ⛔ DO NOT EDIT BELOW THIS LINE
   ========================================================= */

// Aggregate total kills per player
function getTotals() {
    const totals = {};
    PLAYERS.forEach(p => totals[p] = { kills: 0, matches: 0 });

    DATA.forEach(day => {
        day.matches.forEach(match => {
            PLAYERS.forEach((player, idx) => {
                totals[player].kills += match[idx] || 0;
                totals[player].matches += 1;
            });
        });
    });

    return totals;
}

// Render player summary cards
function renderSummaries() {
    const totals = getTotals();
    const grid = document.getElementById("summaryGrid");

    grid.innerHTML = PLAYERS.map(p => `
        <div class="summary-card">
            <h3>${p}</h3>
            <div class="big-kill-number">${totals[p].kills}</div>
            <div class="kill-label">Total Kills</div>
            <div class="matches-played">${totals[p].matches} matches played</div>
        </div>
    `).join("");
}

// Render rankings table
function renderRankings() {
    const totals = getTotals();
    const arr = PLAYERS.map(p => ({ name: p, ...totals[p] }));
    arr.sort((a, b) => b.kills - a.kills);

    const tbody = document.getElementById("rankingBody");

    tbody.innerHTML = arr.map((p, i) => {
        const rank = i + 1;
        let rankClass = "";
        if (rank === 1) rankClass = "rank-1";
        else if (rank === 2) rankClass = "rank-2";
        else if (rank === 3) rankClass = "rank-3";

        return `
            <tr>
                <td><span class="rank-badge ${rankClass}">#${rank}</span></td>
                <td class="${rankClass}">${p.name}</td>
                <td class="stat-highlight">${p.kills}</td>
                <td>${p.matches}</td>
            </tr>
        `;
    }).join("");
}

// Render match history grouped by day
function renderHistory() {
    const list = document.getElementById("historyList");

    if (DATA.length === 0) {
        list.innerHTML = `<div class="empty-msg">No data available.</div>`;
        return;
    }

    list.innerHTML = DATA.map(day => {
        const matchesHTML = day.matches.map((match, i) => {
            const playerLines = PLAYERS.map((p, idx) => {
                return `<span><b>${p.slice(0,3)}</b> ${match[idx] ?? 0}</span>`;
            }).join("");

            return `
                <div class="match-item">
                    <span class="match-label">Match ${i + 1}</span>
                    <div class="match-players">${playerLines}</div>
                </div>
            `;
        }).join("");

        return `
            <div class="day-block">
                <div class="day-header">${day.day}</div>
                ${matchesHTML}
            </div>
        `;
    }).join("");
}

// Init
function init() {
    renderSummaries();
    renderRankings();
    renderHistory();
}

init();
