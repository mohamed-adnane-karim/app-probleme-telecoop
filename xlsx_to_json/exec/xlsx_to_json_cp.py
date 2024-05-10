import pandas as pd 
import json
from geopy.geocoders import Nominatim
from time import sleep


database_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\data\019HexaSmal.csv'
database=pd.read_csv(database_link, encoding='utf-8',sep=';', dtype={'Code_postal': str})
print(database)
database_dic=[]


def get_coordinates(location):
    geolocator = Nominatim(user_agent="my_geocoder")
    while True:
        try:
            location_info = geolocator.geocode(location)
            if location_info:
                return location_info.latitude, location_info.longitude
            else:
                return None, None
        except Exception as e:
            print("Une erreur s'est produite lors de la géocodage. Tentative de reconnexion dans 5 secondes...")
            sleep(5)  # Attendre 5 secondes avant de réessayer

for _,row in database.iterrows():
    cp=row['Code_postal']
    ville=row['Libell_d_acheminement']

    combo_cp_ville={"codePostal":cp, "ville":ville}
    compo=str(ville+', '+cp)
    lat,lon=get_coordinates(compo)
    compo_cp_ville_coord={"codePostal":cp, "ville":ville, "lat": lat, "lon":lon}
    if compo_cp_ville_coord not in database_dic:
        print(compo_cp_ville_coord)
        database_dic.append(compo_cp_ville_coord)


json_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\exec\villes.json'
with open(json_link, 'w',encoding='utf-8') as f:
    json.dump(database_dic, f, indent=4,ensure_ascii=False)