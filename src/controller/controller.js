export {
    uncheckOthersGarantie
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
    } if (index == 2) {
        uiParams.selectedGarantieOui = false;
        uiParams.selectedGarantieNon = true;
        uiParams.selectedGarantieJsp = false;
    } if (index == 3) {
        uiParams.selectedGarantieOui = false;
        uiParams.selectedGarantieNon = false;
        uiParams.selectedGarantieJsp = true;
    }
};