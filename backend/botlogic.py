from sentence_transformers import SentenceTransformer, util
import chromadb
import pandas as pd

df = pd.read_csv('SUCHAT_EMB - Sheet1.csv')
question_answers = []
for index, row in df.iterrows():
    question = row['question']
    answer = row['answer']
    question_answers.append({"question": question, "answer": answer})

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="my_collection")


for i, qa_pair in enumerate(question_answers):
    question = qa_pair["question"]
    answer = qa_pair["answer"]
    embedding = model.encode(question, convert_to_tensor=True).tolist()  # Encode the question
    collection.add(documents=[answer], embeddings=[embedding], metadatas=[{"question": question}], ids=[str(i)])


def get_answer(question):
    query_embedding = model.encode(question, convert_to_tensor=True).tolist()
    
    results = collection.query(query_embeddings=[query_embedding], n_results=1)
    
    closest_answer = results['documents'][0][0] 
    closest_score = results['distances'][0][0] 
    
    similarity_score = 1 - closest_score
    
    if similarity_score >= 0.5:
        return closest_answer
    else:
        return "Sorry, Not found any relevant answer...🥲"


