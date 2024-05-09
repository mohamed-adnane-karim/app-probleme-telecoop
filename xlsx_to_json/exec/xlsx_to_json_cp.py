import pandas as pd 
import json

database_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\data\019HexaSmal.csv'
database=pd.read_csv(database_link, encoding='utf-8',sep=';', dtype={'Code_postal': str})
print(database)
database_dic=[]

for _,row in database.iterrows():
    cp=row['Code_postal']
    ville=row['Libell_d_acheminement']
    combo_cp_ville={"codePostal":cp, "ville":ville}
    if combo_cp_ville not in database_dic:
        database_dic.append(combo_cp_ville)


json_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\exec\villes.json'
with open(json_link, 'w',encoding='utf-8') as f:
    json.dump(database_dic, f, indent=4,ensure_ascii=False)