# Mybatis

思路：搭建环境---导入mybatis----编写代码----测试



## 1. 搭建环境

搭建数据库

```mysql
CREATE DATABASE `mybatis`;

USE `mybatis`;

create TABLE `user` (
	`id` INT(20) NOT NULL PRIMARY KEY ,
	`name` VARCHAR(30) DEFAULT NULL,
	`pwd` VARCHAR(30) DEFAULT NULL
) ENGINE = INNODB DEFAULT CHARSET=utf8;


INSERT INTO `user` (`id`,`name`,`pwd`) VALUES
(1,'狂神','123456'),
(2,'培星','0511'),
(3,'admin','admin')
```

## 2. 新建项目

### 1.新建一个普通的maven项目

### 2.删除src

### 3. 导入maven依赖

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
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>
    </dependencies>

### 4. 创建一个模块

- 编写mybatis的核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>


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

</configuration>
```

- 编写mybatis工具类

```java
public class MyBatisUtils {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
//            使用mybatis的第一步，获取sqlsessionfactory对象
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //    既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例。
//    SqlSession 提供了在数据库执行 SQL 命令所需的所有方法。
    public static SqlSession getSqlSession() {
        return sqlSessionFactory.openSession();
    }
}
```

- 编写代码

  - 编写实体类
  - Dao/Mapper 接口

  ```java
  public interface UserDao {
      List<User> getUserList();
  }
  ```

  - 接口实现类 由原来的UserDaoImpl转变为一个Mapper配置文件

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  
  <!--namespace=绑定一个对应的Dao/Mapper接口-->
  <mapper namespace="com.cpx.dao.UserDao">
      <select id="getUserList" resultType="com.cpx.pojo.User">
          select * from mybatis.user
      </select>
  </mapper>
  ```

  ### 5. 测试

  注意点：

  org.apache.ibatis.binding.BindingException: Type interface com.cpx.dao.UserDao is not known to the MapperRegistry.

  问题原因是maven约定大于配置，配置文件不会自动打包，所以要添加上打包配置信息

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
  ```

  Cause: com.sun.org.apache.xerces.internal.impl.io.MalformedByteSequenceExcep

  ```xml
  <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  ```

  MapperRegistry是什么

  核心配置文件中注册mappers

  - junit测试

  ```java
  public class UserDaoTest {
  
      @Test
      public void test(){
          //        第一步：获得SQLSession对象
          SqlSession sqlSession = MyBatisUtils.getSqlSession();
          //      方式一：getMapper
          UserDao userDao = sqlSession.getMapper(UserDao.class);
          List<User> userList = userDao.getUserList();
  
          for (User user : userList) {
              System.out.println(user.getName());
          }
          //        关闭SqlSession
          sqlSession.close();
      }
  }
  ```

  # 3. 环境配置

  Mybatis可以配置多套环境

  默认的事务管理器是jdbc，连接池POOLED

  db.properties

  ```properties
  driver=com.mysql.cj.jdbc.Driver
  url=jdbc:mysql://localhost:3306/mybatis?useSSL=false&useUnicode=true&characterEncoding=UTF-8
  username=root
  password=0000
  ```

  在核心配置文件中映入

  ```xml
  <properties resource="db.properties"/>
  ```

## 3. 使用注解

1. 配置文件中添加映射

```xml
<mappers>
    <mapper class="com.cpx.dao.UserDao"/>
</mappers>
```

2. 在接口上添加注解

```java
@Select("select * from user where id = #{id}")
User getUserById(int id);

@Select("select * from user")
List<User> getUsers();
```

## 4. Lombok

1. IDEA安装插件---->重启
2. maven导入依赖

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.22</version>
</dependency>
```

3. 添加注解

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private String pwd;
}
```

