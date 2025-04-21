from GTrace import GTrace
import json
import random
import time
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('TkAgg')
from DrissionPage import WebPage
from DrissionPage.common import Actions
from PIL import Image
import requests
import cv2
import re
def download_image(url, save_path):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(save_path, "wb") as f:
                f.write(response.content)
            print(f"图像已成功下载并保存为 {save_path}")
        else:
            print(f"下载失败，状态码: {response.status_code}")

    except Exception as e:
        print(f"发生错误: {e}")

def math_quekou(quekou_image, bg_image, x, y):
    tp_edge = cv2.Canny(quekou_image, 100, 200)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)

    # 读取目标图片
    bg_edge = cv2.Canny(bg_image, 100, 200)
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)

    # 使用模板匹配
    result = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    # 获取匹配位置
    top_left = max_loc  # 左上角点的坐标
    h, w, _ = tp_pic.shape
    bottom_right = (top_left[0] + w, top_left[1] + h)

    # 在目标图片上绘制匹配结果
    cv2.rectangle(bg_image, top_left, bottom_right, (0, 255, 0), 2)

    # 将缺口补充到背景图上
    # 获取要覆盖的图像尺寸
    overlay_h, overlay_w = quekou_image.shape[:2]
    # 指定放置位置左上角坐标
    # 将小图像放到大图像上（注意边界处理）
    bg_h, bg_w = bg_image.shape[:2]
    if x + overlay_w > bg_w or y + overlay_h > bg_h:
        raise ValueError("Overlay image exceeds background boundaries.")

    # 替换背景图像的对应区域
    bg_image[y:y + overlay_h, x:x + overlay_w] = quekou_image
    cv2.imwrite('result.png', bg_image)

    # 显示结果
    # cv2.imshow('Matched Result', bg_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return top_left


def __ease_out_expo(sep):
    if sep == 1:
        return 1
    else:
        return 1 - pow(2, -10 * sep)


def get_slide_track(distance):
    """
    根据滑动距离生成滑动轨迹
    :param distance: 需要滑动的距离
    :return: 滑动轨迹<type 'list'>: [[x,y,t], ...]
        x: 已滑动的横向距离
        y: 已滑动的纵向距离, 除起点外, 均为0
        t: 滑动过程消耗的时间, 单位: 毫秒
    """

    if not isinstance(distance, int) or distance < 0:
        raise ValueError(f"distance类型必须是大于等于0的整数: distance: {distance}, type: {type(distance)}")
    # 初始化轨迹列表
    slide_track = [
        [random.uniform(-50, -10), random.uniform(-50, -10), 0],
        [0, 0, 0],
    ]
    # 共记录count次滑块位置信息
    count = 30 + int(distance / 2)
    # 初始化滑动时间
    t = random.randint(50, 100)
    # 记录上一次滑动的距离
    _x = 0
    _y = 0
    for i in range(count):
        # 已滑动的横向距离
        x = __ease_out_expo(i / count) * distance
        # 滑动过程消耗的时间
        t += random.randint(10, 20)
        if x == _x:
            continue
        slide_track.append([x, _y, t])
        _x = x
    slide_track.append(slide_track[-1])
    return slide_track

def reset_img(t, name):
    Ut = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45, 43, 42, 12,
          13,
          23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17]

    r = t.height

    # 创建一个新的空白图像，大小根据需求进行调整
    output_image = Image.new("RGB", (26 * 10, r), color=(255, 255, 255))  # 白色背景的图像

    # 获取图像的像素数据
    pixels = output_image.load()
    a = r//2
    for _ in range(52):
        c = Ut[_] % 26 * 12 + 1
        u = a if 25 < Ut[_] else 0

        left = c
        upper = u
        right = left + 10
        lower = upper + r // 2

        img_data = t.crop((c, u, right, lower))  # 裁剪图像
        output_image.paste(img_data, (_ % 26 * 10, a if _>25 else 0))

    output_image.save(name+".png")



