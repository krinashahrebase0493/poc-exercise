# INSTRUCTIONS
1. To check linting errors run command `npm run lint`
2. To build the project run command `npm run build`
3. To run test cases run command `npm run test`
4. To start the server locally run command `npm run start`
5. To run loadtest first install `locust` to your system 
   and run command `npm run loadtest`
6. To verify loadtest report run command `npm run loadtestverify`
7. To run the application with docker :
    - Build image with command `docker build -t image_name .`
    - Run the image with command `docker run -d -p 3000:3000 image_name`
    - Now the application should be available on `localhost:3000`
8. To check the swagger documentation visit `localhost:3000/api-docs`
9. Working of the application :
    - one endpoint is provided [POST] `/convert/file/`
    - [POST] `/convert/file` must have csv file attachment with field name `file`
    - [POST] `/convert/file` will return downloadable csv file if converted successfully
10. Linting, Building & Testing, Loadtesting is happening via GitActions 
   everytime a push is done the master branch

**NOTE**
> The LOCUST test is using a ngrok url which was deployed from a localserver which can be later replaced with the original server. The CICD pipeline will stop further execution if the given performance conditions are not met.

