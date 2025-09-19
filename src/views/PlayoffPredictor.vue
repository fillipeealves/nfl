<template>
  <div class="predictor">
    <h1>Playoff Predictor</h1>
    <div class="conferences-container">
      <div class="conference">
        <h2 class="afc">AFC</h2>
        <div class="team-grid">
          <div v-for="(divisionTeams, division) in afcDivisions" :key="division" class="division-row">
            <div class="division-label">{{ division }}</div>
            <div class="team-cards">
              <div
                v-for="team in divisionTeams"
                :key="team.TeamID"
                class="team-card"
                :class="{ selected: isSelected('AFC', team.TeamID) }"
                :style="isSelected('AFC', team.TeamID)
                  ? {
                      backgroundColor: '#' + team.PrimaryColor,
                      color: team.SecondaryColor ? (team.SecondaryColor.startsWith('#') ? team.SecondaryColor : '#' + team.SecondaryColor) : '#fff'
                    }
                  : {}"
                @click="toggleSelection('AFC', division, team)"
              >
                <img :src="team.WikipediaLogoUrl" alt="logo" />
                <span>{{ team.Key }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="selection-count">Selecionados: {{ selectedAFC.length }}/7</p>
      </div>
      <div class="conference">
        <h2 class="nfc">NFC</h2>
        <div class="team-grid">
          <div v-for="(divisionTeams, division) in nfcDivisions" :key="division" class="division-row">
            <div class="division-label">{{ division }}</div>
            <div class="team-cards">
              <div
                v-for="team in divisionTeams"
                :key="team.TeamID"
                class="team-card"
                :class="{ selected: isSelected('NFC', team.TeamID) }"
                :style="isSelected('NFC', team.TeamID)
                  ? {
                      backgroundColor: '#' + team.PrimaryColor,
                      color: team.SecondaryColor ? (team.SecondaryColor.startsWith('#') ? team.SecondaryColor : '#' + team.SecondaryColor) : '#fff'
                    }
                  : {}"
                @click="toggleSelection('NFC', division, team)"
              >
                <img :src="team.WikipediaLogoUrl" alt="logo" />
                <span>{{ team.Key }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="selection-count">Selecionados: {{ selectedNFC.length }}/7</p>
      </div>
    </div>
    <div class="button-container">
      <button class="confirm-button" @click="confirmSelection">Confirmar Times</button>
      <button class="clear-button" @click="clearSelections">Limpar Times</button>
    </div>
    <!-- Bracket -->
    <div class="bracket">
      <!-- AFC -->
      <div class="round">
        <h3>AFC Wild Card</h3>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcSeeds[1] && afcSeeds[6] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[1], afcSeeds[6], afcSeeds[1])">
            <img v-if="afcSeeds[1]" :src="afcSeeds[1].WikipediaLogoUrl" />
            <span v-else>2</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcSeeds[1] && afcSeeds[6] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[1], afcSeeds[6], afcSeeds[6])">
            <img v-if="afcSeeds[6]" :src="afcSeeds[6].WikipediaLogoUrl" />
            <span v-else>7</span>
          </div>
        </div>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcSeeds[2] && afcSeeds[5] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[2], afcSeeds[5], afcSeeds[2])">
            <img v-if="afcSeeds[2]" :src="afcSeeds[2].WikipediaLogoUrl" />
            <span v-else>3</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcSeeds[2] && afcSeeds[5] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[2], afcSeeds[5], afcSeeds[5])">
            <img v-if="afcSeeds[5]" :src="afcSeeds[5].WikipediaLogoUrl" />
            <span v-else>6</span>
          </div>
        </div>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcSeeds[3] && afcSeeds[4] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[3], afcSeeds[4], afcSeeds[3])">
            <img v-if="afcSeeds[3]" :src="afcSeeds[3].WikipediaLogoUrl" />
            <span v-else>4</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcSeeds[3] && afcSeeds[4] && pickMatchupWinner('AFC', 'Divisional', afcSeeds[3], afcSeeds[4], afcSeeds[4])">
            <img v-if="afcSeeds[4]" :src="afcSeeds[4].WikipediaLogoUrl" />
            <span v-else>5</span>
          </div>
        </div>
      </div>

      <div class="round">
        <h3>AFC Divisional</h3>
        <!-- Matchup 1: #1 seed vs Wild Card Winner #1 -->
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcSeeds[0] && afcDivisional[0] && pickMatchupWinner('AFC', 'Championship', afcSeeds[0], afcDivisional[0], afcSeeds[0])">
            <img v-if="afcSeeds[0]" :src="afcSeeds[0].WikipediaLogoUrl" />
            <span v-else>1 (BYE)</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcSeeds[0] && afcDivisional[0] && pickMatchupWinner('AFC', 'Championship', afcSeeds[0], afcDivisional[0], afcDivisional[0])">
            <img v-if="afcDivisional[0]" :src="afcDivisional[0].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
        <!-- Matchup 2: Wild Card Winner #2 vs Wild Card Winner #3 -->
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcDivisional[1] && afcDivisional[2] && pickMatchupWinner('AFC', 'Championship', afcDivisional[1], afcDivisional[2], afcDivisional[1])">
            <img v-if="afcDivisional[1]" :src="afcDivisional[1].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcDivisional[1] && afcDivisional[2] && pickMatchupWinner('AFC', 'Championship', afcDivisional[1], afcDivisional[2], afcDivisional[2])">
            <img v-if="afcDivisional[2]" :src="afcDivisional[2].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
      </div>

      <div class="round">
        <h3>AFC Championship</h3>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && afcChampionship[0] && afcChampionship[1] && pickMatchupWinner('AFC', 'SuperBowl', afcChampionship[0], afcChampionship[1], afcChampionship[0])">
            <img v-if="afcChampionship[0]" :src="afcChampionship[0].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
          <div class="slot" @click="bracketUnlocked && afcChampionship[0] && afcChampionship[1] && pickMatchupWinner('AFC', 'SuperBowl', afcChampionship[0], afcChampionship[1], afcChampionship[1])">
            <img v-if="afcChampionship[1]" :src="afcChampionship[1].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
      </div>

      <!-- Super Bowl -->
      <div class="round super-bowl">
        <h3>Super Bowl</h3>
        <div class="super-bowl-matchup">
          <!-- AFC Champion slot -->
          <div class="slot super-bowl-slot" @click="bracketUnlocked && pickSuperBowlWinner(superBowlFinalists[0])">
            <img v-if="superBowlFinalists[0]" :src="superBowlFinalists[0].WikipediaLogoUrl" />
            <span v-else>AFC Champ</span>
          </div>
          <!-- NFC Champion slot -->
          <div class="slot super-bowl-slot" @click="bracketUnlocked && pickSuperBowlWinner(superBowlFinalists[1])">
            <img v-if="superBowlFinalists[1]" :src="superBowlFinalists[1].WikipediaLogoUrl" />
            <span v-else>NFC Champ</span>
          </div>
        </div>
        <div class="super-bowl-winner">
          <h4>Winner</h4>
          <div class="slot super-bowl-slot">
            <img v-if="superBowlWinner" :src="superBowlWinner.WikipediaLogoUrl" />
            <span v-else>Pick a winner above</span>
          </div>
        </div>
      </div>

      <!-- NFC -->
      <div class="round">
        <h3>NFC Championship</h3>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcChampionship[0] && nfcChampionship[1] && pickMatchupWinner('NFC', 'SuperBowl', nfcChampionship[0], nfcChampionship[1], nfcChampionship[0])">
            <img v-if="nfcChampionship[0]" :src="nfcChampionship[0].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcChampionship[0] && nfcChampionship[1] && pickMatchupWinner('NFC', 'SuperBowl', nfcChampionship[0], nfcChampionship[1], nfcChampionship[1])">
            <img v-if="nfcChampionship[1]" :src="nfcChampionship[1].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
      </div>

      <div class="round">
        <h3>NFC Divisional</h3>
        <!-- Matchup 1: #1 seed vs Wild Card Winner #1 -->
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcSeeds[0] && nfcDivisional[0] && pickMatchupWinner('NFC', 'Championship', nfcSeeds[0], nfcDivisional[0], nfcSeeds[0])">
            <img v-if="nfcSeeds[0]" :src="nfcSeeds[0].WikipediaLogoUrl" />
            <span v-else>1 (BYE)</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcSeeds[0] && nfcDivisional[0] && pickMatchupWinner('NFC', 'Championship', nfcSeeds[0], nfcDivisional[0], nfcDivisional[0])">
            <img v-if="nfcDivisional[0]" :src="nfcDivisional[0].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
        <!-- Matchup 2: Wild Card Winner #2 vs Wild Card Winner #3 -->
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcDivisional[1] && nfcDivisional[2] && pickMatchupWinner('NFC', 'Championship', nfcDivisional[1], nfcDivisional[2], nfcDivisional[1])">
            <img v-if="nfcDivisional[1]" :src="nfcDivisional[1].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcDivisional[1] && nfcDivisional[2] && pickMatchupWinner('NFC', 'Championship', nfcDivisional[1], nfcDivisional[2], nfcDivisional[2])">
            <img v-if="nfcDivisional[2]" :src="nfcDivisional[2].WikipediaLogoUrl" />
            <span v-else>Winner</span>
          </div>
        </div>
      </div>

      <div class="round">
        <h3>NFC Wild Card</h3>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcSeeds[1] && nfcSeeds[6] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[1], nfcSeeds[6], nfcSeeds[1])">
            <img v-if="nfcSeeds[1]" :src="nfcSeeds[1].WikipediaLogoUrl" />
            <span v-else>2</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcSeeds[1] && nfcSeeds[6] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[1], nfcSeeds[6], nfcSeeds[6])">
            <img v-if="nfcSeeds[6]" :src="nfcSeeds[6].WikipediaLogoUrl" />
            <span v-else>7</span>
          </div>
        </div>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcSeeds[2] && nfcSeeds[5] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[2], nfcSeeds[5], nfcSeeds[2])">
            <img v-if="nfcSeeds[2]" :src="nfcSeeds[2].WikipediaLogoUrl" />
            <span v-else>3</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcSeeds[2] && nfcSeeds[5] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[2], nfcSeeds[5], nfcSeeds[5])">
            <img v-if="nfcSeeds[5]" :src="nfcSeeds[5].WikipediaLogoUrl" />
            <span v-else>6</span>
          </div>
        </div>
        <div class="matchup">
          <div class="slot" @click="bracketUnlocked && nfcSeeds[3] && nfcSeeds[4] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[3], nfcSeeds[4], nfcSeeds[3])">
            <img v-if="nfcSeeds[3]" :src="nfcSeeds[3].WikipediaLogoUrl" />
            <span v-else>4</span>
          </div>
          <div class="slot" @click="bracketUnlocked && nfcSeeds[3] && nfcSeeds[4] && pickMatchupWinner('NFC', 'Divisional', nfcSeeds[3], nfcSeeds[4], nfcSeeds[4])">
            <img v-if="nfcSeeds[4]" :src="nfcSeeds[4].WikipediaLogoUrl" />
            <span v-else>5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import api from "../services/NFLapi";

