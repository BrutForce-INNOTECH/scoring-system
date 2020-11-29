from API.BDIP import  BDIP
import time

if __name__=="__main__":
	bdip = BDIP("CpTAG3vNJwtW")

	task = bdip.do_search("Алексей","Бордюжа","71")
	print(task)
	time.sleep(1)
	status = bdip.get_status(task)
	while (str(status)!="0"):
		status = bdip.get_status(task)
		time.sleep(0.5)


	print(bdip.get_info(task))