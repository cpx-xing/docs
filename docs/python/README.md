# 知识点

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

### csv(CSV文件读写)
```python
import csv

# 假设您的数据是一个包含多行的列表，每行是一个包含数据的列表
# 以下是生成示例数据的代码
data_to_write = [["数据" + str(row) + "," + str(col) for col in range(10)] for row in range(500000)]

# 指定CSV文件名
csv_filename = 'large_dataset.csv'

# 打开文件并写入数据
with open(csv_filename, mode='w', newline='') as csv_file:
  # 创建一个csv.writer对象，用于写入数据
  csv_writer = csv.writer(csv_file)

  # 可选：写入标题行（如果您的数据中有标题）
  # csv_writer.writerow(['标题1', '标题2', '标题3', ..., '标题N'])

  # 遍历数据并写入
  for row in data_to_write:
    csv_writer.writerow(row)

print(f"数据已写入到 {csv_filename}")
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

### aiohttp(异步网络请求)
aiohttp 是一个支持异步请求的 Python 库，它利用 asyncio 库提供了一套异步网络连接来执行 HTTP 请求。
```python
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:  # 发起 GET 请求
        return await response.text()  # 获取响应的文本内容

async def main():
    async with aiohttp.ClientSession() as session:  # 创建一个会话
        html = await fetch(session, 'http://python.org')  # 获取指定 URL 的响应
        print(html)

loop = asyncio.get_event_loop()  # 获取事件循环
loop.run_until_complete(main())  # 运行 main 函数

# 关闭事件循环
loop.close()
```
- 在使用 aiohttp 时，可能会遇到各种网络相关的异常。您可以使用 try...except 来处理这些异常：
- aiohttp.ClientError 是许多网络异常的基类，包括连接错误、超时等。
```python
try:
  async with session.get(url) as response:
    response.raise_for_status()
    html = await response.text()
    print(html)
except aiohttp.ClientError as e:
  print(f"An HTTP client error occurred: {e}")
```
- aiohttp.ClientSession 是 aiohttp 的核心功能，它管理连接池，使得多个请求能够共享同一个 TCP 连接。创建一次会话，并在多个请求中重用，这样可以提高效率。

### tqdm(进度条)

tqdm是一个快速、可扩展的Python进度条库，可以在长循环中添加一个进度提示信息，用户只需要封装任意的迭代器tqdm(iterator)。

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

## Python中的并发编程

### 多线程

Python中的多线程允许程序同时运行多个线程来执行不同的任务。Python标准库中的threading模块提供了对多线程的支持。线程共享相同的内存空间，并且它们适合于IO密集型任务。但是，由于全局解释器锁（Global
Interpreter Lock, GIL）的存在，标准的CPython解释器在同一时刻只允许一个线程执行Python字节码。这意味着在计算密集型任务中，多线程可能不会带来性能上的提升。

```python
import threading


def print_numbers():
    for i in range(5):
        print(i)


# 创建线程
thread = threading.Thread(target=print_numbers)

# 启动线程
thread.start()

# 等待线程完成
thread.join()
```

### 多进程

Python的multiprocessing模块允许创建多个进程，每个进程运行在自己的Python解释器中，有自己的内存空间。多进程可以绕过GIL的限制，从而在多核CPU上实现真正的并行计算，这对于计算密集型任务特别有用。

```python
from multiprocessing import Process


def print_numbers():
    for i in range(5):
        print(i)


# 创建进程
process = Process(target=print_numbers)

# 启动进程
process.start()

# 等待进程完成
process.join()
```

### 协程

协程是在单个线程中实现并发的一种方式，它通过异步编程来完成。在Python中，协程通常与asyncio模块一起使用，该模块提供了事件循环的支持。协程通过await语句来挂起当前任务，让出控制权给事件循环，从而允许其他任务运行。协程特别适合于IO密集型任务，如网络IO或文件IO。

```python
import asyncio


async def print_numbers():
    for i in range(5):
        print(i)
        await asyncio.sleep(1)  # 模拟IO操作


# 获取事件循环
loop = asyncio.get_event_loop()

# 运行协程
loop.run_until_complete(print_numbers())

