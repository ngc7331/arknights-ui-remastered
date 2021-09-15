from selenium import webdriver
from selenium.common.exceptions import *
import json
import time
import requests
import sys
import os

url = 'https://music.163.com/#/artist/album?id=32540734&limit=100'
nl = []
t = time.strftime('%Y-%m-%d', time.localtime())
CHROMEDRIVER_URL = 'http://chromedriver.storage.googleapis.com/'
CHROMEDRIVER_ARCH = 'linux64'

def initBrowser(retry:int=0) -> webdriver.Chrome:
    def installChromeDriver(dir:str, version:str = None) -> None:
        if (version is None):
            r = requests.get('%sLATEST_RELEASE' % CHROMEDRIVER_URL)
        else:
            r = requests.get('%sLATEST_RELEASE_%s' % (CHROMEDRIVER_URL, version))
        version = r.content.decode()
        os.popen('wget %s%s/chromedriver_%s.zip -O chromedriver.zip' % (CHROMEDRIVER_URL, version, CHROMEDRIVER_ARCH))
        os.popen('unzip chromedriver.zip')
        os.popen('sudo mv chromedriver "%s"' % dir)
        os.popen('sudo chmod 777 "%s/chromedriver"' % dir)
        os.popen('rm chromedriver.zip' % CHROMEDRIVER_ARCH)

    if (retry >= 3):
        print('Failed 3 times, exiting...')
        sys.exit(1)
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('blink-settings=imagesEnabled=false')
    try:
        browser = webdriver.Chrome(options=chrome_options)
    except Exception as e:
        print(e)
        if ("'chromedriver' executable needs to be in PATH." in e.__str__()):
            print('ChromeDriver Not Found, trying to install...')
            installChromeDriver('/usr/bin')
            return initBrowser(retry+1)
        elif ('Current browser version is' in e.__str__()):
            print('Outdated ChromeDriver, trying to update...')
            version = e.__str__()
            version = version[version.find('Current browser version is ')+27:version.find(' with binary path')].split('.')
            installChromeDriver('/usr/bin', version[0])
            return initBrowser(retry+1)
        sys.exit(1)
    else:
        return browser

#初始化浏览器
browser, browser2 = initBrowser(), initBrowser()

with open('data/bgm_list.json', 'r', encoding='utf-8') as f:
    f = f.read()
    olddate = time.mktime(time.strptime(json.loads(f)['time'], '%Y-%m-%d'))
    l = json.loads(f)['data']
    last_album = json.loads(f)['last_album']

browser.get(url)
iframe = browser.find_element_by_class_name('g-iframe')
browser.switch_to.frame(iframe) #切换到iframe
albums = browser.find_elements_by_class_name('msk')
changed = False
new_album = ''
for album in albums:
    href = album.get_attribute('href')
    album_id = href.replace('https://music.163.com/album?id=', '')
    print('Found album: %s' % href)
    #检测id
    if (album_id == last_album):
        print('Album already exist, stop searching...')
        break
    if (not new_album):
        new_album = album_id
    #进入专辑页面
    browser2.get(href)
    iframe = browser2.find_element_by_class_name('g-iframe')
    browser2.switch_to.frame(iframe)
    topblk = browser2.find_element_by_class_name('topblk')
    date = time.mktime(time.strptime(
        topblk.find_element_by_xpath('.//p[2]').text[5:],
        '%Y-%m-%d'
    ))
    bgms = browser2.find_elements_by_class_name('txt')
    tmp = []
    for bgm in bgms:
        bgm_id = bgm.find_element_by_css_selector('a').get_attribute('href')[30:]
        bgm_name = bgm.find_element_by_css_selector('b').get_attribute('title')
        tmp.append({
            'id': bgm_id,
            'name': bgm_name
        })
        print('Found song: ID: %s, Name: %s' % (bgm_id, bgm_name))
    tmp.reverse()
    nl.extend(tmp)
    changed = True
browser.close()
browser2.close()

if (not changed):
    print('Nothing Changed')
    exit()

print('Dump json')
nl.reverse()
l.extend(nl)
with open('data/bgm_list.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps({
        'time': t,
        'last_album': new_album,
        'data': l
    }, indent=2, separators=(',', ': '), ensure_ascii=False))
print('All Done')