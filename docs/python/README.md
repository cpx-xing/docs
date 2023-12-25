# Python知识点

## 网络请求

### post请求

1. python中默认的post请求形式是：application/x-www-form-urlencoded

- 这种方式默认会对post请求的参数进行url编码，如果参数中有中文，则会出现乱码，所以需要对其警醒处理

```python
from urllib.parse import urlencode, quote

# 字典形式的参数
params = {
    'name': 'John Doe',
    'age': 27,
    'city': 'New York'
}

# 将字典转换为URL编码的查询字符串
query_string = urlencode(params)
print(query_string)  # 输出: name=John+Doe&age=27&city=New+York
# 如果字典中字符串含有括号（），并且不需要进行URL编码，则需要指定安全字符
params = {
    'name': 'John (Doe)',
    'age': 27
}
query_string = urlencode(params, safe='()')
print(query_string)  # 输出: name=John+(Doe)&age=27
```

2. 在post请求中，有的请求需要设置特定的请求头内容，如设置URL的资源路径、设置x-token信息等

## 常用库

### 时间库（time,datetime)

```python
from datetime import datetime, timedelta
import time

# 获取当前日期
now = datetime.now()
# 获取当前时间戳
now_timestamp = time.time()
# 当前日期的前一天
one_day_ago = now - timedelta(days=1)
# 当前日期的后一天
one_day_later = now + timedelta(days=1)
# 当前日期的前一周
one_week_ago = now - timedelta(days=7)
# 当前日期月份的第一天
first_day_of_month = now.replace(day=1)
# 当前日期月份上一个月的最后一天
last_day_of_last_month = first_day_of_month - timedelta(days=1)
# 将当前日期转换为字符串
now_str = now.strftime('%Y-%m-%d')
```
### zipfile(文件解压与压缩)
```python
import zipfile

password = '000'  # 压缩包的密码
zip_filename = "文件名称.zip"
# 解压到指定目录，并传入密码
with zipfile.ZipFile(zip_filename, 'r') as zip_ref:
    zip_ref.extractall(r"C:\Users\Administrator\Downloads", pwd=password.encode())  

# 提取ZIP文件中的所有内容到当前工作目录(注意不是解压到原文件目录，而是当前工作目录)
# extractall 方法的参数可以指定解压目录，可以设置解压密码
with zipfile.ZipFile('my_archive.zip', 'r') as myzip:
    myzip.extractall()
```

### openpyxl和xlrd(Excel文件读写)
> - openpyxl 适用于处理新版的Excel文件（xlsx），并且支持读写操作。
> - xlrd 在 2.0.0 版本之前支持读取xls和xlsx格式，但从2.0.0版本开始只支持读取xls格式。 
> - 如果你需要读取和写入.xlsx文件，建议使用openpyxl。 
> - 如果你需要处理旧版的.xls文件，可以使用旧版本的xlrd或者其他支持.xls文件的库。
```python
from openpyxl import Workbook, load_workbook

# 创建一个新的工作簿（Excel文件）
wb = Workbook()
ws = wb.active
ws['A1'] = "Hello, openpyxl!"

# 保存工作簿
wb.save("example.xlsx")

# 读取现有的工作簿
wb = load_workbook("example.xlsx")
sheet = wb.active

# 读取单元格内容
print(sheet['A1'].value)

# 更新单元格内容
sheet['A1'] = "Hello, World!"
wb.save("example.xlsx")
```

### asyncio(异步编程)
```python
import asyncio

async def main():
    # 执行异步操作
    await asyncio.sleep(1)
    print('Hello, Async World!')

# Python 3.7+
asyncio.run(main())
```

### Flask&Django(Web框架)
#### Flask：
- 微框架： 
Flask是一个微框架，这意味着它是轻量级的，核心功能包括路由、模板引擎和一个开发服务器。它不提供Django中包含的许多高级功能，如ORM、表单生成器等。

- 灵活性和扩展性：
Flask提供了更多的灵活性。开发者可以自由选择他们想要的组件如ORM、表单验证工具等。Flask有许多第三方扩展来添加功能，例如Flask-SQLAlchemy、Flask-WTF、Flask-Migrate等。

- 简洁和易于学习：
Flask相对来说更加简洁，学习曲线较为平缓。它的文档清晰明了，非常适合初学者和构建小型到中型项目。

- 明确性优于便利性：
Flask遵循“显式优于隐式”原则。Flask鼓励开发者显式地做出决策，这让代码通常更加清晰和可控。

#### Django：
- 全能型框架：
Django是一个全能型框架，自带了许多内置功能，包括ORM、表单生成器、用户认证、管理后台等。这使得它成为“开箱即用”的解决方案。

- 它促进了快速开发：
Django的目标是简化开发流程，让你能够快速地构建Web应用。它有一个比较规范的项目结构和应用构建方法。

- 更适合大型项目：
Django的设计目标是促进快速开发和干净、实用的设计，这让它非常适合开发大型、复杂的网站。

- “内置电池”：
Django遵循“内置电池”的哲学，意味着它提供了许多内置功能，以满足Web开发的各种需求。这些功能旨在协同工作，确保协调一致。

**总结：**
如果你需要一个简单而且高度可定制的框架，或者你只是想要一个不带太多额外功能的轻量级框架，Flask可能是更好的选择。
如果你需要一个强大的全功能框架来快速构建一个复杂的Web应用，并且不介意使用框架决定的约定和结构，那么Django可能是更好的选择。
最终，选择哪个框架取决于项目的需求、团队的经验和开发者的个人偏好。两个框架都有庞大的用户基础和丰富的社区支持，因此你可以依据项目的具体需求来选择使用哪个框架。
