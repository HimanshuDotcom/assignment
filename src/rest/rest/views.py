from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import logging
import os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + \
    os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

items_db = db['todos']
items_db.delete_many({})


class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        items = items_db.find()
        res = []
        for i in items:
            x = {
                'id': str(i['_id']),
                'name': i['name']
            }
            res.append(x)

        response_obj = {
            "items": res
        }
        return Response(response_obj, status=status.HTTP_200_OK)

    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        res = json.loads(request.body)
        item = {
            'name': res['name']
        }
        items_db.insert_one(item)
        return Response({
            'status': 'Done'
        }, status=status.HTTP_200_OK)
