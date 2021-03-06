import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("player").del();

    // Inserts seed entries
    await knex("player").insert([
        {
            username: "admin",
            password: "123456"
        }
    ]);
};
