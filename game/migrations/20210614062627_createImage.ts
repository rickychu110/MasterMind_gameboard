import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("image",(table)=>{
        table.increments();
        table.integer("player_id");
        table.foreign("player_id").references("player.id");
        table.string("image");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("image");
}

