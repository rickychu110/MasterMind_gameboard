import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasPlayerTable = await knex.schema.hasTable("player");
    if (!hasPlayerTable){
        await knex.schema.createTable("player",(table)=>{
            table.increments();
            table.string("username");//vchar(255)
            table.string("password");
        });
    }
    const hasColorTable = await knex.schema.hasTable("color");
    if (!hasColorTable){
        await knex.schema.createTable("color",(table)=>{
            table.increments();
            table.string("colorname");
        });
    }
0.}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("color");
    await knex.schema.dropTableIfExists("player");
}

