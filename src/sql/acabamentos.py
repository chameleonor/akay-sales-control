# Script para popular a tabela estoque com os dados do atom acabamentosAtom
import requests
import uuid

acabamentos = [
    {"produto": "Plástico Celofane BOPP", "peso": 500, "medida": "g", "preco": 54.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"produto": "Rolo Plástico Filme Stretch", "peso": 0, "medida": "500mmx25micras", "preco": 33.11, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"produto": "Rolo Filme Termoencolhível 27x15cm (10m)", "peso": 0, "medida": "10mt", "preco": 5.7, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 104, "produto": "Super Fita", "peso": 0, "medida": "", "preco": 5.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 105, "produto": "Etiqueta Transparente Produto Artesan. (50unid)", "peso": 0, "medida": "", "preco": 4.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/06/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 106, "produto": "Papel de Seda Branco 30x50cm (100 folhas)", "peso": 0, "medida": "30x50cm", "preco": 21.99, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/06/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 107, "produto": "Papel de Seda Branco - ouro (15 folhas)", "peso": 0, "medida": "48x60cm", "preco": 2, "quantidade": 15, "quantidadeAtual": 15, "periodo": "13/06/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 108, "produto": "Quadrado de Madeira Difusor", "peso": 0, "medida": "7x7x2cm", "preco": 8.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 109, "produto": "Rosa de Vime Rosa Claro c/ cordão", "peso": 0, "medida": "P", "preco": 11.4, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 110, "produto": "Vareta de Fibra Nude 25cm (20unid)", "peso": 0, "medida": "25cm", "preco": 10.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 111, "produto": "Vareta de Fibra Branca 25cm (20unid)", "peso": 0, "medida": "25cm", "preco": 10.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 112, "produto": "Acabamento Franja e Flor Prata", "peso": 0, "medida": "", "preco": 7.5, "quantidade": 2, "quantidadeAtual": 2, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 113, "produto": "Acabamento Franja e Flor Branca", "peso": 0, "medida": "", "preco": 7.5, "quantidade": 2, "quantidadeAtual": 2, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 114, "produto": "Mini Colheres Bambu (6unid)", "peso": 0, "medida": "", "preco": 21, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/06/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 115, "produto": "Tampa Pote Cristal Abaulada Dourada", "peso": 0, "medida": "", "preco": 1.7, "quantidade": 2, "quantidadeAtual": 2, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 116, "produto": "Tampa Pote Cristal Alumínio Dourada", "peso": 0, "medida": "", "preco": 0.84, "quantidade": 2, "quantidadeAtual": 2, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 117, "produto": "Tampa Pote Cristal Alumínio Prata", "peso": 0, "medida": "", "preco": 0.84, "quantidade": 2, "quantidadeAtual": 2, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 118, "produto": "Tampa Laminada Furo Dourada G28", "peso": 0, "medida": "28", "preco": 2.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 119, "produto": "Tampa Laminada Furo Dourada G28", "peso": 0, "medida": "28", "preco": 2.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 120, "produto": "Tampa Laminada Furo Prata G28", "peso": 0, "medida": "28", "preco": 2.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 121, "produto": "Tampa Laminada Furo Prata G28", "peso": 0, "medida": "28", "preco": 2.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 122, "produto": "Tampa Laminada Furo Prata G28", "peso": 0, "medida": "28", "preco": 2.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 123, "produto": "Tampa Alumínio Furo Prata G28", "peso": 0, "medida": "28", "preco": 0.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 124, "produto": "Tampa Disc Top Transparente G24", "peso": 0, "medida": "24", "preco": 0.8, "quantidade": 2, "quantidadeAtual": 2, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 125, "produto": "Tampa Disc Top Transparente G24", "peso": 0, "medida": "24", "preco": 0.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 126, "produto": "Tampa Disc Top Transparente G24", "peso": 0, "medida": "24", "preco": 0.8, "quantidade": 4, "quantidadeAtual": 4, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 127, "produto": "Tampa Flip Top Transparente G24", "peso": 0, "medida": "24", "preco": 0.28, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 128, "produto": "Tampa Flip Top Preta G24", "peso": 0, "medida": "24", "preco": 0.28, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 129, "produto": "Válvula Spray Laminada Dourada G18", "peso": 0, "medida": "18", "preco": 4.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 130, "produto": "Válvula Spray Laminada Prata G18", "peso": 0, "medida": "18", "preco": 4.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 131, "produto": "Válvula Spray Cromada Dourada G28", "peso": 0, "medida": "28", "preco": 6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 132, "produto": "Válvula Spray Cromada Prata G28", "peso": 0, "medida": "28", "preco": 6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 133, "produto": "Válvula Spray Cromada Dourada G18", "peso": 0, "medida": "18", "preco": 5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 134, "produto": "Válvula Spray Cromada Prata G18", "peso": 0, "medida": "18", "preco": 5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 135, "produto": "Válvula Spray Laminada Dourada G28", "peso": 0, "medida": "28", "preco": 4.1, "quantidade": 2, "quantidadeAtual": 2, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 136, "produto": "Válvula Spray Transparente G24", "peso": 0, "medida": "24", "preco": 1.7, "quantidade": 2, "quantidadeAtual": 2, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 137, "produto": "Válvula Pump Cromada Prata G28", "peso": 0, "medida": "28", "preco": 5.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 138, "produto": "Válvula Pump Cromada Prata G28", "peso": 0, "medida": "28", "preco": 5.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 139, "produto": "Válvula Pump Cromada Dourada G28", "peso": 0, "medida": "28", "preco": 5.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 140, "produto": "Válvula Pump Luxo Bico de Pato Prata Fosca G28", "peso": 0, "medida": "28", "preco": 7.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 141, "produto": "Válvula Pump Bulhões Dourada G28", "peso": 0, "medida": "28", "preco": 8.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 142, "produto": "Válvula Pump Preta G24", "peso": 0, "medida": "24", "preco": 1.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 143, "produto": "Válvula Pump Preta G24", "peso": 0, "medida": "24", "preco": 1.9, "quantidade": 4, "quantidadeAtual": 4, "periodo": "03/06/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 144, "produto": "Válvula Gatilho Transparente G24", "peso": 0, "medida": "24", "preco": 2.5, "quantidade": 2, "quantidadeAtual": 2, "periodo": "05/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 145, "produto": "Válvula Gatilho Transparente G28", "peso": 0, "medida": "28", "preco": 1.26, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 146, "produto": "Válvula Gatilho Branco G28", "peso": 0, "medida": "28", "preco": 0.84, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
    {"id": 147, "produto": "Válvula Gatilho Branca G28", "peso": 0, "medida": "28", "preco": 2.1, "quantidade": 2, "quantidadeAtual": 2, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"},
]

for item in acabamentos:
    item["id"] = str(uuid.uuid4())
    response = requests.post('http://localhost:4000/api/estoque', json=item)
    print('Enviado:', item["produto"], '| Status:', response.status_code, '| UUID:', item["id"])
