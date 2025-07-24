import sqlite3
import requests
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
db_path = PROJECT_ROOT / 'server' / 'akay-sales.db'

def migrate_quantidade_to_real(db_path=db_path):
    """
    Altera as colunas quantidade e quantidadeAtual da tabela estoque para REAL (float).
    Cria uma tabela temporária, copia os dados, remove a antiga e renomeia a nova.
    """
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    try:
        cur.execute('''
            CREATE TABLE IF NOT EXISTS estoque_temp (
                id TEXT PRIMARY KEY,
                produto TEXT,
                peso REAL,
                medida TEXT,
                preco REAL,
                quantidade REAL,
                quantidadeAtual REAL,
                periodo TEXT,
                vencimento TEXT,
                imagem TEXT,
                tipo TEXT
            )
        ''')
        cur.execute('''
            INSERT INTO estoque_temp (id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo)
            SELECT id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo FROM estoque
        ''')
        cur.execute('DROP TABLE estoque')
        cur.execute('ALTER TABLE estoque_temp RENAME TO estoque')
        conn.commit()
        print('Migração concluída: quantidade e quantidadeAtual agora são REAL.')
    except Exception as e:
        print('Erro na migração:', e)
        conn.rollback()
    finally:
        conn.close()

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
    migrate_quantidade_to_real()

