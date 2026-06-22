import json
import re

with open('/Users/saadmatar/antigravity/Roots-&-Reach/src/constants/creatorsData.ts', 'r') as f:
    content = f.read()
    
# Extract names and ids
# The file defines: export const CREATORS_EMAIL_DATA: CreatorEmailData[] = [ ... ];
# Let's find all blocks like:
# {
#   "id": "...",
#   "name": "...",
#   "category": "...",
#   "type": "...",
#   "emailHtml": "..."
# }
# Since it's a JS file, let's parse it using regex or JSON parser if we can isolate the array.

# Find the start of the array
array_start = content.find('export const CREATORS_EMAIL_DATA: CreatorEmailData[] = [')
if array_start == -1:
    array_start = content.find('export const CREATORS_EMAIL_DATA = [')
    
# Let's extract the list of creators by parsing the JSON-like structure
creators = []
for match in re.finditer(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"', content):
    creators.append((match.group(1), match.group(2)))
    
print("Found", len(creators), "creators in codebase:")
for id_, name in creators:
    print(f"ID: {id_} | Name: {name}")
