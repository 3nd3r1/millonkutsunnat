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
                sijainti = ' '.join(data[j:])
                ans[i-45] = (ans[i-45][0], ans[i-45][1], aika, sijainti)
        else:
            for line in f:
                data = line.split(" ")
                paikka = data[0]
                aakkoset = data[1]

                i = 0
                if "-" not in aakkoset or aakkoset[-1] == "-":
                    i = 1
                    aakkoset += data[2]

                if aakkoset[-1] == "-":
                    i = 2
                    aakkoset += data[3]

                aika = ' '.join(data[i+2:i+7])
                sijainti = ' '.join(data[i+7:])

                ans.append((paikka, aakkoset, aika, sijainti))
            
        print(ans)


# reader("hämee.txt")
reader("pirkanmaa.txt")
# reader("kakki.txt")
# reader("keski.txt")
# reader("lappi.txt")
# reader("lounas.txt")
# reader("pohjanmaa.txt")
# reader("pohjois-karjala.txt")
# reader("pohjois-pohjanmaa.txt")
# reader("pohjois-savo.txt")
# reader("sami.txt")
# reader("savo.txt")
# reader("uusimaa.txt")
