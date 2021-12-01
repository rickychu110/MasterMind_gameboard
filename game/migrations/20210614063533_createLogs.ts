import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("logs",(table)=>{
        table.increments();
        table.integer("game_id");
        table.foreign("game_id").references("gameinfo.id");
        table.integer("round");
        table.integer("player_id");
        table.foreign("player_id").references("player.id");
        table.integer("color_id1");
        table.foreign("color_id1").references("color.id");
        table.integer("color_id2");
        table.foreign("color_id2").references("color.id");
        table.integer("color_id3");
        table.foreign("color_id3").references("color.id");
        table.integer("color_id4");
        table.foreign("color_id4").references("color.id");
        table.integer("correct");
        table.integer("correctpos");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("logs");
}

