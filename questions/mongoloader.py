from dotenv import load_dotenv
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import json

load_dotenv(".env.local")

mongo_user = os.getenv("MONGO_USER")
mongo_password = os.getenv("MONGO_PASS")

uri = f"mongodb+srv://{mongo_user}:{mongo_password}@cluster0.29nf6.mongodb.net/?retryWrites=true&w=majority"

# Set the Stable API version when creating a new client
client = MongoClient(uri)
database = client["Madhacks"]

collection_name = "questions"
collection = database[collection_name]

# List all files in the directory
file_list = os.listdir(os.path.dirname(__file__))

json_paths = []

# Iterate over each file in the directory
for file_name in file_list:
    path = os.path.dirname(__file__) + "/" + file_name
    if(os.path.isdir(path)):
        folder_list = os.listdir(path)
        for json_file in folder_list:
            json_paths.append(path + "/" + json_file)

try:
    next_seq_num = collection.find_one({}, sort=[("seq_num", pymongo.DESCENDING)])["seq_num"] + 1
except Exception:
    next_seq_num = 0

for json_file in json_paths:
    with open(json_file, "r") as json_content:
        data = json.load(json_content)
        if(not collection.find_one({"question": data["question"]})):
            data["seq_num"] = next_seq_num
            collection.insert_one(data)
            print(f"Inserted {data}")
            next_seq_num += 1

