from http.server import BaseHTTPRequestHandler, HTTPServer  # python3
from io import BytesIO
import json
import os
from vk.vk_data import vk_data
from calculate_vector_512.recognition import recognition
from utils import *
from API.BDIP import BDIP


class HandleRequests(BaseHTTPRequestHandler):

    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    # Определён только post метод
    def do_POST(self):
        print("POST")
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        jsonArr = json.loads(body.decode('utf-8'))
        print(jsonArr)
        self._set_headers()

        if self.path == '/add_data':
            recog = recognition(r"G:\server\storage")
            vk = vk_data()
            # self.wfile.write(self.path.encode('UTF-8'))

            for vk_url in jsonArr["urls"]:
                status, data = vk.get_info_from_user(vk_url)
                print(data)
                if not status: continue
                status, urls = vk.get_photos(data["id"], count=int(jsonArr["count"]))
                print("len:",len(urls))
                recog.get_embs(data["id"], urls)


            print("Профиль добавлен")
            response = BytesIO()
            response.write(str("OK").encode('UTF-8'))
            self.wfile.write(response.getvalue())

        elif self.path =="/search":

            recog = recognition(r"G:\server\storage")
            url = jsonArr["url"]
            thresh = float(jsonArr["thresh"])
            print(thresh)
            best = recog.get_best(url,thresh)
            response = BytesIO()
            response.write(str(best).encode('UTF-8'))
            self.wfile.write(response.getvalue())



        elif self.path =="/get_info":
            id = jsonArr["id"]
            vk_url = "http://vk.com/id"+str(id)
            vk = vk_data()
            bdip = BDIP("CpTAG3vNJwtW")
            status, data = vk.get_info_from_user(vk_url)
            bdip_ans = bdip.info(data["data"]["first_name"],data["data"]["last_name"],"77")
            print(data)
            data["score"] = vk.get_score(data["data"])
            data["BDIP"] = bdip_ans


            print(data["score"])
            response = BytesIO()
            response.write(json.dumps(data).encode('UTF-8'))
            self.wfile.write(response.getvalue())


        else:
            self.wfile.write(b"405 Method Not Allowed")




#host = ''
host ='0.0.0.0'
port = 80
HTTPServer((host, port), HandleRequests).serve_forever()
