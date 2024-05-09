import pandas as pd 
import json
from geopy.geocoders import Nominatim

database_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\data\019HexaSmal.csv'
database=pd.read_csv(database_link, encoding='utf-8',sep=';', dtype={'Code_postal': str})
print(database)
database_dic=[]

def get_coordinates(location):
    geolocator = Nominatim(user_agent="my_geocoder")
    location_info = geolocator.geocode(location)
    if location_info:
        return location_info.latitude, location_info.longitude
    else:
        return None, None

for _,row in database.iterrows():
    cp=row['Code_postal']
    ville=row['Libell_d_acheminement']

    combo_cp_ville={"codePostal":cp, "ville":ville}
    if combo_cp_ville not in database_dic:
        compo=str(ville+', '+cp)
        lat,lon=get_coordinates(compo)
        compo_cp_ville_coord={"codePostal":cp, "ville":ville, "lat": lat, "lon":lon}
        print(compo_cp_ville_coord)
        database_dic.append(combo_cp_ville)


json_link=r'C:\Users\moham\OneDrive\Bureau\MAK - Cloud\CS - Cours\2A\S8\PP\app-probleme-telecoop\xlsx_to_json\exec\villes.json'
with open(json_link, 'w',encoding='utf-8') as f:
    json.dump(database_dic, f, indent=4,ensure_ascii=False)