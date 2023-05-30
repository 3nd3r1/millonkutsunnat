import re
import os
import json


def reader(file):
    print("")
    print(file)
    print("")
    with open(file, 'r', encoding="UTF-8") as fp:
        f = fp.readlines()
        ans = {}
        if file == "pirkanmaa.txt":
            datsku = []
            for i in range(0, 45):
                data = f[i].split(" ")
                paikka = data[0].replace("\n", "")
                paikka = paikka.lower()
                paikka = paikka.capitalize()
                aakkoset = "AAA-ÖÖÖ"
                if len(data) > 1:
                    aakkoset = ''.join(data[1:]).replace("\n", "")
                aakkoset = aakkoset.lower()

                datsku.append((paikka, aakkoset))
            for i in range(45, 90):
                data = f[i].split(" ")
                aika = ""
                j = 0
                while ".00" not in aika and ".30" not in aika:
                    aika += data[j] + " "
                    j += 1
                sijainti = ' '.join(data[j:]).replace("\n", "")
                datsku[i-45] = (datsku[i-45][0], datsku[i-45]
                                [1], aika, sijainti)
            for entry in datsku:
                if ans.get(entry[0]) is None:
                    ans[entry[0]] = []
                ans[entry[0]].append((entry[1], entry[2], entry[3], "suomi"))
        else:
            for line in f:
                line = line.replace("|", "").replace(
                    "_", "").replace("  ", " ")
                line = re.sub(r"\ *[-–]\ *", "-", line)
                data = line.split(" ")
                paikka = data[0]
                paikka = paikka.lower()
                paikka = paikka.capitalize()

                aakkoset = "AAA-ÖÖÖ"
                i = 1
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
                sijainti = sijainti.replace("\n", "")
                kieli = "suomi"

                if "ruotsin" in paikka:
                    kieli = "ruotsi"

                paikka = re.sub(r"[- ](ruotsin|suomen)kieliset", "", paikka)

                if ans.get(paikka) is None:
                    ans[paikka] = []
                ans[paikka].append((aakkoset, aika, sijainti, kieli))

    return ans


try:
    os.remove("kutsunnat.json")
except:
    pass


def Merge(dict1, dict2):
    res = {**dict1, **dict2}
    return res


ans = {}
ans = Merge(ans, reader("hämee.txt"))
ans = Merge(ans, reader("uusimaa.txt"))
ans = Merge(ans, reader("pirkanmaa.txt"))
ans = Merge(ans, reader("pohjois-karjala.txt"))
ans = Merge(ans, reader("pohjois-pohjanmaa.txt"))
ans = Merge(ans, reader("pohjois-savo.txt"))
ans = Merge(ans, reader("pohjanmaa.txt"))
ans = Merge(ans, reader("lounas.txt"))
ans = Merge(ans, reader("kakki.txt"))
ans = Merge(ans, reader("keski.txt"))
ans = Merge(ans, reader("sami.txt"))
ans = Merge(ans, reader("savo.txt"))

with open("kutsunnat.json", "w", encoding="UTF-8") as fp:
    fp.write(json.dumps(ans))
