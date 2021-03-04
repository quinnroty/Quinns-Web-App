import some
import bottle
import json
@bottle.route("/")
def htmlContent():
  return bottle.static_file("Thing.html",root='.')

@bottle.route("/frontEnd.js")
def javaScript():
  return bottle.static_file("frontEnd.js",root='.')

@bottle.route("/CriticalReadingGrades")
def ReadGrades():
  return (json.dumps(some.listCritReading()))
  
@bottle.route("/MathematicsGrades")
def MathGrades():
  return (json.dumps(some.listMathematics()))

@bottle.route("/WritingGrades")
def WriteGrades():
  return (json.dumps(some.listWriting()))

@bottle.route("/AllGrades")
def WriteAllGrades():
  ListOfLists=(some.AllGradesBackEnd())
  return (json.dumps(ListOfLists))
  


#print (WriteAllGrades())

bottle.run(host="0.0.0.0", port=8080, debug=True)