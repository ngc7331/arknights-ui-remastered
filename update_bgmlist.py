from selenium import webdriver
import json

url = 'https://music.163.com/#/artist/album?id=32540734&limit=100'
l = []

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('blink-settings=imagesEnabled=false')
browser = webdriver.Chrome(options=chrome_options)

browser.get(url)
iframe = browser.find_element_by_class_name('g-iframe')
browser.switch_to_frame(iframe) #切换到iframe
browser2 = webdriver.Chrome(options=chrome_options)
albums = browser.find_elements_by_class_name('msk')
for album in albums:
    href = album.get_attribute('href')
    print('Found album: %s' % href)
    #进入专辑页面
    browser2.get(href)
    iframe = browser2.find_element_by_class_name('g-iframe')
    browser2.switch_to_frame(iframe)
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
    l.extend(tmp)
browser.close()
browser2.close()
print('Dump json')
l.remove({
    "id": "1371757760",
    "name": "生命流"
})
l.append({
    "id": "1371757760",
    "name": "生命流"
})#置顶生命流
l.reverse()
with open('data/bgm_list.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(l, indent=2, separators=(',', ': '), ensure_ascii=False))
