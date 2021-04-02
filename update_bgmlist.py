from selenium import webdriver
import json
import time

url = 'https://music.163.com/#/artist/album?id=32540734&limit=100'
nl = []
t = time.strftime('%Y-%m-%d', time.localtime())

#初始化浏览器
chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('blink-settings=imagesEnabled=false')
browser = webdriver.Chrome(options=chrome_options)

with open('data/bgm_list.json', 'r', encoding='utf-8') as f:
    f = f.read()
    olddate = time.mktime(time.strptime(json.loads(f)['time'], '%Y-%m-%d'))
    l = json.loads(f)['data']
    last_album = json.loads(f)['last_album']

browser.get(url)
iframe = browser.find_element_by_class_name('g-iframe')
browser.switch_to_frame(iframe) #切换到iframe
browser2 = webdriver.Chrome(options=chrome_options)
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
    browser2.switch_to_frame(iframe)
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