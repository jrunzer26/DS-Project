import zerorpc
import todoist
import logging



class TodoistRPC(object):

	def makeList(self, username, password, listname, items):
		errors = ''
		api = todoist.TodoistAPI('35b87a85b6e07d2fb7be29efc9bba31e79b61b19')
		user = api.user.login(username, password)
		if 'error' in user:
			errors = "{ \"err\" : \"" + user['error'] + "\"}"
			return str(errors)
		project = api.projects.add(listname)
		for num in range(0, len(items)):
			#print items
			item = api.items.add(str(items[num]), project['id'])
			#print item
		commit = api.commit()
		errors = "{ \"err\" : \"\"}"
		return str(errors)


logging.basicConfig()

s = zerorpc.Server(TodoistRPC())
s.bind("tcp://0.0.0.0:4242")
print 'server started'
s.run()
