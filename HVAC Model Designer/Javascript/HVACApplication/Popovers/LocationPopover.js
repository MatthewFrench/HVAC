/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Location Popover code that will allow a user to input Information about their Location
 * for calculating the U Value
 */

var stateData = {"Alabama":{"name":"Alabama","cities":["Alexander City","Anniston AP","Auburn","Birmingham AP","Decatur",
    "Dothan AP","Florence AP","Gadsden","Huntsville AP","Mobile AP","Mobile CO","Montgomery AP","Ozark, Fort Rucker",
    "Selma-Craig AFB","Talladega","Tuscaloosa AP"]},"Alaska":{"name":"Alaska","cities":["Adak, NAS","Anchorage IAP",
    "Anchorage, Elemendorf AFB","Anchorage, Fort Richardson","Annette","Barrow","Bethel","Bettles","Big Delta, Ft. Greely",
    "Cold Bay","Cordova","Deadhorse","Dillingham","Fairbanks IAP","Fairbanks, Eielson AFB","Galena","Gulkana","Homer", "Juneau IAP",
    "Kenai","Ketchikan IAP","King Salmon","Kodiak","Kotzebue","McGrath","Middleton Island","Nenana","Nome AP","Northway",
    "Port Heiden","Saint Paul Island","Sitka","Talkeetna","Valdez","Yakutat"]},"Arizona":{"name":"Arizona","cities":[
        "Douglas AP","Flagstaff Ap","Fort Huachuca AP","Kingman AP","Nogalas","Page","Phoenix AP","Phoenix, Luke AFB",
    "Prescott AP","Safford, Agri. Center","Tuscon Ap","Winslow AP","Yuma AP"]},"Arkansas":{"name":"Arkansas","cities":[
        "Blytheville AFB","Camden","El Dorado AP","Fayetteville AP","Fort Smith AP","Hot Springs","Jonesboro","Little Rock AP",
    "Pine Bluff AP","Texarkana AP"]},"California":{"name":"California","cities":["Alameda, NAS","Bakersfield AP","Barstow",
    "Blue Canyon","Blythe AP","Burbank AP","Chico","Concord","Covina","Crescent City AP","Downey","El Cajon","El Centro AP",
    "Escondido","Eureaka/Arcata AP","Fairfield-Travis AFB","Fresno AP","Hamiltion AFB","Laguna Beach","Lemoore, Reeves NAS",
    "Livermore","Lompoc, Vandenburg AFB","Long Beach AP","Los Angeles AP","Los Angeles CO","Marysville, Beale AFB",
    "Merced-Castle AFB","Modesto","Monterey","Mount Shasta","Mountain View, Moffet NAS","Napa","Needles AP","Oakland AP",
    "Oceanside","Ontario IAP","Oxnard","Palmdale AP","Palm Springs","Pasadena","Paso Robles","Petaluma","Pomona CO","Red Bluff",
    "Redding AP","Redlands","Richmond","Riverside-March AFB","Sacramento AP","Sacramento, McClellan AFB","Sacramento, Metro",
    "Salinas AP","San Bernadino, Norton AFB","San Diego AP","San Diego, Miramar NAS","San Fernando","San Francisco AP",
    "San Francisco CO","San Jose AP","San Luis Obispo","Santa Ana AP","Santa Barbara AP","Santa Cruz","Santa Maria AP",
    "Santa Monica CO","Santa Paula","Santa Rosa","Stockton AP","Ukiah","Victorville, George AFB","Visalia","Yreka",
    "Yuba City"]},"Colorado":{"name":"Colorado","cities":["Alamosa AP","Boulder","Colarado Springs AP","Craig","Denver AP",
    "Durango","Eagle","Fort Collins","Grand Junction AP","Greeley","LaJunta AP","Leadville","Limon","Pueblo AP","Sterling",
    "Trinidad AP"]},"Connecticut":{"name":"Connecticut","cities":["Bridgeport AP","Hartford, Brainard Field","New Haven AP",
    "New London","Norwalk","Norwich","Waterbury","Windsor Locks, Bradlet Field"]},"Delaware":{"name":"Delaware","cities":[
        "Dover AFB","Wilmington AP"]},"District of Columbia":{"name":"District of Columbia","cities":["Andrews AFB",
    "Reagan National AP"]},"Florida":{"name":"Florida","cities":["Apalachicola","Belle Glade","Cape Kennedy AP",
    "Daytona Beach AP","Fort Lauderdale","Fort Myers AP","Fort Pierce","Gainsville AP","Homestead, AFB","Jacksonville AP",
    "Jacksonville/Cecil Field NAS","Jacksonville, Mayport Naval","Key West AP","Lakeland CO","Melbourne","Miami AP","Miami CO",
    "Miami, New Tamiami AP","Milton, Whiting Field NAS","Ocala","Orlando AP","Panama City, Tyndall AFB","Pensacola CO",
    "St. Augustine","St. Petersburg","Sanford","Sarasota/Bradenton","Tallahassee AP","Tampa AP","Valpariso, Eglin AFB",
    "Vero Beach","West Palm Beach AP"]},"Georgia":{"name":"Georgia","cities":["Albany, Turner AFB","Americus","Athens",
    "Atlanta AP","Augusta AP","Brunswick","Columbus, Fort Benning","Columbus, Lawson AFB","Columbus, Metro AP","Dalton",
    "Dublin","Gainesville","Griffin","La Grange","Macon AP","Marietta, Dobbins AFB","Moultrie","Rome AP","Savannah, Travis AP",
    "Valdosta, Moody AFB","Valdosta, Regional AP","Waycross"]},"Hawaii":{"name":"Hawaii","cities":["Ewa, Barbers Point NAS",
    "Hilo AP","Honolulu AP","Kahului","Kaneohe Bay MCAS","Lihue","Molokai","Wahaiwa"]},"Idaho":{"name":"Idaho","cities":[
        "Boise AP","Burley","Coeur D’Alene AP","Idaho Falls AP","Kamiah","Lewiston AP","Moscow","Mountain Home AFB","Mullan",
    "Pocatello AP","Twin Falls AP"]},"Illinois":{"name":"Illinois","cities":["Aurora","Belleville, Scott AFB","Bloomington",
    "Carbondale","Champaign/Urbana","Chicago, Meigs Field","Chicago, Midway AP","Chicago, O’Hare AP","Chicago CO","Danville","Decatur",
    "Dixon","Elgin","Freeport","Galesburg","Glenview, NAS","Greenville","Joliet","Kankakee","LaSalle/Peru","Macomb","Marseilles",
    "Moline, Davenport AP","Mt. Vernon","Peoria AP","Quincy AP","Rantoul, Chanute AFB","Rockford","Springfield AP","Waukegan",
    "West Chicago"]},"Indiana":{"name":"Indiana","cities":["Anderson","Bedford","Bloomington","Columbus, Bakalar AFB","Crawfordsville",
    "Evansville AP","Fort Wayne AP","Goshen AP","Hobart","Huntington","Indianapolis AP (S)","Jeffersonville","Kokoma","Layfayette",
    "LaPorte","Marion","Muncie","Peru, Bunker Hill AFB","Peru, Grsssom AFB","Richmond AP","Shelbyville","South Bend AP",
    "Terre Haute AP","Valparaiso","Vincennes"]},"Iowa":{"name":"Iowa","cities":["Ames","Burlington AP","Cedar Rapids AP","Clinton",
    "Council Bluffs","Des Moines AP","Debuque","Fort Dodge","Iowa City","Keokuk","Lamoni","Marshalltown","Mason City AP","Newton",
    "Ottumwa AP","Sioux City AP","Spencer","Waterloo"]},"Kansas":{"name":"Kansas","cities":["Atchison","Chante AP","Concordia",
    "Dodge City AP","El Dorado","Emporia","Garden City AP","Goodland AP","Great Bend","Hutchinson AP","Liberal",
    "Manhattan, Fort Riley","Parsons","Russel AP","Salina","Topeka AP","Wichita AP","Wichita, McConnell AFB"]},
    "Kentucky":{"name":"Kentucky","cities":["Ashland","Bowling Green AP","Corbin AP","Covington AP","Fort Knox, Godman AAF",
        "Hopkinsville, Campbell AFB","Jackson","Lexington AP","Louisville AP","Madisonville","Owensboro","Paducah AP"]},
    "Louisiana":{"name":"Louisiana","cities":["Alexandria AP","Baton Rouge AP","Bogalusa","Bossier City, Barksdale AFB","Houma",
        "Lafayette AP","Lake Charles AP","Leesville, Fort Polk","Minden","Monroe AP","Natchitoches","New Orleans AP",
        "New Orleans, Lakefront AP","Shreveport AP"]},"Maine":{"name":"Maine","cities":["Augusta AP","Bangor, Dow AFB",
        "Brunswick, NAS","Caribou AP","Lewiston","Limestone, Loring AFB","Millinocket AP","Portland","Waterville"]},
    "Maryland":{"name":"Maryland","cities":["Balitimore AP","Balitimore CO","Cumberland","Fredrick AP","Hagerstown",
        "Lex Park, Patuxent River NAS","Salisbury"]},"Massachusetts":{"name":"Massachusetts","cities":["Boston AP","Clinton",
        "East Falmouth, Otis ANGB","Fall River","Framingham","Gloucester","Greenfield","Lawrence","Lowell","New Bedford",
        "Pittsfield AP","Springfield, Westover AFB","Tauton","Weymouth, S. Weymouth Nas","Worcester AP"]},"Michigan":{"name":
        "Michigan","cities":["Adrian","Alpena AP","Battle Creek AP","Benton Harbor AP","Detroit","Escanaba","Flint AP",
        "Grand Rapids AP","Hancock","Harbour Beach","Holland","Jackson AP","Kalamazoo","Lansing AP","Marquette CO",
        "Marquette, Sawyer AFB","Mount Clemens ANGB","Mt. Pleasant","Muskegon AP","Oscoda, Wurtsmith AFB","Pellston","Pontiac",
        "Port Huron","Saginaw AP","Sault Ste. Marie AP","Seul Choix Point","Traverse City AP","Yipsilanti"]},
    "Minnesota":{"name":"Minnesota","cities":["Albert Lea","Alexandria AP","Bemidji AP","Brainerd","Duluth AP","Fairbault",
        "Fergus Falls","Hibbing","International Falls AP","Mankato","Minneapolis/St. Paul AP","Redwood Falls","Rochester AP",
        "St. Cloud AP","Tofte","Virginia","Willmar","Winona"]},"Mississippi":{"name":"Mississippi","cities":["Biloxi, Keesler AFB",
        "Clarksdale","Columbus AFB","Greenville AFB","Greenwood","Hattiesburg","Jackson AP","Laurel","McComb AP","Meridian AP",
        "Natchez","Tupelo","Vicksburg CO"]},"Missouri":{"name":"Missouri","cities":["Cape Girardeau","Columbia AP",
        "Farmington AP","Hannibal","Jefferson City","Joplin AP","Kansas City AP","Kirksville AP","Mexico","Moberly","Poplar Bluff",
        "Rolla","Saint Joseph AP","Saint Louis AP","Saint Louis CO","Sedalia, Whiteman AFB","Sikeston","Spickard/Trenton",
        "Springfield AP","Warrensburg, Whiteman AFB"]},"Montana":{"name":"Montana","cities":["Billings AP","Bozeman","Butte AP",
        "Cut Bank AP","Glasgow AP","Glendive","Great Falls AP","Great Falls, Malmstrom AFB","Havre","Helena AP","Kalispell AP",
        "Lewiston AP","Livingston AP","Miles City AP","Missoula AP"]},"Nebraska":{"name":"Nebraska","cities":["Beatrice",
        "Bellevue, Offutt AFB","Chadron AP","Columbus","Fremont","Grand Island AP","Hastings","Kearney","Lincoln CO","McCook",
        "Norfolk","North Platte AP","Omaha AP","Omaha WSO","Scottsbluff AP","Sidney AP","Valentine"]},"Nevada":{"name":"Nevada",
        "cities":["Carson City","Elko AP","Ely AP","Las Vegas AP","Lovelock AP","Mercury","North Las Vega , Nellis AFB","Reno AP",
            "Reno CO","Tonapah AP","Winnemucca AP"]},"New Hampshire":{"name":"New Hampshire","cities":["Berlin","Claremont",
        "Concord AP","Keene","Laconia","Lebanon","Manchester, Grenier AFB","Mount Washington","Portsmouth, Pease AFB"]},
    "New Jersey":{"name":"New Jersey","cities":["Atlantic City CO","Long Branch","Millville","Newark AP","New Brunswick",
        "Patterson","Phillipsburg","Teterboro","Trenton, McQuire AFB","Vineland"]},"New Mexico":{"name":"New Mexico","cities":["Alamagordo Holloman AFB","Albuquerque AP","Artesia","Carlsbad AP","Clayton","Clovis, Cannon AFB","Farmington AP",
        "Gallup","Grants","Hobbs AP","Las Cruces","Los Alamos","Raton AP","Roswell, Walker AFB","Santa Fe CO","Silver City AP",
        "Socorro AP","Truth or Consequences","Tucumcari AP"]},"New York":{"name":"New York","cities":["Albany AP","Albany CO",
        "Auburn","Bafavia","Binghampton AP","Buffalo AP","Central Islip","Cortland","Dunkirk","Elmira AP","Geneva","Glens Falls","Gloversville","Hornell","Ithaca","Jamestown","Kingston","Lockport","Massena AP","Newburg-Stewart AFB","NYC-Central Park",
        "NYC-Kennedy AP","NYC-La Guardia AP","Niagra Falls AP","Olean","Oneonta","Oswego CO","Plattsburg AFB","Poughkeepsie",
        "Rochester AP","Rome-Griffiss AFB","Schenectady","Suffolk County AFB","Syracuse AP","Utica","Watertown","White Plains"]},
    "North Carolina":{"name":"North Carolina","cities":["Asheville AP","Cape Hatteras","Charlotte AP","Cherry Point MCAS","Durham",
        "Elizabeth City AP","Fayetteville, Pope AFB","Goldsboro, Seymour","Goldsboro, Johnson AFB","Greensboro AP","Greenville",
        "Henderson","Hickory","Jacksonville","Lumberton","New Bern AP","Raleigh/Durham AP","Rocky Mount","Wilmington AP",
        "Winston-Salem AP"]},"North Dakota":{"name":"North Dakota","cities":["Bismark AP","Devil’s Lake","Dickinson AP",
        "Fargo AP","Grands Forks AP","Jamestown AP","Minot AP","Minot, AFB","Williston"]},"Ohio":{"name":"Ohio","cities":[
            "Akron-Canton AP","Ashtabula","Athens","Bowling Green","Cambridge","Chilicothe","Cincinnati, Lunken Field",
        "Cleveland AP","Columbus AP","Columbus, Rickenbckr AFB","Dayton AP","Dayton, Wright/Paterson AFB","Defiance","Finlay AP",
        "Fremont","Hamilton","Lancaster","Lima","Mansfield AP","Marion","Middletown","Newark","Norwalk","Portsmouth",
        "Sandusky CO","Springfield","Stubenville","Toledo AP","Warren","Wooster","Youngstown AP","Zanesville AP"]},"Oklahoma":{"name":"Oklahoma","cities":["Ada","Altus AFB","Ardmore","Bartlesville","Chickasha","Enid-Vance AFB","Lawton AP",
        "McAlester","Muskogee AP","Norman","Oklahoma City AP","Oklahoma City, W.Rogers AP","Ponca City","Seminole","Stillwater",
        "Tulsa AP","Woodward"]},"Oregon":{"name":"Oregon","cities":["Albany","Astoria AP","Baker AP","Bend","Corvallis",
        "Eugene AP","Grants Pass","Hillsboro","Klamath Falls AP","Meacham","Medford AP","North Bend","Pendleton AP","Portland AP",
        "Portland CO","Redmond","Roseburg AP","Salem AP","Sexton Summit","The Dalles"]},"Pennsylvania":{"name":"Pennsylvania",
        "cities":["Allentown AP","Altoona CO","Bradford","Butler","Chambersburg","DuBois","Erie AP","Harrisburg AP","Johnstown",
            "Lancaster","Meadville","New Castle","Philadelphia AP","Philadelphia, Northeast AP","Philadelphia, Willow Gr NAS",
            "Pittsburgh AP","Pittsburgh, Allegheny AP","Reading CO","Scranton/Wilkes-Barre","State College","Sunbury","Uniontown",
            "Warren","West Chester","Williamsport AP","York"]},"Rhode Island":{"name":"Rhode Island","cities":["Newport",
        "Providence AP"]},"South Carolina":{"name":"South Carolina","cities":["Anderson","Beaufort, MCAS","Charleston AFB",
        "Charleston CO","Columbia AP","Florence AP","Georgetown","Greenville AP/Greer","Greenwood","Myrtle Beach, AFB","Orangeburg",
        "Rock Hill","Spartanburg AP","Sumter-Shaw AFB"]},"South Dakota":{"name":"South Dakota","cities":["Aberdeen AP","Brookings",
        "Chamberlain","Huron AP","Mitchell","Pierre AP","Rapid City AP","Sioux Falls AP","Watertown AP","Yankton"]},
    "Tennessee":{"name":"Tennessee","cities":["Athens","Bristol-Tri City AP","Chattanooga AP","Clarksville","Columbia","Crossville",
        "Dyersburg","Greenville","Jackson AP","Knoxville AP","Memphis AP","Murfreesboro","Nashville AP","Tullahoma"]},
    "Texas":{"name":"Texas","cities":["Abilene AP","Alice AP","Amarillo AP","Austin AP","Bay City","Beaumont","Beeville",
        "Big Springs AP","Brownsville AP","Brownwood","Bryan AP","Corpus Christi AP","Corsicana","Dallas, Fort Worth AP",
        "Del Rio, Laughlin AFB","Denton","Eagle Pass","El Paso AP","Fort Worth, Carswell AFB","Fort Worth, Meacham Field",
        "Galveston AP","Greenville","Guadalupe Pass","Harlingen","Houston AP","Houston, Hobby AP","Huntsville","Junction",
        "Killeen-Gray AFB","Kingsville, NAS","Lamesa","Laredo AFB","Longview","Lubbock AP","Lubbock, Reese AFB","Lufkin AP","Marfa",
        "McAllen","Midland AP","Mineral Wells AP","Palestine CO","Pampa","Pecos","Plainview","Port Arthur AP",
        "San Angelo, Goodfellow AFB","San Antonio AP","San Antonio, Kelly AFB","San Antonio, Randolph AFB","Sanderson",
        "Sherman-Perrin AFB","Snyder","Temple","Tyler AP","Vernon","Victoria AP","Waco AP","Wichita Falls AP"]},"Utah":{"name":
        "Utah","cities":["Cedar City AP","Logan","Moab","Ogden, Hill AFB","Price","Provo","Richfield","Saint George CO",
        "Salt Lake City AP","Vernal AP"]},"Vermont":{"name":"Vermont","cities":["Barre","Burlington AP","Montpelier/ Barre","Rutland"]},
    "Virginia":{"name":"Virginia","cities":["Charlottsville","Danville AP","Fort Belvoir","Fredricksburg","Hampton, Langley AFB",
        "Harrisonburg","Lynchburg AP","Newport News","Norfolk AP","Oceana, NAS","Petersburg","Quantico MCAS","Richmond AP",
        "Roanoke AP","Staunton","Sterling","Reagan, National AP","Winchester"]},"Washington":{"name":"Washington","cities":["Aberdeen",
        "Bellingham AP","Bremerton","Ellensburg AP","Everett-Paine AFB","Hanford","Kennewick","Longview","Moses Lake, Larson AFB",
        "Olympia AP","Port Angeles","Quillayute","Seattle-Boeing Fld","Seattle CO","Seattle-Tacoma AP","Spokane AP","Stampede Pass",
        "Tacoma-McChord AFB","Walla Walla AP","Wenatchee","Yakima AP"]},"West Virginia":{"name":"West Virginia","cities":["Beckley",
        "Bluefield AP","Charleston AP","Clarksburg","Elkins AP","Huntington CO","Martinsburg AP","Morgantown AP","Parkersburg CO",
        "Wheeling"]},"Wisconsin":{"name":"Wisconsin","cities":["Appleton","Ashland","Beloit","Eau Claire AP","Fond du Lac",
        "Green Bay AP","LaCrosse AP","Madison AP","Manitowoc","Marinette","Milwaukee AP","Racine","Sheboygan","Stevens Point",
        "Waukesha","Wausau AP"]},"Wyoming":{"name":"Wyoming","cities":["Big Piney","Casper AP","Cheyene AP","Cody AP","Evanston",
        "Gillette","Lander AP","Laramie AP","Newcastle","Rawlins","Rock Springs AP","Sheridan AP","Torrington","Worland"]}};

