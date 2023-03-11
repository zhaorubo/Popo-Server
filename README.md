## 预设

-   baseURL：http://43.143.40.210:8080/popo/
-   加*号为比传项，如：```*"user_name":"Popo"```
-   必须需要用对请求方法，不然没有提示

### **方法使用事项**

- GET：必须使用params(查询参)传参
- POST：必须使用body(请求体)传参  
  - 如需上传用户头像或者文章封面等图片则必须使用FormDate格式传参
- PUT：必须使用body(请求体)传参
- DELETE：必须使用params(查询参)传参

---

## 目录

[TOC]



### 登陆

---

| path（路径） | method（方法） | "   |
| ------------ | -------------- | --- |
| /login       | POST           |

**Request**

```json
{
    *"account":"" // 账号 String
    *"password":"" // 密码 String
}
```

**Response**

```json
{
    "code": 200,
    "tips": "登陆成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjMsInVzZXJfbmFtZSI6IlBvcG8iLCJ1c2VyX2hlYWQiOm51bGwsImFjY291bnQiOiIxOTc3NTQ5MjE4IiwicGFzc3dvcmQiOiJ6aGFvcnVibzIwMDAiLCJjcmVhdGVfZGF0ZSI6MTY3NzkxMDYxMDYxNiwiYXV0aG9yX2lkIjoyNzksImFjY291bnRfc3RhdGUiOiIxIiwiYXJ0aWNsZSI6W3siaWQiOjIsInRpdGxlIjoi5L-u5pS55ZCO55qEIiwiYWN0aXZlIjoiMCIsImNvbnRlbnQiOiLkv67mlLnlkI7nmoTmlofnq6DlhoUxMjPlrrlhIiwiYXJ0aWNsZV9pbWFnZSI6Imh0dHA6Ly80My4xNDMuNDAuMjEwL3VwbG9hZHMvM2UyYzFhOGNiOGU4MTU5MzBjMDgzNjgxNGM0NDIzOS5hYWEuanBnIiwiYXV0aG9yX25hbWUiOiJQb3BvIiwiY3JlYXRlX2RhdGUiOjE2Nzc5OTAxNDUxMzksInVwZGF0ZV9kYXRlIjoxNjc4MDA2NTgzNTIyLCJhdXRob3JfaWQiOjI3OSwiYXV0aG9yIjpudWxsLCJjYXRlZ29yeSI6IkphdmFTY3JpcHQifV19LCJ0aW1lIjoxNjc4NTA0MzM0OTAyLCJ0aW1lb3V0Ijo4NjQwMDAwLCJpYXQiOjE2Nzg1MDQzMzR9.aoydNzQnMyX_D1j6tCBCkz26tLcr9e7fpQiY6rVTNaM",
    "result": [
        {
            "user_id": 3, // 账号ID
            "user_name": "Popo", // 昵称
            "user_head": null, // 账号头像
            "account": "1977549218", // 账号
            "password": "zhaorubo2000", // 密码
            "create_date": 1677910610616, // 账号创建时间
            "author_id": 279, // 作者ID，创建文章时请带上
            "account_state": "1", // 账号状态 "1"为正常  "0"为异常
            "article": [
                // 文章列表
                {
                    "id": 2,
                    "title": "修改后的",
                    "active": "0",
                    "content": "修改后的文章内123容a",
                    "article_image": "http://43.143.40.210/uploads/3e2c1a8cb8e815930c0836814c44239.aaa.jpg",
                    "author_name": "Popo",
                    "create_date": 1677990145139,
                    "update_date": 1678006583522,
                    "author_id": 279,
                    "author": null,
                    "category": "JavaScript"
                }
            ]
        }
    ]
}
```

---



### 注册

---

| path（路径） | method（方法） |
| ------------ | -------------- |
| /registered  | POST           |

**Request**

```json
{
    *"account":"" // 账号  String
    *"password":"" // 密码 String
    *"user_name":"" // 用户名 String
}
```

**Response**

```json
{
    "code": 200,
    "tips": "注册成功",
    "create_date": 1678504504364, // 创建时间
    "user_head": null, // 用户头像
    "author_id": 372, // 作者id
    "account_state": 1, // 账号状态
    "account": "1977549214", // 账号
    "password": "zhaorubo2000", // 密码
    "user_name": "Popois" // 昵称
}
```

---



### 获取文章

---

| path（路径） | method（方法） |
| ------------ | -------------- |
| /get_article | GET            |

