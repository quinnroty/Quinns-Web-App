import urllib.request
import json
import csv
import os
def setUpData():
  url = "https://data.cityofnewyork.us/api/views/zt9s-n5aj/rows.json?accessType=DOWNLOAD"

  response = urllib.request.urlopen(url)
  json_content = response.read().decode()
  content = json.loads(json_content)
  writeCSV("data.csv", content)

url = "https://data.cityofnewyork.us/api/views/zt9s-n5aj/rows.json?accessType=DOWNLOAD"

response = urllib.request.urlopen(url)
json_content = response.read().decode()
content = json.loads(json_content)


meta = content['meta']
view = meta['view']
data = content['data']
datafile='data.csv'
dataurl=url



def writeHeader(writer, content):
  colInfo = content['meta']['view']['columns']
  header = []
  for x in range(9, len(colInfo)):
    header.append(colInfo[x]['name'])
  writer.writerow(header)
  return None

def writeRows(writer, content):
  for entry in data:
    schoolnames = []
    first = []
    second = []
    third = []
    fourth = []
    if entry[10]!=None:
      schoolnames.append(entry[9])
      first.append(entry[10])
      second.append(entry[11])
      third.append(entry[12])
      fourth.append(entry[13])
      writer.writerow(schoolnames+first+second+third+fourth)


def writeCSV(filename, content):
  with open(filename, 'w') as f:
    writer = csv.writer(f)
    writeHeader(writer, content)
    writeRows(writer, content)

def readCSV(filename):
  with open(filename) as f:
    reader = csv.reader(f)
    for lines in reader:
      return (lines)

def loadData(filename, url):
  if not os.path.isfile(filename):
    setUpData()
  return readCSV(filename)

myData = loadData(datafile,dataurl)


listofCritReadingGrades=[]
def listCritReading():
  with open('data.csv') as f:
    reader = csv.reader(f)
    next(reader)
    for lines in reader:
      listofCritReadingGrades.append(int(lines[2]))
  return listofCritReadingGrades

listofMathematics=[]
def listMathematics():
  with open('data.csv') as f:
    reader = csv.reader(f)
    next(reader)
    for lines in reader:
      listofMathematics.append(int(lines[3]))
  return listofMathematics

listwriting=[]

def listWriting():
  with open('data.csv') as f:
    reader = csv.reader(f)
    next(reader)
    for lines in reader:
      listwriting.append(int(lines[4]))
  return listwriting
listWriting()
listMathematics()
listCritReading()
dicOfGrades = {}
dicOfGrades["Critical Reading"]=(listofCritReadingGrades)
dicOfGrades["Mathematics"]=(listofMathematics)
dicOfGrades["Writing"]=(listwriting)

def AllGradesBackEnd():
  return (dicOfGrades)
  