//This function creates the Location Popover
function LocationPopover() {
    "use strict";
    //Constructor
    this.optionArray = [];
    this.textArray = [];
    var optionArray2 = [];
    var textArray2 = [];
    this.locationDataDiv = null;
    this.saveDataButton = null;
    this.titleSpan = null;
    this.backgroundDiv = CreateElement({type: 'div', class: 'BackgroundCover'});

    this.locationDataDiv = CreateElement({type: 'div', class: 'LocationDataDiv', elements: [
        this.LocationSaveButton = CreateElement({type: 'button', class: 'LocationSaveButton', text: 'Save'}),
        this.titleSpan = CreateElement({type: 'span', class: 'LocationTitle', text: 'Input Location Data'}),
        this.firstElement = CreateElement({type: 'state', class: 'State', text: 'Select your State'}),
        this.firstButton = CreateElement({type: 'select', id: 'State', class: 'StateDropDown', text: 'Select a State from Dropdown'}),
        this.secondElement = CreateElement({type: 'city', class: 'City', text: 'Select the City closest to yours'}),
        this.secondButton = CreateElement({type: 'select', id: 'City', class: 'CityDropDown', text: 'Select a City from Dropdown'}),
        this.LocationCancelButton = CreateElement({type: 'button', class: 'LocationCancelButton', text: 'Cancel', onClick: CreateFunction(this, this.hide)})
    ]});

    var self = this;
    this.LocationSaveButton.onclick = function () {
        self.hide();
    };
    this.LocationCancelButton.onclick = function () {
        self.hide();
    };

    //This For Loop will add all of the States to the State Selection
    for (var state in stateData)
    {
            var text;
            var option = CreateElement({type: 'option', value: state, elements:[
                text = document.createTextNode(state)
            ], appendTo: this.firstButton});
            this.optionArray.push(option);
            this.textArray.push(text);
    }

    this.firstButton.selectedIndex = -1;

    this.firstButton.onchange = function()
    {
        self.secondButton.innerHTML = "";
        self.secondButton.style.opacity = "1.0";
        self.secondElement.style.opacity = "1.0";
        var index = self.firstButton.selectedIndex;
        var state = self.optionArray[index].value;
        var cityArray = stateData[state]["cities"];

        //This For Loop will add all of the Cities from the State Selected to the City Selection
        for (var city in cityArray)
        {
            var text2;
            var option2 = CreateElement({type: 'option', value: cityArray[city], elements: [
                text2 = document.createTextNode(cityArray[city])
            ], appendTo: self.secondButton});
            optionArray2.push(option2);
            textArray2.push(text2);
        }
    }
    self.locationDataDiv.appendChild(self.secondButton);

}

//This function shows the Location Popover
LocationPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.locationDataDiv);
};

//This function hides the Location Popover
LocationPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.locationDataDiv.remove();
};