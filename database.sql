-- create database
CREATE DATABASE mastermind;
-- create user
sudo -u postgres createuser <username>
sudo -u postgres createdb <dbname>
sudo -u postgres psql
psql=# alter user <username> with encrypted password '<password>';
psql=# grant all privileges on database <dbname> to <username> ;
-- create tables
create table color (id serial primary key,colorname varchar(255));
insert into color (colorname) values ('red'),('blue'),('yellow'),('green'),('pink'),('purple');
create table player(id serial primary key,username varchar(30),password varchar(30));
create table gameinfo (id serial primary key, winner_id int,ans_color_id1 int,ans_color_id2 int,ans_color_id3 int,ans_color_id4 int,created_at TIMESTAMP WITH TIME ZONE default current_timestamp,updated_at TIMESTAMP WITH TIME ZONE default current_timestamp,foreign key (winner_id) references player(id),foreign key (ans_color_id1) references color(id),foreign key (ans_color_id2) references color(id),foreign key (ans_color_id3) references color(id),foreign key (ans_color_id4) references color(id));
create table logs (id serial primary key,game_id int,round int,player_id int,color_id1 int,color_id2 int,color_id3 int,color_id4 int,correct int,correctpos int,foreign key (game_id) references gameinfo(id),foreign key (color_id1) references color(id),foreign key (color_id2) references color(id),foreign key (color_id3) references color(id),foreign key (color_id4) references color(id));
create table image (id serial primary key,player_id int,image varchar(255),foreign key (player_id) references player(id));