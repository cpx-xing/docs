# 1. 简介

>- Spring是一个轻量级、非入侵式的框架
>- 控制反转（IOC），面向切面编程（AOP）
>- 支持事务，对框架的整合支持

# 2.IOC理论推导

```java
// spring的原型
private UserDao userDao;
// 利用set实现动态注入
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}

@Override
public void getUser() {
    userDao.getUser();
}
```

# 3.依赖注入

## 3.1构造器注入

```xml
<bean id="hello" class="com.cpx.pojo.Hello">
    <property name="string" value="Hello Spring"/>
</bean>
```

## 3.2Set方式注入

- 依赖注入 set注入

  - 依赖：bean对象的创建依赖
  - 注入：bean对象中的所有属性，由容器注入

  ```xml
  <bean id="address" class="com.cpx.pojo.Address"/>
  
  <bean id="student" class="com.cpx.pojo.User">
      <!--        第一种注入，普通值注入，value-->
      <property name="name" value="培星"/>
      <!--        第二种注入，引用注入，ref-->
      <property name="address" ref="address"/>
      <!--        第三种注入，数组注入-->
      <property name="books">
          <array>
              <value>诡秘之主</value>
              <value>凡人修仙传</value>
              <value>斗破苍穹</value>
          </array>
      </property>
      <!--        list注入-->
      <property name="hobbys">
          <list>
              <value>唱</value>
              <value>跳</value>
              <value>rap</value>
              <value>篮球</value>
  
          </list>
      </property>
  </bean>
  ```

## 3.3 拓展方式注入

p注入（property）

```xml
<!-- 添加命名空间-->
xmlns:p="http://www.springframework.org/schema/p"
<!--    p命名空间注入，可以直接注入属性的值，property-->
<bean id="teacher" class="com.cpx.pojo.Teacher" p:age="25" p:name="狂神" p:subject="java"/>
```

c注入（构造器）

```xml
<bean id="teacher" class="com.cpx.pojo.Teacher" c:name="狂神2" p:age="25" p:subject="spring"/>
```

# 4.Bean作用域

- singleton Scoped 单例模式
- prototype  Scoped  原型模式，每次都新增一个
- request \session \ application  只有在web中使用

# 5.Bean的自动装配

- 自动装配是Spring满足bean依赖的一种方式
- Spring会在上下文中自动寻找，并自动给bean装配属性

在Spring中有三种装配的方式：

- 在xml中显示配置
- 在java中显示配置
- 隐式的自动装配bean

## 5.1测试

一个人有两个宠物

```xml
<bean id="dog" class="com.cpx.pojo.Dog"/>
<bean id="cat" class="com.cpx.pojo.Cat"/>

<!--    <bean id="people" class="com.cpx.pojo.People">-->
<!--        <property name="name" value="狂神"/>-->
<!--        <property name="cat" ref="cat"/>-->
<!--        <property name="dog" ref="dog"/>-->
<!--    </bean>-->
<bean id="people" class="com.cpx.pojo.People" autowire="byName">
    <property name="name" value="狂神"/>
</bean>
```

使用注解

1.导入约束 context约束

2.配置注解的支持 context：annotation-config

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

    <bean id="dog" class="com.cpx.pojo.Dog"/>
    <bean id="cat" class="com.cpx.pojo.Cat"/>
    <bean id="people" class="com.cpx.pojo.People"/>

</beans>
```

@Autowired

```java
@Data
public class People {
    @Autowired
    private Cat cat;
    @Autowired
    private Dog dog;
    private String name;
}
```

@Resource和@Autowired

- 都是用来自动装配的，都可以放在属性字段上
- @Autowired通过byname的方式实现，而且必须这个对象存在
- @Resource默认通过byname的方式实现，如果找不到name，则通过byType实现。

# 6.使用注解开发

在Spring2之后，要使用注解开发，必须要保证aop的包导入

使用注解开发需要导入context约束，增加注解支持

1. ## bean

2. ## 注入

```java
// 等价于 <bean id="user" class="com.cpx.pojo.User"/>
//    Component 组件
@Component
@Data
public class User {
    @Value("星")
    private String name ;

    @Value("xing----xing")
    public void setName(String name) {
        this.name = name;
    }
}
```

## 3.衍生注解

@Component有几个衍生注解，我们在web开发中，会按照MVC三层架构分层

- dao @Repository
- service  @Service
- controller  @Controller

这四个注解功能都是一样的，都是代表将某个类注册到Spring中，装在Bean

## 4.支持

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

<!--    指定要扫描的包，这个包下的注解就会生效-->
    <context:component-scan base-package="com.cpx"/>
    <context:annotation-config/>
</beans>
```

# 7.完全使用Java配置Spring

实体类

```java
@Data
public class User {
    private String name = "config-name";
}
```

配置文件

```java
@Configuration
@ComponentScan("com.cpx.pojo")
public class MyConfig {

    @Bean
    public User getUser(){
        return new User();
    }
}
```

测试类

```java
public class ConfigTest {    public static void main(String[] args) {        ApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);        User getUser = (User) context.getBean("getUser");        System.out.println(getUser.getName());    }}
```

# 8 AOP

## 代理模式

为什么要学代理模式，这是SpringAOP的实现原理



## 静态代理

代码步骤：

1. 接口

   ```java
   // 租房
   public interface Rent {
        void rent();
   }
   ```

2. 真实角色

   ```java
   public class Host implements Rent{
   
       @Override
       public void rent() {
           System.out.println("房东要出租房子");
       }
   }
   ```

