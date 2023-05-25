def reader(file):
    print("")
    print(file)
    print("")
    with open(file, 'r') as f:
        for line in f:
            if file == "pirkanmaa.txt":
                pass
            else:
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

                print(
                    f"Paikka: {paikka}  aakkoset: {aakkoset} aika: {aika} sijainti: {sijainti}")


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
