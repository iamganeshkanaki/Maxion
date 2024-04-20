CREATE TABLE signup (
    id INT GENERATED ALWAYS AS IDENTITY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL)
	
INSERT INTO signup ( first_name, last_name, email, password) VALUES
    ('user1','rrtt', 'chaudhR@gamil.com', 'password1'),
    ('user2','ngtibti', 'geeta@gamil.com','password2'),
    ('user3','hgurhigh','pooja@gmail.com', 'password3');
	
select * from signup;

--Update signup set  Role='HR' where id =1

ALTER TABLE signup
ADD Role VARCHAR(50);

