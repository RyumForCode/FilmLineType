from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.jq6qj7m.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/line', methods=['GET'])
def line_get():
    # mongodb에서 예문으로 사용할 영화 대사 정보 불러오기
    movie_lines = list(db.movieLines.find({},{'_id': False}))
    # line_receive = request.args.get('line_give')
    return jsonify({'movieLines': movie_lines})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
