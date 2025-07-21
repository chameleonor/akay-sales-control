
# Utilitários para manipulação da tabela estoque via API
import requests

API_URL = 'http://localhost:4000/api/estoque'

def delete_all_items():
    resp = requests.get(API_URL)
    if resp.status_code == 200:
        for item in resp.json():
            del_resp = requests.delete(f'{API_URL}/{item["id"]}')
            print(f'Deletado: {item["produto"]} | Status: {del_resp.status_code}')
    else:
        print('Erro ao buscar estoque:', resp.text)

def drop_estoque_table():
    # Requer rota específica no backend para dropar a tabela
    resp = requests.post(f'{API_URL}/drop')
    print('Drop tabela estoque | Status:', resp.status_code, '|', resp.text)

def update_item(item_id, data):
    resp = requests.put(f'{API_URL}/{item_id}', json=data)
    print(f'Atualizado: {item_id} | Status: {resp.status_code} | {resp.text}')

def get_all_items():
    resp = requests.get(API_URL)
    if resp.status_code == 200:
        return resp.json()
    else:
        print('Erro ao buscar estoque:', resp.text)
        return []

def get_item(item_id):
    resp = requests.get(f'{API_URL}/{item_id}')
    if resp.status_code == 200:
        return resp.json()
    else:
        print('Erro ao buscar item:', resp.text)
        return None

if __name__ == "__main__":
    # Exemplo de uso: deletar todos os itens
    drop_estoque_table()

