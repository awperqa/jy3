import re
import numpy as np
import requests
from selenium import webdriver
from selenium.common import TimeoutException
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
import random
import cv2
from PIL import Image
from io import BytesIO
from numpy import linspace
login_after_url = 'https://pintia.cn/problem-sets/dashboard'
rate = 0.5059523809523809
# 使用贝塞尔曲线生成更真实的轨迹（需安装 numpy）
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

def get_image_url(driver, XPath):
    image = driver.find_element(By.XPATH, XPath)
    s = image.get_attribute('style')
    p = r'background-image:\s*url\("([^"]+)"\)'
    url = re.findall(p, s, re.S)[0]
    return url

def deal_yzm(driver, huakuai, drag_distance):
    # 3. 创建动作链
    action = ActionChains(driver)
    action.click_and_hold(huakuai).pause(0.1)

    total_distance = drag_distance
    current = 0
    while current < total_distance:
        # 随机移动步长（先快后慢）
        step = drag_distance-10 if current < total_distance / 2 else random.randint(1, 3)
        current += step
        if current > total_distance:
            step -= current - total_distance
        action.move_by_offset(step, 0)

    action.release().perform()
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
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver=webdriver.Chrome(options=options)
    driver.get('https://pintia.cn/home')
    driver.implicitly_wait(10)
    return driver

def login_web(driver):
    try:
        search_box = driver.find_element(By.XPATH,
                                         "//button[@class='pc-button pc-button-outline pc-color-white cursor-pointer']")  # 通过ID定位元素
        search_box.click()
        zhanghao = driver.find_element(By.XPATH, "//input[@placeholder='电子邮箱或手机号码']")
        zhanghao.click()
        zhanghao.clear()
        zhanghao.send_keys("17336626638")  # 输入文本
        mima = driver.find_element(By.XPATH, "//input[@placeholder='密码']")
        mima.click()
        mima.clear()
        mima.send_keys("dt123456789")  # 输入文本
        mima.send_keys(Keys.RETURN)  # 模拟回车键搜索

        # 出现验证码
        yzm = driver.find_element(By.XPATH, "//iframe[@name='https://turing.captcha.qcloud.com']")
        if(yzm):
            driver.switch_to.frame("tcaptcha_iframe_dy")
            huakuai = driver.find_element(By.XPATH,"//*[@id='tcOperation']/div[6]")

            bg_url = get_image_url(driver, "//div[@id='slideBg']")
            tp_url = get_image_url(driver, "//*[@id='tcOperation']/div[8]")
            distance = get_distance(bg_url, tp_url)
            deal_yzm(driver, huakuai, distance)
        return True
    except TimeoutException:
        return False
# 4. 关闭浏览器（可选）
# driver.quit()  # 关闭所有窗口并退出驱动


if __name__ == '__main__':
    login_web(run_webdriver())