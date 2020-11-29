from calculate_vector_512.recognition import recognition
from vk.vk_data import vk_data
import time

if __name__=="__main__":
	# vk = vk_data()
	# status,data = vk.get_info_from_user("https://vk.com/id453382669")
	# print(status)
	# print(data)
	# print(data["id"])
	# status,urls = vk.get_photos(data["id"],count=25)
	# print(urls)
	#
	# recog = recognition(r"G:\server\storage")
	# t = time.time()
	# recog.get_embs(data["id"],urls)
	# print(time.time()-t)

	recog = recognition(r"G:\server\storage")
	url = "https://sun9-25.userapi.com/impf/c639918/v639918391/9c77/oAC_sQVHzMg.jpg?size=2560x1438&quality=96&proxy=1&sign=3de61ff63e2249f98ba39137b1b1a16d"
	thresh = 0.65
	t = time.time()
	print(recog.get_best(url,thresh))
	print(time.time() - t)