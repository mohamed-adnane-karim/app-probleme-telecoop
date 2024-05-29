export {
    uncheckOthersGarantie,
    uncheckOthersTeleCoop,
    openRepairerLink,
    toggleSection,
    showSuggestions,
    selectCP
};

/**
 * Coche la case de l'index i et s'assure que les autres cases soient décochées
 * @param {str} uiParams Nom de l'obet contenant les paramètres
 * @param {int} index Entier entre 1 et 3 correspondant à la position de la case cochée
 */
const uncheckOthersGarantie = (uiParams, index) => {
    if (index == 1) {
        uiParams.selectedGarantieOui = true;
        uiParams.selectedGarantieNon = false;
        uiParams.selectedGarantieJsp = false;
        uiParams.selectedGarantieOK = true;
    } if (index == 2) {
        uiParams.selectedGarantieOui = false;
        uiParams.selectedGarantieNon = true;
        uiParams.selectedGarantieJsp = false;
        uiParams.selectedGarantieOK = true;
    } if (index == 3) {
        uiParams.selectedGarantieOui = false;
        uiParams.selectedGarantieNon = false;
        uiParams.selectedGarantieJsp = true;
        uiParams.selectedGarantieOK = true;
    }
};

/**
 * Coche la case de l'index i et s'assure que les autres cases soient décochées
 * @param {str} uiParams Nom de l'obet contenant les paramètres
 * @param {int} index Entier entre 1 et 3 correspondant à la position de la case cochée
 */
const uncheckOthersTeleCoop = (uiParams, index) => {
    if (index == 1) {
        uiParams.selectedTeleCoopOui = true;
        uiParams.selectedTeleCoopNon = false;
        uiParams.selectedTeleCoopJsp = false;
    } if (index == 2) {
        uiParams.selectedTeleCoopOui = false;
        uiParams.selectedTeleCoopNon = true;
        uiParams.selectedTeleCoopJsp = false;
    } if (index == 3) {
        uiParams.selectedTeleCoopOui = false;
        uiParams.selectedTeleCoopNon = false;
        uiParams.selectedTeleCoopJsp = true;
    }
};

/**
 * Ouvre le lien pour annuaire qualirépar
 */
const openRepairerLink = (uiParams) => {
    if ((uiParams.selectedlat !== "") && (uiParams.selectedlon !== "")) {
        const url = `https://www.ecosystem.eco/annuaire-qualirepar/?lat=${uiParams.selectedlat}&lon=${uiParams.selectedlon}&product=t%C3%A9l%C3%A9phone#resultats`;
        window.open(url, '_blank');
    } else {
        alert("Veuillez sélectionner un code postal avant de cliquer sur ce bouton.");
    }
};
/**
 * Etend les sections lorsqu'on clique sur leurs bandeaux (change les valeurs des booléens)
 * @param {*} index 
 * @param {*} uiParams 
 */
const toggleSection = (index, uiParams) => {
    if (index == 1) {
        uiParams.isSection1Open = !uiParams.isSection1Open;
    } if (index == 2) {
        uiParams.isSection2Open = !uiParams.isSection2Open;
    } if (index == 3) {
        uiParams.isSection3Open = !uiParams.isSection3Open;
    } if (uiParams.isSection1Open || uiParams.isSection2Open || uiParams.isSection3Open) {
        uiParams.isOneSectionOpen = true;
    } if (!uiParams.isSection1Open && !uiParams.isSection2Open && !uiParams.isSection3Open) {
        uiParams.isOneSectionOpen = false;
    }
};

/**
 * Actve l'affiche des suggestions de CP
 * @param {*} uiParams 
 */
const showSuggestions = (uiParams) => {
    uiParams.showSuggestions = true;
};
/**
 * Selectionne le code postal cliqué
 * @param {*} cp 
 * @param {*} uiParams 
 */
const selectCP = (cp, uiParams) => {
    // Mettre à jour la valeur de selectedCP avec le code postal sélectionné
    uiParams.selectedCP = cp.codePostal;
    uiParams.selectedlat = cp.lat;
    uiParams.selectedlon = cp.lon;
    // Afficher le code postal et la ville dans le champ de l'input
    uiParams.selectedCPDisplay = `${cp.codePostal} - ${cp.ville}`;
    // Cacher les suggestions après la sélection
    uiParams.showSuggestions = false;

};
