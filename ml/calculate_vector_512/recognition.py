# USAGE
import json
import os
import urllib.request as urllib2
import cv2
import insightface
import numpy as np
from numpy.linalg import norm
from utils import *
import imutils

class recognition(object):

    def __init__(self, save_path):
        model = insightface.app.FaceAnalysis()
        ctx_id = 0
        model.prepare(ctx_id=ctx_id, nms=0.4)
        self.model = model
        self.save_path = save_path

    def get_emb(self, image):
        try:
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            faces = self.model.get(rgb)
            return faces
        except Exception as e:
            print(e)
            return []

    def get_embs(self, id, urls):
        for url in urls:
            image = url_to_image(url)
            if image is None: continue
            faces = self.get_emb(image)
            image_name = url.split("?")[0].split("/")[-1].split(".")[0]
            for i, face in enumerate(faces):
                save_numpy(face.normed_embedding, image_name + "_" + str(i),
                           os.path.join(self.save_path, str(id)))


    def get_best(self, url, thresh):
        best = {"id": "-1", "count": 0,"age":-1}
        image = url_to_image(url)
        if image is None: return best
        if (image.shape[1] > 640):
            image = imutils.resize(image, width=640)
        face = self.get_emb(image)
        print("FACE LEN:",len(face))
        if len(face) ==0: return best
        emb = face[0].normed_embedding
        best["age"] = face[0].age
        for folder in os.listdir(self.save_path):
            data = load_numpys(os.path.join(self.save_path, folder))
            count = 0
            for vk_emb in data:
                score = compute_sim(emb, vk_emb)
                #print(score)
                if score >= thresh:
                    count += 1
            print(folder," count =",count)
            if count > best["count"]:
                best["count"] = count
                best["id"] = str(folder)

        return best
