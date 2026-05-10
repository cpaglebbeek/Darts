/*
 * Darts Game Setup Script v0.1a
 * Copyright (c) 2025 Christian Glebbeek, iCt Hrose.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    const playerNameInputsEl = document.getElementById('playerNameInputs');
    const gameTypeOptionsEl = document.getElementById('gameTypeOptions');
    const playerCountOptionsEl = document.getElementById('playerCountOptions');
    const btnStartGame = document.getElementById('btnStartGame');

    function updatePlayerInputs(count) {
        playerNameInputsEl.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const div = document.createElement('div');
            div.className = 'input-group';
            div.innerHTML = `
                <label for="p${i}name">Speler ${i}:</label>
                <input type="text" id="p${i}name" placeholder="Naam ${i}" value="">
            `;
            playerNameInputsEl.appendChild(div);
        }
    }

    gameTypeOptionsEl.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#gameTypeOptions button').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });

    playerCountOptionsEl.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#playerCountOptions button').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            updatePlayerInputs(parseInt(e.target.dataset.value, 10));
        }
    });

    btnStartGame.addEventListener('click', () => {
        const gameTypeStr = document.querySelector('#gameTypeOptions button.selected').dataset.value;
        const playerCount = parseInt(document.querySelector('#playerCountOptions button.selected').dataset.value, 10);
        
        // Bepaal de spelinstellingen
        let startScore = 501;
        let rotationMode = false;
        let scorekeeperMode = false;

        if (gameTypeStr.includes('301')) startScore = 301;
        if (gameTypeStr.includes('Rotatie')) rotationMode = true;
        if (gameTypeStr.includes('Oefenen')) scorekeeperMode = true;

        // Bouw de URL parameters
        const params = new URLSearchParams();
        params.append('startScore', startScore);
        params.append('playerCount', playerCount);
        params.append('rotation', rotationMode);
        params.append('scorekeeper', scorekeeperMode);

        // Voeg spelernamen toe
        for (let i = 0; i < playerCount; i++) {
            const nameInput = document.getElementById(`p${i+1}name`);
            const name = (nameInput && nameInput.value) ? nameInput.value : `Speler ${i + 1}`;
            params.append(`p${i+1}`, name);
        }
        
        // Stuur door naar de spelpagina
        window.location.href = `spel.html?${params.toString()}`;
    });

    // Initialiseer de speler inputs voor de standaard selectie (1 speler)
    updatePlayerInputs(1);
});
