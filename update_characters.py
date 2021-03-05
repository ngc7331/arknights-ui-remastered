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
chrome_options.add_argument('--remote-debugging-port=50123')
chrome_options.add_argument('blink-settings=imagesEnabled=false')
chrome_options.add_argument('referer=https://kokodayo.fun/')
browser = webdriver.Chrome(options=chrome_options)

def n():
    browser.get(url['base'])
    c_list = browser.find_elements_by_class_name('profile-item')
    for c in c_list:
        innerHTML = c.get_attribute('innerHTML')
        name = re.search('href="/details/(.*)" class=""', innerHTML, re.I).group(1)
        print(name)
        for i in [1,2]:
            for t in ['characters', 'avatars']:
                filename = '%s_%d.png' % (name, i)
                local = 'img/%s_ori/%s'%(t, filename)
                if (os.path.exists(local)):
                    print(local+' exists, skip...')
                    continue
                print('Downloading '+local)
                img = requests.get (url[t]+filename, headers=headers)
                if (img.status_code == 404):
                    print(filename+' not found')
                    if (i!=1):
                        continue
                    filename = '%s.png' % name
                    print('try '+filename)
                    img = requests.get (url[t]+filename, headers=headers)
                    if (img.status_code == 404):
                        print('Still not found')
                with open(local, 'wb') as f:
                    f.write(img.content)
                print(filename+' downloaded')

def s():
    browser.get(url['skin'])
    c_list = browser.find_elements_by_class_name('image-inner')
    for c in c_list:
        style = c.get_attribute('style')
        name = re.search('char/halfPic/(.*).png', style, re.I).group(1)
        print(name)
        for t in ['characters', 'avatars']:
            filename = '%s.png' % name
            local = ('img/%s_ori/%s'%(t, filename)).replace('%23', '')
            if (os.path.exists(local)):
                print(local+' exists, skip...')
                continue
            print('Downloading '+local)
            img = requests.get (url[t]+filename, headers=headers)
            if (img.status_code == 404):
                print(filename+' not found')
                continue
            with open(local, 'wb') as f:
                f.write(img.content)
            print(filename+' downloaded')

def get_files(file_dir):
    for root, dirs, files in os.walk(file_dir):
        return files

def l():
    files = get_files(os.path.join(root_dir, 'img', 'characters_ori'))
    files = list(map(lambda name: name.replace('.png', '').replace('char_', ''), files))
    with open('data/character_list.json', 'w') as f:
        f.write(json.dumps(files, indent=4, separators=(',', ': ')))

#n()
#s()
browser.close()
l()