**Request**

```json
{
    null
}
```

**Response**

```json
{
    "code": 200,
    "tips": "sccuess",
    "result": [
        {
            "id": 2, // 文章ID
            "title": "修改后的", // 文章标题
            "active": "0", // 文章状态 "1"为显示文章 "0"为隐藏文章
            "content": "修改后的文章内123容a", // 文章内容
            "article_image": "http://43.143.40.210/uploads/3e2c1a8cb8e815930c0836814c44239.aaa.jpg", // 文章封面
            "author_name": "Popo", // 作者昵称
            "create_date": 1677990145139, // 创建时间
            "update_date": 1678006583522, // 更新时间
            "author_id": 279, // 作者ID
            "author": null, // 作者信息
            "category": "JavaScript" // 文章类目
        },
        {
            "id": 3,
            "title": "haha",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/1_1660823657.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678024580527,
            "update_date": 1678024580527,
            "author_id": 2,
            "author": null,
            "category": "CSS"
        }
    ]
}
```

---



### 创建文章

---

| path（路径）    | method（方法） |
| --------------- | -------------- |
| /create_article | POST           |

**Request**```带 * 为必传项```

```json
{
    *"title":"" // 文章的标题,
    *"content":"" // 文章的内容,
    *"category":"" // 文章所属类目
    *"author_id":"" // 作者id标识,
    *"author_name":"" // 作者名字,
    "active":"" // 文章的状态,(默认为1),
    -"article_image":"" // 文章的封面,建议传递，不传递默认为null并且没有更好的展示状态
    "create_date":"" // 创建时间,
    "update_date":"" // 修改时间,
    "author":"" // 作者信息,一般用作返回，可不传,
}
```

**Response**

```json
{
    "code": 200,
    "tips": "sccuess",
    "result": {
        "active": 1,
        "article_image": null,
        "create_date": 1678505863689,
        "update_date": 1678505863689,
        "author": null,
        "title": "qwe",
        "content": "haha content",
        "author_id": "2",
        "author_name": "Popo",
        "category": "React"
    }
}
```

------



### 修改文章

------

| path（路径）    | method（方法） |
| --------------- | -------------- |
| /change_article | PUT            |

**Request**

```json
{
    *"id":"" // 文章id
    *"title":"" // 文章的标题
    *"content":"" // 文章内容
    *"author_name":"" // 作者名字
    *"active"："" // 文章状态 "1"为显示文章 "0"为隐藏文章
    *"category":"" // 文章类目
    
    // 带 * 为必传  其他可选传 同样修改   必须要在body中传递数据
}
```

**Response**

```json
{
    "code": 200,
    "tips": "sccuess",
    "article": {
        "id": 2,
        "title": "hsuodhnaskdjanbdk",
        "active": "0",
        "content": "nasukdbnsajkd,bakjd",
        "article_image": "http://43.143.40.210/uploads/3e2c1a8cb8e815930c0836814c44239.aaa.jpg",
        "author_name": "修改之后的名字1",
        "create_date": 1677990145139,
        "update_date": 1678506723288,
        "author_id": 279,
        "author": null,
        "category": "修改类目"
    }
}
```

------



### 删除文章

------

| path（路径）    | method（方法） |
| --------------- | -------------- |
| /delete_article | DELETE         |

**Request**

```json
{
    *"id":"23" // 需要删除的文章id
}
```

**Response**

```json
{
    "code": 200,
    "tips": "删除成功"
}
```

------



### 获取类目

------

| path（路径）  | method（方法） |
| ------------- | -------------- |
| /get_category | GET            |

**Request**

```json
{
    null
}
```

**Response**

```json
{
    "code": 200,
    "tips": "success",
    "result": [
        {
            "id": 1, // 类目ID
            "label": "JavaScript", // 类目标题
            "active": "1", // 类目状态 "1"为正常 "2"为异常
            "create_date": 1678009388293, // 创建时间
            "article_num_total": null // 类目拥有的文章数量
        },
        {
            "id": 2,
            "label": "JavaScript",
            "active": "1",
            "create_date": 1678009649982,
            "article_num_total": null
        }
    ]
}
```

------



### 创建类目

------

| path（路径）  | method（方法） |
| ------------- | -------------- |
| /get_category | GET            |

**Request**

```json
{
    *"label":"JavaScript" // 类目标题
}
```

**Response**

