import pandas as pd 
import json

# Chargement du fichier 
database_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-reco-telecoop\xlsx_to_json\data\database_telecoop_cleaned.xlsx'
database=pd.read_excel(database_link)


# Création structure de données 
database_dict=[
                {
                    "Apple":[{}],
                    "Samsung":[{}],
                    "Android":[{}],
                    "TeleCoop":[{}],
                    "DumpPhone":[{}]
                }
            ]

for _,row in database.iterrows():
    
    telephone_name=row['modele']
    telephone_gamme=row['gamme']
    
    if telephone_name not in database_dict[0][telephone_gamme]:
        gamme_dict=database_dict[0][telephone_gamme]
        
    telephone_infos=[{
        "General":{
            "identifiant":int(row["identifiant"]),
            "oem":row["oem"],
            "modele":row["modele"],
            "os":row["os"],
            "date":int(row["date"]),
            "indice_reparabilite":float(row["indice_reparabilite"]),
            "score_ifixit":float(row["score_ifixit"]),
            "prix_neuf":float(row["prix_neuf"]),
            "prix_reconditionne":float(row["prix_reconditionne"]),
            "lien_achat_neuf":row["lien_achat_neuf"],
            "lien_achat_reconditionne":row["lien_achat_reconditionne"],
            "lien_location":row["lien_location"],
            "promo_telecoop_neuf":float(row["promo_telecoop_neuf"]),
            "promo_telecoop_reconditionne":float(row["promo_telecoop_reconditionne"]),
            "gain_carbone":float(row["gain_carbone"]),
            "telephone_type":int(row["telephone_type"]),
            "analyse":row["analyse"]
        }},
        {"Batterie":{
            "prix_batterie":float(row["prix_batterie"]),
            "prix_mo_batterie":float(row["prix_mo_batterie"]),
            "reduction_telecoop_batterie":float(row["reduction_telecoop_batterie"]),
            "reduction_etat_batterie":float(row["reduction_etat_batterie"]),
            "besoin_outils_batterie":float(row["besoin_outils_batterie"]),
            "liste_outils_batterie":row["liste_outils_batterie"],
            "tutoriel_batterie":int(row["tutoriel_batterie"]),
            "lien_tutoriel_batterie":row["lien_tutoriel_batterie"]
        }},
        {"Ecran":{
            "prix_ecran":float(row["prix_ecran"]),
            "prix_mo_ecran":float(row["prix_mo_ecran"]),
            "reduction_telecoop_ecran":float(row["reduction_telecoop_ecran"]),
            "reduction_etat_ecran":float(row["reduction_etat_ecran"]),
            "besoin_outils_ecran":int(row["besoin_outils_ecran"]),
            "liste_outils_ecran":row["liste_outils_ecran"],
            "tutoriel_ecran":int(row["tutoriel_ecran"]),
            "lien_tutoriel_ecran":row["lien_tutoriel_ecran"]
        }},
        {"Composants divers":{
            "prix_composant":float(row["prix_composant"]),
            "prix_mo_composant":float(row["prix_mo_composant"]),
            "reduction_telecoop_composant":float(row["reduction_telecoop_composant"]),
            "reduction_etat_composant":float(row["reduction_etat_composant"]),
            "besoin_outils_composant":int(row["besoin_outils_composant"]),
            "liste_outils_composant":row["liste_outils_composant"],
            "tutoriel_composant":int(row["tutoriel_composant"]),
            "lien_tutoriel_composant":row["lien_tutoriel_composant"]
        }},
        {"Recommandation":{
            "multi_sim":int(row["multi_sim"]),
            "simple":int(row["simple"]),
            "reparabilite":float(row["reparabilite"]),
            "moralscore":float(row["moralscore"]),
            "vie_prive":float(row["vie_prive"]),
            "ecran":row["ecran"]
        }}
    ]
    
    gamme_dict[0][telephone_name]=telephone_infos   
        
# Écrire les données dans un fichier JSON
json_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-reco-telecoop\xlsx_to_json\exec\database.json'
with open(json_link, 'w',encoding='utf-8') as f:
    json.dump(database_dict, f, indent=4,ensure_ascii=False)