def ingest(FilePath):
    f = open(FilePath,"r")
    list = []
    print(f)
    for line in f.readlines():
        list.append(line)
    return list