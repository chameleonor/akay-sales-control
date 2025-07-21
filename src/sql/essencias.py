# Script para popular a tabela estoque com os dados do atom essenciasAtom
import requests
import uuid

essencias = [
    {"produto": "Sakura Gold", "peso": 500, "medida": "g", "preco": 143.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Vanilla Home Gold", "peso": 500, "medida": "g", "preco": 143.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Lavanda Francesa Gold", "peso": 500, "medida": "g", "preco": 143.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Lavanda Francesa Gold", "peso": 500, "medida": "g", "preco": 143.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "07/06/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Figo Flower", "peso": 100, "medida": "g", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Mel", "peso": 100, "medida": "g", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Aveia", "peso": 100, "medida": "g", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Bamboo", "peso": 100, "medida": "g", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "07/06/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Flor de Lótus Gold", "peso": 100, "medida": "g", "preco": 29.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/06/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Perfumaria Feroz", "peso": 100, "medida": "g", "preco": 59.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
    {"produto": "Perfumaria Special Blue", "peso": 100, "medida": "g", "preco": 59.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/06/2025", "vencimento": "", "imagem": "", "tipo": "essencias"},
]

for item in essencias:
    item["id"] = str(uuid.uuid4())
    response = requests.post('http://localhost:4000/api/estoque', json=item)
    print('Enviado:', item["produto"], '| Status:', response.status_code, '| UUID:', item["id"])
