<template><div><h1 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis" aria-hidden="true">#</a> Mybatis</h1>
<p>思路：搭建环境---导入mybatis----编写代码----测试</p>
<h2 id="_1-搭建环境" tabindex="-1"><a class="header-anchor" href="#_1-搭建环境" aria-hidden="true">#</a> 1. 搭建环境</h2>
<p>搭建数据库</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>CREATE DATABASE `mybatis`;

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-新建项目" tabindex="-1"><a class="header-anchor" href="#_2-新建项目" aria-hidden="true">#</a> 2. 新建项目</h2>
<h3 id="_1-新建一个普通的maven项目" tabindex="-1"><a class="header-anchor" href="#_1-新建一个普通的maven项目" aria-hidden="true">#</a> 1.新建一个普通的maven项目</h3>
<h3 id="_2-删除src" tabindex="-1"><a class="header-anchor" href="#_2-删除src" aria-hidden="true">#</a> 2.删除src</h3>
<h3 id="_3-导入maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-导入maven依赖" aria-hidden="true">#</a> 3. 导入maven依赖</h3>
<pre><code>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;mysql&lt;/groupId&gt;
        &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;version&gt;8.0.29&lt;/version&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;org.mybatis&lt;/groupId&gt;
        &lt;artifactId&gt;mybatis&lt;/artifactId&gt;
        &lt;version&gt;3.5.9&lt;/version&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;junit&lt;/groupId&gt;
        &lt;artifactId&gt;junit&lt;/artifactId&gt;
        &lt;version&gt;4.12&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;
</code></pre>
<h3 id="_4-创建一个模块" tabindex="-1"><a class="header-anchor" href="#_4-创建一个模块" aria-hidden="true">#</a> 4. 创建一个模块</h3>
<ul>
<li>编写mybatis的核心配置文件</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">configuration</span>
        <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Config 3.0//EN"</span>
        <span class="token string">"http://mybatis.org/dtd/mybatis-3-config.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>environments</span> <span class="token attr-name">default</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>development<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>environment</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>development<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transactionManager</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>JDBC<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dataSource</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>POOLED<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driver<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://localhost:3306/mybatis?useSSL=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>useUnicode=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>characterEncoding=UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0000<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dataSource</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>environment</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>environments</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>编写mybatis工具类</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBatisUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
<span class="token comment">//            使用mybatis的第一步，获取sqlsessionfactory对象</span>
            <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
            <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
            sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//    既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例。</span>
<span class="token comment">//    SqlSession 提供了在数据库执行 SQL 命令所需的所有方法。</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">SqlSession</span> <span class="token function">getSqlSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>编写代码</p>
<ul>
<li>编写实体类</li>
<li>Dao/Mapper 接口</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserDao</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">getUserList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>接口实现类 由原来的UserDaoImpl转变为一个Mapper配置文件</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span>
        <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span>
        <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--namespace=绑定一个对应的Dao/Mapper接口--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.dao.UserDao<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getUserList<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.User<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        select * from mybatis.user
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试" aria-hidden="true">#</a> 5. 测试</h3>
<p>注意点：</p>
<p>org.apache.ibatis.binding.BindingException: Type interface com.cpx.dao.UserDao is not known to the MapperRegistry.</p>
<p>问题原因是maven约定大于配置，配置文件不会自动打包，所以要添加上打包配置信息</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">></span></span>src/main/resources<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>**/*.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>**/*.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filtering</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filtering</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">></span></span>src/main/java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>**/*.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>**/*.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filtering</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filtering</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cause: com.sun.org.apache.xerces.internal.impl.io.MalformedByteSequenceExcep</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MapperRegistry是什么</p>
<p>核心配置文件中注册mappers</p>
<ul>
<li>junit测试</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//        第一步：获得SQLSession对象</span>
        <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> <span class="token class-name">MyBatisUtils</span><span class="token punctuation">.</span><span class="token function">getSqlSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//      方式一：getMapper</span>
        <span class="token class-name">UserDao</span> userDao <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> userList <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUserList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">User</span> user <span class="token operator">:</span> userList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//        关闭SqlSession</span>
        sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-环境配置" tabindex="-1"><a class="header-anchor" href="#_3-环境配置" aria-hidden="true">#</a> 3. 环境配置</h1>
<p>Mybatis可以配置多套环境</p>
<p>默认的事务管理器是jdbc，连接池POOLED</p>
<p>db.properties</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">driver</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.cj.jdbc.Driver</span>
<span class="token key attr-name">url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/mybatis?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8</span>
<span class="token key attr-name">username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">password</span><span class="token punctuation">=</span><span class="token value attr-value">0000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在核心配置文件中映入</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span> <span class="token attr-name">resource</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>db.properties<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_3-使用注解" tabindex="-1"><a class="header-anchor" href="#_3-使用注解" aria-hidden="true">#</a> 3. 使用注解</h2>
<ol>
<li>配置文件中添加映射</li>
</ol>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mappers</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.dao.UserDao<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mappers</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>在接口上添加注解</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user where id = #{id}"</span><span class="token punctuation">)</span>
<span class="token class-name">User</span> <span class="token function">getUserById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user"</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-lombok" tabindex="-1"><a class="header-anchor" href="#_4-lombok" aria-hidden="true">#</a> 4. Lombok</h2>
<ol>
<li>IDEA安装插件----&gt;重启</li>
<li>maven导入依赖</li>
</ol>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.projectlombok/lombok --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.22<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>添加注解</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> pwd<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