# 关闭事件循环
loop.close()
```



## 数据分析

### Numpy

> 是一个由多维数组对象和用于处理数组的例程集合组成的库

- NumPy 通常与 SciPy（Scientific Python）和 Matplotlib（绘图库）一起使用。 这种组合广泛用于替代 MatLab，是一个流行的技术计算平台。 但是，Python 作为 MatLab 的替代方案，现在被视为一种更加现代和完整的编程语言。

#### Ndarray

- NumPy 中定义的最重要的对象是称为 ndarray 的 N 维数组类型。 它描述相同类型的元素集合。 可以使用基于零的索引访问集合中的项目

- ndarray中的每个元素在内存中使用相同大小的块。 ndarray中的每个元素是数据类型对象的对象（称为 dtype）。

  ```python
  # 创建ndarray
  numpy.array(object, dtype = None, copy = True, order = None, subok = False, ndmin = 0)
  # 参数及描述
  # object 任何暴露数组接口方法的对象都会返回一个数组或任何（嵌套）序列。
  # dtype 数组的所需数据类型，可选。
  # copy 可选，默认为true，对象是否被复制。
  # order C（按行）、F（按列）或A（任意，默认）。
  # subok 默认情况下，返回的数组被强制为基类数组。 如果为true，则返回子类。
  # ndmin 指定返回数组的最小维数。
  ```

#### Numpy中的数据类型

| 序号 |                        数据类型及描述                        |
| :--- | :----------------------------------------------------------: |
| 1.   |           `bool_` 存储为一个字节的布尔值（真或假）           |
| 2.   |  `int_` 默认整数，相当于 C 的`long`，通常为`int32`或`int64`  |
| 3.   |       `intc` 相当于 C 的`int`，通常为`int32`或`int64`        |
| 4.   | `intp` 用于索引的整数，相当于 C 的`size_t`，通常为`int32`或`int64` |
| 5.   |                  `int8` 字节（-128 ~ 127）                   |
| 6.   |             `int16` 16 位整数（-32768 ~ 32767）              |
| 7.   |        `int32` 32 位整数（-2147483648 ~ 2147483647）         |
| 8.   | `int64` 64 位整数（-9223372036854775808 ~ 9223372036854775807） |
| 9.   |              `uint8` 8 位无符号整数（0 ~ 255）               |
| 10.  |            `uint16` 16 位无符号整数（0 ~ 65535）             |
| 11.  |          `uint32` 32 位无符号整数（0 ~ 4294967295）          |
| 12.  |     `uint64` 64 位无符号整数（0 ~ 18446744073709551615）     |
| 13.  |                   `float_` `float64`的简写                   |
| 14.  |      `float16` 半精度浮点：符号位，5 位指数，10 位尾数       |
| 15.  |      `float32` 单精度浮点：符号位，8 位指数，23 位尾数       |
| 16.  |      `float64` 双精度浮点：符号位，11 位指数，52 位尾数      |
| 17.  |                `complex_` `complex128`的简写                 |
| 18.  |     `complex64` 复数，由两个 32 位浮点表示（实部和虚部）     |
| 19.  |    `complex128` 复数，由两个 64 位浮点表示（实部和虚部）     |

#### 数组属性 ndarray.shape

```python
import numpy as np

a = np.array([[1,2,3],[3,4,5]])

print(a.shape) # (2,3)

# 调整数组的结构
a.shape = (1, 2, 3)
print(a) # array([[[1, 2, 3],[3, 4, 5]]])
a.shape = (3,2)
print(a) #[[1,2],[3,3],[4,5]]
# 调整数组结构的另一种方式  reshape
b = a.reshape(2,3)
print(b) #[[1,2,3],[3,4,5]]
```

#### ndarray.itemsize

```python
 # 数组的 dtype 为 int8（一个字节）  
import numpy as np 
x = np.array([1,2,3,4,5], dtype = np.int8)  
print x.itemsize # 1

 
# 数组的 dtype 现在为 float32（四个字节）  
x = np.array([1,2,3,4,5], dtype = np.float32)  
print x.itemsize # 4
```

#### 数组创建例程

##### Numpy.empty 

- 数组元素为随机值

```python
# 它创建指定形状和dtype的未初始化数组。 它使用以下构造函数：
numpy.empty(shape, dtype = float, order = 'C')
# Shape 空数组的形状，整数或整数元组
# Dtype 所需的输出数组类型，可选
# Order 'C'为按行的 C 风格数组，'F'为按列的 Fortran 风格数组
```

##### Numpy.zeros

- 返回特定大小，以 0 填充的新数组。

```python
numpy.zeros(shape, dtype = float, order = 'C')
 
# 含有 5 个 0 的数组，默认类型为 float  
import numpy as np 
x = np.zeros(5)  
print x

```

##### Numpy.ones

```python
 # 含有 5 个 1 的数组，默认类型为 float  
import numpy as np 
x = np.ones(5)  print x
```

##### Numpy.asarray

- 此函数类似于`numpy.array`，除了它有较少的参数。 这个例程对于将 Python 序列转换为`ndarray`非常有用。

```py
 # 将列表转换为 ndarray 
import numpy as np 
 
x =  [1,2,3] 
a = np.asarray(x)  
print a

 
# 来自元组的 ndarray  
x =  (1,2,3) 
a = np.asarray(x)  
print a
```

##### Numpy.frombuffer

- 此函数将缓冲区解释为一维数组。 暴露缓冲区接口的任何对象都用作参数来返回ndarray。

```python
numpy.frombuffer(buffer, dtype = float, count = -1, offset = 0)
# buffer 任何暴露缓冲区借口的对象
# dtype 返回数组的数据类型，默认为float
# count 需要读取的数据数量，默认为-1，读取所有数据
# offset 需要读取的起始位置，默认为0
 
