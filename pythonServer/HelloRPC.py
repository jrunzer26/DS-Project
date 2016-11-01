import zerorpc
import todoist
import logging



class HelloRPC(object):
	def hello(self, name):
		return "Hello, %s" % name

	def makeList(self, username, password, listname, items):
		print username
		print password
		print listname
		print items
		print items[0]
		errors = ''
		api = todoist.TodoistAPI('35b87a85b6e07d2fb7be29efc9bba31e79b61b19')
		""" error check api"""
		#print api
		user = api.user.login(username, password)
		#print user
		"""error check user"""
		project = api.projects.add(listname)
		""" Error check project """
		#print project
		for num in range(0, len(items)):
			#print items
			item = api.items.add(str(items[num]), project['id'])
			#print item
		commit = api.commit()
		#print commit
		response = "{ \"err\" : \"" + errors + "\"}" 
		print response
		return str(response)
		#return "{ \"err\" : \"" + errors + "\"}" 


logging.basicConfig()

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
print 'server started'
s.run()