export default {
  name: "PlayoffPredictor",
  setup() {
    const teams = ref([]);
    const selectedAFC = ref([]);
    const selectedNFC = ref([]);
    const bracketUnlocked = ref(false);

    const fetchTeams = async () => {
      const response = await api.get("https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=8e82062845264f16912a10417066c465");
      teams.value = response.data;
    };
    fetchTeams();

    // Divisões
    const afcDivisions = computed(() =>
      groupByDivision(teams.value.filter((t) => t.Conference === "AFC"))
    );
    const nfcDivisions = computed(() =>
      groupByDivision(teams.value.filter((t) => t.Conference === "NFC"))
    );

    const groupByDivision = (teams) => {
      const grouped = teams.reduce((acc, team) => {
        if (!acc[team.Division]) acc[team.Division] = [];
        acc[team.Division].push(team);
        return acc;
      }, {});
      
      // Return divisions in alphabetical order: East, North, South, West
      const orderedDivisions = {};
      const divisionOrder = ['East', 'North', 'South', 'West'];
      
      divisionOrder.forEach(division => {
        if (grouped[division]) {
          orderedDivisions[division] = grouped[division];
        }
      });
      
      return orderedDivisions;
    };

    const isSelected = (conference, teamId) => {
      return (conference === "AFC" ? selectedAFC.value : selectedNFC.value).some(
        (t) => t.TeamID === teamId
      );
    };

    const toggleSelection = (conference, division, team) => {
      const selected = conference === "AFC" ? selectedAFC : selectedNFC;

      if (isSelected(conference, team.TeamID)) {
        selected.value = selected.value.filter((t) => t.TeamID !== team.TeamID);
      } else {
        if (selected.value.length >= 7) {
          alert("Máximo de 7 times por conferência!");
          return;
        }
        selected.value.push({ ...team, division });
      }
    };

    const confirmSelection = () => {
      if (selectedAFC.value.length !== 7 || selectedNFC.value.length !== 7) {
        alert("É necessário selecionar exatamente 7 times de cada conferência!");
        return;
      }
      if (!validateSelections(selectedAFC.value) || !validateSelections(selectedNFC.value)) {
        alert("É necessário selecionar pelo menos 1 time de cada divisão!");
        return;
      }
      bracketUnlocked.value = true;
      alert("Seleções confirmadas! Veja no console.");
    };

    const clearSelections = () => {
      selectedAFC.value = [];
      selectedNFC.value = [];
      afcDivisional.value = [null, null, null];
      nfcDivisional.value = [null, null, null];
      afcChampionship.value = [null, null];
      nfcChampionship.value = [null, null];
      superBowlFinalists.value = [null, null];
      superBowlWinner.value = null;
      wildCardWinners.value = {
        afc: [null, null, null],
        nfc: [null, null, null]
      };
      divisionalWinners.value = {
        afc: [null, null],
        nfc: [null, null]
      };
      bracketUnlocked.value = false;
    };

    const validateSelections = (selectedTeams) => {
      const divisions = new Set(selectedTeams.map((t) => t.Division));
      return divisions.size === 4; // precisa ter pelo menos 1 de cada divisão
    };

    // Seeds and matchups
    const afcSeeds = computed(() =>
      selectedAFC.value
        .slice()
        .sort((a, b) => a.Seed - b.Seed)
    );
    const nfcSeeds = computed(() =>
      selectedNFC.value
        .slice()
        .sort((a, b) => a.Seed - b.Seed)
    );

    // Wild Card matchups
    const afcWildCard = computed(() => [
      afcSeeds.value[1] && afcSeeds.value[6] ? [afcSeeds.value[1], afcSeeds.value[6]] : null, // 2 vs 7
      afcSeeds.value[2] && afcSeeds.value[5] ? [afcSeeds.value[2], afcSeeds.value[5]] : null, // 3 vs 6
      afcSeeds.value[3] && afcSeeds.value[4] ? [afcSeeds.value[3], afcSeeds.value[4]] : null, // 4 vs 5
    ]);
    const nfcWildCard = computed(() => [
      nfcSeeds.value[1] && nfcSeeds.value[6] ? [nfcSeeds.value[1], nfcSeeds.value[6]] : null,
      nfcSeeds.value[2] && nfcSeeds.value[5] ? [nfcSeeds.value[2], nfcSeeds.value[5]] : null,
      nfcSeeds.value[3] && nfcSeeds.value[4] ? [nfcSeeds.value[3], nfcSeeds.value[4]] : null,
    ]);

    // Advancement state
    const afcDivisional = ref([null, null, null]);
    const nfcDivisional = ref([null, null, null]);
    const afcChampionship = ref([null, null]);
    const nfcChampionship = ref([null, null]);
    const superBowlFinalists = ref([null, null]); // [AFC Champion, NFC Champion]
    const superBowlWinner = ref(null);

    // Matchup tracking
    const wildCardWinners = ref({
      afc: [null, null, null], // 3 winners from wild card
      nfc: [null, null, null]
    });
    const divisionalWinners = ref({
      afc: [null, null], // 2 winners from divisional (1 bye + 2 from wild card winners)
      nfc: [null, null]
    });

    function advanceTeam(conference, round, team) {
      if (!team) return;

      if (round === "Divisional") {
        // Wild Card round - pick winner from matchup
        const conf = conference.toLowerCase();
        const winners = wildCardWinners.value[conf];
        
        // Check if team is already a winner in this round
        if (winners.includes(team)) return;
        
        // Check if team is already in later rounds
        if (afcChampionship.value.includes(team) || nfcChampionship.value.includes(team) || superBowlWinner.value === team) return;
        
        // Add to wild card winners
        const idx = winners.findIndex((t) => t === null);
        if (idx !== -1) {
          winners[idx] = team;
          // Also add to divisional array for display
          const divisionalArr = conference === "AFC" ? afcDivisional : nfcDivisional;
          const divIdx = divisionalArr.value.findIndex((t) => t === null);
          if (divIdx !== -1) divisionalArr.value[divIdx] = team;
        }
      } else if (round === "Championship") {
        // Divisional round - pick winner from matchup
        const conf = conference.toLowerCase();
        const winners = divisionalWinners.value[conf];
        
        // Check if team is already a winner in this round
        if (winners.includes(team)) return;
        
        // Check if team is already in super bowl
        if (superBowlWinner.value === team) return;
        
        // Only allow if all wild card winners are set
        const wildCardWinnersArr = wildCardWinners.value[conf];
        if (wildCardWinnersArr.filter(Boolean).length < 3) return;
        
        // Add to divisional winners
        const idx = winners.findIndex((t) => t === null);
        if (idx !== -1) {
          winners[idx] = team;
          // Also add to championship array for display
          const championshipArr = conference === "AFC" ? afcChampionship : nfcChampionship;
          const champIdx = championshipArr.value.findIndex((t) => t === null);
          if (champIdx !== -1) championshipArr.value[champIdx] = team;
        }
      } else if (round === "SuperBowl") {
        // Championship round - pick winner from matchup
        const conf = conference.toLowerCase();
        const winners = divisionalWinners.value[conf];
        
        // Check if team is already a winner in this round
        if (winners.includes(team)) return;
        
        // Only allow if both divisional winners are set
        if (winners.filter(Boolean).length < 2) return;
        
        // Only allow if this team is actually in the championship round
        if (!winners.includes(team)) return;
        
        // Set as Super Bowl finalist
        const finalistIndex = conference === "AFC" ? 0 : 1;
        superBowlFinalists.value[finalistIndex] = team;
      }
    }

    function pickSuperBowlWinner(team) {
      if (!team) return;
      // Only allow if this team is actually a Super Bowl finalist
      if (!superBowlFinalists.value.includes(team)) return;
      // Only allow if both finalists are set
      if (superBowlFinalists.value.filter(Boolean).length < 2) return;
      superBowlWinner.value = team;
    }

    function pickMatchupWinner(conference, round, team1, team2, winner) {
      if (!winner) return;
      
      if (round === "Divisional") {
        // Wild Card matchup
        const conf = conference.toLowerCase();
        const winners = wildCardWinners.value[conf];
        
        // Check if either team is already a winner
        if (winners.includes(team1) || winners.includes(team2)) return;
        
        // Check if team is already in later rounds
        if (afcChampionship.value.includes(winner) || nfcChampionship.value.includes(winner) || superBowlWinner.value === winner) return;
        
        // Add winner
        const idx = winners.findIndex((t) => t === null);
        if (idx !== -1) {
          winners[idx] = winner;
          // Also add to divisional array for display
          const divisionalArr = conference === "AFC" ? afcDivisional : nfcDivisional;
          const divIdx = divisionalArr.value.findIndex((t) => t === null);
          if (divIdx !== -1) divisionalArr.value[divIdx] = winner;
        }
      } else if (round === "Championship") {
        // Divisional matchup
        const conf = conference.toLowerCase();
        const winners = divisionalWinners.value[conf];
        
        // Check if either team is already a winner
        if (winners.includes(team1) || winners.includes(team2)) return;
        
        // Check if team is already in super bowl
        if (superBowlWinner.value === winner) return;
        
        // Only allow if all wild card winners are set
        const wildCardWinnersArr = wildCardWinners.value[conf];
        if (wildCardWinnersArr.filter(Boolean).length < 3) return;
        
        // Add winner
        const idx = winners.findIndex((t) => t === null);
        if (idx !== -1) {
          winners[idx] = winner;
          // Also add to championship array for display
          const championshipArr = conference === "AFC" ? afcChampionship : nfcChampionship;
          const champIdx = championshipArr.value.findIndex((t) => t === null);
          if (champIdx !== -1) championshipArr.value[champIdx] = winner;
        }
      } else if (round === "SuperBowl") {
        // Championship matchup
        const conf = conference.toLowerCase();
        const championshipArr = conference === "AFC" ? afcChampionship : nfcChampionship;
        
        // Check if team is already a Super Bowl finalist
        if (superBowlFinalists.value.includes(winner)) return;
        
        // Only allow if both championship teams are set
        if (championshipArr.value.filter(Boolean).length < 2) return;
        
        // Only allow if this team is actually in the championship round
        if (!championshipArr.value.includes(winner)) return;
        
        // Set as Super Bowl finalist
        const finalistIndex = conference === "AFC" ? 0 : 1;
        superBowlFinalists.value[finalistIndex] = winner;
      }
    }

    return {
      teams,
      afcDivisions,
      nfcDivisions,
      selectedAFC,
      selectedNFC,
      isSelected,
      toggleSelection,
      confirmSelection,
      clearSelections,
      afcSeeds,
      nfcSeeds,
      afcWildCard,
      nfcWildCard,
      afcDivisional,
      nfcDivisional,
      afcChampionship,
      nfcChampionship,
      superBowlFinalists,
      superBowlWinner,
      wildCardWinners,
      divisionalWinners,
      advanceTeam,
      pickSuperBowlWinner,
      pickMatchupWinner,
      bracketUnlocked,
    };
  },
};
</script>

