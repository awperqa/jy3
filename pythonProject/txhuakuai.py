import datetime
import re
import time
from DrissionPage.common import Actions
import numpy as np
import requests
from DrissionPage import WebPage
from DrissionPage.common import Keys
import random
import cv2
from PIL import Image
from io import BytesIO

login_after_url = 'https://pintia.cn/problem-sets/dashboard'
rate = 0.5059523809523809


# 贝塞尔曲线生成函数（保持不变）
def human_curve(distance, num_points=20):
    """生成贝塞尔曲线轨迹坐标点（相对偏移量）"""
    # 生成时间参数（0到1均匀分布）
    t_values = np.linspace(0, 1, num_points)
    # 贝塞尔曲线控制点参数（可调整）
    acceleration = 0.3  # 初始加速度
    deceleration = 0.2  # 末尾减速
    points = []
    last_x = 0
    for t in t_values:
        # 核心公式：通过三次函数模拟先快后慢
        x = distance * (t + acceleration * t ** 2 - deceleration * t ** 3)
        # Y轴抖动（正弦波动 + 随机噪声）
        y = 2 * np.sin(2 * np.pi * t) + np.random.uniform(-0.5, 0.5)
        # 计算相对于上一个点的偏移量
        delta_x = x - last_x
        delta_y = y
        points.append((delta_x, delta_y))
        last_x = x
    return points

def get_image_url(page, selector):
    element = page.ele(selector)
    style = element.attr('style')
    p = r'background-image:\s*url\("([^"]+)"\)'
    url = re.findall(p, style, re.S)[0]
    return url

def deal_yzm(driver, huakuai, drag_distance):
    # 3. 创建动作链
    action = Actions(driver)
    driver.actions.move_to(huakuai, duration=0).hold()

    total_distance = drag_distance
    current = 0
    while current < total_distance:
        # 随机移动步长（先快后慢）
        step = drag_distance-10 if current < total_distance / 2 else random.randint(1, 3)
        current += step
        if current > total_distance:
            step -= current - total_distance
        driver.actions.move(step, 0)

    driver.actions.release()
    print("滑块拖动完成")

def get_img_by_url(url, name):
    response = requests.get(url)
    if response.status_code == 200:
        print("Image downloaded successfully.")
        image = Image.open(BytesIO(response.content))
        image.save(name)
        return image
    else:
        raise Exception(f"Failed to download image. Status code: {response.status_code}")

def get_quekou(img, top_left, side_length):
    # 计算裁剪区域右下角坐标
    bottom_right = (top_left[0] + side_length, top_left[1] + side_length)
    # 裁剪图片
    cropped_image = img[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]]
    cv2.imwrite('quekou.jpg', cropped_image)
    # 显示结果
    # cv2.imshow('Matched Result', cropped_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    return cropped_image

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


def get_distance(bg_url, tp_url):
    get_img_by_url(bg_url, "bg.png")
    get_img_by_url(tp_url, "tp.png")

    bg_image = cv2.imread('bg.png')
    tp_image = cv2.imread("tp.png")
    # 定义左上角坐标和裁剪区域大小
    top_left = (140, 490)
    side_length = 120
    x = 50
    y = 72
    qk = get_quekou(tp_image, top_left, side_length)
    result = math_quekou(qk, bg_image, x, y)
    print((result[0]-45) * rate)
    return (result[0]-45) * rate

def run_webdriver():
    """初始化浏览器"""
    page = WebPage()
    page.get('https://pintia.cn/home')
    return page
time1 = 0
def login_web(page):
    try:
        # 定位登录按钮
        login_btn = page.ele('xpath://button[contains(@class, "pc-button-outline")]')
        login_btn.click()

        page.listen.start('passport.pintia.cn/api/users/sessions')
        # 填写账号密码
        account = page.ele('xpath://input[@placeholder="电子邮箱或手机号码"]')
        account.input('17336626638')

        password = page.ele('xpath://input[@placeholder="密码"]')
        password.input('dt123456789')
        password.input(Keys.ENTER)

        for packet in page.listen.steps():
            print(f"packet: {packet.response.status}")
            if packet.response.status == 400:
                break
        # 处理验证码
        time1 = time.time()
        iframe = page.ele('xpath://iframe[contains(@name, "https://turing.captcha.qcloud.com")]')
        iframe.wait.eles_loaded('xpath://div[@id="slideBg"]')
        print(iframe)
        if iframe:
            # 获取验证码图片
            print(f"iframe加载时间:{time.time() - time1}")
            time1 = time.time()
            bg_url = get_image_url(iframe, 'xpath://div[@id="slideBg"]')
            tp_url = get_image_url(iframe, 'xpath://*[@id="tcOperation"]/div[8]')
            distance = get_distance(bg_url, tp_url)
            print(f"图片下载识别时间:{time.time() - time1}")
            time1 = time.time()
            # 定位滑块并拖动
            huakuai = iframe.ele('xpath://*[@id="tcOperation"]/div[6]')
            deal_yzm(iframe, huakuai, distance)
            print(f"滑块拖动时间:{time.time() - time1}")

        return True
    except Exception as e:
        print(f'登录失败: {e}')
        return False


if __name__ == '__main__':
    page = run_webdriver()
    if login_web(page):
        print("登录成功")