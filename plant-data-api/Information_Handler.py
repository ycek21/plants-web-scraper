from flask_restful import Api, Resource
import requests
from bs4 import BeautifulSoup
import wikipedia
import re
import json
wikipedia_url = 'https://en.wikipedia.org/wiki/'



class InformationHandler(Resource):

    def get(self,name):
        wiki=wikipedia.page(name)
        text=wiki.content
        text=re.sub(r'==.*?==+','',text)
        text=text.replace('\n','')
        sentences=text.split('.')[:4]
        sentences='.'.join(sentences)
        plant={}
        Kingdom,Family,Order=family_info(name)
        plant['Name'] = name
        plant['Description'] = sentences
        plant['Kingdom']=Kingdom
        plant['Order']=Order
        plant['Family']=Family
        json_plant=json.dumps(plant)
        return json_plant


def family_info(name):
    Kingdom=''
    Family=''
    Order=''
    url = wikipedia_url + name
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    trs = soup.find('table',{'class':'infobox biota'}).tbody.findAll('tr')
    for row in trs:
        cols=row.find_all('td')
        cols=[x.text.strip() for x in cols]
        if( cols.__len__()>1 and cols[0] =='Kingdom:'):
            Kingdom=cols[1]
        if (cols.__len__() > 1 and cols[0] == 'Order:'):
            Order = cols[1]
        if (cols.__len__() > 1 and cols[0] == 'Family:'):
            Family = cols[1]

    return Kingdom,Family,Order

