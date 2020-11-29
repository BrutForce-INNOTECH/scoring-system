from vk.vk_data import vk_data



if __name__=="__main__":
	vk = vk_data()
	status,data = vk.get_info_from_user("https://vk.com/id1")
	print(vk.get_score(data["data"]))
	# print(status)
	# print(data)
	# print(data["id"])
	# print(vk.get_photos(data["id"],count=10))