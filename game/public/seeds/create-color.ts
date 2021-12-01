import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("color").del();

    // Inserts seed entries
    await knex("color").insert([
        {colorname: "red" },
        {colorname: "blue" },
        {colorname: "yellow" },
        {colorname: "green" },
        {colorname: "pink" },
        {colorname: "purple" }
    ]);
};
