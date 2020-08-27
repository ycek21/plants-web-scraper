from flask_restful import Api, Resource
import requests
from bs4 import BeautifulSoup
import wikipedia
import re
import pandas as pd
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
        plant['Name']=name
        plant['Description']=sentences
        family_info(name)
        #print(plant)


def family_info(name):
    url = wikipedia_url + name
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    trs = soup.find('table',{'class':'infobox biota'}).tbody.findAll('tr')
    rows = filter(lambda tr: tr.td, trs)
    kingdom_row = list(filter(lambda row: row.td[0] == 'Kingdom', rows))

    # albo trs[4].findAll('td')[0] == 'Kingdom:' <- to jest znacznie bardziej schludne
    # [0] to Kingdom jako header, [1] to jego wartosc

    # lambda_func_find = lambda tr: tr.td[0] == 'Kingdom:'
    # family_tr = trs.find(lambda tr: tr.td[0].text == 'Kingdom:')

    # \/ jest dzialajace ale mozna lepiej
    family = trs[4].findAll('td')[1].a.text
    print(kingdom_row)