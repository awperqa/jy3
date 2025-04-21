import json
import subprocess
import time
import re
from GTrace import GTrace
import cv2
import requests
import json
from PIL import Image
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

time1 = time.time()
session = requests.Session()
headers1 = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0"
}

base_url = 'https://static.geetest.com/'

register_url = "https://demos.geetest.com/gt/register-slide?t="+str(int(time.time()*1000))
register_rp = session.get(register_url)
challenge = json.loads(register_rp.text)["challenge"]
gt = json.loads(register_rp.text)["gt"]
print(f"gt challenge请求响应结果:{register_rp.text}")

#  w1
w1_config = {"choice":1,"gt1": gt,"challenge": challenge}
w1_js = subprocess.run(['node', ".\\js补环境\\index.js", json.dumps(w1_config)], capture_output=True, text=True)
# print(w1_js.stdout)
w1 = json.loads(w1_js.stdout)[0]
w1_key = json.loads(w1_js.stdout)[1]
w1_params = {
    'gt': gt,
    'challenge': challenge,
    'lang': 'zh-cn',
    'pt': 0,
    'client_type': 'web',
    'w': w1,
    "callback": "geetest_"+str(int(round(time.time() * 1000)))
}

w1_url = "https://apiv6.geetest.com/get.php"
w1_response = session.get(w1_url, headers=headers1, params=w1_params)
print(f"w1请求响应结果:{w1_response.text}")
print(w1_key)
match = re.search(r'\((\{.*\})\)', w1_response.text)
w1_result = json.loads(match.group(1)) if match else None
c = w1_result['data']['c']


# w2
w2_url = "https://api.geevisit.com/ajax.php"
w2_config = {"choice": 2,"gt1": gt,"challenge": challenge,"key1": w1_key}
w2_js = subprocess.run(['node', ".\\js补环境\\index.js", json.dumps(w2_config)], capture_output=True, text=True)
print(w2_js.stdout)

w2_params = {
    'gt': gt,
    'challenge': challenge,
    'lang': 'zh-cn',
    'pt': 0,
    'client_type': 'web',
    'w': w2_js.stdout,
    "callback": "geetest_"+str(int(round(time.time() * 1000)))
}
w2_response = session.get(w2_url, headers=headers1, params=w2_params)
print(f"w2请求响应结果:{w2_response.text}")

# is_next
is_next_url = "https://api.geevisit.com/get.php"
is_next_params = {"is_next": 'true',"type": "slide3","gt": gt,"challenge": challenge,"lang": "zh-cn","https":"true","protocol":"https://","offline":"false","product":"embed","api_server":"api.geevisit.com","isPC":"true","autoReset":"true","width":"100%","callback":"geetest_"+str(int(round(time.time() * 1000)))}
is_next_response = session.get(is_next_url, headers=headers1, params=is_next_params)
print(f"is_next请求响应结果:{is_next_response.text}")

match = re.search(r'\((\{.*\})\)', is_next_response.text)
is_next_result = json.loads(match.group(1)) if match else None

challenge2 = is_next_result["challenge"]
y = is_next_result['ypos']
s = is_next_result['s']
print(f"s:{s}")
bg_url = base_url + is_next_result['bg']
huakuai_url = base_url + is_next_result['slice']

download_image(bg_url, "bg.png")
download_image(huakuai_url, "slice.png")

reset_img(Image.open("bg.png"), "bg1")

bg1 = cv2.imread("bg1.png")
slice = cv2.imread("slice.png")
distance = math_quekou(slice, bg1, 0, y)
print(distance)
guiji =  GTrace().get_mouse_pos_path(distance[0])[1]
print(guiji)

# w3
w3_url = "https://api.geevisit.com/ajax.php"
w3_config = {"choice": 3,"gt1": gt,"challenge2": challenge2,"dtt":s,"distance":distance[0],"guiji_list":guiji}
w3_js = subprocess.run(['node', ".\\js补环境\\index.js", json.dumps(w3_config)], capture_output=True, text=True)
print(w3_js.stdout)
w3_params = {
    "gt": gt,
    "challenge": challenge2,
    "lang": "zh-cn",
    "$_BCN":0,
    "client_type":"web",
    "w":w3_js.stdout+'2b74062c0e22bdfed63023077d3630f1e3d483dae31806af4a8153654900cf7a7c731418d86cbdd3145e570ae958b1e849796417087ee322b732fc2301e5bf235644e779f8868d9bd4b1188ea059b4c2e7819c97b143b34db4d3eb6e1c33ca6ee585ad11fbba91cf720adfd124ad764cab1a7882d95032a8d41d13d4b89f6779',
    "callback":"geetest_"+str(int(round(time.time() * 1000)))
}

w3_response = session.get(w3_url, headers=headers1, params=w3_params)
print(f"w3请求响应结果:{w3_response.text}")

print(f"总用时:{time.time()-time1}")



















