import os
import json
import urllib.request as urllib2
import cv2
import numpy as np
from numpy.linalg import norm


def save_json(data, filename, path):
	if not os.path.exists(path):
		os.makedirs(path)
	with open(os.path.join(path, filename), 'w') as outfile:
		json.dump(data, outfile)


def read_jsons(path):
	with open(path, encoding='utf-8') as data_file:
		data = json.loads(data_file.read())
		return data


def url_to_image(url):
	try:
		resp = urllib2.urlopen(url)
		image = np.asarray(bytearray(resp.read()), dtype="uint8")
		image = cv2.imdecode(image, cv2.IMREAD_COLOR)
		return image
	except:
		return None


def save_numpy(data, filename, path):
	if not os.path.exists(path):
		os.makedirs(path)
	with open(os.path.join(path, filename + ".npy"), 'wb') as f:
		np.save(f, data)


def compute_sim(emb1, emb2):
	sim = np.dot(emb1, emb2) / (norm(emb1) * norm(emb2))
	return sim


def load_numpys(path):
	try:
		embs = []
		for file in os.listdir(path):
			if file.endswith(".npy"):
				tmp = np.load(os.path.join(path, file))
				embs.append(tmp)

		return embs
	except Exception as e:
		print(path)
		return None
