import { sql, exec } from 'mysqls';
import { DataTable } from '../config/datatable.ts';
type Table = {
    name: string;
    value: string;
};

// 创表
export default class CreateTable {
    private static _ins: CreateTable;
    public static ins(): CreateTable {
        if (!this._ins) {
            this._ins = new CreateTable();
        }
        return this._ins;
    }
    private tables: Table[] = [
        {
            name: DataTable.USERINFO_TABLE,
            value: `CREATE TABLE ${DataTable.USERINFO_TABLE} (
              user_id INT PRIMARY KEY,
              loginId TEXT NOT NULL,
              user_name VARCHAR(50) NOT NULL,
              password VARCHAR(100) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              avatar VARCHAR(200),
              status VARCHAR(20)
            );
            `
        },
        {
            name: DataTable.ARTICLE_TABLE,
            value: `CREATE TABLE ${DataTable.ARTICLE_TABLE} (
              article_id INT PRIMARY KEY,
              title VARCHAR(100) NOT NULL,
              content TEXT NOT NULL,
              author_id INT,
              category_id INT,
              published_at TIMESTAMP,
              FOREIGN KEY (author_id) REFERENCES users_table (user_id)
            );
            `
        }
    ];

    /** 创建表 */
    public async create(): Promise<void> {
        for (let i = 0; i < this.tables.length; i++) {
            const table = this.tables[i];
            let isHas: boolean = await this.checkTable(table.name);
            if (!isHas) await exec(table.value.trim());
            else console.log(table.name + '已存在');
        }
    }

    /** 检查表是否存在 */
    public async checkTable(table: string): Promise<boolean> {
        let result: any[] = (await exec(`SHOW TABLE STATUS LIKE '${table}'`)) as any[];
        return !!result.length;
    }
}
