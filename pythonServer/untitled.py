import todoist
import json

api = todoist.TodoistAPI('35b87a85b6e07d2fb7be29efc9bba31e79b61b19')
user = api.user.login('jrunzer26@hotmail.com', 'password')
print(user['full_name'])

project = api.projects.add('Shopping List')
api.commit();
item = api.items.add('Some Random Task!', project['id'])
item2 = api.items.add('aasdfasdkfa', project['id'])
item3 = api.items.add('adfadsfa', project['id'])
api.commit();
print('hello')
