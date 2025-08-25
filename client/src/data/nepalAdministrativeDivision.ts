export interface LocalLevel {
    name: string;
    type: "Metro" | "Sub-Metro" | "Municipality" | "Rural Municipality";
  }
  
  export interface District {
    name: string;
    localLevels: LocalLevel[];
  }
  
  export interface Province {
    name: string;
    districts: District[];
  }
  
  // Complete Nepal Administrative Data
  export const provinces: Province[] = [
    {
      name: "Koshi",
      districts: [
        { 
          name: "Bhojpur", 
          localLevels: [
            { name: "Bhojpur Municipality", type: "Municipality" },
            { name: "Shadanand Municipality", type: "Municipality" },
            { name: "Aamchok Rural Municipality", type: "Rural Municipality" },
            { name: "Arun Rural Municipality", type: "Rural Municipality" },
            { name: "Pauwadungma Rural Municipality", type: "Rural Municipality" },
            { name: "Tingla Rural Municipality", type: "Rural Municipality" },
            { name: "Ramprasad Rai Rural Municipality", type: "Rural Municipality" },
            { name: "Hatuwagadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Tyamke Maiyunm Rural Municipality", type: "Rural Municipality" },
            { name: "Salpasilichho Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Dhankuta", 
          localLevels: [
            { name: "Dhankuta Municipality", type: "Municipality" },
            { name: "Pakhribas Municipality", type: "Municipality" },
            { name: "Mahalaxmi Municipality", type: "Municipality" },
            { name: "Sangurigadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Chaubise Rural Municipality", type: "Rural Municipality" },
            { name: "Shahidbhumi Rural Municipality", type: "Rural Municipality" },
            { name: "Chhathar Jorpati Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Ilam", 
          localLevels: [
            { name: "Ilam Municipality", type: "Municipality" },
            { name: "Deumai Municipality", type: "Municipality" },
            { name: "Mai Municipality", type: "Municipality" },
            { name: "Suryodaya Municipality", type: "Municipality" },
            { name: "Phakphokthum Rural Municipality", type: "Rural Municipality" },
            { name: "Mangsebung Rural Municipality", type: "Rural Municipality" },
            { name: "Rong Rural Municipality", type: "Rural Municipality" },
            { name: "Sandakpur Rural Municipality", type: "Rural Municipality" },
            { name: "Fakphokthum Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Jhapa", 
          localLevels: [
            { name: "Birtamod Municipality", type: "Municipality" },
            { name: "Damak Municipality", type: "Municipality" },
            { name: "Arjundhara Municipality", type: "Municipality" },
            { name: "Shivasatakshi Municipality", type: "Municipality" },
            { name: "Mechinagar Municipality", type: "Municipality" },
            { name: "Bhadrapur Municipality", type: "Municipality" },
            { name: "Kankai Municipality", type: "Municipality" },
            { name: "Gauradaha Municipality", type: "Municipality" },
            { name: "Buddhashanti Rural Municipality", type: "Rural Municipality" },
            { name: "Kachankawal Rural Municipality", type: "Rural Municipality" },
            { name: "Barhadashi Rural Municipality", type: "Rural Municipality" },
            { name: "Jhapa Rural Municipality", type: "Rural Municipality" },
            { name: "Gauriganj Rural Municipality", type: "Rural Municipality" },
            { name: "Haldibari Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Khotang", 
          localLevels: [
            { name: "Diktel Rupakot Majhuwagadhi Municipality", type: "Municipality" },
            { name: "Halesi Tuwachung Municipality", type: "Municipality" },
            { name: "Khotehang Rural Municipality", type: "Rural Municipality" },
            { name: "Diprung Rural Municipality", type: "Rural Municipality" },
            { name: "Ainselukhark Rural Municipality", type: "Rural Municipality" },
            { name: "Rawa Besi Rural Municipality", type: "Rural Municipality" },
            { name: "Sakela Rural Municipality", type: "Rural Municipality" },
            { name: "Barahapokhari Rural Municipality", type: "Rural Municipality" },
            { name: "Kepilasagadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Jantedhunga Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Morang", 
          localLevels: [
            { name: "Biratnagar Metropolitan City", type: "Metro" },
            { name: "Sundar Haraincha Municipality", type: "Municipality" },
            { name: "Belbari Municipality", type: "Municipality" },
            { name: "Pathari-Sanischare Municipality", type: "Municipality" },
            { name: "Urlabari Municipality", type: "Municipality" },
            { name: "Rangeli Municipality", type: "Municipality" },
            { name: "Sunbarshi Municipality", type: "Municipality" },
            { name: "Letang Municipality", type: "Municipality" },
            { name: "Kanepokhari Rural Municipality", type: "Rural Municipality" },
            { name: "Budhiganga Rural Municipality", type: "Rural Municipality" },
            { name: "Gramthan Rural Municipality", type: "Rural Municipality" },
            { name: "Jahada Rural Municipality", type: "Rural Municipality" },
            { name: "Katahari Rural Municipality", type: "Rural Municipality" },
            { name: "Dhanpalthan Rural Municipality", type: "Rural Municipality" },
            { name: "Kerabari Rural Municipality", type: "Rural Municipality" },
            { name: "Miklajung Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Okhaldhunga", 
          localLevels: [
            { name: "Siddhicharan Municipality", type: "Municipality" },
            { name: "Manebhanjyang Rural Municipality", type: "Rural Municipality" },
            { name: "Sunkoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Molung Rural Municipality", type: "Rural Municipality" },
            { name: "Champadevi Rural Municipality", type: "Rural Municipality" },
            { name: "Chisankhugadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Khiji Demba Rural Municipality", type: "Rural Municipality" },
            { name: "Likhu Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Panchthar", 
          localLevels: [
            { name: "Phidim Municipality", type: "Municipality" },
            { name: "Phalelung Rural Municipality", type: "Rural Municipality" },
            { name: "Hilihang Rural Municipality", type: "Rural Municipality" },
            { name: "Kummayak Rural Municipality", type: "Rural Municipality" },
            { name: "Miklajung Rural Municipality", type: "Rural Municipality" },
            { name: "Tumbewa Rural Municipality", type: "Rural Municipality" },
            { name: "Yangwarak Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Sankhuwasabha", 
          localLevels: [
            { name: "Khandbari Municipality", type: "Municipality" },
            { name: "Chainpur Municipality", type: "Municipality" },
            { name: "Dharmadevi Municipality", type: "Municipality" },
            { name: "Madi Municipality", type: "Municipality" },
            { name: "Panchkhapan Municipality", type: "Municipality" },
            { name: "Bhotkhola Rural Municipality", type: "Rural Municipality" },
            { name: "Makalu Rural Municipality", type: "Rural Municipality" },
            { name: "Sabhapokhari Rural Municipality", type: "Rural Municipality" },
            { name: "Silichong Rural Municipality", type: "Rural Municipality" },
            { name: "Sisuwa Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Solukhumbu", 
          localLevels: [
            { name: "Solududhkunda Municipality", type: "Municipality" },
            { name: "Dudhkoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Necha Salyan Rural Municipality", type: "Rural Municipality" },
            { name: "Maha Kulung Rural Municipality", type: "Rural Municipality" },
            { name: "Sotang Rural Municipality", type: "Rural Municipality" },
            { name: "Khumbu Pasang Lhamu Rural Municipality", type: "Rural Municipality" },
            { name: "Likhu Pike Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Sunsari", 
          localLevels: [
            { name: "Itahari Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Dharan Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Inaruwa Municipality", type: "Municipality" },
            { name: "Duhabi Municipality", type: "Municipality" },
            { name: "Ramdhuni Municipality", type: "Municipality" },
            { name: "Barahachhetra Municipality", type: "Municipality" },
            { name: "Barju Rural Municipality", type: "Rural Municipality" },
            { name: "Koshi Rural Municipality", type: "Rural Municipality" },
            { name: "Harinagar Rural Municipality", type: "Rural Municipality" },
            { name: "Bhokraha Narsing Rural Municipality", type: "Rural Municipality" },
            { name: "Gadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Dewanganj Rural Municipality", type: "Rural Municipality" },
            { name: "Pakali Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Taplejung", 
          localLevels: [
            { name: "Phungling Municipality", type: "Municipality" },
            { name: "Phaktanglung Rural Municipality", type: "Rural Municipality" },
            { name: "Maiwakhola Rural Municipality", type: "Rural Municipality" },
            { name: "Meringden Rural Municipality", type: "Rural Municipality" },
            { name: "Sidingwa Rural Municipality", type: "Rural Municipality" },
            { name: "Aathrai Tribeni Rural Municipality", type: "Rural Municipality" },
            { name: "Mikwakhola Rural Municipality", type: "Rural Municipality" },
            { name: "Sirijangha Rural Municipality", type: "Rural Municipality" },
            { name: "Yangwarak Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Terhathum", 
          localLevels: [
            { name: "Myanglung Municipality", type: "Municipality" },
            { name: "Laligurans Municipality", type: "Municipality" },
            { name: "Aathrai Rural Municipality", type: "Rural Municipality" },
            { name: "Phedap Rural Municipality", type: "Rural Municipality" },
            { name: "Chhathar Rural Municipality", type: "Rural Municipality" },
            { name: "Menchhayayem Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Udayapur", 
          localLevels: [
            { name: "Triyuga Municipality", type: "Municipality" },
            { name: "Katari Municipality", type: "Municipality" },
            { name: "Chaudandigadhi Municipality", type: "Municipality" },
            { name: "Belaka Municipality", type: "Municipality" },
            { name: "Udayapurgadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Rautamai Rural Municipality", type: "Rural Municipality" },
            { name: "Sunkoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Tapli Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Madhesh",
      districts: [
        { 
          name: "Bara", 
          localLevels: [
            { name: "Kalaiya Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Jitpursimara Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Kolhabi Municipality", type: "Municipality" },
            { name: "Nijgadh Municipality", type: "Municipality" },
            { name: "Simraungadh Municipality", type: "Municipality" },
            { name: "Mahagadhimai Municipality", type: "Municipality" },
            { name: "Pacharauta Municipality", type: "Municipality" },
            { name: "Pheta Rural Municipality", type: "Rural Municipality" },
            { name: "Suwarna Rural Municipality", type: "Rural Municipality" },
            { name: "Baragadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Parwanipur Rural Municipality", type: "Rural Municipality" },
            { name: "Karaiyamai Rural Municipality", type: "Rural Municipality" },
            { name: "Prasauni Rural Municipality", type: "Rural Municipality" },
            { name: "Bishrampur Rural Municipality", type: "Rural Municipality" },
            { name: "Devtal Rural Municipality", type: "Rural Municipality" },
            { name: "Adarshkotwal Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Dhanusha", 
          localLevels: [
            { name: "Janakpur Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Chhireshwarnath Municipality", type: "Municipality" },
            { name: "Ganeshman Charnath Municipality", type: "Municipality" },
            { name: "Dhanusadham Municipality", type: "Municipality" },
            { name: "Nagarain Municipality", type: "Municipality" },
            { name: "Bideha Municipality", type: "Municipality" },
            { name: "Mithila Municipality", type: "Municipality" },
            { name: "Sahidnagar Municipality", type: "Municipality" },
            { name: "Sabaila Municipality", type: "Municipality" },
            { name: "Kamala Municipality", type: "Municipality" },
            { name: "Mithila Bihari Municipality", type: "Municipality" },
            { name: "Hansapur Municipality", type: "Municipality" },
            { name: "Janaknandini Rural Municipality", type: "Rural Municipality" },
            { name: "Bateshwor Rural Municipality", type: "Rural Municipality" },
            { name: "Mukhiyapatti Musarmiya Rural Municipality", type: "Rural Municipality" },
            { name: "Lakshminiya Rural Municipality", type: "Rural Municipality" },
            { name: "Aurahi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Mahottari", 
          localLevels: [
            { name: "Jaleshwar Municipality", type: "Municipality" },
            { name: "Bardibas Municipality", type: "Municipality" },
            { name: "Gaushala Municipality", type: "Municipality" },
            { name: "Loharpatti Municipality", type: "Municipality" },
            { name: "Manara Shiswa Municipality", type: "Municipality" },
            { name: "Matihani Municipality", type: "Municipality" },
            { name: "Ramgopalpur Municipality", type: "Municipality" },
            { name: "Ekdara Rural Municipality", type: "Rural Municipality" },
            { name: "Mahottari Rural Municipality", type: "Rural Municipality" },
            { name: "Pipra Rural Municipality", type: "Rural Municipality" },
            { name: "Samsi Rural Municipality", type: "Rural Municipality" },
            { name: "Sonama Rural Municipality", type: "Rural Municipality" },
            { name: "Aurahi Rural Municipality", type: "Rural Municipality" },
            { name: "Bhangaha Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Parsa", 
          localLevels: [
            { name: "Birgunj Metropolitan City", type: "Metro" },
            { name: "Bahudaramai Municipality", type: "Municipality" },
            { name: "Pokhariya Municipality", type: "Municipality" },
            { name: "Parsagadhi Municipality", type: "Municipality" },
            { name: "Paterwa Sugauli Municipality", type: "Municipality" },
            { name: "Dhobini Rural Municipality", type: "Rural Municipality" },
            { name: "Chhipaharmai Rural Municipality", type: "Rural Municipality" },
            { name: "Jagarnathpur Rural Municipality", type: "Rural Municipality" },
            { name: "Jirabhawani Rural Municipality", type: "Rural Municipality" },
            { name: "Kalikamai Rural Municipality", type: "Rural Municipality" },
            { name: "Pakaha Mainpur Rural Municipality", type: "Rural Municipality" },
            { name: "Thori Rural Municipality", type: "Rural Municipality" },
            { name: "Bindabasini Rural Municipality", type: "Rural Municipality" },
            { name: "Sakhuwa Prasauni Rural Municipality", type: "Rural Municipality" },
            { name: "Pakahamainpur Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Rautahat", 
          localLevels: [
            { name: "Gaur Municipality", type: "Municipality" },
            { name: "Chandrapur Municipality", type: "Municipality" },
            { name: "Garuda Municipality", type: "Municipality" },
            { name: "Baudhimai Municipality", type: "Municipality" },
            { name: "Rajpur Municipality", type: "Municipality" },
            { name: "Rajdevi Municipality", type: "Municipality" },
            { name: "Gujara Municipality", type: "Municipality" },
            { name: "Dewahhi Gonahi Municipality", type: "Municipality" },
            { name: "Brindaban Municipality", type: "Municipality" },
            { name: "Shivanagar Rural Municipality", type: "Rural Municipality" },
            { name: "Katahariya Rural Municipality", type: "Rural Municipality" },
            { name: "Madhav Narayan Rural Municipality", type: "Rural Municipality" },
            { name: "Phatuwa Bijayapur Rural Municipality", type: "Rural Municipality" },
            { name: "Ishwarpur Rural Municipality", type: "Rural Municipality" },
            { name: "Yamunamai Rural Municipality", type: "Rural Municipality" },
            { name: "Paroha Rural Municipality", type: "Rural Municipality" },
            { name: "Durga Bhagwati Rural Municipality", type: "Rural Municipality" },
            { name: "Gadhimai Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Saptari", 
          localLevels: [
            { name: "Rajbiraj Municipality", type: "Municipality" },
            { name: "Hanumannagar Kankalini Municipality", type: "Municipality" },
            { name: "Khadak Municipality", type: "Municipality" },
            { name: "Dakneshwori Municipality", type: "Municipality" },
            { name: "Surunga Municipality", type: "Municipality" },
            { name: "Saptakoshi Municipality", type: "Municipality" },
            { name: "Shambhunath Municipality", type: "Municipality" },
            { name: "Kanchanrup Municipality", type: "Municipality" },
            { name: "Tilathi Koiladi Rural Municipality", type: "Rural Municipality" },
            { name: "Tirahut Rural Municipality", type: "Rural Municipality" },
            { name: "Mahadeva Rural Municipality", type: "Rural Municipality" },
            { name: "Rupani Rural Municipality", type: "Rural Municipality" },
            { name: "Chhinnamasta Rural Municipality", type: "Rural Municipality" },
            { name: "Balan Bihul Rural Municipality", type: "Rural Municipality" },
            { name: "Bishnupur Rural Municipality", type: "Rural Municipality" },
            { name: "Rajgadh Rural Municipality", type: "Rural Municipality" },
            { name: "Kabilasi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Sarlahi", 
          localLevels: [
            { name: "Malangwa Municipality", type: "Municipality" },
            { name: "Lalbandi Municipality", type: "Municipality" },
            { name: "Hariwan Municipality", type: "Municipality" },
            { name: "Ishworpur Municipality", type: "Municipality" },
            { name: "Godaita Municipality", type: "Municipality" },
            { name: "Barahathawa Municipality", type: "Municipality" },
            { name: "Haripur Municipality", type: "Municipality" },
            { name: "Haripurwa Municipality", type: "Municipality" },
            { name: "Dhankaul Rural Municipality", type: "Rural Municipality" },
            { name: "Kaudena Rural Municipality", type: "Rural Municipality" },
            { name: "Basbariya Rural Municipality", type: "Rural Municipality" },
            { name: "Bramhapuri Rural Municipality", type: "Rural Municipality" },
            { name: "Ramnagar Rural Municipality", type: "Rural Municipality" },
            { name: "Chandranagar Rural Municipality", type: "Rural Municipality" },
            { name: "Kabilasi Rural Municipality", type: "Rural Municipality" },
            { name: "Parsa Rural Municipality", type: "Rural Municipality" },
            { name: "Chakraghatta Rural Municipality", type: "Rural Municipality" },
            { name: "Bagmati Rural Municipality", type: "Rural Municipality" },
            { name: "Bishnu Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Siraha", 
          localLevels: [
            { name: "Lahan Municipality", type: "Municipality" },
            { name: "Siraha Municipality", type: "Municipality" },
            { name: "Dhangadhimai Municipality", type: "Municipality" },
            { name: "Mirchaiya Municipality", type: "Municipality" },
            { name: "Golbazar Municipality", type: "Municipality" },
            { name: "Kalyanpur Municipality", type: "Municipality" },
            { name: "Karjanha Municipality", type: "Municipality" },
            { name: "Sukhipur Municipality", type: "Municipality" },
            { name: "Bhagwanpur Rural Municipality", type: "Rural Municipality" },
            { name: "Aurahi Rural Municipality", type: "Rural Municipality" },
            { name: "Bishnupur Rural Municipality", type: "Rural Municipality" },
            { name: "Bariyarpatti Rural Municipality", type: "Rural Municipality" },
            { name: "Laxmipur Patari Rural Municipality", type: "Rural Municipality" },
            { name: "Naraha Rural Municipality", type: "Rural Municipality" },
            { name: "Sakhuwanankarkatti Rural Municipality", type: "Rural Municipality" },
            { name: "Arnama Rural Municipality", type: "Rural Municipality" },
            { name: "Nawarajpur Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Bagmati",
      districts: [
        { 
          name: "Bhaktapur", 
          localLevels: [
            { name: "Bhaktapur Municipality", type: "Municipality" },
            { name: "Madhyapur Thimi Municipality", type: "Municipality" },
            { name: "Changunarayan Municipality", type: "Municipality" },
            { name: "Suryabinayak Municipality", type: "Municipality" }
          ]
        },
        { 
          name: "Dhading", 
          localLevels: [
            { name: "Nilkantha Municipality", type: "Municipality" },
            { name: "Dhunibesi Municipality", type: "Municipality" },
            { name: "Khaniyabas Rural Municipality", type: "Rural Municipality" },
            { name: "Gajuri Rural Municipality", type: "Rural Municipality" },
            { name: "Galchi Rural Municipality", type: "Rural Municipality" },
            { name: "Gangajamuna Rural Municipality", type: "Rural Municipality" },
            { name: "Jwalamukhi Rural Municipality", type: "Rural Municipality" },
            { name: "Maidi Rural Municipality", type: "Rural Municipality" },
            { name: "Netrawati Rural Municipality", type: "Rural Municipality" },
            { name: "Siddhalek Rural Municipality", type: "Rural Municipality" },
            { name: "Thakre Rural Municipality", type: "Rural Municipality" },
            { name: "Tripurasundari Rural Municipality", type: "Rural Municipality" },
            { name: "Benighat Rorang Rural Municipality", type: "Rural Municipality" },
            { name: "Rubi Valley Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kavrepalanchok", 
          localLevels: [
            { name: "Banepa Municipality", type: "Municipality" },
            { name: "Panauti Municipality", type: "Municipality" },
            { name: "Panchkhal Municipality", type: "Municipality" },
            { name: "Namobuddha Municipality", type: "Municipality" },
            { name: "Mandandeupur Municipality", type: "Municipality" },
            { name: "Dhulikhel Municipality", type: "Municipality" },
            { name: "Bethanchok Rural Municipality", type: "Rural Municipality" },
            { name: "Bhumlu Rural Municipality", type: "Rural Municipality" },
            { name: "Chaurideurali Rural Municipality", type: "Rural Municipality" },
            { name: "Khanikhola Rural Municipality", type: "Rural Municipality" },
            { name: "Mahabharat Rural Municipality", type: "Rural Municipality" },
            { name: "Roshi Rural Municipality", type: "Rural Municipality" },
            { name: "Temal Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kathmandu", 
          localLevels: [
            { name: "Kathmandu Metropolitan City", type: "Metro" },
            { name: "Kirtipur Municipality", type: "Municipality" },
            { name: "Tokha Municipality", type: "Municipality" },
            { name: "Tarakeshwar Municipality", type: "Municipality" },
            { name: "Dakshinkali Municipality", type: "Municipality" },
            { name: "Nagarkot Municipality", type: "Municipality" },
            { name: "Kageshwari Manohara Municipality", type: "Municipality" },
            { name: "Budhanilkantha Municipality", type: "Municipality" },
            { name: "Gokarneshwar Municipality", type: "Municipality" },
            { name: "Chandragiri Municipality", type: "Municipality" },
            { name: "Shankharapur Municipality", type: "Municipality" }
          ]
        },
        { 
          name: "Lalitpur", 
          localLevels: [
            { name: "Lalitpur Metropolitan City", type: "Metro" },
            { name: "Godawari Municipality", type: "Municipality" },
            { name: "Konjyosom Rural Municipality", type: "Rural Municipality" },
            { name: "Bagmati Rural Municipality", type: "Rural Municipality" },
            { name: "Mahankal Rural Municipality", type: "Rural Municipality" },
            { name: "Mahalaxmi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Nuwakot", 
          localLevels: [
            { name: "Bidur Municipality", type: "Municipality" },
            { name: "Belkotgadhi Municipality", type: "Municipality" },
            { name: "Kakani Rural Municipality", type: "Rural Municipality" },
            { name: "Kispang Rural Municipality", type: "Rural Municipality" },
            { name: "Likhu Rural Municipality", type: "Rural Municipality" },
            { name: "Meghangunj Rural Municipality", type: "Rural Municipality" },
            { name: "Panchakanya Rural Municipality", type: "Rural Municipality" },
            { name: "Shivapuri Rural Municipality", type: "Rural Municipality" },
            { name: "Tadi Rural Municipality", type: "Rural Municipality" },
            { name: "Tarkeshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Dupcheshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Suryagadhi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Rasuwa", 
          localLevels: [
            { name: "Dhunche Municipality", type: "Municipality" },
            { name: "Gosaikunda Rural Municipality", type: "Rural Municipality" },
            { name: "Kalika Rural Municipality", type: "Rural Municipality" },
            { name: "Naukunda Rural Municipality", type: "Rural Municipality" },
            { name: "Parbatikunda Rural Municipality", type: "Rural Municipality" },
            { name: "Uttargaya Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Sindhuli", 
          localLevels: [
            { name: "Kamalamai Municipality", type: "Municipality" },
            { name: "Dudhauli Municipality", type: "Municipality" },
            { name: "Sunkoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Marin Rural Municipality", type: "Rural Municipality" },
            { name: "Hariharpurgadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Tinpatan Rural Municipality", type: "Rural Municipality" },
            { name: "Indreshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Golanjor Rural Municipality", type: "Rural Municipality" },
            { name: "Ghyanglekh Rural Municipality", type: "Rural Municipality" },
            { name: "Phikkal Rural Municipality", type: "Rural Municipality" },
            { name: "Sunapati Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Sindhupalchok", 
          localLevels: [
            { name: "Chautara Sangachokgadhi Municipality", type: "Municipality" },
            { name: "Bahrabise Municipality", type: "Municipality" },
            { name: "Melamchi Municipality", type: "Municipality" },
            { name: "Barhabise Municipality", type: "Municipality" },
            { name: "Sunkoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Helambu Rural Municipality", type: "Rural Municipality" },
            { name: "Panchpokhari Thangpal Rural Municipality", type: "Rural Municipality" },
            { name: "Bhotekoshi Rural Municipality", type: "Rural Municipality" },
            { name: "Lisankhu Pakhar Rural Municipality", type: "Rural Municipality" },
            { name: "Indrawati Rural Municipality", type: "Rural Municipality" },
            { name: "Jugal Rural Municipality", type: "Rural Municipality" },
            { name: "Balephi Rural Municipality", type: "Rural Municipality" },
            { name: "Tripurasundari Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Gandaki",
      districts: [
        { 
          name: "Baglung", 
          localLevels: [
            { name: "Baglung Municipality", type: "Municipality" },
            { name: "Galkot Municipality", type: "Municipality" },
            { name: "Jaimuni Municipality", type: "Municipality" },
            { name: "Dhorpatan Municipality", type: "Municipality" },
            { name: "Bareng Rural Municipality", type: "Rural Municipality" },
            { name: "Kathekhola Rural Municipality", type: "Rural Municipality" },
            { name: "Taman Khola Rural Municipality", type: "Rural Municipality" },
            { name: "Tara Khola Rural Municipality", type: "Rural Municipality" },
            { name: "Nisikhola Rural Municipality", type: "Rural Municipality" },
            { name: "Badigad Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Gorkha", 
          localLevels: [
            { name: "Gorkha Municipality", type: "Municipality" },
            { name: "Palungtar Municipality", type: "Municipality" },
            { name: "Sulikot Rural Municipality", type: "Rural Municipality" },
            { name: "Siranchok Rural Municipality", type: "Rural Municipality" },
            { name: "Ajirkot Rural Municipality", type: "Rural Municipality" },
            { name: "Arughat Rural Municipality", type: "Rural Municipality" },
            { name: "Gandaki Rural Municipality", type: "Rural Municipality" },
            { name: "Chum Nubri Rural Municipality", type: "Rural Municipality" },
            { name: "Dharche Rural Municipality", type: "Rural Municipality" },
            { name: "Bhimsen Rural Municipality", type: "Rural Municipality" },
            { name: "Shahid Lakhan Rural Municipality", type: "Rural Municipality" },
            { name: "Sahid Lakhan Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kaski", 
          localLevels: [
            { name: "Pokhara Metropolitan City", type: "Metro" },
            { name: "Annapurna Rural Municipality", type: "Rural Municipality" },
            { name: "Machhapuchchhre Rural Municipality", type: "Rural Municipality" },
            { name: "Madi Rural Municipality", type: "Rural Municipality" },
            { name: "Rupa Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Lamjung", 
          localLevels: [
            { name: "Besisahar Municipality", type: "Municipality" },
            { name: "Sundarbazar Municipality", type: "Municipality" },
            { name: "Madhya Nepal Municipality", type: "Municipality" },
            { name: "Rainas Municipality", type: "Municipality" },
            { name: "Dordi Rural Municipality", type: "Rural Municipality" },
            { name: "Dudhpokhari Rural Municipality", type: "Rural Municipality" },
            { name: "Kwholasothar Rural Municipality", type: "Rural Municipality" },
            { name: "Marsyangdi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Manang", 
          localLevels: [
            { name: "Chame Rural Municipality", type: "Rural Municipality" },
            { name: "Narpa Bhumi Rural Municipality", type: "Rural Municipality" },
            { name: "Neshyang Rural Municipality", type: "Rural Municipality" },
            { name: "Narphu Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Mustang", 
          localLevels: [
            { name: "Lomanthang Rural Municipality", type: "Rural Municipality" },
            { name: "Lo-Ghekar Damodarkunda Rural Municipality", type: "Rural Municipality" },
            { name: "Dalome Rural Municipality", type: "Rural Municipality" },
            { name: "Thasang Rural Municipality", type: "Rural Municipality" },
            { name: "Gharapjhong Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Myagdi", 
          localLevels: [
            { name: "Beni Municipality", type: "Municipality" },
            { name: "Annapurna Rural Municipality", type: "Rural Municipality" },
            { name: "Dhaulagiri Rural Municipality", type: "Rural Municipality" },
            { name: "Malika Rural Municipality", type: "Rural Municipality" },
            { name: "Mangala Rural Municipality", type: "Rural Municipality" },
            { name: "Raghuganga Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Nawalpur", 
          localLevels: [
            { name: "Kawasoti Municipality", type: "Municipality" },
            { name: "Gaindakot Municipality", type: "Municipality" },
            { name: "Madhyabindu Municipality", type: "Municipality" },
            { name: "Devchuli Municipality", type: "Municipality" },
            { name: "Baudikali Rural Municipality", type: "Rural Municipality" },
            { name: "Hupsekot Rural Municipality", type: "Rural Municipality" },
            { name: "Binayi Tribeni Rural Municipality", type: "Rural Municipality" },
            { name: "Bulingtar Rural Municipality", type: "Rural Municipality" },
            { name: "Devchuli Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Parbat", 
          localLevels: [
            { name: "Kushma Municipality", type: "Municipality" },
            { name: "Phalebas Municipality", type: "Municipality" },
            { name: "Jaljala Rural Municipality", type: "Rural Municipality" },
            { name: "Paiyun Rural Municipality", type: "Rural Municipality" },
            { name: "Mahashila Rural Municipality", type: "Rural Municipality" },
            { name: "Modi Rural Municipality", type: "Rural Municipality" },
            { name: "Bihadi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Syangja", 
          localLevels: [
            { name: "Putalibazar Municipality", type: "Municipality" },
            { name: "Waling Municipality", type: "Municipality" },
            { name: "Galyang Municipality", type: "Municipality" },
            { name: "Chapakot Municipality", type: "Municipality" },
            { name: "Bhirkot Municipality", type: "Municipality" },
            { name: "Arjun Chaupari Rural Municipality", type: "Rural Municipality" },
            { name: "Phedikhola Rural Municipality", type: "Rural Municipality" },
            { name: "Kaligandaki Rural Municipality", type: "Rural Municipality" },
            { name: "Harinas Rural Municipality", type: "Rural Municipality" },
            { name: "Aandhikhola Rural Municipality", type: "Rural Municipality" },
            { name: "Bheerkot Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Tanahun", 
          localLevels: [
            { name: "Damauli Municipality", type: "Municipality" },
            { name: "Shuklagandaki Municipality", type: "Municipality" },
            { name: "Bhanu Municipality", type: "Municipality" },
            { name: "Bhimad Municipality", type: "Municipality" },
            { name: "Byas Municipality", type: "Municipality" },
            { name: "Vyas Municipality", type: "Municipality" },
            { name: "Rishing Rural Municipality", type: "Rural Municipality" },
            { name: "Ghiring Rural Municipality", type: "Rural Municipality" },
            { name: "Devghat Rural Municipality", type: "Rural Municipality" },
            { name: "Bandipur Rural Municipality", type: "Rural Municipality" },
            { name: "Myagde Rural Municipality", type: "Rural Municipality" },
            { name: "Rhishing Rural Municipality", type: "Rural Municipality" },
            { name: "Aanbu Khaireni Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Lumbini",
      districts: [
        { 
          name: "Arghakhanchi", 
          localLevels: [
            { name: "Sandhikharka Municipality", type: "Municipality" },
            { name: "Bhumikasthan Municipality", type: "Municipality" },
            { name: "Chhatradev Rural Municipality", type: "Rural Municipality" },
            { name: "Malarani Rural Municipality", type: "Rural Municipality" },
            { name: "Panini Rural Municipality", type: "Rural Municipality" },
            { name: "Sitganga Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Banke", 
          localLevels: [
            { name: "Nepalgunj Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Kohalpur Municipality", type: "Municipality" },
            { name: "Narainapur Rural Municipality", type: "Rural Municipality" },
            { name: "Rapti Sonari Rural Municipality", type: "Rural Municipality" },
            { name: "Baijanath Rural Municipality", type: "Rural Municipality" },
            { name: "Khajura Rural Municipality", type: "Rural Municipality" },
            { name: "Janaki Rural Municipality", type: "Rural Municipality" },
            { name: "Duduwa Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Bardiya", 
          localLevels: [
            { name: "Gulariya Municipality", type: "Municipality" },
            { name: "Rajapur Municipality", type: "Municipality" },
            { name: "Madhuwan Municipality", type: "Municipality" },
            { name: "Thakurbaba Municipality", type: "Municipality" },
            { name: "Bansgadhi Municipality", type: "Municipality" },
            { name: "Barbardiya Municipality", type: "Municipality" },
            { name: "Geruwa Rural Municipality", type: "Rural Municipality" },
            { name: "Badhaiyatal Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Dang", 
          localLevels: [
            { name: "Ghorahi Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Tulsipur Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Lamahi Municipality", type: "Municipality" },
            { name: "Gadhawa Rural Municipality", type: "Rural Municipality" },
            { name: "Rapti Rural Municipality", type: "Rural Municipality" },
            { name: "Rajpur Rural Municipality", type: "Rural Municipality" },
            { name: "Dangisharan Rural Municipality", type: "Rural Municipality" },
            { name: "Shantinagar Rural Municipality", type: "Rural Municipality" },
            { name: "Banglachuli Rural Municipality", type: "Rural Municipality" },
            { name: "Babai Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Eastern Rukum", 
          localLevels: [
            { name: "Rukumkot Rural Municipality", type: "Rural Municipality" },
            { name: "Putha Uttarganga Rural Municipality", type: "Rural Municipality" },
            { name: "Sisne Rural Municipality", type: "Rural Municipality" },
            { name: "Bhume Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Gulmi", 
          localLevels: [
            { name: "Resunga Municipality", type: "Municipality" },
            { name: "Tamghas Municipality", type: "Municipality" },
            { name: "Satyawati Rural Municipality", type: "Rural Municipality" },
            { name: "Dhurkot Rural Municipality", type: "Rural Municipality" },
            { name: "Gulmi Darbar Rural Municipality", type: "Rural Municipality" },
            { name: "Madane Rural Municipality", type: "Rural Municipality" },
            { name: "Chandrakot Rural Municipality", type: "Rural Municipality" },
            { name: "Malika Rural Municipality", type: "Rural Municipality" },
            { name: "Chhatrakot Rural Municipality", type: "Rural Municipality" },
            { name: "Isma Rural Municipality", type: "Rural Municipality" },
            { name: "Kaligandaki Rural Municipality", type: "Rural Municipality" },
            { name: "Ruru Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kapilvastu", 
          localLevels: [
            { name: "Kapilvastu Municipality", type: "Municipality" },
            { name: "Buddhabhumi Municipality", type: "Municipality" },
            { name: "Shivaraj Municipality", type: "Municipality" },
            { name: "Maharajgunj Municipality", type: "Municipality" },
            { name: "Krishnanagar Municipality", type: "Municipality" },
            { name: "Yashodhara Rural Municipality", type: "Rural Municipality" },
            { name: "Bijayanagar Rural Municipality", type: "Rural Municipality" },
            { name: "Mayadevi Rural Municipality", type: "Rural Municipality" },
            { name: "Suddhodhan Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Nawalparasi East", 
          localLevels: [
            { name: "Kawasoti Municipality", type: "Municipality" },
            { name: "Gaindakot Municipality", type: "Municipality" },
            { name: "Madhyabindu Municipality", type: "Municipality" },
            { name: "Devchuli Municipality", type: "Municipality" },
            { name: "Baudikali Rural Municipality", type: "Rural Municipality" },
            { name: "Hupsekot Rural Municipality", type: "Rural Municipality" },
            { name: "Binayi Tribeni Rural Municipality", type: "Rural Municipality" },
            { name: "Bulingtar Rural Municipality", type: "Rural Municipality" },
            { name: "Devchuli Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Nawalparasi West", 
          localLevels: [
            { name: "Ramgram Municipality", type: "Municipality" },
            { name: "Sunwal Municipality", type: "Municipality" },
            { name: "Bardaghat Municipality", type: "Municipality" },
            { name: "Pratappur Rural Municipality", type: "Rural Municipality" },
            { name: "Sarawal Rural Municipality", type: "Rural Municipality" },
            { name: "Palhi Nandan Rural Municipality", type: "Rural Municipality" },
            { name: "Susta Rural Municipality", type: "Rural Municipality" },
            { name: "Mayadevi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Palpa", 
          localLevels: [
            { name: "Tansen Municipality", type: "Municipality" },
            { name: "Rampur Municipality", type: "Municipality" },
            { name: "Rambha Rural Municipality", type: "Rural Municipality" },
            { name: "Mathagadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Nisdi Rural Municipality", type: "Rural Municipality" },
            { name: "Purbakhola Rural Municipality", type: "Rural Municipality" },
            { name: "Rainadevi Chhahara Rural Municipality", type: "Rural Municipality" },
            { name: "Ribdikot Rural Municipality", type: "Rural Municipality" },
            { name: "Bagnaskali Rural Municipality", type: "Rural Municipality" },
            { name: "Tinau Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Parasi", 
          localLevels: [
            { name: "Ramgram Municipality", type: "Municipality" },
            { name: "Sunwal Municipality", type: "Municipality" },
            { name: "Bardaghat Municipality", type: "Municipality" },
            { name: "Pratappur Rural Municipality", type: "Rural Municipality" },
            { name: "Sarawal Rural Municipality", type: "Rural Municipality" },
            { name: "Palhi Nandan Rural Municipality", type: "Rural Municipality" },
            { name: "Susta Rural Municipality", type: "Rural Municipality" },
            { name: "Mayadevi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Pyuthan", 
          localLevels: [
            { name: "Pyuthan Municipality", type: "Municipality" },
            { name: "Swargadwari Municipality", type: "Municipality" },
            { name: "Mallarani Rural Municipality", type: "Rural Municipality" },
            { name: "Mandavi Rural Municipality", type: "Rural Municipality" },
            { name: "Sarumarani Rural Municipality", type: "Rural Municipality" },
            { name: "Jhimruk Rural Municipality", type: "Rural Municipality" },
            { name: "Gaumukhi Rural Municipality", type: "Rural Municipality" },
            { name: "Naubahini Rural Municipality", type: "Rural Municipality" },
            { name: "Aairawati Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Rolpa", 
          localLevels: [
            { name: "Liwang Municipality", type: "Municipality" },
            { name: "Tribeni Rural Municipality", type: "Rural Municipality" },
            { name: "Dui Rural Municipality", type: "Rural Municipality" },
            { name: "Madi Rural Municipality", type: "Rural Municipality" },
            { name: "Runtigadhi Rural Municipality", type: "Rural Municipality" },
            { name: "Sunchhahari Rural Municipality", type: "Rural Municipality" },
            { name: "Thabang Rural Municipality", type: "Rural Municipality" },
            { name: "Sukidaha Rural Municipality", type: "Rural Municipality" },
            { name: "Pariwartan Rural Municipality", type: "Rural Municipality" },
            { name: "Lungri Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Rupandehi", 
          localLevels: [
            { name: "Siddharthanagar Municipality", type: "Municipality" },
            { name: "Butwal Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Devdaha Municipality", type: "Municipality" },
            { name: "Lumbini Sanskritik Municipality", type: "Municipality" },
            { name: "Sainamaina Municipality", type: "Municipality" },
            { name: "Tilottama Municipality", type: "Municipality" },
            { name: "Gothgaun Rural Municipality", type: "Rural Municipality" },
            { name: "Kotahimai Rural Municipality", type: "Rural Municipality" },
            { name: "Marchawari Rural Municipality", type: "Rural Municipality" },
            { name: "Mayadevi Rural Municipality", type: "Rural Municipality" },
            { name: "Omsatiya Rural Municipality", type: "Rural Municipality" },
            { name: "Rohini Rural Municipality", type: "Rural Municipality" },
            { name: "Sammarimai Rural Municipality", type: "Rural Municipality" },
            { name: "Siyari Rural Municipality", type: "Rural Municipality" },
            { name: "Sudhdhodhan Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Karnali",
      districts: [
        { 
          name: "Dailekh", 
          localLevels: [
            { name: "Narayan Municipality", type: "Municipality" },
            { name: "Dullu Municipality", type: "Municipality" },
            { name: "Aathabis Municipality", type: "Municipality" },
            { name: "Chamunda Bindrasaini Municipality", type: "Municipality" },
            { name: "Gurans Rural Municipality", type: "Rural Municipality" },
            { name: "Bhairabi Rural Municipality", type: "Rural Municipality" },
            { name: "Naumule Rural Municipality", type: "Rural Municipality" },
            { name: "Mahabu Rural Municipality", type: "Rural Municipality" },
            { name: "Dungeshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Bhagawatimai Rural Municipality", type: "Rural Municipality" },
            { name: "Thantikandh Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Dolpa", 
          localLevels: [
            { name: "Thuli Bheri Municipality", type: "Municipality" },
            { name: "Tripurasundari Municipality", type: "Municipality" },
            { name: "Dolpo Buddha Rural Municipality", type: "Rural Municipality" },
            { name: "She Phoksundo Rural Municipality", type: "Rural Municipality" },
            { name: "Jagadulla Rural Municipality", type: "Rural Municipality" },
            { name: "Mudkechula Rural Municipality", type: "Rural Municipality" },
            { name: "Kaike Rural Municipality", type: "Rural Municipality" },
            { name: "Chharka Tangsong Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Humla", 
          localLevels: [
            { name: "Simkot Rural Municipality", type: "Rural Municipality" },
            { name: "Sarkegad Rural Municipality", type: "Rural Municipality" },
            { name: "Kharpunath Rural Municipality", type: "Rural Municipality" },
            { name: "Chankheli Rural Municipality", type: "Rural Municipality" },
            { name: "Namkha Rural Municipality", type: "Rural Municipality" },
            { name: "Adanchuli Rural Municipality", type: "Rural Municipality" },
            { name: "Tajakot Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Jajarkot", 
          localLevels: [
            { name: "Bheri Municipality", type: "Municipality" },
            { name: "Nalgad Municipality", type: "Municipality" },
            { name: "Barekot Rural Municipality", type: "Rural Municipality" },
            { name: "Kuse Rural Municipality", type: "Rural Municipality" },
            { name: "Shivalaya Rural Municipality", type: "Rural Municipality" },
            { name: "Junichande Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Jumla", 
          localLevels: [
            { name: "Chandannath Municipality", type: "Municipality" },
            { name: "Kankasundari Rural Municipality", type: "Rural Municipality" },
            { name: "Sinja Rural Municipality", type: "Rural Municipality" },
            { name: "Hima Rural Municipality", type: "Rural Municipality" },
            { name: "Tila Rural Municipality", type: "Rural Municipality" },
            { name: "Guthichaur Rural Municipality", type: "Rural Municipality" },
            { name: "Tatopani Rural Municipality", type: "Rural Municipality" },
            { name: "Patarasi Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kalikot", 
          localLevels: [
            { name: "Khandachakra Municipality", type: "Municipality" },
            { name: "Raskot Municipality", type: "Municipality" },
            { name: "Tilagufa Municipality", type: "Municipality" },
            { name: "Pachaljharana Rural Municipality", type: "Rural Municipality" },
            { name: "Sanni Triveni Rural Municipality", type: "Rural Municipality" },
            { name: "Naraharinath Rural Municipality", type: "Rural Municipality" },
            { name: "Mahawai Rural Municipality", type: "Rural Municipality" },
            { name: "Shubha Kalika Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Mugu", 
          localLevels: [
            { name: "Chhayanath Rara Municipality", type: "Municipality" },
            { name: "Soru Rural Municipality", type: "Rural Municipality" },
            { name: "Khatyad Rural Municipality", type: "Rural Municipality" },
            { name: "Mugum Karmarong Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Salyan", 
          localLevels: [
            { name: "Shaarda Municipality", type: "Municipality" },
            { name: "Bagchaur Municipality", type: "Municipality" },
            { name: "Bangad Kupinde Municipality", type: "Municipality" },
            { name: "Tribeni Rural Municipality", type: "Rural Municipality" },
            { name: "Kapurkot Rural Municipality", type: "Rural Municipality" },
            { name: "Chhatreshwari Rural Municipality", type: "Rural Municipality" },
            { name: "Siddha Kumakh Rural Municipality", type: "Rural Municipality" },
            { name: "Kalimati Rural Municipality", type: "Rural Municipality" },
            { name: "Darma Rural Municipality", type: "Rural Municipality" },
            { name: "Dhorchaur Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Surkhet", 
          localLevels: [
            { name: "Birendranagar Municipality", type: "Municipality" },
            { name: "Bheriganga Municipality", type: "Municipality" },
            { name: "Gurbhakot Municipality", type: "Municipality" },
            { name: "Panchapuri Municipality", type: "Municipality" },
            { name: "Lekbeshi Municipality", type: "Municipality" },
            { name: "Barahatal Rural Municipality", type: "Rural Municipality" },
            { name: "Chaukune Rural Municipality", type: "Rural Municipality" },
            { name: "Chingad Rural Municipality", type: "Rural Municipality" },
            { name: "Simta Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Western Rukum", 
          localLevels: [
            { name: "Musikot Municipality", type: "Municipality" },
            { name: "Chaurjahari Municipality", type: "Municipality" },
            { name: "Aathbiskot Municipality", type: "Municipality" },
            { name: "Banfikot Rural Municipality", type: "Rural Municipality" },
            { name: "Sani Bheri Rural Municipality", type: "Rural Municipality" },
            { name: "Triveni Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    },
    {
      name: "Sudurpaschim",
      districts: [
        { 
          name: "Achham", 
          localLevels: [
            { name: "Mangalsen Municipality", type: "Municipality" },
            { name: "Kamalbazar Municipality", type: "Municipality" },
            { name: "Sanfebagar Municipality", type: "Municipality" },
            { name: "Panchadewal Binayak Municipality", type: "Municipality" },
            { name: "Chaurpati Rural Municipality", type: "Rural Municipality" },
            { name: "Turmakhand Rural Municipality", type: "Rural Municipality" },
            { name: "Ramaroshan Rural Municipality", type: "Rural Municipality" },
            { name: "Dhakari Rural Municipality", type: "Rural Municipality" },
            { name: "Mellekh Rural Municipality", type: "Rural Municipality" },
            { name: "Bannigadhi Jayagadh Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Baitadi", 
          localLevels: [
            { name: "Dasharathchand Municipality", type: "Municipality" },
            { name: "Patan Municipality", type: "Municipality" },
            { name: "Melauli Municipality", type: "Municipality" },
            { name: "Purchaudi Municipality", type: "Municipality" },
            { name: "Sigas Rural Municipality", type: "Rural Municipality" },
            { name: "Shivanath Rural Municipality", type: "Rural Municipality" },
            { name: "Pancheshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Dogdakedar Rural Municipality", type: "Rural Municipality" },
            { name: "Surnaya Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Bajhang", 
          localLevels: [
            { name: "Chainpur Municipality", type: "Municipality" },
            { name: "Jaya Prithvi Municipality", type: "Municipality" },
            { name: "Bungal Municipality", type: "Municipality" },
            { name: "Talkot Rural Municipality", type: "Rural Municipality" },
            { name: "Masta Rural Municipality", type: "Rural Municipality" },
            { name: "Khaptad Chhanna Rural Municipality", type: "Rural Municipality" },
            { name: "Thalara Rural Municipality", type: "Rural Municipality" },
            { name: "Bitthadchir Rural Municipality", type: "Rural Municipality" },
            { name: "Surma Rural Municipality", type: "Rural Municipality" },
            { name: "Chhabis Pathibhera Rural Municipality", type: "Rural Municipality" },
            { name: "Durgathali Rural Municipality", type: "Rural Municipality" },
            { name: "Kedarsyu Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Bajura", 
          localLevels: [
            { name: "Martadi Municipality", type: "Municipality" },
            { name: "Badimalika Municipality", type: "Municipality" },
            { name: "Tribeni Municipality", type: "Municipality" },
            { name: "Budhiganga Municipality", type: "Municipality" },
            { name: "Budhinanda Municipality", type: "Municipality" },
            { name: "Gaumul Rural Municipality", type: "Rural Municipality" },
            { name: "Himali Rural Municipality", type: "Rural Municipality" },
            { name: "Swami Kartik Khapar Rural Municipality", type: "Rural Municipality" },
            { name: "Jagannath Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Dadeldhura", 
          localLevels: [
            { name: "Amargadhi Municipality", type: "Municipality" },
            { name: "Parshuram Municipality", type: "Municipality" },
            { name: "Nawadurga Rural Municipality", type: "Rural Municipality" },
            { name: "Ajaymeru Rural Municipality", type: "Rural Municipality" },
            { name: "Ganyapadhura Rural Municipality", type: "Rural Municipality" },
            { name: "Bhageshwar Rural Municipality", type: "Rural Municipality" },
            { name: "Navadurga Rural Municipality", type: "Rural Municipality" },
            { name: "Alital Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Darchula", 
          localLevels: [
            { name: "Shailyashikhar Municipality", type: "Municipality" },
            { name: "Mahakali Municipality", type: "Municipality" },
            { name: "Malikarjun Rural Municipality", type: "Rural Municipality" },
            { name: "Apihimal Rural Municipality", type: "Rural Municipality" },
            { name: "Duhun Rural Municipality", type: "Rural Municipality" },
            { name: "Naugad Rural Municipality", type: "Rural Municipality" },
            { name: "Marma Rural Municipality", type: "Rural Municipality" },
            { name: "Lekam Rural Municipality", type: "Rural Municipality" },
            { name: "Byas Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Doti", 
          localLevels: [
            { name: "Dipayal Silgadhi Municipality", type: "Municipality" },
            { name: "Shikhar Municipality", type: "Municipality" },
            { name: "Purbichauki Rural Municipality", type: "Rural Municipality" },
            { name: "Badikedar Rural Municipality", type: "Rural Municipality" },
            { name: "Jorayal Rural Municipality", type: "Rural Municipality" },
            { name: "Sayal Rural Municipality", type: "Rural Municipality" },
            { name: "Adarsha Rural Municipality", type: "Rural Municipality" },
            { name: "K I Singh Rural Municipality", type: "Rural Municipality" },
            { name: "Bogatan Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kailali", 
          localLevels: [
            { name: "Dhangadhi Sub-Metropolitan City", type: "Sub-Metro" },
            { name: "Tikapur Municipality", type: "Municipality" },
            { name: "Ghodaghodi Municipality", type: "Municipality" },
            { name: "Lamki Chuha Municipality", type: "Municipality" },
            { name: "Bhajani Municipality", type: "Municipality" },
            { name: "Godawari Municipality", type: "Municipality" },
            { name: "Gauriganga Municipality", type: "Municipality" },
            { name: "Janaki Rural Municipality", type: "Rural Municipality" },
            { name: "Bardagoriya Rural Municipality", type: "Rural Municipality" },
            { name: "Mohanyal Rural Municipality", type: "Rural Municipality" },
            { name: "Joshipur Rural Municipality", type: "Rural Municipality" },
            { name: "Kailari Rural Municipality", type: "Rural Municipality" },
            { name: "Chure Rural Municipality", type: "Rural Municipality" }
          ]
        },
        { 
          name: "Kanchanpur", 
          localLevels: [
            { name: "Bhimdatta Municipality", type: "Municipality" },
            { name: "Punarbas Municipality", type: "Municipality" },
            { name: "Bedkot Municipality", type: "Municipality" },
            { name: "Shuklaphanta Municipality", type: "Municipality" },
            { name: "Belauri Municipality", type: "Municipality" },
            { name: "Krishnapur Municipality", type: "Municipality" },
            { name: "Laljhadi Rural Municipality", type: "Rural Municipality" },
            { name: "Mahakali Rural Municipality", type: "Rural Municipality" },
            { name: "Parshuram Rural Municipality", type: "Rural Municipality" },
            { name: "Dodhara Chandani Rural Municipality", type: "Rural Municipality" }
          ]
        }
      ]
    }
  ];
  
  // Helper functions for cascading dropdowns
  export const getDistrictsByProvince = (provinceName: string): District[] => {
    const province = provinces.find(p => p.name === provinceName);
    return province ? province.districts : [];
  };
  
  export const getLocalLevelsByDistrict = (provinceName: string, districtName: string): LocalLevel[] => {
    const province = provinces.find(p => p.name === provinceName);
    if (!province) return [];
    
    const district = province.districts.find(d => d.name === districtName);
    return district ? district.localLevels : [];
  };
  
  // Get all provinces
  export const getAllProvinces = (): string[] => {
    return provinces.map(p => p.name);
  };
  
  // Get all districts
  export const getAllDistricts = (): string[] => {
    return provinces.flatMap(p => p.districts.map(d => d.name));
  };
  
  // Get districts by province name
  export const getDistrictNamesByProvince = (provinceName: string): string[] => {
    const province = provinces.find(p => p.name === provinceName);
    return province ? province.districts.map(d => d.name) : [];
  }; 