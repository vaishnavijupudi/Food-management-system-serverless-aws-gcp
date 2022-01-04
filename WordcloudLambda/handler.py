import pymysql
import json
import boto3


endpoint = 'sapp16.coktltmksgck.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'admin_123'
database_name = 'sapp16'

connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

def lambda_handler(event, context):
    s3 = boto3.client("s3")
    cursor = connection.cursor()
    cursor.execute('SELECT review FROM orders')
    
    rows = cursor.fetchall()
    str=""
    
    for row in rows:
        str = str + row[0] + " "
        print("{0}".format(row[0]))
        print(row)
    print(str) 
    entities = datachunk(str)
    
    response = s3.put_object(Bucket="twitterdataoutputb00874363", Key="entities.json", Body=json.dumps(entities).encode())

    transactionResponse = {}
    responseObject = {}
    transactionResponse['data'] = entities
    transactionResponse['message'] = 'Hello from Lambda land'
    responseObject['statusCode'] = 200
    responseObject['headers'] = {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    responseObject['headers']['Content-Type'] = 'application/json'
    responseObject['body'] = json.dumps(transactionResponse)
    return responseObject


def datachunk(str):
    counts = dict()
    words = str.split()
    temp =[]
    list = []
    
    
    for word in words:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1
    for key, value in counts.items():
        dict1 = {}
        text = key
        dict1['text'] = text
        count = value
        dict1['value'] = int(count) + 50000
        print(dict1)
        list.append(dict1)
        
    print(list)   
        
        
        # print(text)
        # print(count)
    #     temp = [key, value]
    #     list.append(temp)
    # print(list)   
    return list


