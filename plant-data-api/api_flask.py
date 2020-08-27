from flask import Flask
from flask_restful import Api
import Information_Handler

app=Flask(__name__)
api=Api(app)



api.add_resource(Information_Handler.InformationHandler, "/info/<string:name>")

if __name__=="__main__":
    app.run(debug=True)