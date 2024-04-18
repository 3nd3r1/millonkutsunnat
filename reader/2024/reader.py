import json
import os
import re


def reader(file):
    print("")
    print(file)
    print("")
    with open(file, "r", encoding="UTF-8") as fp:
        f = fp.readlines()
        ans = {}
        for line in f:
            line = (
                line.replace("Kaikki", "")
                .replace("kaikki", "")
                .replace("—", "-")
                .replace("|", "")
                .replace("_", "")
                .replace("  ", " ")
                .replace(" - ", "-")
                .replace(" -", "-")
                .replace("- ", "-")
                .replace("(", "")
                .replace(")", "")
            )
            line = re.sub(r"\ *[-–]\ *", "-", line)
            data = line.split(" ")
            paikka = data[0]
            paikka = paikka.lower()

            aakkoset = "AAA-ÖÖÖ"
            if len(data) < 2:
                continue
            i = 1
            if "kieliset" in data[i] or "ruotsiksi" in data[i] or "suomeksi" in data[i]:
                i += 1

            if "-" in data[i]:
                aakkoset = re.sub(r"[\dO][\ds]\d", "ööö", data[i])
                i += 1
            aakkoset = aakkoset.lower()

            if file in ("hämee.txt", "pohjois-karjala.txt"):
                aika = " ".join(data[i : i + 5])
                sijainti = " ".join(data[i + 5 :])
            elif file in ("uusimaa.txt"):
                aika = " ".join(data[i : i + 3])
                sijainti = " ".join(data[i + 3 :])
            else:
                aika = " ".join(data[i : i + 4])
                sijainti = " ".join(data[i + 4 :])

            aika = re.sub(r"[tT][lL] ", "Ti ", aika)
            aika = aika.lower()
            sijainti = sijainti.replace("\n", "")
            kieli = "suomi"

            if "ruotsin" in line or "ruotsiksi" in line:
                kieli = "ruotsi"

            paikka = re.sub(r"[- ,](ruotsin|suomen)kieliset", "", paikka)
            paikka = re.sub(r",", "", paikka)

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
