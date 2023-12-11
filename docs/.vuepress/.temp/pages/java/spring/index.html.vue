<template><div><h1 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h1>
<blockquote>
<ul>
<li>Spring是一个轻量级、非入侵式的框架</li>
<li>控制反转（IOC），面向切面编程（AOP）</li>
<li>支持事务，对框架的整合支持</li>
</ul>
</blockquote>
<h1 id="_2-ioc理论推导" tabindex="-1"><a class="header-anchor" href="#_2-ioc理论推导" aria-hidden="true">#</a> 2.IOC理论推导</h1>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// spring的原型</span>
<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span>
<span class="token comment">// 利用set实现动态注入</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUserDao</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>userDao <span class="token operator">=</span> userDao<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-依赖注入" tabindex="-1"><a class="header-anchor" href="#_3-依赖注入" aria-hidden="true">#</a> 3.依赖注入</h1>
<h2 id="_3-1构造器注入" tabindex="-1"><a class="header-anchor" href="#_3-1构造器注入" aria-hidden="true">#</a> 3.1构造器注入</h2>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hello<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Hello<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>string<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Hello Spring<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2set方式注入" tabindex="-1"><a class="header-anchor" href="#_3-2set方式注入" aria-hidden="true">#</a> 3.2Set方式注入</h2>
<ul>
<li>
<p>依赖注入 set注入</p>
<ul>
<li>依赖：bean对象的创建依赖</li>
<li>注入：bean对象中的所有属性，由容器注入</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>address<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Address<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>student<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.User<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        第一种注入，普通值注入，value--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>培星<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--        第二种注入，引用注入，ref--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>address<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>address<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--        第三种注入，数组注入--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>books<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>array</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>诡秘之主<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>凡人修仙传<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>斗破苍穹<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>array</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        list注入--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hobbys<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>list</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>唱<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>跳<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>rap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>篮球<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>list</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_3-3-拓展方式注入" tabindex="-1"><a class="header-anchor" href="#_3-3-拓展方式注入" aria-hidden="true">#</a> 3.3 拓展方式注入</h2>
<p>p注入（property）</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 添加命名空间--></span>
xmlns:p="http://www.springframework.org/schema/p"
<span class="token comment">&lt;!--    p命名空间注入，可以直接注入属性的值，property--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>teacher<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Teacher<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>age</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>25<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>狂神<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>subject</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>c注入（构造器）</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>teacher<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Teacher<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">c:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>狂神2<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>age</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>25<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>subject</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>spring<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_4-bean作用域" tabindex="-1"><a class="header-anchor" href="#_4-bean作用域" aria-hidden="true">#</a> 4.Bean作用域</h1>
<ul>
<li>singleton Scoped 单例模式</li>
<li>prototype  Scoped  原型模式，每次都新增一个</li>
<li>request \session \ application  只有在web中使用</li>
</ul>
<h1 id="_5-bean的自动装配" tabindex="-1"><a class="header-anchor" href="#_5-bean的自动装配" aria-hidden="true">#</a> 5.Bean的自动装配</h1>
<ul>
<li>自动装配是Spring满足bean依赖的一种方式</li>
<li>Spring会在上下文中自动寻找，并自动给bean装配属性</li>
</ul>
<p>在Spring中有三种装配的方式：</p>
<ul>
<li>在xml中显示配置</li>
<li>在java中显示配置</li>
<li>隐式的自动装配bean</li>
</ul>
<h2 id="_5-1测试" tabindex="-1"><a class="header-anchor" href="#_5-1测试" aria-hidden="true">#</a> 5.1测试</h2>
<p>一个人有两个宠物</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dog<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Dog<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Cat<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token comment">&lt;!--    &lt;bean id="people" class="com.cpx.pojo.People">--></span>
<span class="token comment">&lt;!--        &lt;property name="name" value="狂神"/>--></span>
<span class="token comment">&lt;!--        &lt;property name="cat" ref="cat"/>--></span>
<span class="token comment">&lt;!--        &lt;property name="dog" ref="dog"/>--></span>
<span class="token comment">&lt;!--    &lt;/bean>--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>people<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.People<span class="token punctuation">"</span></span> <span class="token attr-name">autowire</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>byName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>狂神<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用注解</p>
<p>1.导入约束 context约束</p>
<p>2.配置注解的支持 context：annotation-config</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>annotation-config</span><span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dog<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Dog<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.Cat<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>people<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo.People<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Autowired</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Dog</span> dog<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Resource和@Autowired</p>
<ul>
<li>都是用来自动装配的，都可以放在属性字段上</li>
<li>@Autowired通过byname的方式实现，而且必须这个对象存在</li>
<li>@Resource默认通过byname的方式实现，如果找不到name，则通过byType实现。</li>
</ul>
<h1 id="_6-使用注解开发" tabindex="-1"><a class="header-anchor" href="#_6-使用注解开发" aria-hidden="true">#</a> 6.使用注解开发</h1>
<p>在Spring2之后，要使用注解开发，必须要保证aop的包导入</p>
<p>使用注解开发需要导入context约束，增加注解支持</p>
<ol>
<li>
<h2 id="bean" tabindex="-1"><a class="header-anchor" href="#bean" aria-hidden="true">#</a> bean</h2>
</li>
<li>
<h2 id="注入" tabindex="-1"><a class="header-anchor" href="#注入" aria-hidden="true">#</a> 注入</h2>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 等价于 &lt;bean id="user" class="com.cpx.pojo.User"/></span>
<span class="token comment">//    Component 组件</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"星"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"xing----xing"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-衍生注解" tabindex="-1"><a class="header-anchor" href="#_3-衍生注解" aria-hidden="true">#</a> 3.衍生注解</h2>
<p>@Component有几个衍生注解，我们在web开发中，会按照MVC三层架构分层</p>
<ul>
<li>dao @Repository</li>
<li>service  @Service</li>
<li>controller  @Controller</li>
</ul>
<p>这四个注解功能都是一样的，都是代表将某个类注册到Spring中，装在Bean</p>
<h2 id="_4-支持" tabindex="-1"><a class="header-anchor" href="#_4-支持" aria-hidden="true">#</a> 4.支持</h2>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--    指定要扫描的包，这个包下的注解就会生效--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>annotation-config</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_7-完全使用java配置spring" tabindex="-1"><a class="header-anchor" href="#_7-完全使用java配置spring" aria-hidden="true">#</a> 7.完全使用Java配置Spring</h1>
<p>实体类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"config-name"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token string">"com.cpx.pojo"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigTest</span> <span class="token punctuation">{</span>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>        <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">MyConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token class-name">User</span> getUser <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"getUser"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>getUser<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_8-aop" tabindex="-1"><a class="header-anchor" href="#_8-aop" aria-hidden="true">#</a> 8 AOP</h1>
<h2 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h2>
<p>为什么要学代理模式，这是SpringAOP的实现原理</p>
<h2 id="静态代理" tabindex="-1"><a class="header-anchor" href="#静态代理" aria-hidden="true">#</a> 静态代理</h2>
<p>代码步骤：</p>
<ol>
<li>
<p>接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 租房</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Rent</span> <span class="token punctuation">{</span>
     <span class="token keyword">void</span> <span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>真实角色</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Host</span> <span class="token keyword">implements</span> <span class="token class-name">Rent</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"房东要出租房子"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>代理角色</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> <span class="token class-name">Rent</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Host</span> host<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token class-name">Host</span> host<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>host <span class="token operator">=</span> host<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">seeHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        host<span class="token punctuation">.</span><span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 中介的附属操作</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">seeHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"中介带领看房子"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>客户</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Host</span> host <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Host</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Proxy</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
        proxy<span class="token punctuation">.</span><span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="静态代理-1" tabindex="-1"><a class="header-anchor" href="#静态代理-1" aria-hidden="true">#</a> 静态代理</h2>
<p>角色分析</p>
<ul>
<li>抽象角色：一般会使用接口或者抽象类来解决</li>
<li>真实角色：被代理的角色</li>
<li>代理角色：代理真实角色，代理真实角色后，我们一般会做一些附属操作</li>
<li>客户：访问代理的人</li>
</ul>
<p>代理的好处：</p>
<ul>
<li>可以使真实角色的操作更加存粹，不用去关注一些公共的方法</li>
<li>公共也就交给代理角色，实现了业务的分工</li>
<li>公共业务发生扩展的时候，方便集中管理！</li>
</ul>
<p>缺点：</p>
<ul>
<li>一个真实角色就会产生一个代理角色，代码量会翻倍</li>
</ul>
<h2 id="动态代理" tabindex="-1"><a class="header-anchor" href="#动态代理" aria-hidden="true">#</a> 动态代理</h2>
<ul>
<li>动态代理和静态代理角色一样</li>
<li>动态代理的代理类是动态生成的，不是我们直接写好的</li>
<li>动态代理分为两大类：基于接口的动态代理，基于类的动态代理
<ul>
<li>基于接口---JDK动态代理</li>
<li>基于类---cglib</li>
<li>java字节码实现：javasist</li>
</ul>
</li>
</ul>
<p>需要了解两个类：Proxy ，InvocationHandler</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 会用这个类，自动生成代理类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyInvocationHandler</span> <span class="token keyword">implements</span> <span class="token class-name">InvocationHandler</span> <span class="token punctuation">{</span>

<span class="token comment">//    被代理的接口</span>
    <span class="token keyword">private</span> <span class="token class-name">Rent</span> rent<span class="token punctuation">;</span>
<span class="token comment">//    设置被代理的对象</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setRent</span><span class="token punctuation">(</span><span class="token class-name">Rent</span> rent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>rent <span class="token operator">=</span> rent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//    生成代理类</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">newProxyInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rent<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInterfaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token comment">//    处理代理实例，并返回结果</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Object</span> proxy<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>

        <span class="token class-name">Object</span> result <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>rent<span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        真实角色</span>
        <span class="token class-name">Host</span> host <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Host</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        代理角色，动态生成</span>
        <span class="token class-name">ProxyInvocationHandler</span> pih <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyInvocationHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        通过调用程序处理角色来处理我们要调度用的接口对象</span>
        pih<span class="token punctuation">.</span><span class="token function">setRent</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Rent</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Rent</span><span class="token punctuation">)</span> pih<span class="token punctuation">.</span><span class="token function">getProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        proxy<span class="token punctuation">.</span><span class="token function">rent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Spring实现AOP</p>
<p>使用aop植入，需要导入一个依赖包</p>
<h3 id="方式一-使用spring的api接口" tabindex="-1"><a class="header-anchor" href="#方式一-使用spring的api接口" aria-hidden="true">#</a> 方式一：使用Spring的api接口</h3>
<h3 id="方式二-自定义类" tabindex="-1"><a class="header-anchor" href="#方式二-自定义类" aria-hidden="true">#</a> 方式二：自定义类</h3>
<h3 id="方式三-使用注解" tabindex="-1"><a class="header-anchor" href="#方式三-使用注解" aria-hidden="true">#</a> 方式三：使用注解</h3>
<h1 id="_10整合mybatis" tabindex="-1"><a class="header-anchor" href="#_10整合mybatis" aria-hidden="true">#</a> 10整合Mybatis</h1>
<p>Server returns invalid timezone. Go to 'Advanced' tab and set 'serverTimezone' property manually.</p>
<p><strong>第二种，在数据库里修改时区，缺点是：修改之后，重启mysql服务后time_zone会还原</strong>
<code v-pre>show variables like '%time_zone%'; //查看时区</code>
<img src="https://img-blog.csdnimg.cn/20200529162945676.png" alt="在这里插入图片描述">
修改时区
<code v-pre>set time_zone='+08:00'; //修改时区</code>
<img src="https://img-blog.csdnimg.cn/20200529165559347.png" alt="在这里插入图片描述"></p>
<h3 id="mybatis-配置信息" tabindex="-1"><a class="header-anchor" href="#mybatis-配置信息" aria-hidden="true">#</a> mybatis 配置信息</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">configuration</span>
        <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Config 3.0//EN"</span>
        <span class="token string">"http://mybatis.org/dtd/mybatis-3-config.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>typeAliases</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>package</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.pojo<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>typeAliases</span><span class="token punctuation">></span></span>


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

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mappers</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.mapper.UserMapper<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mappers</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mybatis打包问题</p>
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

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--    dataSource:使用spring的数据源替换mybatis的配置--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DriverManagerDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://localhost:3306/mybatis?useSSL=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>useUnicode=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>characterEncoding=UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0000<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionFactoryBean<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token comment">&lt;!--        绑定mybatis配置文件--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:mybatis-config.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mapperLocations<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:com/cpx/mapper/*.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSession<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionTemplate<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--        只能使用构造器注入--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userMapper<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.mapper.UserMapperImpl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>template<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSession<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.29<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-webmvc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.aspectj<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aspectjweaver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.9.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种 方式</p>
<p>公共的部分</p>
<ul>
<li>
<p>配置DataSource数据源和sqlsessionfactory</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--    dataSource:使用spring的数据源替换mybatis的配置--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DriverManagerDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://localhost:3306/mybatis?useSSL=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>useUnicode=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>characterEncoding=UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0000<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionFactoryBean<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--        绑定mybatis配置文件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:mybatis-config.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mapperLocations<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:com/cpx/mapper/*.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建一个实现类来继承SqlSessionDaoSupport（实际也是封装实现了sqlSessionFactoryTemplate接口），并实现UserMapper接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserMapper2Impl</span> <span class="token keyword">extends</span> <span class="token class-name">SqlSessionDaoSupport</span> <span class="token keyword">implements</span> <span class="token class-name">UserMapper</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span><span class="token punctuation">)</span> <span class="token function">getSqlSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注册bean</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--只有一个参数就是引入sqlSessionFactory--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userMapper2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.cpx.mapper.UserMapper2Impl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>测试</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"applicationContext.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UserMapper</span> userMapper <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"userMapper2"</span><span class="token punctuation">,</span> <span class="token class-name">UserMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> userList <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">User</span> user <span class="token operator">:</span> userList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h1 id="_11声明式事务" tabindex="-1"><a class="header-anchor" href="#_11声明式事务" aria-hidden="true">#</a> 11声明式事务</h1>
<ul>
<li>把一组业务当成一个业务来做，要么都成功，要么都失败</li>
<li>保证完整性和一致性</li>
</ul>
<p>事务ACID原则</p>
<ul>
<li>原子性</li>
<li>一致性</li>
<li>隔离性
<ul>
<li>多个业务可能操作同一个资源，防止数据损坏</li>
</ul>
</li>
<li>
<h2 id="持久性" tabindex="-1"><a class="header-anchor" href="#持久性" aria-hidden="true">#</a> 持久性</h2>
</li>
</ul>
</div></template>