base_url = 'https://static.geetest.com/'
def run_webdriver():
    """初始化浏览器"""
    page = WebPage()
    page.get('https://demos.geetest.com/slide-float.html')
    return page

def deal_yzm(driver, huakuai, drag_distance):
    driver.actions.move(random.uniform(10,40), random.uniform(15,30), duration=random.uniform(0.5,1))
    print("滑块拖动开始")
    driver.actions.move_to(huakuai, duration=random.uniform(0.5,1)).hold()
    before_x = 0
    before_y = random.uniform(-10,10)
    before_t = 0
    guiji =  GTrace().get_mouse_pos_path(drag_distance)[1]  #get_slide_track(drag_distance+rush_x)
    # print(guiji)
    for _ in guiji:
        # print(_, _[2]/1000 - before_t)
        driver.actions.move(_[0] - before_x, _[1] - before_y, duration=_[2]/1000 - before_t)
        before_x, before_y, before_t = _[0], _[1], _[2] / 1000
    # # 模拟冲过滑块区域
    # driver.actions.move(-rush_x, before_y, duration=random.uniform(0.1,0.5))
    driver.actions.release()
    print("滑块拖动完成")
    return guiji


def debug_track(track):
    plt.figure(figsize=(12, 4))

    # X-T曲线
    plt.subplot(131)
    plt.plot([t / 1000 for t in track['time']], track['x'])
    plt.title('X Position vs Time')

    # V-T曲线
    plt.subplot(132)
    velocities = [(track['x'][i] - track['x'][i - 1]) / (track['time'][i] - track['time'][i - 1]) * 1000 if i > 0 and track['time'][i] - track['time'][i - 1] != 0 else 0
                  for i in range(len(track['x']))]
    plt.plot([t / 1000 for t in track['time']], velocities)
    plt.title('Velocity vs Time')

    # Y轨迹
    plt.subplot(133)
    plt.plot(track['x'], track['y'], 'o-')
    plt.title('Y Offset during Moving')

    plt.tight_layout()
    # 使用 PyCharm 兼容的方式显示图像
    plt.show()

def login_web(page):
    i = 1
    is_true = True
    while True:
        print(f"第{i}次滑动")
        place_bt = "xpath://*[@id='captcha']/div[3]/div[2]/div[1]/div[3]" if is_true else "xpath://span[@class='geetest_reset_tip_content']"
        button = page.ele(place_bt, timeout=10)
        button.wait.displayed()
        button.click()
        # 等待验证码出现
        page.listen.start("api.geevisit.com/get.php")
        # 下载验证码图片
        y = 0
        for packet in page.listen.steps():
            print(f"packet: {packet.response.status}")
            if packet.response.status == 200:
                match = re.search(r'\((\{.*\})\)', packet.response.body)
                body = json.loads(match.group(1)) if match else None
                y = body['ypos']
                bg_url = base_url + body['bg']
                huakuai_url = base_url + body['slice']
                download_image(bg_url, "bg.png")
                download_image(huakuai_url, "slice.png")
                reset_img(Image.open("bg.png"), "bg1")
                break
        bg1 = cv2.imread("bg1.png")
        slice = cv2.imread("slice.png")
        distance = math_quekou(slice, bg1, 0, y)
        # print(distance)
        huakuai = page.ele("xpath:/html/body/div/div[2]/div[1]/div/div[1]/div[2]/div[2]")
        page.listen.start("https://api.geevisit.com/ajax.php")
        guiji = deal_yzm(page, huakuai, distance[0])

        for packet in page.listen.steps():
            print(f"{packet.response.status},{packet.response.body}")
            is_true = "forbidden" not in packet.response.body
            if packet.response.status == 200:
                break
        # print(is_true)
        if is_true:
            track_data = {
                'x': [p[0] for p in guiji],
                'y': [p[1] for p in guiji],
                'time': [p[2] for p in guiji]
            }
            debug_track(track_data)
            return i
        print("滑动失败 再试一次")
        i = i + 1
if __name__ == '__main__':
    try_number = login_web(run_webdriver())