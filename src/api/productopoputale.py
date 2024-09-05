from flask import Flask, request, jsonify

def medicamentos ():
    {
        "generic_name": "Paracetamol", 
        "active_ingredient": "Paracetamol", 
        "category_id": 1, 
        "price": 50, 
        "stock_quantity": 20, 
        "image_url": "url1", 
        "description": "Analgésico y antipirético"
    },
    {
        "generic_name": "Ibuprofeno", 
        "active_ingredient": "Ibuprofeno", 
        "category_id": 1, "price": 60, 
        "stock_quantity": 30, 
        "image_url": "url2", 
        "description": "Analgésico y antiinflamatorio"
    },
    {
        "generic_name": "Amoxicilina", 
        "active_ingredient": "Amoxicilina", 
        "category_id": 2, 
        "price": 70, 
        "stock_quantity": 25, 
        "image_url": "url3", 
        "description": "Antibiótico de amplio espectro"
        },
    {
        "generic_name": "Omeprazol", 
        "active_ingredient": "Omeprazol", 
        "category_id": 7, 
        "price": 80, 
        "stock_quantity": 15, 
        "image_url": "url4", 
        "description": "Inhibidor de la bomba de protones"
    },
    {
        "generic_name": "Metformina", 
        "active_ingredient": "Metformina", 
        "category_id": 8, 
        "price": 90, 
        "stock_quantity": 40, 
        "image_url": "url5", 
        "description": "Antidiabético oral"
    },
    {
        "generic_name": "Loratadina", 
        "active_ingredient": "Loratadina", 
        "category_id": 5, 
        "price": 55, 
        "stock_quantity": 35, "image_url": "url6", "description": "Antihistamínico"},
    {
        "generic_name": "Aspirina", "active_ingredient": "Ácido acetilsalicílico", "category_id": 1, "price": 45, "stock_quantity": 50, "image_url": "url7", "description": "Analgésico y antipirético"},
    {
        "generic_name": "Clonazepam", "active_ingredient": "Clonazepam", "category_id": 8, "price": 100, "stock_quantity": 10, "image_url": "url8", "description": "Ansiolítico y anticonvulsivo"},
    {
        "generic_name": "Simvastatina", "active_ingredient": "Simvastatina", "category_id": 8, "price": 85, "stock_quantity": 20, "image_url": "url9", "description": "Reductor de colesterol"},
    {
        "generic_name": "Levotiroxina", "active_ingredient": "Levotiroxina", "category_id": 8, "price": 75, "stock_quantity": 25, "image_url": "url10", "description": "Hormona tiroidea"},
    {
        "generic_name": "Ciprofloxacino", "active_ingredient": "Ciprofloxacino", "category_id": 2, "price": 65, "stock_quantity": 30, "image_url": "url11", "description": "Antibiótico de amplio espectro"},
    {
        "generic_name": "Diclofenaco", "active_ingredient": "Diclofenaco", "category_id": 1, "price": 50, "stock_quantity": 40, "image_url": "url12", "description": "Analgésico y antiinflamatorio"},
    {
        "generic_name": "Furosemida", "active_ingredient": "Furosemida", "category_id": 8, "price": 70, "stock_quantity": 20, "image_url": "url13", "description": "Diurético"},
    {
        "generic_name": "Losartán", "active_ingredient": "Losartán", "category_id": 8, "price": 80, "stock_quantity": 25, "image_url": "url14", "description": "Antihipertensivo"},
    {
        "generic_name": "Metronidazol", "active_ingredient": "Metronidazol", "category_id": 2, "price": 60, "stock_quantity": 30, "image_url": "url15", "description": "Antibiótico y antiparasitario"},
    {
        "generic_name": "Prednisona", "active_ingredient": "Prednisona", "category_id": 8, "price": 90, "stock_quantity": 15, "image_url": "url16", "description": "Corticosteroide"},
    {
        "generic_name": "Ranitidina", "active_ingredient": "Ranitidina", "category_id": 7, "price": 55, "stock_quantity": 35, "image_url": "url17", "description": "Antagonista de los receptores H2"},
    {
        "generic_name": "Salbutamol", "active_ingredient": "Salbutamol", "category_id": 8, "price": 65, "stock_quantity": 20, "image_url": "url18", "description": "Broncodilatador"},
    {
        "generic_name": "Tramadol", "active_ingredient": "Tramadol", "category_id": 1, "price": 75, "stock_quantity": 25, "image_url": "url19", "description": "Analgésico opioide"},
    {
        "generic_name": "Warfarina", "active_ingredient": "Warfarina", "category_id": 8, "price": 85, "stock_quantity": 10, "image_url": "url20", "description": "Anticoagulante"},
    {
        "generic_name": "Amlodipino", "active_ingredient": "Amlodipino", "category_id": 8, "price": 95, "stock_quantity": 30, "image_url": "url21", "description": "Antihipertensivo"},
    {
        "generic_name": "Azitromicina", "active_ingredient": "Azitromicina", "category_id": 2, "price": 100, "stock_quantity": 20, "image_url": "url22", "description": "Antibiótico macrólido"},
    {
        "generic_name": "Betametasona", "active_ingredient": "Betametasona", "category_id": 3, "price": 50, "stock_quantity": 40, "image_url": "url23", "description": "Corticosteroide"},
    {
        "generic_name": "Carbamazepina", "active_ingredient": "Carbamazepina", "category_id": 8, "price": 60, "stock_quantity": 25, "image_url": "url24", "description": "Anticonvulsivo"},
    {
        "generic_name": "Cetirizina", "active_ingredient": "Cetirizina", "category_id": 5, "price": 70, "stock_quantity": 35, "image_url": "url25", "description": "Antihistamínico"},
    {
        "generic_name": "Dexametasona", "active_ingredient": "Dexametasona", "category_id": 8, "price": 80, "stock_quantity": 20, "image_url": "url26", "description": "Corticosteroide"},
    {
        "generic_name": "Enalapril", "active_ingredient": "Enalapril", "category_id": 8, "price": 90, "stock_quantity": 15, "image_url": "url27", "description": "Antihipertensivo"},
    {
        "generic_name": "Eritromicina", "active_ingredient": "Eritromicina", "category_id": 2, "price": 55, "stock_quantity": 30, "image_url": "url28", "description": "Antibiótico macrólido"},
    {
        "generic_name": "Fluconazol", "active_ingredient": "Fluconazol", "category_id": 2, "price": 65, "stock_quantity": 25, "image_url": "url29", "description": "Antifúngico"},
    {
        "generic_name": "Folic Acid", "active_ingredient": "Ácido fólico", "category_id": 9, "price": 75, "stock_quantity": 40, "image_url": "url30", "description": "Suplemento vitamínico"},
    {
        "generic_name": "Glibenclamida", "active_ingredient": "Glibenclamida", "category_id": 8, "price": 85, "stock_quantity": 20, "image_url": "url31", "description": "Antidiabético oral"},
    {
        "generic_name": "Hidrocortisona", "active_ingredient": "Hidrocortisona", "category_id": 3, "price": 95, "stock_quantity": 10, "image_url": "url32", "description": "Corticosteroide"},
    