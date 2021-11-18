from locust import HttpUser, task, between, TaskSet, User;

class LoadTest(HttpUser, User) :
    wait_time = between(0.5, 3.0)
    host = 'http://bd54-103-212-143-112.ngrok.io'

    @task
    def convertCSV(self) :
        attach = open('mockdata/sample.csv', 'rb')
        self.client.post('/convert/file', files = {'file' : attach})