import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("gameinfo",(table)=>{
        table.increments();
        table.integer("winner_id").unsigned();
        table.foreign("winner_id").references("player.id");
        table.integer("ans_color_id1");
        table.foreign("ans_color_id1").references("color.id");
        table.integer("ans_color_id2");
        table.foreign("ans_color_id2").references("color.id");
        table.integer("ans_color_id3");
        table.foreign("ans_color_id3").references("color.id");
        table.integer("ans_color_id4");
        table.foreign("ans_color_id4").references("color.id");
        table.timestamps(false,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("gameinfo");
}