3. 代理角色

   ```java
   public class Proxy implements Rent {
       private Host host;
   
       public Proxy() {
   
       }
   
       public Proxy(Host host) {
           this.host = host;
       }
   
       @Override
       public void rent() {
           seeHouse();
           host.rent();
       }
   
       // 中介的附属操作
       public void seeHouse() {
           System.out.println("中介带领看房子");
       }
   }
   ```

4. 客户

   ```java
   public class Client {
       public static void main(String[] args) {
           Host host = new Host();
           Proxy proxy = new Proxy(host);
           proxy.rent();
       }
   }
   ```





##  静态代理

角色分析

- 抽象角色：一般会使用接口或者抽象类来解决
- 真实角色：被代理的角色
- 代理角色：代理真实角色，代理真实角色后，我们一般会做一些附属操作
- 客户：访问代理的人

代理的好处：

- 可以使真实角色的操作更加存粹，不用去关注一些公共的方法
- 公共也就交给代理角色，实现了业务的分工
- 公共业务发生扩展的时候，方便集中管理！

缺点：

- 一个真实角色就会产生一个代理角色，代码量会翻倍

## 动态代理

- 动态代理和静态代理角色一样
- 动态代理的代理类是动态生成的，不是我们直接写好的
- 动态代理分为两大类：基于接口的动态代理，基于类的动态代理
  - 基于接口---JDK动态代理
  - 基于类---cglib
  - java字节码实现：javasist

需要了解两个类：Proxy ，InvocationHandler

```java
// 会用这个类，自动生成代理类
public class ProxyInvocationHandler implements InvocationHandler {

//    被代理的接口
    private Rent rent;
//    设置被代理的对象
    public void setRent(Rent rent) {
        this.rent = rent;
    }

    //    生成代理类
    public Object getProxy(){
        return Proxy.newProxyInstance(this.getClass().getClassLoader(), rent.getClass().getInterfaces(), this);
    }

//    处理代理实例，并返回结果
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        Object result = method.invoke(rent,args);
        return result;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
//        真实角色
        Host host = new Host();

//        代理角色，动态生成
        ProxyInvocationHandler pih = new ProxyInvocationHandler();
//        通过调用程序处理角色来处理我们要调度用的接口对象
        pih.setRent(host);
        Rent proxy = (Rent) pih.getProxy();
        proxy.rent();

    }
}

```

使用Spring实现AOP

使用aop植入，需要导入一个依赖包



### 方式一：使用Spring的api接口

### 方式二：自定义类

### 方式三：使用注解

# 10整合Mybatis

Server returns invalid timezone. Go to 'Advanced' tab and set 'serverTimezone' property manually.

 **第二种，在数据库里修改时区，缺点是：修改之后，重启mysql服务后time_zone会还原**
`show variables like '%time_zone%'; //查看时区`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529162945676.png)
修改时区
`set time_zone='+08:00'; //修改时区`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529165559347.png) 



### mybatis 配置信息

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <typeAliases>
        <package name="com.cpx.pojo"/>
    </typeAliases>


    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
                <property name="username" value="root"/>
                <property name="password" value="0000"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper class="com.cpx.mapper.UserMapper"/>
    </mappers>

</configuration>
```

mybatis打包问题

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>

<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```

----------------

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    dataSource:使用spring的数据源替换mybatis的配置-->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
        <property name="username" value="root"/>
        <property name="password" value="0000"/>
    </bean>

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
<!--        绑定mybatis配置文件-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <property name="mapperLocations" value="classpath:com/cpx/mapper/*.xml"/>
    </bean>

    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
<!--        只能使用构造器注入-->
        <constructor-arg index="0" ref="sqlSessionFactory"/>
    </bean>

    <bean id="userMapper" class="com.cpx.mapper.UserMapperImpl">
        <property name="template" ref="sqlSession"/>
    </bean>
</beans>
```

依赖：

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.29</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.9</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.7</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.7</version>
    </dependency>
</dependencies>
```

第二种 方式

公共的部分

- 配置DataSource数据源和sqlsessionfactory

  ```xml
  <!--    dataSource:使用spring的数据源替换mybatis的配置-->
  <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
      <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
      <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
      <property name="username" value="root"/>
      <property name="password" value="0000"/>
  </bean>
  
  <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource" />
      <!--        绑定mybatis配置文件-->
      <property name="configLocation" value="classpath:mybatis-config.xml"/>
      <property name="mapperLocations" value="classpath:com/cpx/mapper/*.xml"/>
  </bean>
  ```

- 创建一个实现类来继承SqlSessionDaoSupport（实际也是封装实现了sqlSessionFactoryTemplate接口），并实现UserMapper接口

  ```java
  public class UserMapper2Impl extends SqlSessionDaoSupport implements UserMapper {
      @Override
      public List<User> getUser() {
          return (List<User>) getSqlSession().getMapper(UserMapper.class).getUser();
      }
  }
  ```

- 注册bean

  ```xml
  <!--只有一个参数就是引入sqlSessionFactory-->
  <bean id="userMapper2" class="com.cpx.mapper.UserMapper2Impl">
      <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
  </bean>
  ```

- 测试

  ````java
  @Test
  public void doTest() throws IOException {
      ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
      UserMapper userMapper = context.getBean("userMapper2", UserMapper.class);
      List<User> userList = userMapper.getUser();
      for (User user : userList) {
          System.out.println(user.getName());
      }
  }
  ````

# 11声明式事务

- 把一组业务当成一个业务来做，要么都成功，要么都失败
- 保证完整性和一致性

事务ACID原则

- 原子性
- 一致性
- 隔离性
  - 多个业务可能操作同一个资源，防止数据损坏
- 持久性
  - 
