import re, os
import sqlite3

def reader(file):
    print("")
    print(file)
    print("")
    with open(file, 'r', encoding="UTF-8") as fp:
        f = fp.readlines()
        ans = []
        if file == "pirkanmaa.txt":
            for i in range(0,45):
                data = f[i].split(" ")
                paikka = data[0].replace("\n", "")
                paikka = paikka.lower()
                paikka = paikka.capitalize()
                aakkoset = "AAA-ÖÖÖ"
                if len(data) > 1:
                    aakkoset = ''.join(data[1:]).replace("\n","")
                aakkoset = aakkoset.lower()
                ans.append((paikka, aakkoset))
            for i in range(45,90):
                data = f[i].split(" ")
                aika = ""
                j = 0
                while ".00" not in aika and ".30" not in aika:
                    aika += data[j] + " "
                    j += 1
                sijainti = ' '.join(data[j:]).replace("\n","")
                ans[i-45] = (ans[i-45][0], ans[i-45][1], aika, sijainti)
        else:
            for line in f:
                line = line.replace("|","").replace("_","").replace("  "," ")
                line = re.sub(r"\ *[-–]\ *","-",line)
                data = line.split(" ")
                paikka = data[0]
                paikka = paikka.lower()
                paikka = paikka.capitalize()

                aakkoset = "AAA-ÖÖÖ"
                i=1
                if "-" in data[1]:
                    aakkoset = re.sub(r"[\dO][\ds]\d", "ööö", data[1])
                    i = 2
                aakkoset = aakkoset.lower()
                    

                if file in ("hämee.txt", "pohjois-karjala.txt"):
                    aika = ' '.join(data[i:i+5])
                    sijainti = ' '.join(data[i+5:])
                elif file in ("uusimaa.txt"):
                    aika = ' '.join(data[i:i+3])
                    sijainti = ' '.join(data[i+3:])
                else:
                    aika = ' '.join(data[i:i+4])
                    sijainti = ' '.join(data[i+4:])
                
                aika = re.sub(r"[tT][lL] ", "Ti ", aika)
                sijainti = sijainti.replace("\n","")

                ans.append((paikka, aakkoset, aika, sijainti))
            
    return ans


try:
    os.remove("database.db")
except:
    pass
conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS paikat (id INTEGER PRIMARY KEY, paikka TEXT, aakkoset TEXT, aika TEXT, sijainti TEXT)")

entries = []
entries += reader("hämee.txt")
entries += reader("pirkanmaa.txt")
entries += reader("kakki.txt")
entries += reader("keski.txt")
entries += reader("lappi.txt")
entries += reader("lounas.txt")
entries += reader("pohjanmaa.txt")
entries += reader("pohjois-karjala.txt")
entries += reader("pohjois-pohjanmaa.txt")
entries += reader("pohjois-savo.txt")
entries += reader("sami.txt")
entries += reader("savo.txt")
entries += reader("uusimaa.txt")

c.executemany("INSERT INTO paikat (paikka, aakkoset, aika, sijainti) VALUES (?,?,?,?)", entries)

conn.commit()
