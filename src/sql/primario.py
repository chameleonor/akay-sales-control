# Script para popular a tabela estoque com os dados do atom primarioAtom
import requests
import uuid

primarios = [
    {"produto": "Base Sabonete Liquido", "peso": 1, "medida": "L", "preco": 47.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Jelly", "peso": 1, "medida": "Kg", "preco": 47.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Jelly", "peso": 1, "medida": "Kg", "preco": 47.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Glicerinada Branca", "peso": 1, "medida": "Kg", "preco": 36.4, "quantidade": 2, "quantidadeAtual": 2, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Glicerinada Transparente", "peso": 1, "medida": "Kg", "preco": 36.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Glicerinada Branca Vegetal", "peso": 1, "medida": "Kg", "preco": 37.8, "quantidade": 3, "quantidadeAtual": 3, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Glicerinada Transparente Vegetal", "peso": 1, "medida": "Kg", "preco": 37.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/06/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Gel Difusor", "peso": 1, "medida": "L", "preco": 38.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Passa Fácil Tecidos", "peso": 1, "medida": "L", "preco": 25.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Lauril Liquido", "peso": 1, "medida": "L", "preco": 32.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Lauril Liquido", "peso": 1, "medida": "L", "preco": 32.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Lauril de Milho", "peso": 500, "medida": "g", "preco": 48.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Lauril em Pó", "peso": 200, "medida": "g", "preco": 26, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Base Croda", "peso": 200, "medida": "g", "preco": 42.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "tipo": "primario", "imagem": ""},
    {"produto": "Base Condicionador Sólido", "peso": 500, "medida": "g", "preco": 126.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Ureia", "peso": 100, "medida": "g", "preco": 9.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Álcool de Cereais", "peso": 1, "medida": "L", "preco": 24.8, "quantidade": 3, "quantidadeAtual": 3, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Álcool de Cereais", "peso": 1, "medida": "L", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Água Destilada", "peso": 1, "medida": "L", "preco": 6.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Glicerina Bidestilada Vegetal USP", "peso": 500, "medida": "g", "preco": 20.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Glicerina Bidestilada Vegetal USP", "peso": 1, "medida": "Kg", "preco": 29.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Anfótero", "peso": 500, "medida": "ml", "preco": 21.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Renex", "peso": 500, "medida": "g", "preco": 40.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Nipaguard SCE", "peso": 100, "medida": "g", "preco": 70, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Goma Xantana", "peso": 100, "medida": "g", "preco": 28.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Sulfato de Magnésio", "peso": 1, "medida": "g", "preco": 18.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Hidróxido de Magnésio", "peso": 100, "medida": "g", "preco": 49, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Óleo de Silicone", "peso": 100, "medida": "g", "preco": 21.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Amida 80", "peso": 100, "medida": "g", "preco": 11.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Mentol", "peso": 10, "medida": "g", "preco": 8.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Água Mineral", "peso": 20, "medida": "L", "preco": 50, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Açúcar Refinado União", "peso": 1, "medida": "Kg", "preco": 5.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
    {"produto": "Sal Refinado Cisne", "peso": 1, "medida": "Kg", "preco": 4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "primario"},
]

for item in primarios:
    item["id"] = str(uuid.uuid4())
    response = requests.post('http://localhost:4000/api/estoque', json=item)
    print('Enviado:', item["produto"], '| Status:', response.status_code, '| UUID:', item["id"])
