import docx
import pandas as pd
import os

def extract_docx(path):
    doc = docx.Document(path)
    return '\n'.join([p.text for p in doc.paragraphs])

# Extract articles
base_dir = "/Users/saadmatar/Downloads/TRF"
for file in ["اتحاد بلديات الفيحاء.docx", "طرابلس وأزمة النزوح في لبنان.docx", "هندسة الانهيار في طرابلس.docx", "Proposal_Anahon.docx"]:
    path = os.path.join(base_dir, file)
    text = extract_docx(path)
    with open(f"{file}.txt", "w", encoding="utf-8") as f:
        f.write(text)

# Extract excel
excel_path = os.path.join(base_dir, "AnaHon_TRF_Content_Sheet_April_2026_active_links_v2 (1).xlsx")
df = pd.read_excel(excel_path)
df.to_csv("content_sheet.csv", index=False)
