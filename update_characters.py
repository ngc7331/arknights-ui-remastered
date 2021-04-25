import requests
import re
from selenium import webdriver
import os
import json

url = {
    'base': 'https://kokodayo.fun/',
    'skin': 'https://kokodayo.fun/skins',
    'characters': 'https://andata.somedata.top/dataX/char/set/',
    'avatars': 'https://andata.somedata.top/dataX/char/profile/'
}
headers = {
    'referer': 'https://kokodayo.fun/'
}
root_dir = os.getcwd()

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('blink-settings=imagesEnabled=false')
chrome_options.add_argument('referer=https://kokodayo.fun/')

def n():
    browser = webdriver.Chrome(options=chrome_options)
    print('\n\nDownloading Character...')
    browser.get(url['base'])
    c_list = browser.find_elements_by_class_name('profile-item')
    for c in c_list:
        innerHTML = c.get_attribute('innerHTML')
        name = re.search('href="/details/(.*)" class=""', innerHTML, re.I).group(1)
        print(name)
        for i in [1,2]:
            for t in ['characters', 'avatars']:
                filename = '%s_%d.png' % (name, i)
                if (filename == 'char_1001_amiya2_1.png'):
                    continue
                local = 'img/%s/%s'%(t, filename)
                if (os.path.exists(local)):
                    print(' - %s exists, skip...' % local)
                    continue
                print(' - Downloading %s ... ' % local, end='')
                img = requests.get (url[t]+filename, headers=headers)
                if (img.status_code == 404):
                    print('Not found')
                    if (i!=1):
                        continue
                    filename = '%s.png' % name
                    print('   - Try %s ... ' % filename, end='')
                    img = requests.get (url[t]+filename, headers=headers)
                    if (img.status_code == 404):
                        print('Still not found')
                with open(local, 'wb') as f:
                    f.write(img.content)
                print('Downloaded')
    browser.close()

def s():
    browser = webdriver.Chrome(options=chrome_options)
    print('\n\nDownloading Skin...')
    browser.get(url['skin'])
    c_list = browser.find_elements_by_class_name('image-inner')
    for c in c_list:
        style = c.get_attribute('style')
        name = re.search('char/halfPic/(.*).png', style, re.I).group(1)
        print(name)
        for t in ['characters', 'avatars']:
            filename = '%s.png' % name
            local = ('img/%s/%s'%(t, filename)).replace('%23', '')
            if (os.path.exists(local)):
                print(' - %s exists, skip...' % local)
                continue
            print(' - Downloading %s ... ' % local, end='')
            img = requests.get (url[t]+filename, headers=headers)
            if (img.status_code == 404):
                print('Not found')
                continue
            with open(local, 'wb') as f:
                f.write(img.content)
            print('Downloaded')
    browser.close()

def l():
    print('\n\nUpdating List...')
    def sortChar(name):
        if ('amiya' in name):
            return 2
        return int(re.search('^([0-9]*)_', name).group(1))

    r = requests.get('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/skin_table.json')
    char_l = []
    for i in json.loads(r.content)['charSkins'].keys():
        if ('char' != i[:4]):
            continue
        i = i.replace('char_', '')
        if ('@' in i):
            i = i.replace('@', '_').replace('#', '')
        elif ('#' in i):
            i = i.replace('#', '_')
        char_l.append(i)
    char_l.sort(key=sortChar)

    char_l.append('1505_frstar_1') # "我自愿加入罗德岛"
    with open('data/character_list.json', 'w') as f:
        f.write(json.dumps(char_l, indent=4, separators=(',', ': ')))


if __name__ == '__main__':
    n()
    s()
    l()