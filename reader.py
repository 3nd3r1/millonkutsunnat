import re

def reader(file):
    print("")
    print(file)
    print("")
    with open(file, 'r') as fp:
        f = fp.readlines()
        ans = []
        if file == "pirkanmaa.txt":
            for i in range(0,45):
                data = f[i].split(" ")
                paikka = data[0].replace("\n", "")
                aakkoset = "AAA-ÖÖÖ"
                if len(data) > 1:
                    aakkoset = ''.join(data[1:]).replace("\n","")
                ans.append((paikka, aakkoset))
            for i in range(45,90):
                data = f[i].split(" ")
                aika = ""
                j = 0
                while ".00" not in aika and ".30" not in aika:
                    aika += data[j] + " "
                    print(aika)
                    j += 1
                sijainti = ' '.join(data[j:]).replace("\n","")
                ans[i-45] = (ans[i-45][0], ans[i-45][1], aika, sijainti)
        else:
            for line in f:
                line = line.replace("|","").replace("- ","-").replace(" -","-").replace(" - ","-").replace("_","").replace("  "," ")
                data = line.split(" ")
                paikka = data[0]
                aakkoset = re.sub(r"\d\d\d", "ööö", data[1])

                if file in ("kakki.txt", "keski.txt"):
                    aika = ' '.join(data[2:6])
                    sijainti = ' '.join(data[6:]).replace("\n","")
                else:
                    aika = ' '.join(data[2:7])
                    sijainti = ' '.join(data[7:]).replace("\n","")

                ans.append((paikka, aakkoset, aika, sijainti))
            
        print(ans)


#reader("hämee.txt")
#reader("pirkanmaa.txt")
# reader("kakki.txt")
reader("keski.txt")
# reader("lappi.txt")
# reader("lounas.txt")
# reader("pohjanmaa.txt")
# reader("pohjois-karjala.txt")
# reader("pohjois-pohjanmaa.txt")
# reader("pohjois-savo.txt")
# reader("sami.txt")
# reader("savo.txt")
# reader("uusimaa.txt")
