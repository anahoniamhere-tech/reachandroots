import pandas as pd
import json

df = pd.read_csv('content_sheet.csv')
df = df.fillna('')
records = df.to_dict('records')
with open('src/constants/trfData.ts', 'w', encoding='utf-8') as f:
    f.write('export const TRF_CONTENT_SHEET = ')
    json.dump(records, f, ensure_ascii=False, indent=2)
    f.write(';\n')