```json
{
    "code": 200,
    "tips": "创建成功"
}
```

------



### 删除类目

------

| path（路径）     | method（方法） |
| ---------------- | -------------- |
| /delete_category | DELETE         |

**Request**

```json
{
    *"id":3
}
```

**Response**

```json
{
    "code": 200,
    "tips": "删除成功"
}
```

------



### 修改类目

------

| path（路径）     | method（方法） |
| ---------------- | -------------- |
| /change_category | PUT            |

**Request**

```json
{
    *"label":"JavaScript" // 类目标题
}
'注意': 修改类目会修改所属此类目的所有文章
```

**Response**

```json
{
    "code": 200,
    "tips": "修改成功:JavaScript to CSS", // 修改成功提示  修改XXX为XXX
    "updateArticleTotal": 2 // 被修改的文章类目总数
}
```

------



### 获取对应类目的所有文章

------

| path（路径）           | method（方法） |
| ---------------------- | -------------- |
| /get_categorytoarticle | PUT            |

**Request**

```json
{
    *"category":"JavaScript" // 类目标题
}
```

**Response**

```json
{
    "code": 200,
    "tips": "获取成功啦",
    "articles": [
        {
            "id": 2,
            "title": "hsuodhnaskdjanbdk",
            "active": "0x",
            "content": "nasukdbnsajkd,bakjd",
            "article_image": "http://43.143.40.210/uploads/3e2c1a8cb8e815930c0836814c44239.aaa.jpg",
            "author_name": "修改之后的名字1",
            "create_date": 1677990145139,
            "update_date": 1678506723288,
            "author_id": 279,
            "author": null,
            "category": "JavaScript1"
        },
        {
            "id": 3,
            "title": "haha",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/1_1660823657.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678024580527,
            "update_date": 1678024580527,
            "author_id": 2,
            "author": null,
            "category": "JavaScript1"
        }
    ]
}
```

------



### 文章信息搜索

| path（路径） | method（方法） |
| ------------ | -------------- |
| /search      | GET            |

**Request**

```json
{
    *"query":"查询的参数" // 查询的参数
}
```

**Response**

```json
{
    "code": 200,
    "tips": "查询到了",
    "result": [
        {
            "id": 3,
            "title": "haha",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/1_1660823657.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678024580527,
            "update_date": 1678024580527,
            "author_id": 2,
            "author": null,
            "category": "JavaScript1"
        },
        {
            "id": 106,
            "title": "qwe",
            "active": "1",
            "content": "haha content",
            "article_image": null,
            "author_name": "Popo",
            "create_date": 1678505863689,
            "update_date": 1678505863689,
            "author_id": 2,
            "author": null,
            "category": "React"
        },
        {
            "id": 108,
            "title": "123",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/QQ图片20220420173300.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678514962411,
            "update_date": 1678514962411,
            "author_id": 2,
            "author": null,
            "category": "React"
        },
        {
            "id": 109,
            "title": "124",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/articleQQ图片20220420173300.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678515131372,
            "update_date": 1678515131372,
            "author_id": 2,
            "author": null,
            "category": "React"
        },
        {
            "id": 110,
            "title": "125",
            "active": "1",
            "content": "haha content",
            "article_image": "http://43.143.40.210:8080/uploads/article/QQ图片20220420173300.imag.jpg",
            "author_name": "Popo",
            "create_date": 1678515150472,
            "update_date": 1678515150473,
            "author_id": 2,
            "author": null,
            "category": "React"
        }
    ]
}
```

------



### 单独上传文章封面

------

| path（路径）    | method（方法） |
| --------------- | -------------- |
| /article_upload | POST           |

**Request**

```json
{
    *"id":2 // 文章id
}
注意： 还需要上传一张图片  使用form-data格式
```

**Response**

```json
{
    "code": 200,
    "msg": "上传成功",
    "filename": "image",
    "url": "http://43.143.40.210:8080/uploads/article/QQ图片20220420103755.imgage.jpg"
}
```

------



### 单独上传用户头像

------

| path（路径） | method（方法） |
| ------------ | -------------- |
| /user_upload | POST           |

**Request**

```json
{
    *"id":2 // 用户id
}
注意： 还需要上传一张图片  使用form-data格式
```

**Response**

```json
{
    "code": 200,
    "tips": "上传成功",
    "user_head": "http://43.143.40.210:8080/uploads/user/QQ图片20220420103755.imgag.jpg"
}
```

------