import numpy as np 
s =  'Hello World' 
a = np.frombuffer(s, dtype =  'S1')  
print a # ['H'  'e'  'l'  'l'  'o'  ' '  'W'  'o'  'r'  'l'  'd']
```

##### Numpy.fromiter

- 此函数从任何可迭代对象构建一个`ndarray`对象，返回一个新的一维数组。

  ```python
  numpy.fromiter(iterable, dtype, count = -1)
  # iterable 任何可迭代对象
  # dtype 返回数组的数据类型
  # count 需要读取的数据数量，默认为-1，读取所有数据
   
  # 从列表中获得迭代器  
  import numpy as np 
  list = range(5) 
  it = iter(list)  
  # 使用迭代器创建 ndarray 
  x = np.fromiter(it, dtype =  float)  
  print x
  ```

##### Numpy.arange

- 这个函数返回`ndarray`对象，包含给定范围内的等间隔值。

```python
numpy.arange(start, stop, step, dtype)
# start 范围的起始值，默认为0
# stop 范围的终止值（不包含）
# step 两个值的间隔，默认为1
# dtype 返回ndarray的数据类型，如果没有提供，则会使用输入数据的类型。

 
import numpy as np
x = np.arange(5)  
print x # [0  1  2  3  4]
 
# 设置了起始值和终止值参数  
import numpy as np
x = np.arange(10,20,2)  
print x # [10  12  14  16  18]
```

##### Numpy.linspace

- 此函数类似于`arange()`函数。 在此函数中，指定了范围之间的均匀间隔数量，而不是步长。 此函数的用法如下。

  ```python
  numpy.linspace(start, stop, num, endpoint, retstep, dtype)
  # start 序列的起始值
  # stop 序列的终止值，如果endpoint为true，该值包含于序列中
  # num 要生成的等间隔样例数量，默认为50
  # endpoint 序列中是否包含stop值，默认为ture
  # retstep 如果为true，返回样例，以及连续数字之间的步长
  # dtype 输出ndarray的数据类型
   
  import numpy as np
  x = np.linspace(10,20,5)  
  print x # [10.   12.5   15.   17.5  20.]
  ```

##### Numpy.logsapce

- 此函数返回一个`ndarray`对象，其中包含在对数刻度上均匀分布的数字。 刻度的开始和结束端点是某个底数的幂，通常为 10。

```python
numpy.logscale(start, stop, num, endpoint, base, dtype)
# 	base 对数空间的底数，默认为10 
import numpy as np
# 默认底数是 10
a = np.logspace(1.0,  2.0, num =  10)  
print a

 
# 将对数空间的底数设置为 2  
import numpy as np
a = np.logspace(1,10,num =  10,  base  =  2)  
print a # [ 2.     4.     8.    16.    32.    64.   128.   256.    512.   1024.]

```

#### 索引与切片

- ndarray对象的内容可以通过索引或切片来访问和修改，就像 Python 的内置容器对象一样。

- 如前所述，ndarray对象中的元素遵循基于零的索引。 有三种可用的索引方法类型： **字段访问**，**基本切片**和**高级索引**。

- 基本切片是 Python 中基本切片概念到 n 维的扩展。 通过将start，stop和step参数提供给内置的slice函数来构造一个 Python slice对象。 此slice对象被传递给数组来提取数组的一部分。

```python
import numpy as np
a = np.arange(10)
s = slice(2,7,2)  
print a[s] # [2  4  6]
# ndarray对象由arange()函数创建。 然后，分别用起始，终止和步长值2，7和2定义切片对象。 当这个切片对象传递给ndarray时，会对它的一部分进行切片，从索引2到7，步长为2。
# 通过将由冒号分隔的切片参数（start:stop:step）直接提供给ndarray对象，也可以获得相同的结果。
```



## Python使用中的问题记录

### 使用openpyxl操作大量数据写入

openpyxl在写入大量数据时可能会出现内存溢出的问题，可以通过以下方式解决：

- 使用openpyxl的write_only模式，这种模式针对大数据量的写入进行了优化。

- 确保您有足够的内存来处理这些数据。

- 尽量避免在写入期间执行不必要的操作，如设置单元格样式或格式化，因为这些操作会增加内存的使用。

即使openpyxl可以在技术上支持将50万行数据写入Excel文件，这个操作可能会非常慢，并且生成的文件可能会非常大。此外，打开这样的文件也可能会在Excel中导致性能问题。因此，如果您的数据集非常大，可能需要考虑使用其他数据存储格式，例如数据库、CSV文件或其他支持大数据集的文件格式。
