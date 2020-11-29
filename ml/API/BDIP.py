import requests
import json
import time

class BDIP(object):

	def __init__(self,token):
		self.search ="https://api-ip.fssp.gov.ru/api/v1.0/search/physical"
		self.token = token
		self.status = "https://api-ip.fssp.gov.ru/api/v1.0/status"
		self.result = "https://api-ip.fssp.gov.ru/api/v1.0/result"


	def do_search(self,firstname,lastname,region):
		fields = {"token": self.token, "region": str(region), "lastname": lastname, "firstname": firstname}

		r = requests.get(self.search,json=fields)
		data = json.loads(r.content.decode("utf-8"))
		return data["response"]["task"]


	def get_status(self,task):
		post_fields = {"token": self.token, "task":task}
		r = requests.get(self.status, json=post_fields)
		info = json.loads(r.content.decode("utf-8"))
		return info["response"]["status"]

	def get_info(self,task):
		post_fields = {"token": self.token, "task": task}
		r = requests.get(self.result, json=post_fields)
		data = []
		answer = json.loads(r.content.decode("utf-8"))
		for res in answer["response"]["result"]:
			for item in res["result"]:
				data.append(item)

		return {"BDIP":data}


	def info(self,firstname,lastname,region):
		task = self.do_search(firstname,lastname,region)
		print(task)
		time.sleep(1)
		status = self.get_status(task)
		while (str(status) != "0"):
			status = self.get_status(task)
			time.sleep(0.5)

		return self.get_info(task)




