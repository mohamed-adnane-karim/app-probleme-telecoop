// // Fonction pour enregistrer les données filtrées dans un fichier JSON
// async function saveAndroidPhoneCategoriesToFile() {
//     const categoriesData = await fetchScore("CATEGORY", "iPhone 11");
//     if (categoriesData) {
//         fs.writeFile('androidPhoneCategories.json', JSON.stringify(categoriesData, null, 2), (err) => {
//             if (err) {
//                 console.error('Failed to save Android phone categories to file:', err);
//             } else {
//                 console.log('Android phone categories saved to file');
//             }
//         });
//     }
// }

// // Appel de la fonction pour enregistrer les données filtrées dans un fichier JSON
// saveAndroidPhoneCategoriesToFile();