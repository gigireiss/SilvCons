-- Criar o banco
CREATE DATABASE fauna_localizacao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fauna_localizacao;


-- Criação da tabela
CREATE TABLE localidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estado VARCHAR(100),
  cidade VARCHAR(100),
  nome_entidade VARCHAR(255),
  tipo VARCHAR(100),
  descricao TEXT,
  endereco VARCHAR(255),
  contato VARCHAR(50),
  email VARCHAR(150)
);

-- Inserção de dados
INSERT INTO localidades (estado, cidade, nome_entidade, tipo, descricao, endereco, contato, email)
VALUES 
('São Paulo', 'São Paulo', 'Instituto Vida Livre', 'ONG', 'Trabalha com resgate e reabilitação de animais silvestres.', 'Rua das Palmeiras, 123', '(11) 98765-4321', 'contato@vidalivre.org'),

('São Paulo', 'Campinas', 'SOS Fauna', 'Centro de Resgate', 'Centro de apoio a animais vítimas do tráfico.', 'Av. das Árvores, 456', '(19) 99888-7766', 'ajuda@sosfauna.org'),

('Rio de Janeiro', 'Rio de Janeiro', 'Projeto Arara Azul', 'ONG', 'Proteção e pesquisa sobre a arara-azul no Brasil.', 'Av. Atlântica, 789', '(21) 98888-1234', 'info@araraazul.org'),

('Minas Gerais', 'Belo Horizonte', 'Refúgio Silvestre MG', 'Hospital Veterinário', 'Atendimento a animais silvestres em situação de risco.', 'Rua da Serra, 1010', '(31) 98877-4455', 'contato@refugiosilvestremg.org'),

('Paraná', 'Curitiba', 'Ecovida Paraná', 'Centro de Reabilitação', 'Recebe animais silvestres resgatados e prepara para soltura.', 'Alameda Verde, 212', '(41) 99777-8899', 'ecovida@parana.org');

('Rio Grande do Sul', 'Porto Alegre', 'Voluntários da Fauna', 'ONG', 'Reabilitação de animais silvestres vítimas de traumas, entrega para soltura quando possível.', 'Rua Marechal José Inácio da Silva, 404, Porto Alegre, RS', '(51) 3341-7664', 'contato@voluntariosdafauna.org')

('Rio Grande do Sul', 'Porto Alegre', 'Toca dos Bichos', 'Clínica / ONG', 'Clínica especializada em animais não domésticos, silvestres e exóticos — atendimento e reabilitação.', 'Av. Benno Mentz, 1368, Vila Ipiranga, Porto Alegre, RS', '(51) 3347-4643', 'contato@tocadosbichos.org');

create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    cpf_number bigint,
    status enum('Ativo','Inativo') default('Ativo'),
    create_at timestamp default current_timestamp
);

INSERT INTO users(name,email,password,cpf_number)
VALUES("Suárez","suarez@gremio.net","senha",77777777777);
SELECT * FROM users;

UPDATE users SET password = "Unisinos", name = "Dida" WHERE id = 1;
SELECT * FROM users WHERE id = 1;

DELETE FROM users WHERE id = 1;
SELECT * FROM users;

use fauna_localizacao;
select * from users;