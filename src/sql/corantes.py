# Script para popular a tabela estoque com os dados do atom corantesAtom
import requests
import uuid

corantes = [
    {"id": 1, "produto": "Pigmento Branco", "peso": 100, "medida": "ml", "preco": 14.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/2808042_2025-05-06_15_57_18_0.jpeg", "tipo": "corantes"},
    {"id": 2, "produto": "Pigmento Rosa", "peso": 100, "medida": "ml", "preco": 23, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011279_2025-06-06_12_19_01_1.png", "tipo": "corantes"},
    {"id": 3, "produto": "Pigmento Biscoito", "peso": 100, "medida": "ml", "preco": 22.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00006802_2025-06-06_13_21_33_1.png", "tipo": "corantes"},
    {"id": 4, "produto": "Corante Rosa", "peso": 500, "medida": "ml", "preco": 19.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/0001727_2025-06-06_12_23_49_1.png", "tipo": "corantes"},
    {"id": 5, "produto": "Corante Azul Turquesa", "peso": 500, "medida": "ml", "preco": 19.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/0001728_2025-06-06_12_16_45_1.png", "tipo": "corantes"},
    {"id": 6, "produto": "Corante Violeta", "peso": 500, "medida": "ml", "preco": 20.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/0001737_2025-06-06_12_16_11_1.png", "tipo": "corantes"},
    {"id": 7, "produto": "Corante Branco", "peso": 100, "medida": "ml", "preco": 17.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011285_2025-06-06_12_20_47_1.png", "tipo": "corantes"},
    {"id": 8, "produto": "Corante Marrom", "peso": 100, "medida": "ml", "preco": 10.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011277_2025-06-06_12_19_45_1.png", "tipo": "corantes"},
    {"id": 9, "produto": "Corante Preto", "peso": 100, "medida": "ml", "preco": 11.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011278_2025-06-06_12_19_23_0.png", "tipo": "corantes"},
    {"id": 10, "produto": "Corante Vermelho", "peso": 100, "medida": "ml", "preco": 10.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011283_2025-06-06_12_18_18_1.png", "tipo": "corantes"},
    {"id": 11, "produto": "Corante Amarelo", "peso": 100, "medida": "ml", "preco": 10.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011275_2025-06-06_12_23_43_1.png", "tipo": "corantes"},
    {"id": 12, "produto": "Corante Laranja", "peso": 100, "medida": "ml", "preco": 10.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "07/06/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011276_2025-06-06_12_20_26_1.png", "tipo": "corantes"},
    {"id": 13, "produto": "Corante Verde Sinuca", "peso": 100, "medida": "ml", "preco": 10.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/00011282_2025-06-06_12_15_31_1.png", "tipo": "corantes"},
    {"id": 14, "produto": "Mica em pó Rosé", "peso": 50, "medida": "g", "preco": 75, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/20230824110926_1450998550_A.png", "tipo": "corantes"},
    {"id": 15, "produto": "Mica em pó Prata", "peso": 50, "medida": "g", "preco": 27, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/20230824110903_5386994614_A.png", "tipo": "corantes"},
    {"id": 16, "produto": "Mica em pó Dourado", "peso": 50, "medida": "g", "preco": 39.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "07/06/2025", "vencimento": "", "imagem": "https://peterpaiva.jetassets.com.br/produto/20231031171616_3993996007_A.png", "tipo": "corantes"},
]

for item in corantes:
    item["id"] = str(uuid.uuid4())
    response = requests.post('http://localhost:4000/api/estoque', json=item)
    print('Enviado:', item["produto"], '| Status:', response.status_code)
