# Blog_Interface（接口文档）

baseUrl: xxxx

## 类目

#### 获取类目

-   method： get

-   url： /category/get_all_category

-   params： null

-   return

    ```json
    {
        "code": 200,
        "data": {
            "result": [
                {
                    "id": 1, //id
                    "label": "Vue", // 类目标题
                    "active": "false", //类目状态
                    "create_date": "2017-01-05T16:00:00.000Z", // 创建时间
                    "article_num_total": 20 //类目数量
                }
            ]
        }
    }
    ```

#### 创建类目

-   method：post

-   url：/category/create_category

-   params:

-   ```js
     {
         active,
         label,
     }
    ```

-   return

-   ```json
    {
        "code": 200,
        "tips": "创建成功"
    }
    ```

#### _删除类目_

-   method: delete

-   url:/category/delete_category

-   params

-   ```js
    {
        id, label;
    }
    ```

-   return

-   ```json
    {
        "code": 200,
        "tips": "删除成功"
    }
    ```

## 文章

#### _获取文章_

-   method：get

-   url：/article/get_article

-   parmas：null

-   return

-   ```json
    {
        "code": 200,
        "data": [
            {
                "id": 1,
                "title": "新的value",
                "active": "false",
                "content": "xindsadsadsa",
                "atricle_image": "asdasdsa",
                "create_date": "2023-01-30T16:00:00.000Z",
                "update_date": "2023-02-24T16:00:00.000Z"
            }
        ]
    }
    ```

#### 创建文章

-   method：post

-   url：/article/create_article

-   params：

-   ```js
    {
        "title":"Vue",
        "content":"Vue的文本内容",
        "active":"can",
        "category":"vue",
        "author_id":48,
        "author_name":"Popo"
    }
    ```

-   return

-   ```json
    {
        "code": 200,
        "tips": "创建成功"
    }
    ```

#### _删除文章_

-   method：delete

-   url:/article/delete_article

-   params:

-   ```js
    {
        id, title;
    }
    ```

-   return

    ```json
    {
        "code": 200,
        "tips": "删除成功"
    }
    ```

    #### _修改文章_

    -   method: put

    -   url: /article/change_article

    -   params:

    -   ```js
        {
            id,
            active,
            content,
            title,
            ....
        }
        ```

    -   return

    ```json
    {
        "code": 200,
        "tips": "修改成功"
    }
    ```

## 登陆

-   method: post

-   url：/login

-   params

-   ```json
    {
        "account": "1977549218",
        "password": "zhaorubo2000"
    }
    ```

-   return

-   ```json
    {
        "code": 200,
        "tips": "登陆成功",
        "data": {
            "tips": "success",
            "result": [
                {
                    "user_id": 1,
                    "user_name": "Popo",
                    "user_head": "",
                    "account": "1977549218",
                    "password": "zhaorubo2000",
                    "create_date": "2023-02-24T16:00:00.000Z",
                    "article": null,
                    "author_id": 48,
                    "account_state": "1"
                }
            ],
            "type": 1,
            "article": {
                "tips": "success",
                "result": [
                    {
                        "id": 1,
                        "title": "Vue",
                        "active": "can",
                        "content": "Vue的文本内容",
                        "atricle_image": null,
                        "create_date": "2023-02-24T16:00:00.000Z",
                        "update_date": null,
                        "author_id": 48,
                        "author": null,
                        "author_name": "Popo",
                        "category": "vue"
                    },
                    {
                        "id": 2,
                        "title": "Miss.",
                        "active": "BVYAxH6eXY",
                        "content": ", logical and physical data models. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. You cannot save people, you can just love them. Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated. Success consists of going from failure to failure without loss of enthusiasm. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. The Synchronize to Database function will give you a full picture of all database differences. The past has no power over the present moment. If it scares you, it might be a good thing to try. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane.",
                        "atricle_image": "QXMRuWhnVc",
                        "create_date": "2014-05-20T16:00:00.000Z",
                        "update_date": "2010-12-02T16:00:00.000Z",
                        "author_id": 48,
                        "author": "xU4D8XJWTH",
                        "author_name": "Miyazaki Misaki",
                        "category": "j093DvyXWW"
                    },
                  ]
            }
    ```

# 导航栏

### 创建导航栏

-   method : post
-   url: /navigation/create_navigation
-   params:

```json
tite_item:首页
```

-   return

```json
{
    "code": 200,
    "tips": "创建成功"
}
```

### 删除导航栏

-   method : delete
-   url: /navigation/delete_navigation
-   params:

```json
id:1
tite_item:首页
```

-   return

```json
{
    "code": 200,
    "tips": "删除成功"
}
```

### 修改导航栏

-   method : put
-   url: /navigation/delete_navigation
-   params:

```json
id:1
tite_item:首页
```

-   return

```json
{
    "code": 200,
    "tips": "修改成功"
}
```
