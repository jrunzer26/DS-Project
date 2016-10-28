import zerorpc
import todoist
import logging



class HelloRPC(object):
	def hello(self, name):
		return "Hello, %s" % name

	def makeList(self, listname, items):
		print 'hello'
		api = todoist.TodoistAPI('35b87a85b6e07d2fb7be29efc9bba31e79b61b19')
		user = api.user.login('jrunzer6@hotmail.com', 'password')
		print(user['full_name'])
		project = api.projects.add(listname)
		
		for num in range(0, items):
			api.items.add('Item : ' + str(items), project['id'])
		api.commit();
		return user['full_name']

logging.basicConfig()

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()