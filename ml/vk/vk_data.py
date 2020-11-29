import vk_api


class vk_data(object):
	def __init__(self):
		vk_session = vk_api.VkApi(login='+', password='',
								  token="57f3e3d557f3e3d557f3e3d56f579aeb14557f357f3e3d50b89131f855a5957677c18fd")
		vk_session.auth()
		vk = vk_session.get_api()
		self.vk = vk

	def get_info_from_user(self, url):
		print(url.split("/")[-1])
		status = True
		ans = {}
		print()
		try:
			data = self.vk.users.get(user_ids=url.split("/")[-1],
									 fields="verified, sex, bdate, city, country, home_town, has_photo,photo_max_orig, domain, contacts, site, education, universities, schools, occupation, nickname, relatives, relation,has_mobile, personal, connections, exports, activities, interests, quotes, screen_name, maiden_name, military")
			ans["data"] = data[0]
			ans["id"] = data[0]["id"]

		except Exception as e:
			print(e)
			status = False
			ans["Exception"] = e
		finally:
			return status, ans

	def get_photos(self, id, count):
		status = True
		urls = []
		try:
			photos = self.vk.photos.getAll(owner_id=int(id), count=str(count))
			for photo in photos["items"]:
				sizes = photo["sizes"]
				for size in sizes:
					if size["type"] == "y":
						url = size["url"]
						urls.append(url)

		except Exception as e:
			print(e)
			status = False
			urls = e

		finally:
			return status, urls


	def get_score(self,data):
		keys = {"skype":3,"instagram":3,"university_name":3,"relation":6,"relation_partner":6,"relatives":3,"twitter":3,"facebook_name":3,"home_phone":6,"mobile_phone":6,"livejournal":3,"site":3,"has_mobile":3}
		score = 30
		try:
			print(score)
			for key in keys:
				value = data.get(key)
				print(value)
				if value is not None:
					if key == "relation":
						if str(value) == "4":
							score += keys[key]
					elif key == "has_mobile":
						if str(value) == "1":
							score += keys[key]
					else:
						score += keys[key]
		except Exception as e:
			print(e)
		finally:
			return score