<style scoped>
.predictor {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
}

/* Add font-family to all major containers for inheritance */
.conferences-container,
.conference,
.team-grid,
.division-row,
.team-cards,
.team-card,
.selection-count,
.bracket,
.round,
.matchup,
.slot,
.super-bowl,
.super-bowl-matchup,
.super-bowl-slot,
.super-bowl-winner,
.button-container,
.confirm-button,
.clear-button {
  font-family: inherit;
}

.conferences-container {
  display: flex;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  margin-bottom: 2rem;
}

.conference {
  flex: 1;
  background: #EEEEEE;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.conference h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: bold;
}

.afc {
  color: #FF0000;
}

.nfc {
  color: #0000FF;
}

.team-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.division-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.division-label {
  min-width: 80px;
  font-weight: bold;
  font-size: 1rem;
  color: #000000;
}

.team-cards {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.team-card {
  width: 70px;
  height: 70px;
  padding: 0.5rem;
  border-radius: 8px;
  color: black;
  background: white;
  border: 2px solid #000000;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.team-card:hover {
  transform: scale(1.05);
  border-color: #999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.team-card.selected {
  color: white;
  border-color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.team-card img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 4px;
}

.team-card span {
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
}

.selection-count {
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #333333;
  font-size: 0.9rem;
}

.bracket {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;
  text-align: center;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.round {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  position: relative;
}

.round h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #000000;
  text-align: center;
}

.matchup {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  position: relative;
}

.slot {
  background: white;
  border: 2px solid #000000fb;
  border-radius: 8px;
  margin: 1px 0;
  width: 110px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.slot:hover {
  background: #ffffff;
  border-color: #666;
}

.slot img {
  max-width: 60px;
  max-height: 35px;
  object-fit: contain;
}

.slot span {
  font-size: 0.8rem;
  font-weight: bold;
  color: #666;
}

.super-bowl {
  min-width: 180px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 1rem;
  border: 3px solid #000000;
}

.super-bowl h3 {
  font-size: 1.2rem;
  color: #000000;
  margin-bottom: 1rem;
}

.super-bowl-matchup {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.super-bowl-slot {
  width: 90px;
  height: 50px;
  font-weight: bold;
  font-size: 0.9rem;
  background: white;
  border: 2px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.super-bowl-slot:hover {
  background: #ffffff;
  transform: scale(1.05);
}

.super-bowl-slot img {
  max-width: 70px;
  max-height: 40px;
  object-fit: contain;
}

.super-bowl-winner {
  text-align: center;
}

.super-bowl-winner h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #000000;
}

.super-bowl-winner .slot {
  background: #fff3cd;
  border-color: #ffbf00;
  font-weight: bold;
}

/* Button Container */
.button-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  width: 100%;
}

/* Button Styles */
.confirm-button,
.clear-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 250px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.confirm-button {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.confirm-button:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.clear-button {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.clear-button:hover {
  background: linear-gradient(135deg, #d32f2f, #b71c1c);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
}

.confirm-button:active,
.clear-button:active {
  transform: translateY(0);
}
</style>