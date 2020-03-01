CREATE TABLE users (
	id serial NOT NULL,
	first varchar(50) NOT NULL,
	last varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    age int NOT NULL
);

insert into users (first, last, email, age) values 
('Jaxon', 'Doe', 'email@gmail.com', 24),
('Majira', 'Straw', 'furry@gmail.com', 20),
('Ethan', 'Thompson', 'thompson.ethan.j@gmail.com', 18),
('Nick', 'Wilde', 'bunnyLuvr@gmail.com', 26),
('Judy', 'Hopps', 'carrotsforlife@gmail.com', 23),
('Daniel', 'Bogo', 'onDuty@gmail.com', 34),
('Zillion', 'Ross', 'imaginitvelyUnimaginitive@gmail.com', 22),
('Beta', 'Eta', 'delota@gmail.com', 21),
('Legosi', 'Wolfe', 'beastars@gmail.com', 17),
('Duke', 'Doberman', 'fluffyBoi@gmail.com', 20),
('Ltn', 'Dan', 'emailIsLikeABoxOfChocolates@gmail.com', 27)